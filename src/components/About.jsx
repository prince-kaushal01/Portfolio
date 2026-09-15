export default function About() {
  return (
    <section
      id="about"
      className="relative border-t border-white/[0.04]"
      style={{
        paddingLeft: 'clamp(1.5rem, 12vw, 260px)',
        paddingRight: 'clamp(1.5rem, 6vw, 140px)',
        paddingTop: 'clamp(7rem, 12vw, 10rem)',
        paddingBottom: 'clamp(6rem, 12vw, 10rem)',
      }}
    >
      <div className="max-w-[1250px]">
        <p
          className="mt-0 font-[Archivo,sans-serif] font-light leading-[1.08] tracking-[-0.045em] text-[#d9d9d9]"
          style={{
            marginBottom: 'clamp(2.5rem, 6vw, 4rem)',
            fontSize: 'clamp(2.5rem, 5.2vw, 4.1rem)',
          }}
        >
          I build thoughtful digital experiences where clear design, strong performance, and meaningful interactions come together.
        </p>

        <p
          className="font-[Inter,sans-serif] text-base tracking-[0.02em] text-[#8892A4]"
          style={{ marginBottom: 'clamp(0.75rem, 1.5vw, 1.25rem)' }}
        >
          This is me.
        </p>

        <div className="border-t border-white/[0.12]" style={{ paddingTop: 'clamp(0.2rem, 1vw, 0.5rem)' }}>
          <div
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-start"
            style={{
              marginTop: 'clamp(2rem, 4vw, 3.5rem)',
              gap: 'clamp(2rem, 8vw, 8rem)',
            }}
          >
            <h2
              className="m-0 font-[Archivo,sans-serif] font-extrabold leading-[1.05] tracking-[-0.045em] text-[#f0f0ee]"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 4rem)' }}
            >
              Hi, I&apos;m Prince.
            </h2>

            <div>
              <p
                className="reveal m-0 font-[Inter,sans-serif] leading-[1.65] text-[#aeb4c0]"
                style={{ fontSize: 'clamp(1rem, 1.25vw, 1.2rem)' }}
              >
                I&apos;m a freelance Full-Stack Developer and AI Engineer focused on turning ideas into polished, reliable digital products. I enjoy building responsive interfaces, scalable backend systems, and intelligent tools that feel simple to use.
              </p>
              <p
                className="reveal font-[Inter,sans-serif] leading-[1.65] text-[#aeb4c0]"
                style={{ marginTop: '1.5rem', fontSize: 'clamp(1rem, 1.25vw, 1.2rem)' }}
              >
                My approach combines thoughtful visual design with practical engineering. From React and Next.js to APIs, databases, and AI integrations, I build experiences that are fast, accessible, and ready to grow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}