import { useState } from "react";
import Icon from "@/components/ui/icon";
import { useInView } from "@/hooks/useInView";

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

export default function ToursSection() {
  return (
    <>
      <Tours />
      <Advantages />
      <Destinations />
      <About />
    </>
  );
}
