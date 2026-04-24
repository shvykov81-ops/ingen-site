import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const elements = ref.current.querySelectorAll('[data-animate]');
    
    const animations: gsap.core.Tween[] = [];
    const triggers: ScrollTrigger[] = [];

    elements.forEach((el) => {
      const delay = parseFloat(el.getAttribute('data-delay') || '0');
      const stagger = el.getAttribute('data-stagger') === 'true';
      
      const childElements = stagger ? el.children : [el];
      
      Array.from(childElements).forEach((child, childIndex) => {
        const tween = gsap.fromTo(
          child,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: delay + (stagger ? childIndex * 0.1 : 0),
            scrollTrigger: {
              trigger: child,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
        animations.push(tween);
        if (tween.scrollTrigger) {
          triggers.push(tween.scrollTrigger);
        }
      });
    });

    return () => {
      animations.forEach(a => a.kill());
      triggers.forEach(t => t.kill());
    };
  }, []);

  return ref;
}

export function useFadeUp(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const tween = gsap.fromTo(
      ref.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      tween.kill();
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
    };
  }, [delay]);

  return ref;
}
