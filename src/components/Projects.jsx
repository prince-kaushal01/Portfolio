import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

// TODO: Replace dummy projects with Prince's real projects, images, and links
const PROJECTS = [
  {
    id: 1,
    name: 'AI Support Assistant',
    description: 'A RAG-powered chatbot that answers customer queries from a company\'s knowledge base in real time.',
    stack: ['Next.js', 'OpenAI API', 'LangChain', 'PostgreSQL'],
    accent: '#00D9FF',
    live: '#',
    github: '#',
  },
  {
    id: 2,
    name: 'Workflow Automator',
    description: 'A no-code-to-code automation layer connecting CRMs, forms, and email via custom n8n workflows.',
    stack: ['n8n', 'Node.js', 'REST APIs', 'MongoDB'],
    accent: '#34D399',
    live: '#',
    github: '#',
  },
  {
    id: 3,
    name: 'TaskFlow',
    description: 'A full-stack Kanban-style task manager with real-time updates and team collaboration.',
    stack: ['React', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    accent: '#A78BFA',
    live: '#',
    github: '#',
  },
  {
    id: 4,
    name: 'DevLink',
    description: 'A tool letting developers generate a shareable portfolio page from their GitHub profile.',
    stack: ['Next.js', 'TypeScript', 'REST APIs'],
    accent: '#FB923C',
    live: '#',
    github: '#',
  },
  {
    id: 5,
    name: 'E-Commerce Storefront',
    description: 'A modern storefront with cart, checkout flow, and admin dashboard.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    accent: '#F472B6',
    live: '#',
    github: '#',
  },
  {
    id: 6,
    name: 'AI Content Repurposer',
    description: 'Takes a long-form input and auto-generates social captions using an LLM agent pipeline.',
    stack: ['OpenAI API', 'LangGraph', 'Next.js'],
    accent: '#FBBF24',
    live: '#',
    github: '#',
  },
]

export default function Projects() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.project-card', {
        opacity: 0, y: 50,
        duration: 0.7, stagger: 0.12,
        ease: 'power3.out',
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
      id="projects"
      ref={sectionRef}
      style={{
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 5rem)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div style={{ marginBottom: '3rem' }}>
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.75rem', letterSpacing: '0.25em',
          color: '#00D9FF', textTransform: 'uppercase', marginBottom: '0.5rem'
        }}>// Selected Work</p>
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 700, letterSpacing: '-0.02em', color: '#F0F4FF'
        }}>Projects</h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
        gap: '1.5rem'
      }}>
        {PROJECTS.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 25 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 25 })

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const onMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      className="project-card"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX, rotateY,
        transformPerspective: 800,
        background: '#12151C',
        border: `1px solid rgba(255,255,255,0.08)`,
        borderRadius: '12px',
        padding: '1.75rem',
        display: 'flex', flexDirection: 'column', gap: '1rem',
        position: 'relative', overflow: 'hidden',
        willChange: 'transform'
      }}
      whileHover={{ borderColor: `${project.accent}44` }}
      transition={{ duration: 0.2 }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: '1.5rem', right: '1.5rem',
        height: '2px',
        background: `linear-gradient(90deg, ${project.accent}, transparent)`,
        borderRadius: '1px'
      }} />

      {/* Glow on hover */}
      <div style={{
        position: 'absolute', top: '-30%', right: '-20%',
        width: '180px', height: '180px',
        background: `radial-gradient(circle, ${project.accent}18 0%, transparent 65%)`,
        pointerEvents: 'none'
      }} />

      <h3 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '1.1rem', fontWeight: 600,
        color: '#F0F4FF', letterSpacing: '-0.01em'
      }}>
        {project.name}
      </h3>

      <p style={{ fontSize: '0.88rem', lineHeight: 1.65, color: '#8892A4', flex: 1 }}>
        {project.description}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {project.stack.map(tech => (
          <span key={tech} style={{
            fontSize: '0.7rem', fontWeight: 500,
            color: project.accent,
            background: `${project.accent}15`,
            border: `1px solid ${project.accent}30`,
            padding: '0.2rem 0.55rem', borderRadius: '4px',
            letterSpacing: '0.02em'
          }}>
            {tech}
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.25rem' }}>
        <a href={project.live} style={{
          display: 'flex', alignItems: 'center', gap: '0.35rem',
          fontSize: '0.8rem', fontWeight: 600,
          color: project.accent, textDecoration: 'none',
          letterSpacing: '0.03em'
        }}>
          <ExternalLink size={13} /> View Project
        </a>
        <a href={project.github} style={{
          display: 'flex', alignItems: 'center', gap: '0.35rem',
          fontSize: '0.8rem', fontWeight: 500,
          color: '#8892A4', textDecoration: 'none'
        }}>
          <FaGithub size={13} /> GitHub
        </a>
      </div>
    </motion.div>
  )
}
