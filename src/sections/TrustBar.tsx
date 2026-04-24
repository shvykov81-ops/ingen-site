import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4" />
        <path d="M8 2v4" />
        <path d="M3 10h18" />
      </svg>
    ),
    value: '5+ лет',
    label: 'опыта работы',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    value: '300+',
    label: 'объектов выполнено',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 12 15 16 10" />
      </svg>
    ),
    value: 'Гарантия',
    label: 'до 3 лет',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    value: 'Работаем',
    label: 'по договору',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 17H2a3 3 0 013-3h14a3 3 0 013 3z" />
        <path d="M4 14V7a3 3 0 013-3h10a3 3 0 013 3v7" />
        <line x1="12" y1="2" x2="12" y2="4" />
      </svg>
    ),
    value: 'Поддержка',
    label: 'после сдачи объекта',
  },
];

export default function TrustBar() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const items = sectionRef.current.querySelectorAll('.trust-item');
    const tweens: gsap.core.Tween[] = [];

    items.forEach((item, i) => {
      const t = gsap.fromTo(
        item,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          delay: i * 0.08,
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
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
    <section ref={sectionRef} className="bg-white py-8 lg:py-10 border-y border-gray-100">
      <div className="container-ingen">
        <div className="flex flex-wrap justify-center lg:justify-between gap-8 lg:gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="trust-item flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-light-gray flex items-center justify-center text-deep-navy/60">
                {stat.icon}
              </div>
              <div>
                <p className="text-deep-navy font-semibold text-sm leading-tight">{stat.value}</p>
                <p className="text-body-text/50 text-xs">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
