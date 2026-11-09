IMAGE ASSETS / راهنمای تصاویر

در این نسخه، تصاویر نمونه با URL مستقیم از Unsplash بارگذاری می‌شوند تا پیش‌نمایش بدون نیاز به build نمایش داده شود.

برای میزبانی کامل تصاویر در خود پروژه:
1. تصاویر نهایی و دارای مجوز استفاده را داخل همین پوشه قرار دهید، مثلاً hero-portrait.jpg.
2. در index.html مقدار src تصویر را از URL اینترنتی به مسیر نسبی مانند assets/hero-portrait.jpg تغییر دهید.
3. آدرس og:image را نیز برای تصویر مناسبِ میزبانی‌شده به‌روز کنید.
4. مطمئن شوید نام فایل‌ها و حروف بزرگ/کوچک دقیقاً با مسیر HTML یکسان باشد؛ این مورد در GitHub Pages اهمیت دارد.

این پوشه عمداً شامل عکس خام نمونه نیست؛ برای جلوگیری از بازنشر بدون مجوز، عکس‌ها باید توسط مالک سایت انتخاب و تأیید شوند.


Categories videos
The three category videos are referenced by their original HTTPS CDN URLs in index.html. This keeps them independent of the GitHub Pages repository base path. To self-host them, place the actual MP4 files in assets/videos/ and replace each video src with a relative path such as assets/videos/face.mp4.
