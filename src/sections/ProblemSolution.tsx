import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const problems = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <circle cx="9" cy="12" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="15" cy="12" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
    title: 'Не хватает розеток',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M5 12.55a11 11 0 0114.08 0" />
        <path d="M1.42 9a16 16 0 0121.16 0" />
        <path d="M8.53 16.11a6 6 0 016.95 0" />
        <line x1="12" y1="20" x2="12.01" y2="20" />
      </svg>
    ),
    title: 'Слабый интернет в квартире',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M12 2v7" />
        <path d="M12 7l4-3" />
        <path d="M12 7l-4-3" />
        <circle cx="12" cy="14" r="4" />
      </svg>
    ),
    title: 'Неудобное освещение',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
    title: 'Переделки и лишние расходы',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <line x1="9" y1="12" x2="15" y2="12" />
      </svg>
    ),
    title: 'Безопасность продумывается в последний момент',
  },
];

const solutions = [
  'Электрика и нагрузка',
  'Интернет и Wi-Fi покрытие',
  'Системы безопасности',
  'Сценарии освещения',
  'Умное управление',
  'Возможность расширения',
];

export default function ProblemSolution() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const items = sectionRef.current.querySelectorAll('[data-anim]');
    const tweens: gsap.core.Tween[] = [];

    items.forEach((item, i) => {
      const t = gsap.fromTo(
        item,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          delay: i * 0.08,
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
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

  return (
    <section id="services" ref={sectionRef} className="bg-white py-20 lg:py-28">
      <div className="container-ingen">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left — Problems */}
          <div>
            <h2 className="text-[28px] sm:text-[34px] font-semibold text-deep-navy leading-tight tracking-[-0.8px] mb-2">
              Почему важно продумать
              <br />
              инженерию заранее?
            </h2>
            <div className="w-12 h-1 bg-electric-blue rounded-full mt-4 mb-8" />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
              {problems.map((p) => (
                <div key={p.title} data-anim className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-xl bg-light-gray flex items-center justify-center text-deep-navy/70 mb-3">
                    {p.icon}
                  </div>
                  <p className="text-deep-navy/80 text-xs leading-snug">{p.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Solution */}
          <div>
            <h2 className="text-[28px] sm:text-[34px] font-semibold text-deep-navy leading-tight tracking-[-0.8px] mb-2">
              Наше решение
            </h2>
            <div className="w-12 h-1 bg-electric-blue rounded-full mt-4 mb-5" />
            <p className="text-body-text/60 text-[15px] leading-relaxed mb-8">
              Мы проектируем инженерные системы до начала работ и создаем продуманные решения для комфортной жизни.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {solutions.map((s) => (
                <div key={s} data-anim className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border border-electric-blue/40 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-electric-blue" strokeWidth={2.5} />
                  </div>
                  <span className="text-body-text text-sm">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
