import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: 1, image: '/images/hero-1.jpg', title: 'Гостиная с умным освещением' },
  { id: 2, image: '/images/hero-2.jpg', title: 'Электрощит организованный' },
  { id: 3, image: '/images/hero-3.jpg', title: 'Многоуровневое освещение' },
  { id: 4, image: '/images/hero-6.jpg', title: 'Панель управления умным домом' },
  { id: 5, image: '/images/hero-4.jpg', title: 'Сетевое оборудование' },
  { id: 6, image: '/images/case-1.jpg', title: 'Комплексная электрика' },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const header = sectionRef.current.querySelector('.projects-header');
    const tweens: gsap.core.Tween[] = [];

    if (header) {
      const t = gsap.fromTo(
        header,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
      tweens.push(t);
    }

    return () => {
      tweens.forEach(t => {
        t.kill();
        if (t.scrollTrigger) t.scrollTrigger.kill();
      });
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = direction === 'left' ? -320 : 320;
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section id="projects" ref={sectionRef} className="bg-white py-20 lg:py-28">
      <div className="container-ingen">
        {/* Header */}
        <div className="projects-header flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
          <h2 className="text-[28px] sm:text-[34px] font-semibold text-deep-navy leading-tight tracking-[-0.8px]">
            Примеры проектов
          </h2>
          <button className="text-electric-blue font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all shrink-0">
            Смотреть все проекты
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Horizontal scroll gallery */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 px-4 lg:px-[calc((100vw-1280px)/2+24px)] scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="snap-start shrink-0 w-[280px] sm:w-[320px] cursor-pointer group"
              onClick={() => setSelectedProject(project.id)}
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Scroll buttons */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-deep-navy hover:bg-light-gray transition-colors z-10"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-deep-navy hover:bg-light-gray transition-colors z-10"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Lightbox */}
      {selectedProject !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <button className="absolute top-4 right-4 text-white/70 hover:text-white p-2" onClick={() => setSelectedProject(null)}>
            <X size={32} />
          </button>
          <img
            src={projects.find(p => p.id === selectedProject)?.image}
            alt=""
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
