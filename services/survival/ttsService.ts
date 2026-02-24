
export const ttsService = {
  /**
   * پخش صوتی متن به زبان محلی با لهجه بهینه شده برای رانندگان و افراد بومی
   */
  speak(text: string, lang: 'tr-TR' | 'ar-AE' | 'fa-IR', rate: number = 0.8): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!('speechSynthesis' in window)) {
        reject("Browser does not support TTS");
        return;
      }
      
      window.speechSynthesis.cancel(); // توقف پخش‌های قبلی برای جلوگیری از تداخل

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = rate;
      utterance.pitch = 1.0;

      utterance.onend = () => resolve();
      utterance.onerror = (e) => reject(e);

      window.speechSynthesis.speak(utterance);
    });
  }
};
