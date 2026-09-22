import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { PROJECTS } from "../data/projects.js";

gsap.registerPlugin(ScrollTrigger);

const AUTO_INTERVAL = 3500;

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS.find((p) => p.id === Number(id));

  // Refs for page entrance animation
  const pageRef = useRef(null);
  const backRef = useRef(null);
  const heroRef = useRef(null);
  const carouselRef = useRef(null);
  const infoRef = useRef(null);

  // Carousel state
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);
  const trackRef = useRef(null);
  const slideCount = project?.slides?.length ?? 0;

  // ── Slide transition ─────────────────────────────────────────────────────
  const goTo = (next, dir = 1) => {
    if (animating || !trackRef.current || slideCount < 2) return;
    setAnimating(true);

    const slides = trackRef.current.children;
    const incoming = slides[next];
    const outgoing = slides[current];

    gsap.set(incoming, { x: dir * 100 + "%", opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrent(next);
        setAnimating(false);
      },
    });

    tl.to(outgoing, { x: -dir * 60 + "%", opacity: 0, duration: 0.55, ease: "power2.inOut" }, 0)
      .to(incoming, { x: "0%", opacity: 1, duration: 0.55, ease: "power2.inOut" }, 0);
  };

  const prev = () => {
    const next = (current - 1 + slideCount) % slideCount;
    goTo(next, -1);
  };

  const next = () => {
    const nextIdx = (current + 1) % slideCount;
    goTo(nextIdx, 1);
  };

  // Keep a stable reference to the latest `next` so the interval below
  // never needs to be torn down and rebuilt just because it was recreated.
  const nextRef = useRef(next);
  useEffect(() => {
    nextRef.current = next;
  });

  // Auto-advance
  useEffect(() => {
    if (slideCount < 2) return;
    timerRef.current = setInterval(() => nextRef.current(), AUTO_INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [slideCount]);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => nextRef.current(), AUTO_INTERVAL);
  };

  const handlePrev = () => { prev(); resetTimer(); };
  const handleNext = () => { next(); resetTimer(); };
  const handleDot = (i) => {
    if (i === current) return;
    goTo(i, i > current ? 1 : -1);
    resetTimer();
  };

  // ── Page entrance ────────────────────────────────────────────────────────
  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(backRef.current, { opacity: 0, x: -20, duration: 0.5 })
        .from(heroRef.current.children, { opacity: 0, y: 40, duration: 0.7, stagger: 0.12 }, "-=0.2")
        .from(carouselRef.current, { opacity: 0, y: 50, duration: 0.75 }, "-=0.3");
    }, pageRef);

    // Scroll-triggered sections
    const infoCtx = gsap.context(() => {
      gsap.from(infoRef.current.querySelectorAll(".reveal-line"), {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

    });

    return () => {
      ctx.revert();
      infoCtx.revert();
    };
  }, []);

  // ── Initialise all slides ────────────────────────────────────────────────
  useEffect(() => {
    if (!trackRef.current) return;
    const slides = Array.from(trackRef.current.children);
    slides.forEach((slide, i) => {
      gsap.set(slide, { x: i === 0 ? "0%" : "100%", opacity: i === 0 ? 1 : 0 });
    });
  }, []);

  if (!project) {
    return (
      <div className="flex h-screen items-center justify-center text-[#F0F4FF]">
        <p>Project not found.</p>
      </div>
    );
  }

  return (
    <div
      ref={pageRef}
      className="min-h-screen text-[#F0F4FF]"
      style={{ fontFamily: "Archivo, sans-serif", background: "#000" }}
    >
      {/* ── Back button ─────────────────────────────────────────────────── */}
      <div
        ref={backRef}
        style={{
          position: "fixed",
          top: "clamp(1.25rem, 3vw, 2rem)",
          left: "clamp(1.25rem, 4vw, 3rem)",
          zIndex: 50,
        }}
      >
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 rounded-full cursor-pointer bg-black px-8 py-4 font-medium text-[#b8b8b8] transition-all duration-300 hover:border-[#39FF6A]/50 hover:text-[#39FF6A]"
          style={{ letterSpacing: "0.05em", fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)" }}
        >
          <ArrowLeft
            size={18}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          Back
        </button>
      </div>

      {/* ── Main content ────────────────────────────────────────────────── */}
      <div
        style={{
          paddingLeft: "clamp(1.5rem, 10vw, 200px)",
          paddingRight: "clamp(1.5rem, 10vw, 200px)",
          paddingTop: "clamp(6rem, 12vw, 9rem)",
          paddingBottom: "clamp(5rem, 10vw, 8rem)",
        }}
      >
        {/* ── Hero text ─────────────────────────────────────────────────── */}
        <div ref={heroRef} style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
          <p
            className="m-0 mb-3 font-medium uppercase tracking-[0.15em] text-[#39FF6A]"
            style={{ fontSize: "clamp(0.7rem, 1vw, 0.85rem)" }}
          >
            {project.role} &nbsp;·&nbsp; {project.year}
          </p>
          <h1
            className="m-0 font-black tracking-[-0.04em] text-[#F0F4FF]"
            style={{
              fontSize: "clamp(3rem, 8vw, 7.5rem)",
              lineHeight: 1,
              paddingBottom: "0.1em",
            }}
          >
            {project.name}
          </h1>
          <p
            className="m-0 mt-6 max-w-xl font-normal text-[#8892A4]"
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)", lineHeight: 2.6 }}
          >
            {project.tagline}
          </p>

          {/* CTA links */}
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={project.live}
              className="flex items-center gap-2 rounded-full bg-[#39FF6A] px-9 py-4 text-sm font-bold text-black transition-opacity duration-200 hover:opacity-80"
              style={{ letterSpacing: "0.04em" }}
            >
              <ExternalLink size={14} /> Live Demo
            </a>
            <a
              href={project.github}
              className="flex items-center gap-2 rounded-full border border-white/15 px-9 py-4 text-sm font-medium text-[#b8b8b8] transition-all duration-200 hover:border-white/40 hover:text-[#F0F4FF]"
              style={{ letterSpacing: "0.04em" }}
            >
              <SiGithub size={14} /> Source Code
            </a>
          </div>
        </div>

        {/* ── Carousel ──────────────────────────────────────────────────── */}
        <div
          ref={carouselRef}
          className="relative overflow-hidden rounded-2xl border border-white/[0.07]"
          style={{ aspectRatio: "16/9", marginBottom: "clamp(4rem, 8vw, 7rem)" }}
        >
          {/* Slide track */}
          <div ref={trackRef} className="absolute inset-0">
            {project.slides.map((slide, i) => (
              <div
                key={i}
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{ background: slide.bg }}
              >
                {/* Decorative grid lines */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                  }}
                />

                {/* Glow orb */}
                <div
                  className="pointer-events-none absolute"
                  style={{
                    width: "40%",
                    height: "40%",
                    background: `radial-gradient(circle, ${slide.accent}22 0%, transparent 70%)`,
                    top: "30%",
                    left: "30%",
                  }}
                />

                {/* Slide content */}
                <div className="relative z-10 text-center">
                  <p
                    className="m-0 mb-3 font-medium uppercase tracking-[0.18em]"
                    style={{ fontSize: "clamp(0.65rem, 0.9vw, 0.8rem)", color: slide.accent }}
                  >
                    {slide.label}
                  </p>
                  <p
                    className="m-0 max-w-md font-normal text-white/50"
                    style={{ fontSize: "clamp(0.9rem, 1.3vw, 1.1rem)", lineHeight: 1.6 }}
                  >
                    {slide.desc}
                  </p>
                  {/* Mock UI bar */}
                  <div className="mx-auto mt-8 flex items-center gap-2">
                    {[70, 45, 85, 60, 90].map((w, j) => (
                      <div
                        key={j}
                        className="rounded-full"
                        style={{
                          width: `${w}px`,
                          height: "6px",
                          background: j === 2 ? slide.accent : "rgba(255,255,255,0.12)",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Slide number */}
                <div
                  className="absolute bottom-5 right-6 font-black tabular-nums text-white/10"
                  style={{ fontSize: "clamp(3rem, 8vw, 6rem)", lineHeight: 1, userSelect: "none" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
            ))}
          </div>

          {/* Prev / Next buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/70 backdrop-blur-sm transition-all duration-200 hover:border-[#39FF6A]/40 hover:text-[#39FF6A]"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/70 backdrop-blur-sm transition-all duration-200 hover:border-[#39FF6A]/40 hover:text-[#39FF6A]"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
            {project.slides.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDot(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? "24px" : "6px",
                  height: "6px",
                  background: i === current ? "#39FF6A" : "rgba(255,255,255,0.25)",
                }}
              />
            ))}
          </div>
        </div>

        {/* ── Description ───────────────────────────────────────────────── */}
        <div
          ref={infoRef}
          className="grid grid-cols-1 gap-16 md:grid-cols-[1fr_400px]"
          style={{ marginBottom: "clamp(4rem, 8vw, 7rem)" }}
        >
          <div>
            <p
              className="reveal-line m-0 mb-6 font-medium uppercase tracking-[0.15em] text-[#39FF6A]"
              style={{ fontSize: "clamp(0.7rem, 1vw, 0.85rem)" }}
            >
              About the project
            </p>
            {project.description.trim().split("\n\n").map((para, i) => (
              <p
                key={i}
                className="reveal-line m-0 mb-5 font-normal text-[#8892A4] last:mb-0"
                style={{ fontSize: "clamp(1rem, 1.3vw, 1.15rem)", lineHeight: 1.75 }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Quick stats sidebar */}
          <div className="flex flex-col gap-6 self-start">
            {[
              { label: "Role", value: project.role },
              { label: "Year", value: project.year },
              { label: "Stack", value: project.stack.join(", ") },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="reveal-line border-t border-white/[0.07] pt-5"
              >
                <p
                  className="m-0 mb-1 font-medium uppercase tracking-[0.12em] text-[#4B5563]"
                  style={{ fontSize: "0.72rem" }}
                >
                  {label}
                </p>
                <p
                  className="m-0 font-semibold text-[#b8b8b8]"
                  style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)" }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
