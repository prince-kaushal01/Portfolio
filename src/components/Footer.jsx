export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-2 border-t border-white/[0.06] px-6 py-6 text-center md:flex-row md:justify-between md:px-[clamp(1.5rem,6vw,5rem)] md:py-8 md:text-left">
      <p className="text-[0.78rem] tracking-[0.02em] text-[#8892A4]">
        &copy; 2026 <span className="font-[Archivo,sans-serif] font-bold text-[#F0F4FF]">Prince Kaushal</span>
        {' '}&mdash; Designed &amp; built by Prince
      </p>
    </footer>
  )
}
