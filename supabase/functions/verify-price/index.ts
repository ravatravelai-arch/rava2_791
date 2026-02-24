
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { GoogleGenAI, Type } from "https://esm.sh/@google/genai";

declare const Deno: any;

serve(async (req) => {
  try {
    const payload = await req.json();
    const { record } = payload; // دیتای درج شده در جدول price_reports

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // ۱. دانلود تصویر از استوریج
    const { data: fileData } = await supabase.storage
      .from('price_proofs')
      .download(record.proof_image_url);

    if (!fileData) throw new Error("File not found");

    const arrayBuffer = await fileData.arrayBuffer();
    const base64Image = btoa(new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));

    // ۲. تحلیل بصری با Gemini
    const ai = new GoogleGenAI({ apiKey: Deno.env.get('GEMINI_API_KEY')! });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
          { text: `Check if the price for '${record.item_name}' is clearly visible and matches '${record.reported_price}'. Output verified (true/false) and confidence.` }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            verified: { type: Type.BOOLEAN },
            confidence: { type: Type.NUMBER }
          },
          required: ["verified", "confidence"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");

    // ۳. اگر تایید شد -> واریز پاداش اتمیک
    if (result.verified && result.confidence > 0.8) {
      await supabase.rpc('admin_increment_wallet', {
        target_user_id: record.user_id,
        px_amount: 0.5, // ۳۰ دقیقه جایزه
        px_xp_amount: 100,
        px_reward_type: 'price_verification_success'
      });

      await supabase.from('price_reports').update({ ai_verification_status: 'verified' }).eq('id', record.id);
    } else {
      await supabase.from('price_reports').update({ ai_verification_status: 'rejected' }).eq('id', record.id);
    }

    return new Response(JSON.stringify({ success: true }));

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});
