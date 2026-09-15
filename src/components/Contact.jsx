import { Mail, ExternalLink, FileText } from 'lucide-react'

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative border-t border-white/[0.04] flex flex-col items-center justify-center"
      style={{
        paddingLeft: 'clamp(1.5rem, 6vw, 5rem)',
        paddingRight: 'clamp(1.5rem, 6vw, 5rem)',
        paddingTop: 'clamp(5rem, 10vw, 8rem)',
        paddingBottom: 'clamp(5rem, 10vw, 8rem)',
      }}
    >
      {/* ── Glass card ───────────────────────────────────────────────── */}
      <div
        className="relative mx-auto w-[80%] overflow-hidden rounded-[28px] border border-white/10 text-center"
        style={{
          background: 'rgba(255,255,255,0.035)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.55), 0 0 60px rgba(57,255,106,0.06)',
          padding: 'clamp(2.5rem, 5vw, 4rem) clamp(11.5rem, 17vw, 13rem)',
        }}
      >
        {/* Diagonal corner light-beam accent */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{
            top: '-35%',
            left: '-25%',
            width: '75%',
            height: '230%',
            background: 'linear-gradient(180deg, rgba(57,255,106,0.20) 0%, rgba(57,255,106,0.05) 40%, transparent 70%)',
            transform: 'rotate(-30deg)',
            filter: 'blur(45px)',
          }}
        />

        <div className="relative z-[1] flex flex-col items-center">
          <h2
            className="font-[Archivo,sans-serif] font-black uppercase leading-[1.1] tracking-[-0.02em] text-[#F0F4FF]"
            style={{ marginBottom: 'clamp(1rem, 2vw, 1.5rem)', fontSize: 'clamp(1.2rem, 3.8vw, 2.5rem)' }}
          >
            Let&apos;s Work Together
          </h2>

          <p
            className="mx-auto font-[Inter,sans-serif] text-[#AEB4C0]"
            style={{
              marginBottom: 'clamp(2rem, 4vw, 2.75rem)',
              fontSize: 'clamp(0.95rem, 1.3vw, 1.2rem)',
              lineHeight: 1.65,
              maxWidth: '820px',
            }}
          >
            Open to exciting freelance opportunities in full-stack development, AI engineering, and automation. Let&apos;s build something great together.
          </p>

          <div className="flex flex-wrap items-center justify-center" style={{ gap: '1.2rem', marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
            <a
              href="mailto:princekaushal357@gmail.com"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#39FF6A] font-[Archivo,sans-serif] text-lg font-bold text-[#0A0A0A] no-underline"
              style={{ padding: '0.85rem 1.6rem' }}
            >
              <Mail size={19} />
              Get In Touch
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.03] font-[Archivo,sans-serif] text-lg font-bold text-[#F0F4FF] no-underline"
              style={{ padding: '0.85rem 1.6rem' }}
            >
              <ExternalLink size={19} />
              Review Resume
            </a>

            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.03] font-[Archivo,sans-serif] text-lg font-bold text-[#F0F4FF] no-underline"
              style={{ padding: '0.85rem 1.6rem' }}
            >
              <FileText size={19} />
              Download Resume
            </a>
          </div>

          <div className="border-t border-white/[0.08] w-full" style={{ paddingTop: 'clamp(1.5rem, 3vw, 2rem)' }}>
            <a
              href="mailto:princekaushal357@gmail.com"
              className="block font-[Inter,sans-serif] text-[#8892A4] no-underline"
              style={{ fontSize: '0.9rem', marginBottom: '0.4rem' }}
            >
              princekaushal357@gmail.com
            </a>
            <p className="font-[Inter,sans-serif] text-[#5B6270]" style={{ fontSize: '0.78rem' }}>
              © 2026 Prince Kaushal.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}