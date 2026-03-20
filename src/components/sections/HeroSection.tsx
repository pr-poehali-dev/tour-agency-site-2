import { useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/7b480736-4152-4cd2-a62e-b8d467c0aded/files/a8ec88f6-3e2d-4be4-85ff-39cd6301562a.jpg";

function TourvisorWidget() {
  useEffect(() => {
    if (!document.getElementById("tv-script")) {
      const s = document.createElement("script");
      s.id = "tv-script";
      s.src = "https://tourvisor.ru/widgetloader/widgetloader.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
      {/* Tourvisor iframe форма поиска — замените XXXXXX на ваш ID агентства */}
      <iframe
        src="https://tourvisor.ru/module/index.php?type=2&city=1&country=0&nocat=0&nights=7&nightsto=14&adults=2&child=0&hotels=&transport=1&meal=0&rating=0&departure=1&lang=ru&btncolor=f57c00&btnfontcolor=ffffff&color=1565c0&font=Open+Sans"
        width="100%"
        height="120"
        frameBorder="0"
        scrolling="no"
        title="Поиск туров Tourvisor"
        style={{ display: "block", minHeight: 110 }}
      />
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-[88vh] flex items-center">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMG})` }} />
      <div className="absolute inset-0 gradient-hero opacity-80" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">
        <div className="hidden lg:flex absolute right-12 top-8 flex-col items-center">
          <div style={{ background: "linear-gradient(135deg, #ffc107, #ff9800)", color: "#1a1a2e", fontFamily: "'Montserrat', sans-serif", fontWeight: 800, borderRadius: "50%", width: 56, height: 56, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(255,193,7,0.5)", lineHeight: 1 }}>
            <span style={{ fontSize: 14 }}>5%</span>
            <span style={{ fontSize: 9, fontWeight: 700, marginTop: 2 }}>кэшбек</span>
          </div>
        </div>

        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 glass-white rounded-full px-4 py-1.5 text-white text-xs font-body mb-5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Более 50 000 туристов уже с нами · Работаем с 2012 года
          </div>

          <h1 className="text-4xl md:text-6xl font-heading text-white leading-tight mb-4" style={{ fontWeight: 900 }}>
            Купить тур онлайн —<br />
            <span className="text-yellow-300">дёшево и надёжно</span>
          </h1>

          <p className="text-white/85 text-lg font-body mb-8 max-w-xl">
            Поиск и бронирование туров по России и за рубежом. Горящие туры, рассрочка 0%, кэшбек 5% на каждый заказ.
          </p>

          <TourvisorWidget />

          <div className="flex flex-wrap gap-2 mt-5">
            <span className="text-white/60 text-xs font-body mt-1">Популярные:</span>
            {["🇹🇷 Турция", "🇪🇬 Египет", "🇹🇭 Таиланд", "🏝️ Мальдивы", "🌿 Бали", "🇦🇪 ОАЭ"].map((t) => (
              <button key={t} className="glass-white text-white text-xs px-3 py-1 rounded-full hover:bg-white/20 transition-all font-body">{t}</button>
            ))}
          </div>
        </div>
      </div>

      <a href="#tours" className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
        <Icon name="ChevronDown" size={28} />
      </a>
    </section>
  );
}

function TourSearch() {
  return (
    <section id="search" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-6">
          <p className="section-label mb-2">Поиск туров</p>
          <h2 className="text-2xl md:text-3xl font-heading text-[#0d47a1]" style={{ fontWeight: 700 }}>
            Найдите свой идеальный тур
          </h2>
        </div>
        {/* Tourvisor — полная форма поиска. Замените XXXXXX на ID вашего агентства */}
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
          <iframe
            src="https://tourvisor.ru/module/index.php?type=1&city=1&country=0&nocat=0&nights=7&nightsto=14&adults=2&child=0&transport=1&meal=0&rating=0&departure=1&lang=ru&btncolor=f57c00&btnfontcolor=ffffff&color=1565c0&font=Open+Sans&fbg=f5f7fa"
            width="100%"
            height="200"
            frameBorder="0"
            scrolling="no"
            title="Поиск туров онлайн — ТУР КЛУБ"
            style={{ display: "block" }}
          />
        </div>
        <p className="text-center text-xs text-gray-400 font-body mt-3">
          Поиск по всем туроператорам в реальном времени · Лучшие цены гарантированы
        </p>
      </div>
    </section>
  );
}

function PromoStrip() {
  return (
    <div className="bg-[#fff8e1] border-y border-yellow-200">
      <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap justify-center md:justify-between items-center gap-4 text-sm">
        {[
          { icon: "BadgePercent", text: "Кэшбек 5% на все туры — деньги вернём на ваш счёт", color: "text-orange-600" },
          { icon: "CreditCard", text: "Рассрочка 0% — разбейте оплату на 12 месяцев", color: "text-green-700" },
          { icon: "Flame", text: "Горящие туры — скидки до 40% на ближайшие вылеты", color: "text-red-600" },
        ].map((item) => (
          <div key={item.icon} className={`flex items-center gap-2 font-heading ${item.color}`} style={{ fontWeight: 600 }}>
            <Icon name={item.icon as "Flame"} size={16} />
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <>
      <Hero />
      <TourSearch />
      <PromoStrip />
    </>
  );
}
