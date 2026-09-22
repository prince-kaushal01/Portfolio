import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiGreensock,
  SiFramer,
  SiBootstrap,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiFastapi,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiGithub,
  SiDocker,
  SiLangchain,
  SiN8N,
  SiZapier,
} from "react-icons/si";
import { BrainCircuit, Workflow, Sparkles } from "lucide-react";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SKILL_GROUPS = [
  {
    category: "Frontend",
    color: "#39FF6A",
    skills: [
      { name: "JavaScript", icon: <SiJavascript />, iconColor: "#F7DF1E" },
      { name: "TypeScript", icon: <SiTypescript />, iconColor: "#3178C6" },
      { name: "HTML", icon: <SiHtml5 />, iconColor: "#E34F26" },
      { name: "CSS", icon: <SiCss />, iconColor: "#1572B6" },
      { name: "React", icon: <SiReact />, iconColor: "#61DAFB" },
      { name: "Next.js", icon: <SiNextdotjs />, iconColor: "#F0F0F0" },
      { name: "Redux", icon: <SiRedux />, iconColor: "#764ABC" },
      { name: "Tailwind CSS", icon: <SiTailwindcss />, iconColor: "#06B6D4" },
      { name: "GSAP", icon: <SiGreensock />, iconColor: "#88CE02" },
      { name: "Framer Motion", icon: <SiFramer />, iconColor: "#F24E1E" },
      { name: "Bootstrap", icon: <SiBootstrap />, iconColor: "#7952B3" },
    ],
  },
  {
    category: "Backend",
    color: "#39FF6A",
    skills: [
      { name: "Node.js", icon: <SiNodedotjs />, iconColor: "#339933" },
      { name: "Express.js", icon: <SiExpress />, iconColor: "#F0F0F0" },
      { name: "Python", icon: <SiPython />, iconColor: "#3776AB" },
      { name: "FastAPI", icon: <SiFastapi />, iconColor: "#009688" },
    ],
  },
  {
    category: "Database",
    color: "#39FF6A",
    skills: [
      { name: "MySQL", icon: <SiMysql />, iconColor: "#4479A1" },
      { name: "PostgreSQL", icon: <SiPostgresql />, iconColor: "#4169E1" },
      { name: "MongoDB", icon: <SiMongodb />, iconColor: "#47A248" },
    ],
  },
  {
    category: "AI & Automation",
    color: "#39FF6A",
    skills: [
      { name: "OpenAI API", icon: <BrainCircuit />, iconColor: "#F0F0F0" },
      { name: "AI Agents", icon: <BrainCircuit />, iconColor: "#FFB000" },
      { name: "n8n", icon: <SiN8N />, iconColor: "#EA4B71" },
      { name: "RAG Chatbots", icon: <Workflow />, iconColor: "#00BFA6" },
      { name: "LangChain", icon: <SiLangchain />, iconColor: "#1C3C3C" },
      { name: "LangGraph", icon: <Sparkles />, iconColor: "#8B5CF6" },
      { name: "Zapier", icon: <SiZapier />, iconColor: "#FF4A00" },
      { name: "Make", icon: <Workflow />, iconColor: "#6D28D9" },
    ],
  },
  {
    category: "Tools",
    color: "#39FF6A",
    skills: [
      { name: "Git", icon: <SiGit />, iconColor: "#F05032" },
      { name: "GitHub", icon: <SiGithub />, iconColor: "#F0F0F0" },
      { name: "Docker", icon: <SiDocker />, iconColor: "#2496ED" },
    ],
  },
];

export default function Skills({ size = '1.2em', color = '#F0F4FF' }) {
  const asteriskRef = useRef(null);
  const headerRef = useRef(null);
  const groupRefs = useRef([]);

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

      // "My Stack" header entrance
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

      // Each skill group: heading + chips animate together
      groupRefs.current.forEach((el) => {
        if (!el) return;

        const heading = el.querySelector(".group-heading");
        const chips = el.querySelectorAll(".skill-chip");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 84%",
            toggleActions: "play none none none",
          },
        });

        // Heading slides up
        tl.from(heading, {
          opacity: 0,
          y: 50,
          duration: 0.75,
          ease: "power3.out",
        });

        // Chips stagger in slightly behind
        tl.from(
          chips,
          {
            opacity: 0,
            y: 24,
            duration: 0.55,
            ease: "power2.out",
            stagger: 0.055,
          },
          "-=0.45"
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      className="relative border-t border-white/[0.04]"
      style={{
        paddingLeft: 'clamp(1.5rem, 12vw, 260px)',
        paddingRight: 'clamp(1.5rem, 6vw, 140px)',
        paddingTop: 'clamp(5rem, 10vw, 8rem)',
        paddingBottom: 'clamp(5rem, 10vw, 8rem)',
      }}
    >
      {/* Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bg-[radial-gradient(circle,rgba(57,255,106,0.04)_0%,transparent_65%)]"
        style={{
          right: '-10%',
          top: '20%',
          height: '50vw',
          width: '50vw',
          maxWidth: '700px',
        }}
      />

      {/* Section header */}
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
          My Stack
        </p>
      </div>

      <div className="flex flex-col" style={{ gap: 'clamp(4rem, 8vw, 7rem)' }}>
        {SKILL_GROUPS.map((group, i) => (
          <div
            key={group.category}
            ref={(el) => (groupRefs.current[i] = el)}
            className="grid grid-cols-1 items-start md:grid-cols-[minmax(180px,0.7fr)_minmax(0,1.5fr)]"
            style={{ gap: 'clamp(2rem, 7vw, 7rem)' }}
          >
            <h3
              className="group-heading m-0 font-[Archivo,sans-serif] font-black uppercase leading-[0.95] tracking-[-0.04em] text-[#b8b8b8]"
              style={{ fontSize: 'clamp(1.4rem, 2.4vw, 2.25rem)' }}
            >
              {group.category}
            </h3>
            <div className="grid w-full grid-cols-3 gap-x-10 gap-y-8">
              {group.skills.map((skill) => (
                <SkillChip key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SkillChip({ skill }) {
  return (
    <div
      className="skill-chip flex min-h-10 cursor-default items-center gap-3 font-normal text-[#b8b8b8]"
      style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.25rem)' }}
    >
      <span
        className="flex text-[1.6em] text-[var(--skill-color)]"
        style={{ '--skill-color': skill.iconColor }}
      >
        {skill.icon}
      </span>
      {skill.name}
    </div>
  );
}
