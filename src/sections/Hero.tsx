import { useRef, useState, useCallback } from 'react';

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const scrollTo = useCallback((href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative min-h-screen bg-deep-navy overflow-hidden flex items-center"
    >
      {/* Dark background base */}
      <div className="absolute inset-0 bg-deep-navy" />

      {/* Right side interior image */}
      <div className="absolute top-0 right-0 w-[55%] h-full hidden lg:block">
        <img
          src="/images/hero-main.jpg"
          alt="Modern smart apartment interior"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.7)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, #1B202A 0%, #1B202A 15%, transparent 45%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, #1B202A 0%, transparent 30%)',
          }}
        />
      </div>

      {/* Glass lens cursor effect */}
      {isHovering && (
        <div
          className="glass-lens hidden md:block"
          style={{ left: mousePos.x, top: mousePos.y }}
        />
      )}

      {/* Content */}
      <div className="container-ingen relative z-10 pt-[100px] pb-16 w-full">
        <div className="max-w-[580px]">
          <h1 className="text-[38px] sm:text-[48px] lg:text-[56px] font-bold text-white leading-[1.05] tracking-[-1.68px] mb-4">
            Инженерные системы
            <br />
            квартиры под ключ
          </h1>
          <p className="text-xl text-white/70 font-medium mb-4">
            Электрика, слаботочка, умный дом
          </p>
          <p className="text-base text-white/50 leading-relaxed mb-8 max-w-[460px]">
            Проектируем и реализуем системы, которые делают квартиру удобной, безопасной и технологичной — без переделок и лишних затрат
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <button onClick={() => scrollTo('#contact')} className="btn-primary">
              Получить 3 варианта решения
            </button>
            <a
              href="https://wa.me/79101234567"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Написать в WhatsApp
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-white/[0.08] flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-electric-blue">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <div>
                <p className="text-white text-sm font-medium leading-tight">Работаем</p>
                <p className="text-white/40 text-xs">по договору</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-white/[0.08] flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-electric-blue">
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <line x1="8" y1="6" x2="16" y2="6" />
                  <line x1="8" y1="10" x2="16" y2="10" />
                  <line x1="8" y1="14" x2="12" y2="14" />
                </svg>
              </div>
              <div>
                <p className="text-white text-sm font-medium leading-tight">Фиксированная</p>
                <p className="text-white/40 text-xs">смета</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-white/[0.08] flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-electric-blue">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <p className="text-white text-sm font-medium leading-tight">Гарантия</p>
                <p className="text-white/40 text-xs">до 3 лет</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
