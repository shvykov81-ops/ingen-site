import { useState, useEffect, useCallback } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { label: 'Услуги', href: '#services' },
  { label: 'Пакеты решений', href: '#packages' },
  { label: 'Проекты', href: '#projects' },
  { label: 'Как работаем', href: '#process' },
  { label: 'О компании', href: '#about' },
  { label: 'Контакты', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = useCallback((href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-deep-navy/85 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <div className="container-ingen">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 shrink-0">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#2674FB" />
              <path d="M8 24V14L16 8L24 14V24H18V18H14V24H8Z" fill="white" />
              <rect x="12" y="11" width="8" height="5" rx="1" fill="#1B202A" opacity="0.3" />
            </svg>
            <div className="flex flex-col">
              <span className="text-white font-semibold text-[15px] leading-tight tracking-tight">
                INGEN SYSTEMS
              </span>
              <span className="text-white/50 text-[10px] leading-tight tracking-wider uppercase">
                Инженерные системы квартир
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-white/80 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-white/5"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex flex-col items-end">
              <a href="tel:+79101234567" className="text-white font-medium text-sm flex items-center gap-1.5 hover:text-electric-blue transition-colors">
                <Phone size={14} />
                +7 (910) 123-45-67
              </a>
              <span className="text-white/40 text-[11px]">Ежедневно с 9:00 до 21:00</span>
            </div>
            <button
              onClick={() => scrollTo('#contact')}
              className="btn-primary text-sm py-3 px-5"
            >
              Рассчитать стоимость
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-deep-navy/95 backdrop-blur-xl border-t border-white/[0.06]">
          <div className="container-ingen py-4">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-white/80 hover:text-white px-4 py-3 text-base font-medium transition-colors duration-200 rounded-lg hover:bg-white/5 text-left"
                >
                  {link.label}
                </button>
              ))}
            </nav>
            <div className="mt-4 pt-4 border-t border-white/[0.06]">
              <a href="tel:+79101234567" className="text-white font-medium flex items-center gap-2 mb-3">
                <Phone size={16} />
                +7 (910) 123-45-67
              </a>
              <button
                onClick={() => scrollTo('#contact')}
                className="btn-primary w-full"
              >
                Рассчитать стоимость
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
