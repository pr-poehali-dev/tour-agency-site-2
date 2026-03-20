import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/7b480736-4152-4cd2-a62e-b8d467c0aded/files/a8ec88f6-3e2d-4be4-85ff-39cd6301562a.jpg";

const TOURS = [
  { id: 1, country: "Турция", city: "Анталья, Кемер", nights: 7, price: "42 900", oldPrice: "58 000", rating: 4.8, reviews: 312, badge: "Горящий", badgeClass: "badge-hot", emoji: "🇹🇷", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80", meal: "All Inclusive", cat: "горящие" },
  { id: 2, country: "Египет", city: "Шарм-эль-Шейх", nights: 10, price: "54 500", oldPrice: null, rating: 4.7, reviews: 228, badge: "Популярный", badgeClass: "badge-sale", emoji: "🇪🇬", image: "https://images.unsplash.com/photo-1539768942893-daf53e448371?w=600&q=80", meal: "All Inclusive", cat: "пляжные" },
  { id: 3, country: "Таиланд", city: "Пхукет, Паттайя", nights: 12, price: "89 000", oldPrice: "112 000", rating: 4.9, reviews: 445, badge: "Хит", badgeClass: "badge-hot", emoji: "🇹🇭", image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80", meal: "BB", cat: "азия" },
  { id: 4, country: "Мальдивы", city: "Мале, Атолл Ари", nights: 10, price: "189 000", oldPrice: null, rating: 5.0, reviews: 134, badge: "Люкс", badgeClass: "badge-new", emoji: "🏝️", image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=80", meal: "HB", cat: "острова" },
  { id: 5, country: "ОАЭ", city: "Дубай, Абу-Даби", nights: 7, price: "98 000", oldPrice: "125 000", rating: 4.8, reviews: 187, badge: "Скидка", badgeClass: "badge-sale", emoji: "🇦🇪", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80", meal: "BB", cat: "азия" },
  { id: 6, country: "Бали", city: "Убуд, Семиньяк", nights: 11, price: "112 000", oldPrice: null, rating: 4.9, reviews: 201, badge: "Тренд 2025", badgeClass: "badge-new", emoji: "🌿", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80", meal: "BB", cat: "азия" },
  { id: 7, country: "Испания", city: "Барселона, Тенерифе", nights: 9, price: "134 000", oldPrice: "155 000", rating: 4.7, reviews: 156, badge: "Скидка", badgeClass: "badge-sale", emoji: "🇪🇸", image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=80", meal: "BB", cat: "европа" },
  { id: 8, country: "Россия", city: "Сочи, Краснодар", nights: 7, price: "38 000", oldPrice: null, rating: 4.6, reviews: 289, badge: "По России", badgeClass: "badge-new", emoji: "🇷🇺", image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600&q=80", meal: "HB", cat: "россия" },
];

const CATS = ["все", "горящие", "пляжные", "азия", "острова", "европа", "россия"];

const ADVANTAGES = [
  { icon: "BadgePercent", title: "Кэшбек 5%", desc: "На каждое бронирование тура — живые деньги на счёт" },
  { icon: "CreditCard", title: "Рассрочка 0%", desc: "Разбейте платёж на 3–12 месяцев без переплат" },
  { icon: "Headphones", title: "Поддержка 24/7", desc: "Менеджер на связи в любое время до и во время тура" },
  { icon: "ShieldCheck", title: "100% гарантия", desc: "Защита платежей и полная ответственность за ваш тур" },
  { icon: "Plane", title: "Чартерные рейсы", desc: "Прямые вылеты из Москвы, Санкт-Петербурга и регионов" },
  { icon: "FileText", title: "Визовая помощь", desc: "Подготовим документы и подадим заявку за вас" },
];

const DESTINATIONS = [
  { country: "Турция", tours: "1 240 туров", from: "от 38 900 ₽", emoji: "🇹🇷", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&q=80" },
  { country: "Египет", tours: "856 туров", from: "от 42 000 ₽", emoji: "🇪🇬", image: "https://images.unsplash.com/photo-1539768942893-daf53e448371?w=400&q=80" },
  { country: "Таиланд", tours: "634 тура", from: "от 79 000 ₽", emoji: "🇹🇭", image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&q=80" },
  { country: "Мальдивы", tours: "312 туров", from: "от 145 000 ₽", emoji: "🏝️", image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&q=80" },
  { country: "ОАЭ", tours: "445 туров", from: "от 75 000 ₽", emoji: "🇦🇪", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80" },
  { country: "Бали", tours: "278 туров", from: "от 95 000 ₽", emoji: "🌿", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80" },
];

const REVIEWS = [
  { name: "Ольга Морозова", city: "Москва", text: "Заказывали тур в Турцию. Всё оформили за час, цена оказалась ниже, чем я нашла сама. Кэшбек пришёл через 3 дня.", rating: 5, tour: "Турция, Анталья", avatar: "ОМ", date: "Март 2025" },
  { name: "Сергей Воронов", city: "СПб", text: "Летели на Мальдивы семьёй. Менеджер Анна подобрала идеальный отель. На месте всё было именно так, как обещали.", rating: 5, tour: "Мальдивы", avatar: "СВ", date: "Февраль 2025" },
  { name: "Татьяна Крылова", city: "Казань", text: "Купила горящий тур в Египет за 2 дня до вылета. Быстро оформили, страховка уже включена. Рекомендую!", rating: 5, tour: "Египет, Хургада", avatar: "ТК", date: "Январь 2025" },
  { name: "Михаил Захаров", city: "Екатеринбург", text: "Оформляли визу в ОАЭ через агентство. Помогли с документами, тур прошёл отлично. Берите рассрочку — очень удобно.", rating: 5, tour: "ОАЭ, Дубай", avatar: "МЗ", date: "Декабрь 2024" },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function TopBar() {
  return (
    <div className="hidden md:block gradient-blue text-white text-xs py-2">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <Icon name="Phone" size={12} />
            <a href="tel:+78001234567" className="hover:text-yellow-300 transition-colors">8 800 123-45-67</a>
            <span className="text-white/50">— бесплатно</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="Clock" size={12} />
            Пн–Вс: 9:00–21:00
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-yellow-300 font-heading" style={{ fontWeight: 600 }}>
            <Icon name="BadgePercent" size={12} />
            Кэшбек 5% на все туры
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="CreditCard" size={12} />
            Рассрочка 0%
          </span>
        </div>
      </div>
    </div>
  );
}

function Nav({ active }: { active: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { href: "#tours", label: "Туры" },
    { href: "#destinations", label: "Направления" },
    { href: "#about", label: "О нас" },
    { href: "#reviews", label: "Отзывы" },
    { href: "#contacts", label: "Контакты" },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-white/95 shadow-sm"}`}>
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className="w-9 h-9 gradient-blue rounded-lg flex items-center justify-center shadow">
            <span className="text-lg">✈️</span>
          </div>
          <div>
            <p className="font-heading text-[#0d47a1] text-base leading-tight" style={{ fontWeight: 800 }}>Солнечный Путь</p>
            <p className="text-[10px] text-gray-400 leading-tight font-body">Официальный сайт</p>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={`px-4 py-2 rounded font-heading text-sm transition-all ${active === l.href.slice(1) ? "text-[#1565c0] bg-blue-50" : "text-gray-700 hover:text-[#1565c0] hover:bg-blue-50"}`} style={{ fontWeight: 600 }}>
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+78001234567" className="flex items-center gap-1.5 text-[#1565c0] font-heading text-sm hover:text-[#0d47a1] transition-colors" style={{ fontWeight: 700 }}>
            <Icon name="Phone" size={15} />
            8 800 123-45-67
          </a>
          <a href="#contacts" className="btn-orange px-5 py-2.5 text-sm font-heading" style={{ fontWeight: 700 }}>
            Подобрать тур
          </a>
        </div>

        <button className="md:hidden p-2 text-gray-700" onClick={() => setOpen(!open)}>
          <Icon name={open ? "X" : "Menu"} size={22} />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-gray-800 font-heading text-sm py-2 border-b border-gray-100" style={{ fontWeight: 600 }}>
              {l.label}
            </a>
          ))}
          <a href="#contacts" className="btn-orange px-5 py-3 text-sm font-heading mt-2 text-center rounded" style={{ fontWeight: 700 }}>
            Подобрать тур
          </a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const [form, setForm] = useState({ dest: "", date: "", nights: "", people: "2" });

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

        <div className="max-w-3xl">
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

          <div className="bg-white rounded-xl shadow-2xl p-2 flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg">
              <Icon name="MapPin" size={16} className="text-[#1565c0] shrink-0" />
              <input type="text" placeholder="Страна или курорт" value={form.dest} onChange={(e) => setForm({ ...form, dest: e.target.value })} className="outline-none text-sm text-gray-800 placeholder-gray-400 flex-1 font-body" />
            </div>
            <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg md:w-36">
              <Icon name="Calendar" size={16} className="text-[#1565c0] shrink-0" />
              <input type="text" placeholder="Дата вылета" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="outline-none text-sm text-gray-800 placeholder-gray-400 w-full font-body" />
            </div>
            <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg md:w-32">
              <Icon name="Moon" size={16} className="text-[#1565c0] shrink-0" />
              <input type="text" placeholder="Ночей" value={form.nights} onChange={(e) => setForm({ ...form, nights: e.target.value })} className="outline-none text-sm text-gray-800 placeholder-gray-400 w-full font-body" />
            </div>
            <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg md:w-32">
              <Icon name="Users" size={16} className="text-[#1565c0] shrink-0" />
              <select value={form.people} onChange={(e) => setForm({ ...form, people: e.target.value })} className="outline-none text-sm text-gray-800 w-full font-body bg-transparent">
                <option value="1">1 турист</option>
                <option value="2">2 туриста</option>
                <option value="3">3 туриста</option>
                <option value="4">4+</option>
              </select>
            </div>
            <button className="btn-orange px-7 py-3 text-sm font-heading rounded-lg gap-2" style={{ fontWeight: 700 }}>
              <Icon name="Search" size={15} />
              Найти тур
            </button>
          </div>

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

function Tours() {
  const [cat, setCat] = useState("все");
  const { ref, inView } = useInView();
  const filtered = cat === "все" ? TOURS : TOURS.filter((t) => t.cat === cat);

  return (
    <section id="tours" className="py-16 bg-[#f5f7fa]">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className={`section-label mb-2 transition-all duration-500 ${inView ? "opacity-100" : "opacity-0"}`}>Горящие предложения 2025</p>
            <h2 className={`text-3xl md:text-4xl font-heading underline-orange transition-all duration-500 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ fontWeight: 700 }}>
              Популярные туры
            </h2>
          </div>
          <a href="#contacts" className="btn-blue px-5 py-2.5 text-sm self-start md:self-auto rounded-lg">Смотреть все туры →</a>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`px-4 py-2 rounded-full text-sm font-heading transition-all capitalize ${cat === c ? "gradient-blue text-white shadow" : "bg-white text-gray-600 hover:bg-blue-50 border border-gray-200"}`} style={{ fontWeight: 600 }}>
              {c === "все" ? "Все туры" : c === "горящие" ? "🔥 Горящие" : c === "пляжные" ? "🏖️ Пляжные" : c === "азия" ? "🌏 Азия" : c === "острова" ? "🏝️ Острова" : c === "европа" ? "🏛️ Европа" : "🇷🇺 Россия"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((tour, i) => (
            <article key={tour.id} className={`bg-white rounded-xl overflow-hidden shadow-sm card-lift transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: `${0.08 * i}s` }}>
              <div className="relative h-44 overflow-hidden">
                <img src={tour.image} alt={`Туры в ${tour.country} — купить онлайн`} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" onError={(e) => { (e.target as HTMLImageElement).src = HERO_IMG; }} loading="lazy" />
                <div className="absolute inset-0 gradient-card" />
                <span className={`${tour.badgeClass} absolute top-2 left-2 text-[11px] font-heading px-2 py-0.5 rounded`} style={{ fontWeight: 700 }}>{tour.badge}</span>
                <div className="absolute bottom-2 left-3">
                  <p className="text-white font-heading text-lg" style={{ fontWeight: 700 }}>{tour.emoji} {tour.country}</p>
                  <p className="text-white/80 text-xs">{tour.city}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3 font-body">
                  <span className="flex items-center gap-1"><Icon name="Moon" size={12} className="text-[#1565c0]" />{tour.nights} ночей</span>
                  <span className="flex items-center gap-1"><Icon name="Utensils" size={12} className="text-[#1565c0]" />{tour.meal}</span>
                  <span className="flex items-center gap-1"><Icon name="Star" size={12} className="text-yellow-400" />{tour.rating}</span>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    {tour.oldPrice && <p className="text-xs text-gray-400 line-through font-body">{tour.oldPrice} ₽</p>}
                    <p className="text-xl font-heading text-[#0d47a1]" style={{ fontWeight: 800 }}>{tour.price} <span className="text-sm text-gray-400" style={{ fontWeight: 400 }}>₽</span></p>
                    <p className="text-[10px] text-gray-400 font-body">за человека</p>
                  </div>
                  <button className="btn-orange text-xs px-4 py-2.5 font-heading rounded-lg" style={{ fontWeight: 700 }}>Забронировать</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Advantages() {
  const { ref, inView } = useInView();
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="text-center mb-10">
          <p className={`section-label mb-2 transition-all duration-500 ${inView ? "opacity-100" : "opacity-0"}`}>Почему выбирают нас</p>
          <h2 className={`text-3xl md:text-4xl font-heading transition-all duration-500 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ fontWeight: 700 }}>Наши преимущества</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {ADVANTAGES.map((adv, i) => (
            <div key={adv.title} className={`flex gap-4 p-5 rounded-xl bg-[#f5f7fa] hover:bg-[#e8edf5] transition-all duration-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: `${0.1 * i}s` }}>
              <div className="w-12 h-12 gradient-blue rounded-xl flex items-center justify-center shrink-0">
                <Icon name={adv.icon as "BadgePercent"} size={22} className="text-white" />
              </div>
              <div>
                <h3 className="font-heading text-[#0d47a1] text-sm mb-1" style={{ fontWeight: 700 }}>{adv.title}</h3>
                <p className="text-gray-500 text-xs font-body leading-relaxed">{adv.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Destinations() {
  const { ref, inView } = useInView();
  return (
    <section id="destinations" className="py-16 bg-[#f5f7fa]">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="mb-10">
          <p className={`section-label mb-2 transition-all duration-500 ${inView ? "opacity-100" : "opacity-0"}`}>Популярные направления</p>
          <h2 className={`text-3xl md:text-4xl font-heading underline-orange transition-all duration-500 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ fontWeight: 700 }}>Куда поехать в 2025 году</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {DESTINATIONS.map((d, i) => (
            <a key={d.country} href="#tours" className={`relative rounded-xl overflow-hidden h-36 md:h-48 group block card-lift transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: `${0.08 * i}s` }}>
              <img src={d.image} alt={`Туры в ${d.country} — цены 2025`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).src = HERO_IMG; }} />
              <div className="absolute inset-0 gradient-card" />
              <div className="absolute bottom-3 left-3">
                <p className="text-white font-heading text-lg" style={{ fontWeight: 700 }}>{d.emoji} {d.country}</p>
                <p className="text-white/70 text-xs font-body">{d.tours} · {d.from}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const { ref, inView } = useInView();
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div ref={ref}>
            <p className={`section-label mb-3 transition-all duration-500 ${inView ? "opacity-100" : "opacity-0"}`}>О компании</p>
            <h2 className={`text-3xl md:text-4xl font-heading underline-orange mb-7 transition-all duration-500 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ fontWeight: 700 }}>
              Солнечный Путь —<br />ваш надёжный туроператор
            </h2>
            <div className={`space-y-4 text-gray-600 font-body text-sm leading-relaxed transition-all duration-500 delay-200 ${inView ? "opacity-100" : "opacity-0"}`}>
              <p>С 2012 года мы помогаем путешественникам находить туры мечты по лучшим ценам. Более <strong>50 000 довольных клиентов</strong> уже доверили нам организацию своих поездок.</p>
              <p>Мы — официальный партнёр ведущих туроператоров России: Pegas Touristik, Anex Tour, TUI, Coral Travel. Это позволяет нам предлагать <strong>эксклюзивные цены и приоритетные места</strong>.</p>
              <p>Полное сопровождение: авиабилеты, отели, трансфер, страховка, виза — всё в одном окне без лишних хлопот.</p>
            </div>
            <div className={`grid grid-cols-2 gap-4 mt-8 transition-all duration-500 delay-300 ${inView ? "opacity-100" : "opacity-0"}`}>
              {[
                { val: "12 лет", label: "на рынке" },
                { val: "50 000+", label: "клиентов" },
                { val: "120+", label: "направлений" },
                { val: "98%", label: "возвращаются снова" },
              ].map((s) => (
                <div key={s.label} className="bg-[#f5f7fa] rounded-xl p-4 text-center">
                  <p className="text-2xl font-heading text-[#0d47a1]" style={{ fontWeight: 900 }}>{s.val}</p>
                  <p className="text-xs text-gray-500 font-body mt-1">{s.label}</p>
                </div>
              ))}
            </div>
            <a href="#contacts" className={`btn-orange mt-8 px-7 py-3 text-sm font-heading rounded-lg transition-all duration-500 delay-400 ${inView ? "opacity-100" : "opacity-0"}`} style={{ fontWeight: 700 }}>
              Связаться с нами
            </a>
          </div>
          <div className={`hidden lg:block transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            <div className="relative rounded-2xl overflow-hidden h-[480px]">
              <img src={HERO_IMG} alt="Турагентство Солнечный Путь — путешествия по всему миру" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d47a1]/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-heading text-[#0d47a1] text-sm" style={{ fontWeight: 700 }}>Горящий тур — Турция</p>
                  <span className="badge-hot text-[11px] font-heading px-2 py-0.5 rounded" style={{ fontWeight: 700 }}>-30%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-xs line-through font-body">58 000 ₽</p>
                    <p className="text-xl font-heading text-[#0d47a1]" style={{ fontWeight: 900 }}>42 900 ₽</p>
                  </div>
                  <button className="btn-orange text-xs px-4 py-2 rounded font-heading" style={{ fontWeight: 700 }}>Купить</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const { ref, inView } = useInView();
  const [active, setActive] = useState(0);
  return (
    <section id="reviews" className="py-16 bg-[#f5f7fa]">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="text-center mb-10">
          <p className={`section-label mb-2 transition-all duration-500 ${inView ? "opacity-100" : "opacity-0"}`}>Отзывы клиентов</p>
          <h2 className={`text-3xl md:text-4xl font-heading transition-all duration-500 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ fontWeight: 700 }}>Нам доверяют тысячи туристов</h2>
        </div>
        <div className={`grid grid-cols-1 lg:grid-cols-5 gap-6 transition-all duration-500 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="lg:col-span-3 bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-1 mb-5">
              {[...Array(5)].map((_, i) => <Icon key={i} name="Star" size={18} className="text-yellow-400" />)}
              <span className="text-sm text-gray-400 font-body ml-2">{REVIEWS[active].date}</span>
            </div>
            <blockquote className="text-gray-700 font-body text-base leading-relaxed mb-6 italic">"{REVIEWS[active].text}"</blockquote>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 gradient-blue rounded-full flex items-center justify-center text-white font-heading text-sm" style={{ fontWeight: 700 }}>{REVIEWS[active].avatar}</div>
              <div>
                <p className="font-heading text-[#0d47a1] text-sm" style={{ fontWeight: 700 }}>{REVIEWS[active].name}</p>
                <p className="text-xs text-gray-400 font-body">{REVIEWS[active].city} · {REVIEWS[active].tour}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              {REVIEWS.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} className={`rounded-full transition-all ${active === i ? "w-7 h-2.5 bg-[#1565c0]" : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"}`} />
              ))}
            </div>
          </div>
          <div className="lg:col-span-2 flex flex-col gap-4">
            {REVIEWS.filter((_, i) => i !== active).slice(0, 2).map((r) => (
              <div key={r.name} className="bg-white rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActive(REVIEWS.indexOf(r))}>
                <div className="flex gap-1 mb-2">{[...Array(r.rating)].map((_, i) => <Icon key={i} name="Star" size={12} className="text-yellow-400" />)}</div>
                <p className="text-gray-600 text-xs font-body line-clamp-2 mb-3">"{r.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 gradient-blue rounded-full flex items-center justify-center text-white text-[10px] font-heading" style={{ fontWeight: 700 }}>{r.avatar}</div>
                  <div>
                    <p className="font-heading text-[#0d47a1] text-xs" style={{ fontWeight: 600 }}>{r.name}</p>
                    <p className="text-[10px] text-gray-400 font-body">{r.tour}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="gradient-blue rounded-xl p-5 text-white">
              <p className="font-heading text-3xl mb-1" style={{ fontWeight: 900 }}>4.9</p>
              <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Icon key={i} name="Star" size={14} className="text-yellow-400" />)}</div>
              <p className="text-white/80 text-xs font-body leading-relaxed">Средняя оценка по 1 240+ отзывам на Яндекс.Картах, Google и Tripadvisor</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contacts() {
  const { ref, inView } = useInView();
  const [form, setForm] = useState({ name: "", phone: "", dest: "", comment: "" });
  return (
    <section id="contacts" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="text-center mb-10">
          <p className={`section-label mb-2 transition-all duration-500 ${inView ? "opacity-100" : "opacity-0"}`}>Свяжитесь с нами</p>
          <h2 className={`text-3xl md:text-4xl font-heading transition-all duration-500 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ fontWeight: 700 }}>Подберём тур бесплатно</h2>
          <p className={`text-gray-500 font-body text-sm mt-3 transition-all duration-500 delay-200 ${inView ? "opacity-100" : "opacity-0"}`}>Оставьте заявку — менеджер перезвонит в течение 15 минут</p>
        </div>
        <div className={`grid grid-cols-1 lg:grid-cols-5 gap-8 transition-all duration-500 delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="lg:col-span-3 bg-[#f5f7fa] rounded-2xl p-8">
            <h3 className="font-heading text-[#0d47a1] text-lg mb-5" style={{ fontWeight: 700 }}>Заявка на подбор тура</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-heading text-gray-600 mb-1.5 block" style={{ fontWeight: 600 }}>Ваше имя *</label>
                <input type="text" placeholder="Иван Иванов" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#1565c0] focus:ring-2 focus:ring-[#1565c0]/15 transition-all font-body" />
              </div>
              <div>
                <label className="text-xs font-heading text-gray-600 mb-1.5 block" style={{ fontWeight: 600 }}>Телефон *</label>
                <input type="tel" placeholder="+7 (___) ___-__-__" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#1565c0] focus:ring-2 focus:ring-[#1565c0]/15 transition-all font-body" />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-xs font-heading text-gray-600 mb-1.5 block" style={{ fontWeight: 600 }}>Направление / страна</label>
              <input type="text" placeholder="Например: Турция, Египет, Таиланд..." value={form.dest} onChange={(e) => setForm({ ...form, dest: e.target.value })} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#1565c0] focus:ring-2 focus:ring-[#1565c0]/15 transition-all font-body" />
            </div>
            <div className="mb-5">
              <label className="text-xs font-heading text-gray-600 mb-1.5 block" style={{ fontWeight: 600 }}>Комментарий (даты, бюджет, пожелания)</label>
              <textarea placeholder="Расскажите подробнее о желаемом туре..." value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} rows={3} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#1565c0] focus:ring-2 focus:ring-[#1565c0]/15 transition-all resize-none font-body" />
            </div>
            <button className="btn-orange w-full py-3.5 text-sm font-heading rounded-lg gap-2" style={{ fontWeight: 700 }}>
              <Icon name="Send" size={15} />
              Получить консультацию бесплатно
            </button>
            <p className="text-[11px] text-gray-400 text-center mt-3 font-body">Нажимая кнопку, вы соглашаетесь с <a href="#" className="underline">политикой конфиденциальности</a></p>
          </div>
          <div className="lg:col-span-2 flex flex-col gap-4">
            {[
              { icon: "Phone", label: "Телефон (бесплатно)", value: "8 800 123-45-67", sub: "Звонок по России бесплатный" },
              { icon: "MessageCircle", label: "WhatsApp / Telegram", value: "+7 (495) 123-45-67", sub: "Отвечаем 24/7" },
              { icon: "Mail", label: "Email", value: "info@solnechnyput.ru", sub: "Ответим в течение часа" },
              { icon: "MapPin", label: "Офис", value: "Москва, ул. Тверская, 15", sub: "Пн–Вс: 9:00–21:00" },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-4 p-4 bg-[#f5f7fa] rounded-xl hover:bg-[#e8edf5] transition-colors">
                <div className="w-10 h-10 gradient-blue rounded-lg flex items-center justify-center shrink-0"><Icon name={c.icon as "Phone"} size={18} className="text-white" /></div>
                <div>
                  <p className="text-[11px] text-gray-400 font-body mb-0.5">{c.label}</p>
                  <p className="font-heading text-[#0d47a1] text-sm" style={{ fontWeight: 700 }}>{c.value}</p>
                  <p className="text-[11px] text-gray-400 font-body">{c.sub}</p>
                </div>
              </div>
            ))}
            <div className="gradient-blue rounded-xl p-4 text-white">
              <p className="font-heading text-sm mb-2" style={{ fontWeight: 700 }}>🎁 Специальное предложение</p>
              <p className="text-white/80 text-xs font-body leading-relaxed">Закажите тур сегодня и получите <strong className="text-yellow-300">кэшбек 5%</strong> + бесплатную страховку путешественника</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0d47a1] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-white/15 rounded-lg flex items-center justify-center"><span className="text-lg">✈️</span></div>
              <div>
                <p className="font-heading text-white text-base" style={{ fontWeight: 800 }}>Солнечный Путь</p>
                <p className="text-white/50 text-[10px] font-body">Турагентство · Официальный сайт</p>
              </div>
            </div>
            <p className="text-white/60 text-sm font-body leading-relaxed max-w-xs mb-4">Поиск и бронирование туров онлайн. Туры по России и за рубежом с кэшбеком 5%. Рассрочка, горящие туры, визовая поддержка.</p>
            <div className="flex gap-2">
              {["MessageCircle", "Instagram", "Youtube"].map((icon) => (
                <button key={icon} className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"><Icon name={icon as "MessageCircle"} size={15} className="text-white" /></button>
              ))}
            </div>
          </div>
          <div>
            <p className="font-heading text-yellow-300 text-sm mb-4" style={{ fontWeight: 700 }}>Направления</p>
            <ul className="space-y-2 text-sm text-white/60 font-body">
              {["Туры в Турцию", "Туры в Египет", "Туры в Таиланд", "Туры на Мальдивы", "Туры в ОАЭ", "Туры на Бали"].map((item) => (
                <li key={item}><a href="#tours" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-heading text-yellow-300 text-sm mb-4" style={{ fontWeight: 700 }}>Компания</p>
            <ul className="space-y-2 text-sm text-white/60 font-body">
              {["О нас", "Горящие туры", "Отзывы", "Рассрочка 0%", "Визовая помощь", "Контакты"].map((item) => (
                <li key={item}><a href="#about" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/40 font-body">
          <p>© 2025 Солнечный Путь. Все права защищены. ИНН 1234567890</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white/70 transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white/70 transition-colors">Публичная оферта</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

const Index = () => {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const h = () => {
      for (const s of ["home", "tours", "destinations", "about", "reviews", "contacts"]) {
        const el = document.getElementById(s);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 80 && r.bottom >= 80) { setActive(s); break; }
        }
      }
    };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <TopBar />
      <Nav active={active} />
      <main>
        <Hero />
        <PromoStrip />
        <Tours />
        <Advantages />
        <Destinations />
        <About />
        <Reviews />
        <Contacts />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
