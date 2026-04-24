import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const packages = [
  {
    id: 'base',
    name: 'БАЗА',
    title: 'Базовое инженерное решение',
    description: 'Подходит для тех, кто хочет сделать надежную основу без излишних систем.',
    price: 'от 320 000 ₽',
    image: '/images/package-base.jpg',
    features: ['Электрика под ключ', 'Электрощит', 'Базовый интернет'],
    accentColor: 'text-deep-navy/60',
    checkColor: 'bg-electric-blue/10',
    checkIconColor: 'text-electric-blue',
    borderColor: 'border-gray-200',
    badge: false,
  },
  {
    id: 'comfort',
    name: 'КОМФОРТ',
    title: 'Оптимальное решение для жизни',
    description: 'Самый популярный вариант — баланс цены и удобства.',
    price: 'от 520 000 ₽',
    image: '/images/package-comfort.jpg',
    features: [
      'Электрика под ключ',
      'Стабильный Wi-Fi по всей квартире',
      'Подготовка под видеонаблюдение',
      'Продуманное освещение',
      'Базовая слаботочка',
    ],
    accentColor: 'text-electric-blue',
    checkColor: 'bg-electric-blue/10',
    checkIconColor: 'text-electric-blue',
    borderColor: 'border-electric-blue/30',
    badge: true,
  },
  {
    id: 'smart',
    name: 'УМНЫЙ ДОМ',
    title: 'Максимальный комфорт и автоматизация',
    description: 'Для тех, кто хочет управлять квартирой с телефона и получить современное пространство.',
    price: 'от 850 000 ₽',
    image: '/images/package-smart.jpg',
    features: [
      'Всё из пакета «Комфорт»',
      'Управление светом',
      'Сценарии (утро, ночь, выход)',
      'Безопасность',
      'Расширяемая система',
    ],
    accentColor: 'text-purple-600',
    checkColor: 'bg-purple-600/10',
    checkIconColor: 'text-purple-600',
    borderColor: 'border-gray-200',
    badge: false,
  },
];

export default function Packages() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll('.package-card');
    const tweens: gsap.core.Tween[] = [];

    cards.forEach((card, i) => {
      const t = gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: i * 0.12,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
      tweens.push(t);
    });

    return () => {
      tweens.forEach(t => {
        t.kill();
        if (t.scrollTrigger) t.scrollTrigger.kill();
      });
    };
  }, []);

  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="packages" ref={sectionRef} className="bg-light-gray py-20 lg:py-28">
      <div className="container-ingen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10">
          <h2 className="text-[28px] sm:text-[34px] font-semibold text-deep-navy leading-tight tracking-[-0.8px]">
            Пакеты решений
          </h2>
          <button className="text-electric-blue font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all shrink-0">
            Сравнить все пакеты
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`package-card relative bg-white rounded-2xl overflow-hidden border ${pkg.borderColor} hover:shadow-card-hover transition-all duration-300`}
            >
              {/* Recommended badge */}
              {pkg.badge && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-electric-blue text-white text-[11px] font-medium px-3 py-1.5 rounded-md">
                    Рекомендуем
                  </span>
                </div>
              )}

              <div className="flex flex-col h-full">
                {/* Content */}
                <div className="p-5 pb-0 flex-1">
                  <span className={`text-xs font-bold tracking-wider ${pkg.accentColor}`}>
                    {pkg.name}
                  </span>
                  <h3 className="text-base font-semibold text-deep-navy mt-1.5 leading-snug">
                    {pkg.title}
                  </h3>
                  <p className="text-body-text/50 text-[13px] mt-2 leading-relaxed">
                    {pkg.description}
                  </p>

                  {/* Features */}
                  <ul className="mt-4 space-y-2">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full ${pkg.checkColor} flex items-center justify-center shrink-0`}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={pkg.checkIconColor}>
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span className="text-body-text text-[13px]">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom: price + image + button */}
                <div className="p-5 pt-4 mt-auto">
                  <div className="flex items-end justify-between gap-3 mb-4">
                    <p className="text-xl font-bold text-deep-navy">{pkg.price}</p>
                    <div className="w-20 h-24 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <button
                    onClick={scrollToContact}
                    className={`w-full py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      pkg.badge
                        ? 'bg-electric-blue text-white hover:bg-soft-blue'
                        : 'border border-gray-300 text-deep-navy hover:border-electric-blue hover:text-electric-blue'
                    }`}
                  >
                    Подробнее
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
