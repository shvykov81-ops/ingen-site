import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LeadCapture() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', area: '' });
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const elements = sectionRef.current.querySelectorAll('[data-anim]');
    const tweens: gsap.core.Tween[] = [];

    elements.forEach((el, i) => {
      const t = gsap.fromTo(
        el,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          delay: i * 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', phone: '', area: '' });
    setAgreed(false);
  };

  return (
    <section id="contact" ref={sectionRef} className="bg-deep-navy py-20 lg:py-24">
      <div className="container-ingen">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">
          {/* Left */}
          <div data-anim>
            <h2 className="text-[26px] sm:text-[32px] font-semibold text-white leading-tight tracking-[-0.6px] mb-4">
              Получите 3 варианта решения вашей квартиры
            </h2>
            <p className="text-white/50 text-sm leading-relaxed">
              Мы подготовим для вас базовый вариант, комфортное решение и систему с умным домом.
            </p>
          </div>

          {/* Right — Form */}
          <div data-anim>
            {submitted ? (
              <div className="bg-electric-blue/10 border border-electric-blue/20 rounded-xl p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-electric-blue/20 flex items-center justify-center mx-auto mb-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2674FB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-white text-lg font-semibold mb-1">Заявка отправлена!</h3>
                <p className="text-white/50 text-sm">Мы свяжемся с вами в ближайшее время</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-3">
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-navy border border-white/[0.08] text-white placeholder:text-white/30 rounded-lg px-4 py-3.5 text-sm focus:outline-none focus:border-electric-blue/50 transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Телефон"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-navy border border-white/[0.08] text-white placeholder:text-white/30 rounded-lg px-4 py-3.5 text-sm focus:outline-none focus:border-electric-blue/50 transition-colors"
                  />
                  <input
                    type="number"
                    placeholder="Площадь квартиры, м²"
                    min="1"
                    required
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="bg-navy border border-white/[0.08] text-white placeholder:text-white/30 rounded-lg px-4 py-3.5 text-sm focus:outline-none focus:border-electric-blue/50 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!agreed}
                    className="btn-primary py-3.5 disabled:opacity-40 disabled:cursor-not-allowed text-sm"
                  >
                    Получить расчет
                  </button>
                </div>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 text-electric-blue focus:ring-0"
                  />
                  <span className="text-white/35 text-[11px] leading-relaxed">
                    Нажимая кнопку, вы соглашаетесь с{' '}
                    <a href="#" className="text-white/50 hover:text-white transition-colors underline">
                      политикой конфиденциальности
                    </a>
                  </span>
                </label>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
