import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
    title: 'Заявка или квиз',
    description: 'Оставляете заявку на сайте или проходите квиз',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    title: 'Уточнение задач',
    description: 'Мы связываемся и уточняем ваши потребности',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: 'Выезд на объект',
    description: 'Осматриваем объект и собираем данные',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    title: 'Проект и расчет',
    description: 'Готовим проект и 3 варианта решения',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: 'Согласование',
    description: 'Выбираете оптимальный вариант и утверждаем',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.92 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    title: 'Реализация',
    description: 'Выполняем работы точно в срок',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const items = sectionRef.current.querySelectorAll('.process-step');
    const tweens: gsap.core.Tween[] = [];

    items.forEach((item, i) => {
      const t = gsap.fromTo(
        item,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          delay: i * 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
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
    <section id="process" ref={sectionRef} className="bg-white py-20 lg:py-28">
      <div className="container-ingen">
        <h2 className="text-[28px] sm:text-[34px] font-semibold text-deep-navy leading-tight tracking-[-0.8px] mb-12">
          Как мы работаем
        </h2>

        <div className="relative">
          {/* Dotted connecting line - desktop */}
          <div className="hidden lg:block absolute top-[26px] left-[60px] right-[60px]">
            <div className="border-t-2 border-dashed border-gray-200" />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-4">
            {steps.map((step) => (
              <div key={step.title} className="process-step flex flex-col items-center text-center">
                <div className="relative z-10 w-[52px] h-[52px] rounded-full border-2 border-gray-200 bg-white flex items-center justify-center text-deep-navy/60 mb-4">
                  {step.icon}
                </div>
                <h3 className="text-deep-navy font-medium text-sm mb-1.5">{step.title}</h3>
                <p className="text-body-text/50 text-xs leading-relaxed max-w-[160px]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
