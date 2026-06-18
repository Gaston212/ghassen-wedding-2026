"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const weddingDate = new Date("2026-07-30T21:00:00").getTime();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrollStartedMusicRef = useRef(false);

  const mapLink =
    "https://www.google.com/maps?client=safari&hs=NM29&sca_esv=6da2c71a879288c4&hl=en-qa&biw=440&bih=795&output=search&q=Le+Palace+Miami+salle+des+fetes+%D8%B5%D9%81%D8%A7%D9%82%D8%B3%E2%80%8E&source=lnms&entry=mc";

  const [musicPlaying, setMusicPlaying] = useState(false);
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    document.title = "❤︎ غسان و نهى";

    const favicon = document.querySelector("link[rel='icon']") || document.createElement("link");
    favicon.setAttribute("rel", "icon");
    favicon.setAttribute(
      "href",
      "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>❤︎</text></svg>"
    );
    document.head.appendChild(favicon);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const distance = weddingDate - new Date().getTime();

      setTime({
        days: Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24))),
        hours: Math.max(0, Math.floor((distance / (1000 * 60 * 60)) % 24)),
        minutes: Math.max(0, Math.floor((distance / (1000 * 60)) % 60)),
        seconds: Math.max(0, Math.floor((distance / 1000) % 60)),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  useEffect(() => {
    const startMusicOnScroll = async () => {
      if (!audioRef.current || scrollStartedMusicRef.current) return;

      try {
        await audioRef.current.play();
        scrollStartedMusicRef.current = true;
        setMusicPlaying(true);
        window.removeEventListener("scroll", startMusicOnScroll);
      } catch (error) {
        console.log("Music autoplay blocked:", error);
      }
    };

    window.addEventListener("scroll", startMusicOnScroll);

    return () => {
      window.removeEventListener("scroll", startMusicOnScroll);
    };
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      await audioRef.current.play();
      setMusicPlaying(true);
    }
  };

  const Box = ({ value, label }: { value: number; label: string }) => (
    <div className="rounded-2xl border border-[#d5a84c]/70 bg-white/65 px-2 py-2 shadow-lg backdrop-blur-md sm:px-3 sm:py-3">
      <div className="text-xl font-bold text-[#7a3f12] sm:text-2xl">
        {String(value).padStart(2, "0")}
      </div>
      <div className="mt-1 text-[10px] font-bold sm:text-xs">{label}</div>
    </div>
  );

  const IconButton = ({ href, src, alt }: { href: string; src: string; alt: string }) => (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/80 bg-white/55 p-2 shadow-lg backdrop-blur-md transition hover:scale-110"
    >
      <img src={src} alt={alt} className="h-8 w-8 rounded-full object-cover" />
    </a>
  );

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-cover bg-center bg-fixed px-4 py-8 text-[#6f421c]"
      style={{ backgroundImage: "url('/wedding-bg.jpeg')" }}
    >
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />

      <button
        onClick={toggleMusic}
        className="fixed left-4 top-4 z-50 flex items-center gap-2 rounded-full border border-[#d5a84c]/70 bg-white/65 px-4 py-2 text-sm font-bold text-[#7a3f12] shadow-lg backdrop-blur-md transition hover:scale-105"
      >
        <span>{musicPlaying ? "إيقاف" : "تشغيل"}</span>
        <span className="text-lg leading-none">{musicPlaying ? "⏸" : "♪"}</span>
      </button>

      <section className="mx-auto max-w-4xl space-y-8">
        <div className="rounded-[34px] bg-white/85 px-5 py-10 text-center shadow-[0_20px_60px_rgba(80,45,10,0.28)] backdrop-blur-md sm:px-12">
          <p className="mb-4 text-xl font-bold">بسم الله الرحمن الرحيم</p>
          <h1 className="mb-5 text-5xl font-bold">دعوة زفاف</h1>
          <div className="my-5 text-xl">❋ ♥ ❋</div>

          <p className="mx-auto mb-7 max-w-2xl text-lg leading-9">
            ﴿وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنْفُسِكُمْ أَزْوَاجًا
            لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً﴾
          </p>

          <p className="text-xl">تتشرف عائلة</p>
          <h2 className="my-3 text-3xl font-bold">خالد بن روينة</h2>

          <p className="text-lg leading-9">
            بدعوتكم أنتم وعائلتكم الكريمة لحضور حفل زفاف ابنهم
          </p>

          <h3 className="my-4 text-5xl font-bold drop-shadow-[0_4px_8px_rgba(80,45,10,0.35)]">
            غسان بن روينة
          </h3>

          <p className="text-lg">على الآنسة الكريمة</p>

          <h3 className="my-4 text-5xl font-bold drop-shadow-[0_4px_8px_rgba(80,45,10,0.35)]">
            نهى العارم
          </h3>
        </div>

        <div className="mx-auto max-w-3xl rounded-[28px] bg-white/84 p-5 text-center shadow-xl backdrop-blur-md">
          <h2 className="text-xl font-bold">العد التنازلي للعرس</h2>
          <p className="mt-1 text-sm font-bold text-[#8b5a2b]">
            باقٍ على موعد الزفاف
          </p>

          <div className="mt-5 grid grid-cols-4 gap-2 sm:gap-4">
            <Box value={time.days} label="يوم" />
            <Box value={time.hours} label="ساعة" />
            <Box value={time.minutes} label="دقيقة" />
            <Box value={time.seconds} label="ثانية" />
          </div>
        </div>

        <div className="rounded-[30px] bg-white/88 p-7 text-center shadow-[0_22px_60px_rgba(80,45,10,0.20)] backdrop-blur-md">
          <h2 className="text-3xl font-bold">تفاصيل الحفل</h2>

          <div className="mx-auto mt-7 max-w-2xl space-y-5">
            <p className="flex items-center justify-center gap-3 text-2xl font-bold">
              <span className="text-2xl text-[#b8822c]">✦</span>
              الخميس 30 جويلية 2026
            </p>

            <p className="flex items-center justify-center gap-3 text-2xl font-bold leading-10">
              <span className="text-2xl text-[#b8822c]">✦</span>
              من التاسعة مساءً حتى الواحدة صباحاً
            </p>

            <div className="mx-auto h-px w-40 bg-gradient-to-r from-transparent via-[#d5a84c] to-transparent" />

            <p className="text-3xl font-bold text-[#7a3f12]">
              Le Palace Miami salle des fetes
            </p>

            <p className="text-2xl font-bold">صفاقس</p>
          </div>
        </div>

        <div className="rounded-[28px] bg-white/88 p-5 text-center shadow-xl backdrop-blur-md">
          <h2 className="text-2xl font-bold">للتواصل وتأكيد الحضور</h2>

          <div className="mx-auto mt-5 max-w-xl rounded-3xl border border-[#d5a84c]/50 bg-white/55 p-5 shadow-inner">
            <p className="text-lg font-bold"> العريس ✦ غسان بن روينة ✦</p>

            <p dir="ltr" className="mt-2 text-lg font-bold tracking-wide">
              +974 55786597
            </p>

            <div className="mt-2 flex justify-center gap-6">
              <div className="text-center">
                <p className="mb-1 text-sm font-bold">الاتصال</p>
                <IconButton href="tel:+97455786597" src="/call.png" alt="Call" />
              </div>

              <div className="text-center">
                <p className="mb-1 text-sm font-bold">واتساب</p>
                <IconButton href="https://wa.me/97455786597" src="/w.jpg" alt="WhatsApp" />
              </div>
            </div>

            <p dir="ltr" className="mt-5 text-lg font-bold tracking-wide">
              +216 20289050
            </p>

            <div className="mt-2 flex justify-center">
              <div className="text-center">
                <p className="mb-1 text-sm font-bold">الاتصال</p>
                <IconButton href="tel:+21620289050" src="/call.png" alt="Call" />
              </div>
            </div>

            <div className="mx-auto my-5 h-px max-w-xs bg-[#d5a84c]/50" />

            <p className="text-lg font-bold">والد العريس ✦ خالد بن روينة ✦</p>

            <p dir="ltr" className="mt-2 text-lg font-bold tracking-wide">
              +216 26464509
            </p>

            <div className="mt-2 flex justify-center gap-6">
              <div className="text-center">
                <p className="mb-1 text-sm font-bold">الاتصال</p>
                <IconButton href="tel:+21626464509" src="/call.png" alt="Call" />
              </div>

              <div className="text-center">
                <p className="mb-1 text-sm font-bold">واتساب</p>
                <IconButton href="https://wa.me/21626464509" src="/w.jpg" alt="WhatsApp" />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] bg-white/88 p-6 text-center shadow-xl backdrop-blur-md">
          <h2 className="text-2xl font-bold">موقع القاعة</h2>

          <a
            href={mapLink}
            target="_blank"
            className="mt-5 inline-flex items-center justify-center rounded-full border border-[#d5a84c] bg-white/70 px-10 py-3 text-lg font-bold text-[#6f421c] shadow-lg backdrop-blur-md transition hover:scale-105"
          >
            مشاهدة الموقع على الخريطة
          </a>

          <iframe
            className="mt-5 h-64 w-full rounded-2xl border border-[#d5a84c]"
            src="https://www.google.com/maps?q=Le%20Palace%20Miami%20salle%20des%20fetes%20Sfax&output=embed"
            loading="lazy"
          />
        </div>

        <div className="rounded-[28px] bg-white/88 p-8 text-center shadow-xl backdrop-blur-md">
          <p className="text-2xl font-bold text-[#9a4f16]">
            نتشرف بتشريفكم ومشاركتكم أفراحنا
          </p>

          <p className="mt-4 text-xl font-bold text-[#8a4a18]">
            سعداء بوجودكم بيننا
          </p>
        </div>

        <footer className="pb-8 text-center text-sm font-bold text-[#d68a00]">
          دعوة حفل زفاف غسان و نهى © 2026
        </footer>
      </section>
    </main>
  );
}