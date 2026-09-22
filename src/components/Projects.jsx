import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { PROJECTS } from "../data/projects.js";

gsap.registerPlugin(ScrollTrigger);

export default function Projects({ size = '1.4em', color = '#F0F4FF' }) {
  const [hoveredId, setHoveredId] = useState(null);
  const asteriskRef = useRef(null);
  const headerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Spinning asterisk
      gsap.to(asteriskRef.current, {
        rotate: 360,
        duration: 8,
        ease: "none",
        repeat: -1,
        transformOrigin: "center center",
      });

      // "Selected Projects" header entrance
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 36,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      className="border-t border-white/[0.09]"
      style={{
        paddingLeft: 'clamp(1.5rem, 12vw, 260px)',
        paddingRight: 'clamp(1.5rem, 6vw, 140px)',
        paddingTop: 'clamp(5rem, 10vw, 8rem)',
        paddingBottom: 'clamp(5rem, 10vw, 8rem)',
      }}
    >
      <div ref={headerRef} style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
        <p
          className="m-0 flex items-center font-[Archivo,sans-serif] font-medium uppercase tracking-[0.02em] text-[#F0F4FF]"
          style={{ fontSize: 'clamp(1.3rem, 2vw, 1.65rem)', gap: '0.5rem' }}
        >
          <span
            ref={asteriskRef}
            style={{ display: 'inline-flex', width: size, height: size, willChange: 'transform' }}
          >
            <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none">
              {[0, 60, 120].map((angle) => (
                <line
                  key={angle}
                  x1="12"
                  y1="4"
                  x2="12"
                  y2="20"
                  stroke={color}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  transform={`rotate(${angle} 12 12)`}
                />
              ))}
            </svg>
          </span>
          Selected Projects
        </p>
      </div>

      <div className="flex flex-col" style={{ gap: 'clamp(1.5rem, 3vw, 3rem)' }}>
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            isHovered={hoveredId === project.id}
            isDimmed={hoveredId !== null && hoveredId !== project.id}
            onHoverStart={() => setHoveredId(project.id)}
            onHoverEnd={() => setHoveredId(null)}
            onClick={() => navigate(`/project/${project.id}`)}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index, isHovered, isDimmed, onHoverStart, onHoverEnd, onClick }) {
  const indexLabel = `0${index + 1}`;

  const rowRef = useRef(null);
  const titleRef = useRef(null);
  const iconRef = useRef(null);
  const imageWrapRef = useRef(null);
  const hasEntered = useRef(false);
  const isFirstRender = useRef(true);

  // Scroll-triggered entrance animation
  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, y: 55 });

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => {
        hasEntered.current = true;
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          delay: index * 0.07,
        });
      },
    });

    return () => st.kill();
  }, [index]);

  // Hover animation (dim / highlight / image reveal)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(rowRef.current, {
        opacity: isDimmed ? 0.35 : 1,
        duration: 0.4,
        ease: "power2.out",
      });

      if (isHovered) {
        gsap.set(rowRef.current, { zIndex: 5 });
        gsap.to(titleRef.current, { color: "#39FF6A", duration: 0.55, ease: "power2.out" });
        gsap.to(iconRef.current, {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 0.35,
          ease: "power2.out",
          delay: 0.08,
        });
        gsap.to(imageWrapRef.current, {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
        });
      } else {
        gsap.to(titleRef.current, { color: "#F0F4FF", duration: 0.45, ease: "power2.out" });
        gsap.to(iconRef.current, {
          opacity: 0,
          scale: 0.6,
          x: -4,
          duration: 0.3,
          ease: "power2.in",
        });
        gsap.to(imageWrapRef.current, {
          opacity: 0,
          x: 20,
          scale: 0.96,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => gsap.set(rowRef.current, { zIndex: 1 }),
        });
      }
    });

    return () => ctx.revert();
  }, [isHovered, isDimmed]);

  return (
    <div
      ref={rowRef}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={onClick}
      className="project-card relative grid min-h-[clamp(6rem,10vw,8rem)] grid-cols-[42px_minmax(0,1fr)] cursor-pointer items-center gap-4 border-b border-white/10 py-3 text-[#F0F4FF]"
      style={{ zIndex: 1 }}
    >
      <div className="self-start pt-[0.7rem] font-[Archivo,sans-serif] text-[0.9rem] font-bold tracking-[0.1em] text-[#8892A4]">
        {indexLabel}
      </div>

      <div>
        <div className="flex items-center gap-5">
          <h3
            ref={titleRef}
            className="mb-0 font-[Archivo,sans-serif] text-[clamp(2rem,4.2vw,4.25rem)] font-black leading-[1.5] tracking-[-0.045em]"
            style={{ color: "#F0F4FF" }}
          >
            {project.name}
          </h3>

          <span
            ref={iconRef}
            className="inline-flex"
            style={{ opacity: 0, transform: "scale(0.6) translateX(-4px)", color: "#39FF6A" }}
          >
            <ExternalLink size={28} strokeWidth={1.5} />
          </span>
        </div>
        <div className="mt-5 flex flex-wrap gap-[0.65rem]">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-[0.72rem] font-medium tracking-[0.02em] text-[#8892A4]"
            >
              {tech}{" "}
              <span className="ml-[0.35rem] text-[#4B5563]">•</span>
            </span>
          ))}
        </div>
      </div>

      <div
        ref={imageWrapRef}
        className="pointer-events-none absolute right-[8%] top-1/2 aspect-[3/4] w-[min(26vw,330px)] -translate-y-1/2 shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
        style={{ opacity: 0, transform: "translateX(20px) scale(0.96)", zIndex: -1 }}
      >
        <img
          src={project.preview}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
