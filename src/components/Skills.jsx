import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
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

export default function Skills({ size = '1.2em', duration = 8, color = '#F0F4FF' }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skill-chip", {
        opacity: 0,
        y: 24,
        scale: 0.9,
        duration: 0.5,
        stagger: 0.04,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 13.7vw, 12rem)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        position: "relative",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "-10%",
          width: "50vw",
          height: "50vw",
          maxWidth: "700px",
          background:
            "radial-gradient(circle, rgba(57,255,106,0.04) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
        <p
          style={{
            fontFamily: "'Archivo', sans-serif",
            fontSize: "clamp(1.3rem, 2vw, 1.65rem)",
            letterSpacing: "0.02em",
            color: "#F0F4FF",
            textTransform: "uppercase",
            margin: 0,
            fontWeight: 500,
          }}
        >
          <span
            style={{
              position: "relative",
              display: "inline-block",
              width: "1.4em",
              height: "1.4em",
              verticalAlign: "middle",
            }}
          >
            <motion.span
              style={{
                display: "inline-flex",
                width: size,
                height: size,
                verticalAlign: "middle",
                willChange: "transform",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration, ease: "linear", repeat: Infinity }}
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
            </motion.span>
          </span>
          &nbsp; My Stack
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(4rem, 8vw, 7rem)",
        }}
      >
        {SKILL_GROUPS.map((group) => (
          <div
            key={group.category}
            className="grid grid-cols-1 items-start gap-8 md:grid-cols-[minmax(180px,0.7fr)_minmax(0,1.5fr)] md:gap-[clamp(2rem,7vw,7rem)]"
          >
            <h3
              style={{
                fontFamily: "'Archivo', sans-serif",
                fontSize: "clamp(2rem, 3.4vw, 3.25rem)",
                fontWeight: 900,
                color: "#b8b8b8",
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
                margin: 0,
                lineHeight: 0.95,
              }}
            >
              {group.category}
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "2rem 2.5rem",
              }}
              className="w-[100%]"
            >
              {group.skills.map((skill) => (
                <SkillChip key={skill.name} skill={skill} color={group.color} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SkillChip({ skill, color }) {
  return (
    <motion.div
      className="skill-chip"
      whileHover={{
        scale: 1.07,
        borderColor: color,
        boxShadow: `0 0 14px ${color}33`,
        color: color,
      }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.8rem",
        minHeight: "2.5rem",
        fontSize: "clamp(1.15rem, 1.6vw, 1.5rem)",
        fontWeight: 400,
        color: "#b8b8b8",
        cursor: "default",
        transition: "color 0.2s",
      }}
    >
      <span
        style={{ fontSize: "2em", display: "flex", color: skill.iconColor }}
      >
        {skill.icon}
      </span>
      {skill.name}
    </motion.div>
  );
}
