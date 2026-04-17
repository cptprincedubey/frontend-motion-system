"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HEADLINE = "WELCOME ITZ FIZZ";

const STATS = [
  { target: 95, suffix: "%", label: "Success" },
  { target: 120, suffix: "K", label: "Users" },
  { target: 4.9, suffix: "", label: "Rating" },
];

function countUp(
  el: HTMLElement,
  target: number,
  suffix: string,
  duration: number
) {
  let start: number | null = null;
  const step = (ts: number) => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / (duration * 1000), 1);
    const ease = 1 - Math.pow(1 - p, 3); // cubic ease-out
    const value = ease * target;
    const decimals = target % 1 === 0 ? 0 : 1;
    el.textContent = value.toFixed(decimals) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export default function Hero() {
  const heroRef    = useRef<HTMLElement>(null);
  const headlineRef= useRef<HTMLHeadingElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const carRef     = useRef<HTMLDivElement>(null);
  const hintRef    = useRef<HTMLDivElement>(null);
  const numRefs    = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const chars = headlineRef.current?.querySelectorAll<HTMLSpanElement>(
      "span:not(.space)"
    );
    const statCards = statsRef.current?.children;

    // ── Intro timeline ───────────────────────────────────────────────
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(chars,
      { opacity: 0, y: 64 },
      { opacity: 1,  y: 0, duration: 0.6, stagger: 0.04 }
    )
    .fromTo(statCards,
      { opacity: 0, y: 28 },
      {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.15,
        onStart: () => {
          STATS.forEach((s, i) => {
            setTimeout(() => {
              const el = numRefs.current[i];
              if (el) countUp(el, s.target, s.suffix, 1.2);
            }, i * 150);
          });
        },
      },
      "-=0.1"
    )
    .fromTo(hintRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      "+=0.3"
    );

    // ── Scroll: car parallax + fade ──────────────────────────────────
    const scrollOpts = {
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
    };

    gsap.to(carRef.current, {
      y: -200,
      rotate: 5,
      scale: 0.75,
      ease: "none",
      scrollTrigger: { ...scrollOpts, scrub: 1.5 },
    });

    gsap.to(carRef.current, {
      scale: 0.75, opacity: 0, ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "40% top", end: "bottom top", scrub: 1.5,
      },
    });

    // ── Scroll: background parallax ──────────────────────────────────
    gsap.to(".bg-parallax", {
      y: -100,
      ease: "none",
      scrollTrigger: { ...scrollOpts, scrub: 1 },
    });

    // ── Scroll: text fade-up ─────────────────────────────────────────
    gsap.to([headlineRef.current, statsRef.current, taglineRef.current], {
      y: -80, opacity: 0, ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "20% top", end: "70% top", scrub: 1,
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex flex-col items-center justify-center
                 bg-black overflow-hidden"
    >
      {/* Background parallax */}
      <div className="bg-parallax absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-b from-transparent via-orange-900/10 to-transparent" />
      </div>

      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center
                      justify-center">
        <div className="w-[600px] h-[600px] rounded-full"
             style={{
               background:
                 "radial-gradient(circle, rgba(255,80,0,0.12) 0%, transparent 70%)",
             }}
        />
      </div>

      {/* Grid */}
      <div className="pointer-events-none absolute inset-0"
           style={{
             backgroundImage:
               "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)," +
               "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
             backgroundSize: "60px 60px",
           }}
      />

      {/* Headline */}
      <h1
        ref={headlineRef}
        className="relative z-10 flex flex-wrap justify-center font-black
                   text-white tracking-[0.45em]
                   text-[clamp(28px,6vw,72px)]"
        aria-label={HEADLINE}
      >
        {HEADLINE.split("").map((ch, i) =>
          ch === " " ? (
            <span key={i} className="space inline-block w-[0.45em]" />
          ) : (
            <span key={i} className="inline-block">{ch}</span>
          )
        )}
      </h1>

      {/* Stats */}
      <div ref={statsRef}
           className="relative z-10 flex flex-wrap justify-center
                      gap-6 md:gap-16 mt-11 px-4">
        {STATS.map((s, i) => (
          <div key={i} className="text-center">
            <div className="font-black text-[clamp(28px,4vw,48px)]"
                 style={{
                   background: "linear-gradient(135deg,#fff 0%,rgba(255,160,60,0.9) 100%)",
                   WebkitBackgroundClip: "text",
                   WebkitTextFillColor: "transparent",
                 }}>
              <span ref={(el) => { numRefs.current[i] = el; }}>
                0{s.suffix}
              </span>
            </div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-white/40 mt-1.5">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Car */}
      <div ref={carRef}
           className="absolute bottom-[-60px] left-1/2 -translate-x-1/2
                      w-[min(680px,90vw)] pointer-events-none z-20">
        <img
          src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=900&auto=format&fit=crop&q=80"
          alt="hero car"
          className="w-full"
          style={{
            filter: "drop-shadow(0 -20px 60px rgba(255,100,0,0.25))",
          }}
        />
        {/* Ground glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2
                        w-[70%] h-[2px] blur-[4px]"
             style={{
               background:
                 "linear-gradient(90deg,transparent,rgba(255,100,0,0.5),transparent)",
             }}
        />
      </div>

      {/* Scroll hint */}
      <div ref={hintRef}
           className="absolute bottom-7 left-1/2 -translate-x-1/2 z-30
                      flex flex-col items-center gap-2 cursor-pointer"
           onClick={() =>
             window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" })
           }>
        <span className="text-[9px] tracking-[0.3em] uppercase text-white/30">
          Scroll
        </span>
        <div className="w-px h-8 bg-white/20 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full
                          bg-white/60 animate-scrollLine" />
        </div>
      </div>
    </section>
  );
}