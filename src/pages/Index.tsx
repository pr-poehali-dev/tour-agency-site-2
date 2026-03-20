import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/7b480736-4152-4cd2-a62e-b8d467c0aded/files/a8ec88f6-3e2d-4be4-85ff-39cd6301562a.jpg";

const tours = [
  {
    id: 1,
    country: "Мальдивы",
    city: "Атолл Ари",
    duration: "10 ночей",
    price: "189 000",
    rating: 4.9,
    reviews: 128,
    tag: "Хит продаж",
    tagColor: "#f43f5e",
    emoji: "🏝️",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=80",
    description: "Кристальная вода, белый песок и бунгало над океаном",
    category: "острова",
  },
  {
    id: 2,
    country: "Таиланд",
    city: "Пхукет — Краби",
    duration: "14 ночей",
    price: "124 000",
    rating: 4.8,
    reviews: 214,
    tag: "Популярное",
    tagColor: "#0284c7",
    emoji: "🌺",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80",
    description: "Острова, храмы, уличная еда и ночные рынки",
    category: "азия",
  },
  {
    id: 3,
    country: "Италия",
    city: "Амальфи — Позитано",
    duration: "8 ночей",
    price: "215 000",
    rating: 4.9,
    reviews: 89,
    tag: "Премиум",
    tagColor: "#eab308",
    emoji: "🍋",
    image: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=600&q=80",
    description: "Романтическое побережье, вино и средиземноморская кухня",
    category: "европа",
  },
  {
    id: 4,
    country: "ОАЭ",
    city: "Дубай — Абу-Даби",
    duration: "7 ночей",
    price: "145 000",
    rating: 4.7,
    reviews: 176,
    tag: "Бизнес-класс",
    tagColor: "#8b5cf6",
    emoji: "🌆",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
    description: "Небоскрёбы, пустыня и роскошные отели 7 звёзд",
    category: "азия",
  },
  {
    id: 5,
    country: "Испания",
    city: "Барселона — Тенерифе",
    duration: "12 ночей",
    price: "178 000",
    rating: 4.8,
    reviews: 143,
    tag: "Семейный",
    tagColor: "#10b981",
    emoji: "🌊",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=80",
    description: "Архитектура Гауди, пляжи и вулкан Тейде",
    category: "европа",
  },
  {
    id: 6,
    country: "Бали",
    city: "Убуд — Семиньяк",
    duration: "11 ночей",
    price: "132 000",
    rating: 4.9,
    reviews: 201,
    tag: "Тренд 2025",
    tagColor: "#f97316",
    emoji: "🌿",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
    description: "Рисовые террасы, храмы и серфинг на волнах",
    category: "азия",
  },
];

const categories = ["все", "острова", "азия", "европа"];

const reviews = [
  {
    name: "Анна Соколова",
    city: "Москва",
    text: "Организовали тур на Мальдивы буквально за 3 дня! Всё было идеально — трансфер, отель, экскурсии. Вернёмся снова!",
    rating: 5,
    tour: "Мальдивы",
    avatar: "АС",
  },
  {
    name: "Дмитрий Петров",
    city: "Санкт-Петербург",
    text: "Путешествовали по Таиланду с двумя детьми. Менеджеры подобрали идеальный маршрут, всё прошло без единой проблемы.",
    rating: 5,
    tour: "Таиланд",
    avatar: "ДП",
  },
  {
    name: "Мария Иванова",
    city: "Екатеринбург",
    text: "Медовый месяц в Позитано — мечта! Агентство организовало всё до мелочей, даже столик в ресторане с видом на море.",
    rating: 5,
    tour: "Италия",
    avatar: "МИ",
  },
  {
    name: "Алексей Кузнецов",
    city: "Казань",
    text: "Летали в Дубай на неделю деловой поездки + отдых. Бизнес-класс, отель Burj Al Arab — всё на высшем уровне.",
    rating: 5,
    tour: "ОАЭ",
    avatar: "АК",
  },
];

