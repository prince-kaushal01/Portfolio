import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, Phone } from 'lucide-react'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'

// TODO: Replace with your real Formspree endpoint or EmailJS config
// Set VITE_FORM_ENDPOINT in .env.local: VITE_FORM_ENDPOINT=https://formspree.io/f/YOUR_ID
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || '#'

// TODO: Replace '#' with real social profile URLs
const SOCIALS = [
  { icon: <FaGithub size={18} />, href: '#', label: 'GitHub' },
  { icon: <FaLinkedin size={18} />, href: '#', label: 'LinkedIn' },
  { icon: <FaInstagram size={18} />, href: '#', label: 'Instagram' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } }
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // 'sending' | 'success' | 'error'
  const formRef = useRef(null)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (FORM_ENDPOINT === '#') {
      alert('Form endpoint not configured. Set VITE_FORM_ENDPOINT in .env.local')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form)
      })
      if (res.ok) { setStatus('success'); setForm({ name: '', email: '', message: '' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <section
      id="contact"
      style={{
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 5rem)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        position: 'relative'
      }}
    >
      {/* Glow */}
      <div style={{
        position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)',
        width: '60vw', height: '40vw', maxWidth: '800px',
        background: 'radial-gradient(ellipse, rgba(0,217,255,0.05) 0%, transparent 65%)',
        pointerEvents: 'none'
      }} />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        style={{ maxWidth: '820px', margin: '0 auto', position: 'relative', zIndex: 1 }}
      >
        <motion.p variants={item} style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '0.75rem', letterSpacing: '0.25em',
          color: '#00D9FF', textTransform: 'uppercase', marginBottom: '0.5rem'
        }}>// Say Hello</motion.p>

        <motion.h2 variants={item} style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 700, letterSpacing: '-0.02em',
          color: '#F0F4FF', marginBottom: '3rem', lineHeight: 1.1
        }}>
          Let's Build<br />
          <span style={{ color: '#00D9FF' }}>Something</span>
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: '3rem', alignItems: 'start'
        }}>
          {/* Form */}
          <motion.form
            variants={item}
            ref={formRef}
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            {[
              { name: 'name', placeholder: 'Your Name', type: 'text' },
              { name: 'email', placeholder: 'Your Email', type: 'email' },
            ].map(field => (
              <motion.input
                key={field.name}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={handleChange}
                required
                whileFocus={{ borderColor: '#00D9FF', boxShadow: '0 0 0 2px rgba(0,217,255,0.12)' }}
                style={{
                  width: '100%', padding: '0.85rem 1rem',
                  background: '#12151C',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px', outline: 'none',
                  color: '#F0F4FF', fontSize: '0.9rem',
                  fontFamily: "'Inter', sans-serif",
                  transition: 'border-color 0.2s'
                }}
              />
            ))}
            <motion.textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
              whileFocus={{ borderColor: '#00D9FF', boxShadow: '0 0 0 2px rgba(0,217,255,0.12)' }}
              style={{
                width: '100%', padding: '0.85rem 1rem',
                background: '#12151C',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px', outline: 'none',
                color: '#F0F4FF', fontSize: '0.9rem',
                fontFamily: "'Inter', sans-serif",
                resize: 'vertical', transition: 'border-color 0.2s'
              }}
            />
            <motion.button
              type="submit"
              disabled={status === 'sending'}
              whileHover={{ scale: 1.02, boxShadow: '0 0 24px rgba(0,217,255,0.3)' }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                padding: '0.9rem 1.8rem',
                background: status === 'success'
                  ? 'linear-gradient(135deg, #34D399, #059669)'
                  : 'linear-gradient(135deg, #00D9FF, #0EA5E9)',
                border: 'none', borderRadius: '8px',
                color: '#0A0A0B', fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.9rem', fontWeight: 600,
                cursor: status === 'sending' ? 'wait' : 'none',
                letterSpacing: '0.02em'
              }}
            >
              {status === 'sending' ? 'Sending...' :
               status === 'success' ? 'Message Sent!' :
               status === 'error' ? 'Try Again' :
               <><Send size={15} /> Send Message</>}
            </motion.button>
          </motion.form>

          {/* Contact info */}
          <motion.div variants={item} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.75rem', fontWeight: 600,
                color: '#8892A4', letterSpacing: '0.2em',
                textTransform: 'uppercase', marginBottom: '1rem'
              }}>Direct Contact</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <a href="mailto:princekaushal357@gmail.com" style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  color: '#F0F4FF', textDecoration: 'none', fontSize: '0.9rem',
                  transition: 'color 0.2s'
                }}>
                  <Mail size={16} color="#00D9FF" />
                  princekaushal357@gmail.com
                </a>
                <a href="tel:+919667979426" style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  color: '#F0F4FF', textDecoration: 'none', fontSize: '0.9rem',
                }}>
                  <Phone size={16} color="#00D9FF" />
                  +91 9667979426
                </a>
              </div>
            </div>

            <div>
              <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.75rem', fontWeight: 600,
                color: '#8892A4', letterSpacing: '0.2em',
                textTransform: 'uppercase', marginBottom: '1rem'
              }}>Social</h3>
              {/* TODO: Replace '#' with real social profile URLs */}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {SOCIALS.map(s => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    whileHover={{ scale: 1.1, color: '#00D9FF', borderColor: '#00D9FF' }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: '42px', height: '42px', borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#8892A4', textDecoration: 'none',
                      transition: 'color 0.2s, border-color 0.2s'
                    }}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
