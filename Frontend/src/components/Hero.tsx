"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HEADLINE = "ITZ FIZZ";

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
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const headlineRef= useRef<HTMLHeadingElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const visualRef  = useRef<HTMLDivElement>(null);
  const carRef     = useRef<HTMLImageElement>(null);
  const hintRef    = useRef<HTMLDivElement>(null);
  const numRefs    = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const chars = headlineRef.current
      ? Array.from(headlineRef.current.querySelectorAll<HTMLSpanElement>(
          "span:not(.space)"
        ))
      : [];
    const statCards = statsRef.current
      ? Array.from(statsRef.current.children)
      : [];

    // ── Intro timeline ───────────────────────────────────────────────
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(chars,
      { opacity: 0, y: 64 },
      { opacity: 1,  y: 0, duration: 0.6, stagger: 0 }
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

    // ── Scroll: background parallax ──────────────────────────────────
    gsap.to(".bg-parallax", {
      y: -100,
      ease: "none",
      scrollTrigger: { ...scrollOpts, scrub: 1 },
    });

    // ── Scroll: text fade-up ─────────────────────────────────────────
    gsap.to(textBlockRef.current, {
      y: -120,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "10% top",
        end: "60% top",
        scrub: 1,
      },
    });
    // ── Scroll: visual parallax ────────────────────────────────────
    if (visualRef.current) {
      gsap.to(visualRef.current, {
        y: -90,
        opacity: 0.68,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "10% top",
          end: "80% top",
          scrub: 1,
        },
      });
    }

    // ── Continuous car revolution ──────────────────────────────────
    if (carRef.current) {
      gsap.to(carRef.current, {
        rotation: 360,
        duration: 8,
        ease: "none",
        repeat: -1,
      });
    }

    // ── Scroll: car rotation enhancement ────────────────────────────
    if (carRef.current) {
      gsap.to(carRef.current, {
        rotation: "+=720",
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "0% top",
          end: "100% top",
          scrub: 1.5,
        },
      });
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex flex-col items-center
                 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900
                 overflow-x-hidden px-4 pt-14 pb-2"
    >
      {/* Background parallax */}
      <div className="bg-parallax absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent" />
      </div>

      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center
                      justify-center">
        <div className="w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.08)_0%,transparent_70%)]" />
      </div>

      {/* Subtle grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:80px_80px]" />

      <div className="relative z-10 w-full max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-center">
        <div ref={textBlockRef}
             className="relative z-10 flex flex-col items-center justify-center text-center gap-8 px-6 py-10 lg:items-start lg:text-left
                        bg-slate-950/85 backdrop-blur-xl rounded-[2rem] border border-purple-500/10
                        shadow-[0_40px_120px_-40px_rgba(124,58,237,0.35)] mx-4">
          <p ref={taglineRef}
             className="text-sm tracking-[0.3em] uppercase
                        text-purple-300/80 font-semibold mb-2">
            Premium digital motion design
          </p>

          <h1
            ref={headlineRef}
            className="flex justify-center lg:justify-start font-black
                       text-white tracking-[0.35em] leading-[0.85]
                       text-[clamp(42px,6vw,96px)] drop-shadow-[0_20px_80px_rgba(124,58,237,0.35)]"
            aria-label={HEADLINE}
          >
            {HEADLINE.split("").map((ch, i) =>
              ch === " " ? (
                <span key={i} className="space inline-block w-[0.5em]" />
              ) : (
                <span key={i} className="inline-block hover:text-purple-300 transition-colors duration-300">
                  {ch}
                </span>
              )
            )}
          </h1>

          <div className="flex flex-wrap justify-center lg:justify-start gap-6 md:gap-8 mt-8 px-2">
            {STATS.map((s, i) => (
              <div key={i} className="text-center group px-7 py-5 bg-slate-950/70 rounded-3xl border border-white/10 shadow-[0_18px_60px_-30px_rgba(99,102,241,0.55)] transition-all duration-300 hover:border-purple-400/30">
                <div className="gradient-text font-black text-[clamp(30px,4.5vw,52px)] drop-shadow-md">
                  <span ref={(el) => { numRefs.current[i] = el; }}>
                    0{s.suffix}
                  </span>
                </div>
                <p className="text-xs tracking-[0.2em] uppercase text-purple-200/70 mt-3 group-hover:text-purple-300 transition-colors duration-300">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div ref={visualRef} className="relative flex justify-center px-4">
          <div className="relative w-full max-w-[540px] aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-slate-950/80 to-slate-900/60 shadow-[0_40px_120px_-40px_rgba(124,58,237,0.4)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(167,139,250,0.18),transparent_60%)]" />
            <img
              ref={carRef}
              src="https://paraschaturvedi.github.io/car-scroll-animation/McLaren%20720S%202022%20top%20view.png"
              alt="hero car"
              className="absolute inset-0 w-full h-full object-contain p-8 drop-shadow-2xl"
            />
            <div className="absolute inset-x-0 bottom-4 mx-auto h-[1px] w-[64%] bg-gradient-to-r from-purple-400/70 via-white/30 to-transparent" />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div ref={hintRef}
           className="absolute bottom-7 left-1/2 -translate-x-1/2 z-30
                      flex flex-col items-center gap-2 cursor-pointer"
           onClick={() =>
             window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" })
           }>
        <span className="text-[9px] tracking-[0.3em] uppercase text-purple-300/60">
          Scroll
        </span>
        <div className="w-px h-8 bg-purple-400/20 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full
                          bg-purple-400/70 animate-scrollLine" />
        </div>
      </div>
    </section>
  );
}