const stats = [
  { value: "12 лет", label: "на рынке туризма", icon: "Award" },
  { value: "50 000+", label: "счастливых клиентов", icon: "Users" },
  { value: "120+", label: "направлений по миру", icon: "Globe" },
  { value: "98%", label: "клиентов возвращаются", icon: "Heart" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

function Nav({ activeSection }: { activeSection: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { href: "#tours", label: "Туры" },
    { href: "#about", label: "О компании" },
    { href: "#reviews", label: "Отзывы" },
    { href: "#contacts", label: "Контакты" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-dark shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="text-2xl">✈️</span>
          <span className="text-white font-bold text-xl tracking-wide" style={{ fontFamily: "Cormorant Garamond, serif" }}>
            Солнечный Путь
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-white/90 hover:text-white font-medium text-sm tracking-wide transition-all duration-200 hover:scale-105 ${
                activeSection === link.href.slice(1) ? "text-[#facc15]" : ""
              }`}
            >
              {link.label}
            </a>
          ))}
          <a href="#contacts" className="btn-primary text-sm px-6 py-3">
            Подобрать тур
          </a>
        </div>

        <button className="md:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden glass-dark px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-white/90 font-medium py-2 border-b border-white/10"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const [searchData, setSearchData] = useState({ destination: "", dates: "", people: "2" });

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c4a6e]/70 via-[#0284c7]/40 to-[#0c4a6e]/80" />

      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-[#facc15]/10 blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-[#f43f5e]/10 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div
          className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-white/90 text-sm mb-6 animate-fade-up"
          style={{ animationDelay: "0.1s", opacity: 0, animationFillMode: "forwards" }}
        >
          <span className="w-2 h-2 rounded-full bg-[#facc15] animate-pulse" />
          Более 50 000 туристов уже с нами
        </div>

        <h1
          className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 animate-fade-up"
          style={{ fontFamily: "Cormorant Garamond, serif", animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}
        >
          Твоё идеальное
          <br />
          <span className="text-[#facc15]">путешествие</span> начинается
          <br />
          здесь
        </h1>

        <p
          className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto animate-fade-up"
          style={{ animationDelay: "0.35s", opacity: 0, animationFillMode: "forwards" }}
        >
          Подбираем туры мечты под любой бюджет. Визы, авиабилеты, отели — берём всё на себя.
        </p>

        <div
          className="glass rounded-2xl p-2 md:p-3 flex flex-col md:flex-row gap-2 max-w-3xl mx-auto shadow-2xl animate-fade-up"
          style={{ animationDelay: "0.5s", opacity: 0, animationFillMode: "forwards" }}
        >
          <div className="flex-1 flex items-center gap-3 bg-white/20 rounded-xl px-4 py-3">
            <Icon name="MapPin" size={18} className="text-[#facc15] shrink-0" />
            <input
              type="text"
              placeholder="Куда летим? (страна или город)"
              value={searchData.destination}
              onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
              className="bg-transparent text-white placeholder-white/60 outline-none flex-1 text-sm"
            />
          </div>
          <div className="flex items-center gap-3 bg-white/20 rounded-xl px-4 py-3 md:w-44">
            <Icon name="Calendar" size={18} className="text-[#facc15] shrink-0" />
            <input
              type="text"
              placeholder="Когда?"
              value={searchData.dates}
              onChange={(e) => setSearchData({ ...searchData, dates: e.target.value })}
              className="bg-transparent text-white placeholder-white/60 outline-none flex-1 text-sm w-full"
            />
          </div>
          <div className="flex items-center gap-3 bg-white/20 rounded-xl px-4 py-3 md:w-36">
            <Icon name="Users" size={18} className="text-[#facc15] shrink-0" />
            <select
              value={searchData.people}
              onChange={(e) => setSearchData({ ...searchData, people: e.target.value })}
              className="bg-transparent text-white outline-none flex-1 text-sm cursor-pointer"
            >
              <option value="1" className="text-gray-900">1 турист</option>
              <option value="2" className="text-gray-900">2 туриста</option>
              <option value="3" className="text-gray-900">3 туриста</option>
              <option value="4" className="text-gray-900">4+ туриста</option>
            </select>
          </div>
          <button className="btn-primary flex items-center justify-center gap-2 text-sm whitespace-nowrap">
            <Icon name="Search" size={16} />
            Найти тур
          </button>
        </div>

        <div
          className="flex flex-wrap justify-center gap-3 mt-6 animate-fade-up"
          style={{ animationDelay: "0.6s", opacity: 0, animationFillMode: "forwards" }}
        >
          {["🏝️ Мальдивы", "🌺 Таиланд", "🍋 Италия", "🌿 Бали", "🌊 Испания"].map((tag) => (
            <button key={tag} className="glass text-white/90 text-sm px-4 py-1.5 rounded-full hover:bg-white/20 transition-all">
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#tours">
          <Icon name="ChevronDown" size={32} className="text-white/60" />
        </a>
      </div>
    </section>
  );
}

function Tours() {
  const [activeCategory, setActiveCategory] = useState("все");
  const { ref, inView } = useInView();
  const filtered = activeCategory === "все" ? tours : tours.filter((t) => t.category === activeCategory);

  return (
    <section id="tours" className="py-20 bg-[#f0f9ff]">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="text-center mb-12">
          <p className={`text-[#0284c7] font-semibold text-sm uppercase tracking-widest mb-3 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Горящие предложения
          </p>
          <h2
            className={`text-4xl md:text-5xl font-bold text-[#0c4a6e] mb-4 transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            Популярные туры
          </h2>
          <p className={`text-gray-500 max-w-xl mx-auto transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Отобрали лучшие направления по соотношению цены, сервиса и впечатлений
          </p>
        </div>

        <div className={`flex flex-wrap justify-center gap-3 mb-10 transition-all duration-700 delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 capitalize ${
                activeCategory === cat
                  ? "bg-[#0284c7] text-white shadow-lg shadow-[#0284c7]/30"
                  : "bg-white text-gray-600 hover:bg-[#e0f2fe] border border-gray-200"
              }`}
            >
              {cat === "все" ? "Все туры" : cat === "острова" ? "🏝️ Острова" : cat === "азия" ? "🌏 Азия" : "🏛️ Европа"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((tour, i) => (
            <div
              key={tour.id}
              className={`bg-white rounded-2xl overflow-hidden shadow-md card-hover transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${0.1 * i + 0.3}s` }}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.country}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => { (e.target as HTMLImageElement).src = HERO_IMAGE; }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0c4a6e]/85" />
                <span
                  className="absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded-full"
                  style={{ backgroundColor: tour.tagColor }}
                >
                  {tour.tag}
                </span>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-2xl font-bold text-white" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                    {tour.emoji} {tour.country}
                  </p>
                  <p className="text-white/80 text-sm">{tour.city}</p>
                </div>
              </div>

              <div className="p-5">
                <p className="text-gray-500 text-sm mb-4">{tour.description}</p>
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Icon name="Moon" size={14} className="text-[#0284c7]" />
                    {tour.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Star" size={14} className="text-[#facc15]" />
                    {tour.rating} ({tour.reviews})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">от</p>
                    <p className="text-2xl font-bold text-[#0c4a6e]">
                      {tour.price} <span className="text-base font-normal text-gray-400">₽</span>
                    </p>
                  </div>
                  <button className="btn-primary text-sm px-5 py-2.5">
                    Забронировать
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="border-2 border-[#0284c7] text-[#0284c7] font-semibold px-8 py-3 rounded-full hover:bg-[#0284c7] hover:text-white transition-all duration-300">
            Смотреть все 120+ туров
          </button>
        </div>
      </div>
    </section>
  );
}

function About() {
  const { ref, inView } = useInView();

  return (
    <section id="about" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={ref}>
            <p className={`text-[#0284c7] font-semibold text-sm uppercase tracking-widest mb-3 transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              О нас
            </p>
            <h2
              className={`text-4xl md:text-5xl font-bold text-[#0c4a6e] mb-6 leading-tight transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              Делаем мечты<br />
              <span className="bg-gradient-to-r from-[#0ea5e9] via-[#0284c7] to-[#0c4a6e] bg-clip-text text-transparent">
                реальностью
              </span>{" "}
              с 2012 года
            </h2>
            <p className={`text-gray-600 leading-relaxed mb-4 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              Мы — команда опытных путешественников и профессионалов туриндустрии. За 12 лет работы отправили в путешествия более 50 000 человек и точно знаем, что делает поездку незабываемой.
            </p>
            <p className={`text-gray-600 leading-relaxed mb-8 transition-all duration-700 delay-300 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              Мы берём на себя всё: от выбора отеля до оформления визы и страховки. Вам остаётся только наслаждаться поездкой!
            </p>

            <div className={`flex flex-wrap gap-3 mb-8 transition-all duration-700 delay-400 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              {["Авиабилеты", "Визовая поддержка", "Страховка", "Трансфер", "Экскурсии", "Отели"].map((item) => (
                <span key={item} className="flex items-center gap-2 bg-[#f0f9ff] text-[#0284c7] text-sm font-medium px-4 py-2 rounded-full">
                  <Icon name="Check" size={14} />
                  {item}
                </span>
              ))}
            </div>

            <a href="#contacts" className={`btn-primary inline-block transition-all duration-700 delay-500 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              Связаться с нами
            </a>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`bg-gradient-to-br from-[#f0f9ff] to-white border border-[#bae6fd] rounded-2xl p-6 text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${0.15 * i + 0.2}s` }}
              >
                <div className="w-12 h-12 bg-[#0284c7] rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon name={stat.icon as "Award"} size={22} className="text-white" />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-[#0c4a6e] mb-1" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                  {stat.value}
                </p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
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
    <section id="reviews" className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0c4a6e 0%, #0284c7 40%, #0ea5e9 70%, #38bdf8 100%)" }}>
      <div className="absolute top-10 left-20 w-40 h-40 rounded-full bg-white/5 blur-2xl" />
      <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-[#facc15]/10 blur-3xl" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div ref={ref} className="text-center mb-12">
          <p className={`text-[#facc15] font-semibold text-sm uppercase tracking-widest mb-3 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Отзывы
          </p>
          <h2
            className={`text-4xl md:text-5xl font-bold text-white mb-4 transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            Что говорят путешественники
          </h2>
        </div>

        <div className={`bg-white rounded-3xl p-8 md:p-12 shadow-2xl transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Icon key={i} name="Star" size={20} className="text-[#facc15]" />
            ))}
          </div>

          <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 italic" style={{ fontFamily: "Cormorant Garamond, serif" }}>
            "{reviews[active].text}"
          </blockquote>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0284c7] to-[#0c4a6e] flex items-center justify-center text-white font-bold">
              {reviews[active].avatar}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{reviews[active].name}</p>
              <p className="text-sm text-gray-500">{reviews[active].city} · Тур: {reviews[active].tour}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-6">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full transition-all duration-300 ${active === i ? "w-8 h-3 bg-[#facc15]" : "w-3 h-3 bg-white/40 hover:bg-white/60"}`}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {reviews.map((r, i) => (
            <button
              key={r.name}
              onClick={() => setActive(i)}
              className={`text-left p-4 rounded-xl transition-all duration-300 ${active === i ? "bg-white/20 border border-white/40" : "hover:bg-white/10"}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#facc15] to-[#f97316] flex items-center justify-center text-white text-xs font-bold">
                  {r.avatar}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{r.name.split(" ")[0]}</p>
                  <p className="text-white/60 text-xs">{r.tour}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contacts() {
  const { ref, inView } = useInView();
  const [form, setForm] = useState({ name: "", phone: "", comment: "" });

  return (
    <section id="contacts" className="py-20 bg-[#f0f9ff]">
      <div className="max-w-5xl mx-auto px-6">
        <div ref={ref} className="text-center mb-12">
          <p className={`text-[#0284c7] font-semibold text-sm uppercase tracking-widest mb-3 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Контакты
          </p>
          <h2
            className={`text-4xl md:text-5xl font-bold text-[#0c4a6e] mb-4 transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            Подберём тур вместе
          </h2>
          <p className={`text-gray-500 max-w-xl mx-auto transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Оставьте заявку и наш менеджер свяжется с вами в течение 15 минут
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className={`lg:col-span-3 bg-white rounded-3xl p-8 shadow-md transition-all duration-700 delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h3 className="text-xl font-bold text-[#0c4a6e] mb-6">Оставить заявку</h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1.5 block">Ваше имя</label>
                <input
                  type="text"
                  placeholder="Как вас зовут?"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1.5 block">Телефон</label>
                <input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1.5 block">Куда хотите поехать?</label>
                <textarea
                  placeholder="Расскажите о желаемом туре, бюджете, датах..."
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-[#0284c7]/20 transition-all resize-none"
                />
              </div>
              <button className="btn-primary w-full flex items-center justify-center gap-2">
                <Icon name="Send" size={16} />
                Отправить заявку
              </button>
              <p className="text-xs text-gray-400 text-center">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </div>
          </div>

          <div className={`lg:col-span-2 flex flex-col gap-4 transition-all duration-700 delay-400 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {[
              { icon: "Phone", label: "Телефон", value: "+7 (800) 123-45-67", sub: "Бесплатно по России" },
              { icon: "Mail", label: "Email", value: "info@solnechnyput.ru", sub: "Ответим в течение часа" },
              { icon: "MapPin", label: "Офис", value: "Москва, ул. Тверская, 15", sub: "Пн–Вс: 9:00 – 21:00" },
              { icon: "MessageCircle", label: "WhatsApp / Telegram", value: "@solnechnyput", sub: "Онлайн 24/7" },
            ].map((contact) => (
              <div key={contact.label} className="bg-white rounded-2xl p-5 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-11 h-11 bg-[#e0f2fe] rounded-xl flex items-center justify-center shrink-0">
                  <Icon name={contact.icon as "Phone"} size={20} className="text-[#0284c7]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">{contact.label}</p>
                  <p className="font-semibold text-[#0c4a6e] text-sm">{contact.value}</p>
                  <p className="text-xs text-gray-400">{contact.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0c4a6e] text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">✈️</span>
              <span className="text-xl font-bold" style={{ fontFamily: "Cormorant Garamond, serif" }}>
                Солнечный Путь
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Турагентство с 12-летним опытом. Делаем каждое путешествие незабываемым с 2012 года.
            </p>
            <div className="flex gap-3 mt-4">
              {["Instagram", "MessageCircle", "Youtube"].map((icon) => (
                <button key={icon} className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#0284c7] transition-colors">
                  <Icon name={icon as "Instagram"} size={16} className="text-white" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold mb-4 text-[#facc15]">Направления</p>
            <ul className="space-y-2 text-sm text-white/60">
              {["Мальдивы", "Таиланд", "Бали", "Италия", "ОАЭ", "Испания"].map((item) => (
                <li key={item}>
                  <a href="#tours" className="hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-4 text-[#facc15]">Компания</p>
            <ul className="space-y-2 text-sm text-white/60">
              {["О нас", "Отзывы", "Блог", "Вакансии", "Партнёрам", "Контакты"].map((item) => (
                <li key={item}>
                  <a href="#about" className="hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <p>© 2024 Солнечный Путь. Все права защищены.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/70 transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white/70 transition-colors">Оферта</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handler = () => {
      const sections = ["home", "tours", "about", "reviews", "contacts"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom >= 80) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div style={{ fontFamily: "Golos Text, sans-serif" }}>
      <Nav activeSection={activeSection} />
      <Hero />
      <Tours />
      <About />
      <Reviews />
      <Contacts />
      <Footer />
    </div>
  );
};

export default Index;
