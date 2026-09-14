import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import {
  SiReact, SiNextdotjs, SiJavascript, SiTypescript, SiHtml5,
  SiTailwindcss, SiGreensock, SiNodedotjs, SiExpress, SiMongodb,
  SiPostgresql, SiLangchain, SiGit, SiGithub, SiDocker,
  SiPostman, SiFigma, SiVercel, SiN8N, SiZapier
} from 'react-icons/si'
import { VscCode } from 'react-icons/vsc'
import { Cpu, Zap, Code2, BrainCircuit } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const SKILL_GROUPS = [
  {
    category: 'Frontend',
    color: '#00D9FF',
    skills: [
      { name: 'React', icon: <SiReact /> },
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'JavaScript', icon: <SiJavascript /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'HTML', icon: <SiHtml5 /> },
      { name: 'CSS', icon: <Code2 size={16} /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
    ]
  },
  {
    category: 'Animation',
    color: '#A78BFA',
    skills: [
      { name: 'GSAP', icon: <SiGreensock /> },
      { name: 'Motion', icon: <Zap size={16} /> },
      { name: 'Lenis', icon: <Cpu size={16} /> },
    ]
  },
  {
    category: 'Backend',
    color: '#34D399',
    skills: [
      { name: 'Node.js', icon: <SiNodedotjs /> },
      { name: 'Express.js', icon: <SiExpress /> },
      { name: 'REST APIs', icon: <Cpu size={16} /> },
      { name: 'MongoDB', icon: <SiMongodb /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
    ]
  },
  {
    category: 'AI & Automation',
    color: '#FB923C',
    skills: [
      { name: 'OpenAI API', icon: <BrainCircuit size={16} /> },
      { name: 'AI Agents', icon: <Cpu size={16} /> },
      { name: 'LangChain', icon: <SiLangchain /> },
      { name: 'LangGraph', icon: <Zap size={16} /> },
      { name: 'n8n', icon: <SiN8N /> },
      { name: 'Zapier', icon: <SiZapier /> },
      { name: 'Make', icon: <Zap size={16} /> },
      { name: 'RAG Chatbots', icon: <Cpu size={16} /> },
    ]
  },
  {
    category: 'Tools',
    color: '#F472B6',
    skills: [
      { name: 'Git', icon: <SiGit /> },
      { name: 'GitHub', icon: <SiGithub /> },
      { name: 'Docker', icon: <SiDocker /> },
      { name: 'Postman', icon: <SiPostman /> },
      { name: 'Figma', icon: <SiFigma /> },
      { name: 'Vercel', icon: <SiVercel /> },
      { name: 'Cursor', icon: <VscCode /> },
      { name: 'VS Code', icon: <VscCode /> },
    ]
  },
]

export default function Skills() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skill-chip', {
        opacity: 0, y: 24, scale: 0.9,
        duration: 0.5, stagger: 0.04,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 5rem)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        position: 'relative'
      }}
    >
      {/* Glow */}
      <div style={{
        position: 'absolute', top: '20%', right: '-10%',
        width: '50vw', height: '50vw', maxWidth: '700px',
        background: 'radial-gradient(circle, rgba(0,217,255,0.04) 0%, transparent 65%)',
        pointerEvents: 'none'
      }} />

      <div style={{ marginBottom: '3rem' }}>
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.75rem', letterSpacing: '0.25em',
          color: '#00D9FF', textTransform: 'uppercase', marginBottom: '0.5rem'
        }}>// What I Work With</p>
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 700, letterSpacing: '-0.02em', color: '#F0F4FF'
        }}>Skills & Tools</h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {SKILL_GROUPS.map(group => (
          <div key={group.category}>
            <h3 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.75rem', fontWeight: 600,
              color: group.color, letterSpacing: '0.2em',
              textTransform: 'uppercase', marginBottom: '1rem'
            }}>
              {group.category}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
              {group.skills.map(skill => (
                <SkillChip key={skill.name} skill={skill} color={group.color} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function SkillChip({ skill, color }) {
  return (
    <motion.div
      className="skill-chip"
      whileHover={{
        scale: 1.07,
        borderColor: color,
        boxShadow: `0 0 14px ${color}33`,
        color: color
      }}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.45rem',
        padding: '0.45rem 0.9rem',
        background: '#12151C',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '6px',
        fontSize: '0.82rem', fontWeight: 500,
        color: '#8892A4', cursor: 'default',
        transition: 'border-color 0.2s, color 0.2s'
      }}
    >
      <span style={{ fontSize: '1em', display: 'flex' }}>{skill.icon}</span>
      {skill.name}
    </motion.div>
  )
}
