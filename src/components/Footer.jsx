import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'

// TODO: Replace '#' with real social profile URLs
const SOCIALS = [
  { icon: <FaGithub size={15} />, href: '#', label: 'GitHub' },
  { icon: <FaLinkedin size={15} />, href: '#', label: 'LinkedIn' },
  { icon: <FaInstagram size={15} />, href: '#', label: 'Instagram' },
]

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '2rem clamp(1.5rem, 6vw, 5rem)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: '1rem'
    }}>
      <p style={{ fontSize: '0.8rem', color: '#8892A4', letterSpacing: '0.02em' }}>
        &copy; 2026 <span style={{ color: '#F0F4FF' }}>Prince Kaushal</span> &mdash; Built with React &amp; Three.js
      </p>
      <div style={{ display: 'flex', gap: '0.65rem' }}>
        {SOCIALS.map(s => (
          <a
            key={s.label}
            href={s.href}
            aria-label={s.label}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '32px', height: '32px', borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#8892A4', textDecoration: 'none',
              transition: 'color 0.2s, border-color 0.2s'
            }}
          >
            {s.icon}
          </a>
        ))}
      </div>
    </footer>
  )
}
