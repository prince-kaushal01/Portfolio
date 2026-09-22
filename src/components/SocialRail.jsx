import { useEffect, useState } from 'react'
import { Mail } from 'lucide-react'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'

const SOCIALS = [
  { label: 'GitHub',    href: 'https://github.com/prince-kaushal01',                      icon: <FaGithub size={38} />,    external: true  },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/prince-kaushal-928196394/',     icon: <FaLinkedin size={38} />,  external: true  },
  { label: 'Instagram', href: 'https://www.instagram.com/pryaxis.ai/?hl=en',              icon: <FaInstagram size={38} />, external: true  },
  { label: 'Email',     href: 'mailto:princekaushal357@gmail.com',                         icon: <Mail size={38} />,        external: false },
]

export default function SocialRail() {
  const [showRail, setShowRail] = useState(false)

  useEffect(() => {
    const home = document.querySelector('#home')
    if (!home) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => setShowRail(!entry.isIntersecting),
      { threshold: 0.2 },
    )
    observer.observe(home)

    return () => observer.disconnect()
  }, [])

  if (!showRail) return null

  return (
    <aside
      aria-label="Social links"
      className="fixed left-[clamp(1rem,2vw,2rem)] top-1/2 z-[1500] flex -translate-y-1/2 flex-col items-center gap-4 rounded-3xl border border-white/[0.12] bg-[#071b12]/90 px-4 py-6"
    >
      {SOCIALS.map(social => (
        <a
          key={social.label}
          href={social.href}
          aria-label={social.label}
          {...(social.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="flex items-center justify-center text-[#D7DED9] no-underline"
        >
          {social.icon}
        </a>
      ))}
    </aside>
  )
}
