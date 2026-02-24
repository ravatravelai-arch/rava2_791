
import { useRef, useCallback, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Type } from '@google/genai';
import { useUIStore } from '../store/useUIStore';
import { useUserStore } from '../store/useUserStore';
import { useAuthStore } from '../store/useAuthStore';
import { useMapStore } from '../store/useMapStore';
import { useDiscoveryStore } from '../store/useDiscoveryStore';
import { SYSTEM_INSTRUCTION } from '../constants';
import { encodeBase64 } from '../utils/helpers';
import { AudioGraph } from '../services/audioGraph';
import { discoveryService } from '../services/discoveryService';
import { chatLogger } from '../services/ai/chatLogger';
import { GeoPoint } from '../utils/geoPoint';
import { APP_CONFIG } from '../config';

export const useGeminiLive = () => {
  const { setThinking, setSpeaking, setRecording, setConnecting, setCaptions, setUserTalking, setPlayingNarrative } = useUIStore();
  const { wallet, deductFuel, cityMode } = useUserStore();
  const { semanticProfile, updatePreference } = useAuthStore();
  const userLocation = useMapStore(s => s.userLocation);
  const { setDiscoveredPlaces } = useDiscoveryStore();
  
  const sessionRef = useRef<any>(null);
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const lastFuelReportTimeRef = useRef<number>(0);
  const connectionStatusRef = useRef<'idle' | 'connecting' | 'connected'>('idle');
  const audioGraph = AudioGraph.getInstance();
  const currentTurnRef = useRef({ user: '', ai: '' });
  
  const audioBufferRef = useRef<Float32Array[]>([]);
  const currentBufferSizeRef = useRef<number>(0);
  const MAX_BUFFER_SAMPLES = 2048; 

  // تنظیم لیسنر برای وضعیت پخش روایت
  useEffect(() => {
    audioGraph.onNarrativeStop = () => {
      setPlayingNarrative(false);
    };
    return () => {
      audioGraph.onNarrativeStop = null;
    };
  }, [setPlayingNarrative]);

  const disconnect = useCallback(() => {
    if (connectionStatusRef.current === 'idle') return;
    
    if (lastFuelReportTimeRef.current > 0) {
      const elapsed = (Date.now() - lastFuelReportTimeRef.current) / 1000;
      if (elapsed > 1) deductFuel(elapsed);
    }

    connectionStatusRef.current = 'idle';
    if (abortControllerRef.current) abortControllerRef.current.abort();
    
    audioGraph.stopAll(); // این متد narrative را هم متوقف می‌کند
    setPlayingNarrative(false);

    audioBufferRef.current = [];
    currentBufferSizeRef.current = 0;
    
    if (sessionRef.current) {
      try { sessionRef.current.close(); } catch(e) {}
      sessionRef.current = null;
    }
    sessionPromiseRef.current = null;
    
    setRecording(false);
    setConnecting(false);
    setSpeaking(false);
    setThinking(false);
    setUserTalking(false);
    setCaptions({ user: '', ai: '' });
  }, [audioGraph, setRecording, setConnecting, setSpeaking, setThinking, setCaptions, setUserTalking, deductFuel, setPlayingNarrative]);

  const connect = useCallback(async () => {
    if (wallet.balance <= 0) {
      alert("بنزینت تموم شده رفیق! یه سر برو بخش ابزارها شارژ کن.");
      return;
    }
    if (connectionStatusRef.current !== 'idle') return;

    const apiKey = process.env.API_KEY || APP_CONFIG.GOOGLE.GEMINI_API_KEY;
    if (!apiKey) return;

    connectionStatusRef.current = 'connecting';
    setConnecting(true);
    
    // اگر روایتی در حال پخش است، قبل از اتصال به جمینی قطع شود تا تداخل ایجاد نشود
    audioGraph.stopStaticFile();
    setPlayingNarrative(false);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    
    const ai = new GoogleGenAI({ apiKey });

    try {
      await audioGraph.initOutput();
      const userGeo = GeoPoint.fromArray(userLocation);
      
      const initialContext = `
[User Persona]
Travel Style: ${semanticProfile.travel_style}
Companions: ${semanticProfile.crew_type}
Is Traveling Now: ${semanticProfile.is_traveling_now}
[Live Context]
City: ${cityMode}
Location: ${userGeo?.lat},${userGeo?.lng}
Fuel Remaining: ${Math.floor(wallet.balance * 60)} minutes
`;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          outputAudioTranscription: {},
          inputAudioTranscription: {},
          tools: [{
            functionDeclarations: [
              {
                name: 'search_nearby',
                description: 'جستجوی مکان‌های اطراف بر اساس مود و شعاع.',
                parameters: {
                  type: Type.OBJECT,
                  properties: {
                    mood: { type: Type.STRING, enum: ['luxury', 'budget', 'instagrammable', 'hidden_gem'] },
                    radius: { type: Type.NUMBER }
                  },
                  required: ['mood']
                }
              },
              {
                name: 'get_user_context',
                description: 'دریافت مختصات دقیق، موجودی سوخت و ترجیحات شخصی مسافر.',
                parameters: { type: Type.OBJECT, properties: {} }
              },
              {
                name: 'update_user_preference',
                description: 'ذخیره یک ترجیح یا علاقه جدید در پروفایل دائمی مسافر.',
                parameters: {
                  type: Type.OBJECT,
                  properties: {
                    preference_key: { type: Type.STRING, description: 'مثلاً food_preferences یا dislikes' },
                    value: { type: Type.STRING }
                  },
                  required: ['preference_key', 'value']
                }
              }
            ]
          }],
          speechConfig: { 
            voiceConfig: { 
              prebuiltVoiceConfig: { 
                voiceName: 'Kore' 
              } 
            } 
          },
          systemInstruction: SYSTEM_INSTRUCTION + "\n" + initialContext,
        },
        callbacks: {
          onopen: () => {
            connectionStatusRef.current = 'connected';
            lastFuelReportTimeRef.current = Date.now();
            setConnecting(false);
            setRecording(true);
            
            audioGraph.startInput((chunk, isUserTalking) => {
              if (connectionStatusRef.current !== 'connected') return;
              if (!isUserTalking) {
                audioBufferRef.current = [];
                currentBufferSizeRef.current = 0;
                return;
              }
              
              // اگر کاربر شروع به صحبت کرد، هر فایل استاتیکی که پخش می‌شود باید قطع شود
              if (isUserTalking) {
                  // این کار توسط AudioGraph به صورت خودکار با تشخیص Barge-in انجام می‌شود،
                  // اما محض اطمینان اینجا هم فلگ UI را آپدیت می‌کنیم.
                  setPlayingNarrative(false);
              }

              audioBufferRef.current.push(chunk);
              currentBufferSizeRef.current += chunk.length;
              if (currentBufferSizeRef.current >= MAX_BUFFER_SAMPLES) {
                const combined = new Float32Array(currentBufferSizeRef.current);
                let offset = 0;
                for (const buf of audioBufferRef.current) {
                  combined.set(buf, offset);
                  offset += buf.length;
                }
                audioBufferRef.current = [];
                currentBufferSizeRef.current = 0;
                
                sessionPromise.then((session) => {
                  const int16 = new Int16Array(combined.length);
                  for (let i = 0; i < combined.length; i++) {
                    const s = Math.max(-1, Math.min(1, combined[i]));
                    int16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
                  }
                  session.sendRealtimeInput({ 
                    media: { data: encodeBase64(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' } 
                  });
                });
              }
            });
          },
          onmessage: async (message: LiveServerMessage) => {
            if (connectionStatusRef.current !== 'connected') return;

            if (message.serverContent?.inputTranscription?.text) {
              currentTurnRef.current.user = message.serverContent.inputTranscription.text;
              setCaptions({ user: currentTurnRef.current.user, ai: currentTurnRef.current.ai });
            }
            if (message.serverContent?.outputTranscription) {
              currentTurnRef.current.ai += message.serverContent.outputTranscription.text;
              setCaptions({ user: currentTurnRef.current.user, ai: currentTurnRef.current.ai });
            }

            if (message.toolCall) {
              for (const fc of message.toolCall.functionCalls) {
                let response: any = { result: "اوکی شد." };
                
                if (fc.name === 'search_nearby') {
                  const geo = GeoPoint.fromArray(userLocation);
                  const results = await discoveryService.searchNearby(geo?.lat || 0, geo?.lng || 0, (fc.args as any).radius || 5000, (fc.args as any).mood);
                  setDiscoveredPlaces(results);
                  response = { result: results.length > 0 ? results : "چیزی پیدا نکردم رفیق." };
                }
                
                if (fc.name === 'get_user_context') {
                  const geo = GeoPoint.fromArray(userLocation);
                  response = { result: { 
                    lat: geo?.lat, lng: geo?.lng, 
                    fuel_mins: Math.floor(wallet.balance * 60),
                    preferences: semanticProfile 
                  }};
                }

                if (fc.name === 'update_user_preference') {
                  const { preference_key, value } = fc.args as any;
                  await updatePreference(preference_key, value);
                  response = { result: `حافظه‌ی من آپدیت شد: ${preference_key} برای مسافر ثبت شد.` };
                }

                sessionPromise.then(s => {
                  s.sendToolResponse({ functionResponses: [{ id: fc.id, name: fc.name, response }] });
                });
              }
            }

            if (message.serverContent?.interrupted) audioGraph.flush(); 
            
            const parts = message.serverContent?.modelTurn?.parts;
            if (parts) {
              for (const part of parts) {
                if (part.inlineData?.data) {
                  setThinking(false);
                  audioGraph.playChunk(part.inlineData.data);
                }
              }
            }

            if (message.serverContent?.turnComplete) {
              setThinking(false);
              const { user, ai } = currentTurnRef.current;
              if (user || ai) {
                chatLogger.logTurn('user', user, { location: userLocation });
                chatLogger.logTurn('model', ai, { location: userLocation });
              }
              currentTurnRef.current = { user: '', ai: '' };
            }
          },
          onclose: () => disconnect(),
          onerror: () => disconnect(),
        }
      });

      sessionPromiseRef.current = sessionPromise;
      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error("[AgenticBrain] Connection Failed:", err);
      disconnect();
    }
  }, [cityMode, userLocation, audioGraph, semanticProfile, wallet, setConnecting, setRecording, setThinking, setSpeaking, setCaptions, setUserTalking, setDiscoveredPlaces, updatePreference, disconnect, deductFuel, setPlayingNarrative]);

  return { connect, disconnect, 
    sendVisionFrame: (base64: string) => {
      sessionPromiseRef.current?.then(s => {
        s.sendRealtimeInput({ media: { data: base64, mimeType: 'image/jpeg' } });
      });
    }, 
    interrupt: () => {
      audioGraph.flush();
      sessionPromiseRef.current?.then(s => {
        s.sendRealtimeInput({ control: { action: 'interrupt' } } as any);
      });
    }
  };
};
