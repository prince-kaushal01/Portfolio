import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  // Placeholder previews: replace these with real project screenshots later.
  {
    id: 1,
    name: "Neon Commerce",
    stack: ["Next.js", "Stripe", "PostgreSQL"],
    live: "#",
    preview: "/projects/neon-commerce.svg",
  },
  {
    id: 2,
    name: "Flowboard",
    stack: ["React", "Redux", "Tailwind CSS"],
    live: "#",
    preview: "/projects/flowboard.svg",
  },
  {
    id: 3,
    name: "Resume Roaster",
    stack: ["GPT-4", "Next.js", "PostgreSQL"],
    live: "#",
    preview: "/projects/resume-roaster.svg",
  },
  {
    id: 4,
    name: "Estate Finder",
    stack: ["React", "Node.js", "MongoDB"],
    live: "#",
    preview: "/projects/estate-finder.svg",
  },
  {
    id: 5,
    name: "Insight Finance",
    stack: ["Vue.js", "Express.js", "MySQL"],
    live: "#",
    preview: "/projects/insight-finance.svg",
  },
  {
    id: 6,
    name: "Agent Studio",
    stack: ["OpenAI API", "LangChain", "n8n"],
    live: "#",
    preview: "/projects/agent-studio.svg",
  },
];

export default function Projects({ size = '1.4em', duration = 8, color = '#F0F4FF' }) {
  const sectionRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        opacity: 0,
        y: 50,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
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
      id="projects"
      ref={sectionRef}
      style={{
        padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 13.7vw, 12rem)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
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
          &nbsp; Selected Projects
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(1.5rem, 3vw, 3rem)",
        }}
      >
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index, hoveredId, setHoveredId }) {
  const cardRef = useRef(null);
  const parallaxRef = useRef(null);
  const indexLabel = `0${index + 1}`;
  const isHovered = hoveredId === project.id;
  const isDimmed = hoveredId !== null && !isHovered;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        parallaxRef.current,
        { y: -24 },
        {
          y: 24,
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.a
      href={project.live}
      ref={cardRef}
      className="project-card"
      whileHover="hovered"
      onHoverStart={() => setHoveredId(project.id)}
      onHoverEnd={() => setHoveredId(null)}
      style={{
        display: "grid",
        gridTemplateColumns: "42px minmax(0, 1fr)",
        alignItems: "center",
        gap: "1rem",
        minHeight: "clamp(6rem, 10vw, 8rem)",
        padding: "0.75rem 0",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        color: "#F0F4FF",
        textDecoration: "none",
        position: "relative",
        zIndex: 1,
      }}
      animate={{ opacity: isDimmed ? 0.35 : 1 }}
      transition={{ opacity: { duration: 0.45, ease: "easeOut" } }}
      variants={{ hovered: { zIndex: 5 } }}
    >
      <div
        style={{
          fontFamily: "'Archivo', sans-serif",
          fontSize: "0.9rem",
          fontWeight: 700,
          color: "#8892A4",
          letterSpacing: "0.1em",
          alignSelf: "start",
          paddingTop: "0.7rem",
        }}
      >
        {indexLabel}
      </div>

      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <motion.h3
            variants={{ hovered: { color: "#39FF6A" } }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            style={{
              margin: 0,
              fontFamily: "'Archivo', sans-serif",
              fontSize: "clamp(2rem, 4.2vw, 4.25rem)",
              fontWeight: 900,
              color: "#F0F4FF",
              letterSpacing: "-0.045em",
              lineHeight: 0.95,
            }}
          >
            {project.name}
          </motion.h3>

          <motion.div
            variants={{
              hovered: { color: "#39FF6A", opacity: 1, scale: 1, x: 0 },
            }}
            initial={{ opacity: 0, scale: 0.6, x: -4 }}
            transition={{ duration: 0.35, ease: "easeOut", delay: 0.1 }}
            style={{ color: "#8892A4", transformOrigin: "center" }}
          >
            <ExternalLink size={28} strokeWidth={1.5} />
          </motion.div>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.65rem",
            marginTop: "0.75rem",
          }}
        >
          {project.stack.map((tech) => (
            <span
              key={tech}
              style={{
                fontSize: "0.72rem",
                fontWeight: 500,
                color: "#8892A4",
                letterSpacing: "0.02em",
                transition: "color 0.55s ease-out",
              }}
            >
              {tech}{" "}
              <span style={{ color: "#4B5563", marginLeft: "0.35rem" }}>•</span>
            </span>
          ))}
        </div>
      </div>

      <div
        ref={parallaxRef}
        style={{
          position: "absolute",
          zIndex: -1,
          top: "50%",
          right: "8%",
          width: "min(26vw, 330px)",
          aspectRatio: "3 / 4",
          transform: "translateY(-50%)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
          pointerEvents: "none",
        }}
      >
        <motion.img
          src={project.preview}
          alt=""
          aria-hidden="true"
          variants={{ hovered: { opacity: 1, x: 0, y: 0 } }}
          initial={{ opacity: 0, x: 20, y: 8 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            pointerEvents: "none",
          }}
        />
      </div>
    </motion.a>
  );
}
