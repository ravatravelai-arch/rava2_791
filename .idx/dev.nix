# این پوسته اصلی است که سیستم برای ساخت محیط به آن نیاز دارد
{ pkgs, ... }: {
  # انتخاب کانال پکیج‌ها (نسخه پایدار)
  channel = "stable-24.05";

  # پکیج‌هایی که می‌خواهی در محیط نصب باشند (مثل Node و ابزار زیپ که قبلاً نیاز داشتی)
  packages = [
    pkgs.nodejs_22
    pkgs.zip
  ];

  # تنظیمات اختصاصی IDX
  idx = {
    # اکستنشن‌هایی که برای Vibe Coding نیاز داری
    extensions = [
      "vscodevim.vim"
      "esbenp.prettier-vscode"
      "dsznajder.es7-react-js-snippets"
    ];

    # تنظیمات پیش‌نمایش (Preview) برای پروژه Mobile-first تو
    previews = {
      enable = true;
      previews = {
        # نمایش وب (پیش‌فرض)
        web = {
          command = [ "npm" "run" "dev" "--" "--port" "$PORT" "--host" "0.0.0.0" ];
          manager = "web";
        };
        # شبیه‌ساز اندروید (قالب واقعی گوشی)
        android = {
          manager = "web";
        };
      };
    };

    # دستوراتی که به محض ساخته شدن محیط اجرا می‌شوند
    workspace = {
      onCreate = {
        # نصب پکیج‌ها به صورت خودکار
        npm-install = "npm install";
      };
    };
  };
}