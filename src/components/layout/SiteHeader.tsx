import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

function TopBar() {
  return (
    <div className="hidden md:block gradient-blue text-white text-xs py-2">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <Icon name="Phone" size={12} />
            <a href="tel:+78005008020" className="hover:text-yellow-300 transition-colors">8 800 500-80-20</a>
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
            <p className="font-heading text-[#0d47a1] text-base leading-tight" style={{ fontWeight: 800 }}>ТУР КЛУБ</p>
            <p className="text-[10px] text-gray-400 leading-tight font-body">Официальный сайт</p>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`px-4 py-2 rounded font-heading text-sm transition-all ${active === l.href.slice(1) ? "text-[#1565c0] bg-blue-50" : "text-gray-700 hover:text-[#1565c0] hover:bg-blue-50"}`}
              style={{ fontWeight: 600 }}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+78005008020" className="flex items-center gap-1.5 text-[#1565c0] font-heading text-sm hover:text-[#0d47a1] transition-colors" style={{ fontWeight: 700 }}>
            <Icon name="Phone" size={15} />
            8 800 500-80-20
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
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-gray-800 font-heading text-sm py-2 border-b border-gray-100"
              style={{ fontWeight: 600 }}
            >
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

export default function SiteHeader({ active }: { active: string }) {
  return (
    <>
      <TopBar />
      <Nav active={active} />
    </>
  );
}
