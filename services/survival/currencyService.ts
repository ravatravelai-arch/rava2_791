
export const currencyService = {
  // در نسخه MVP از نرخ‌های ثابت استفاده می‌کنیم، اما ساختار برای اتصال به API آماده است
  async getLatestRates() {
    return {
      TRY: 1850,
      AED: 17500
    };
  },

  calculateToToman(amount: number, rate: number): number {
    return amount * rate;
  }
};
