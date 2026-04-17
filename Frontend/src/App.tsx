import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const carRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const letters = headlineRef.current?.querySelectorAll("span");

    // Intro animation
    gsap.to(letters, {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 0.6,
    });

    gsap.to(".stat", {
      opacity: 1,
      y: 0,
      delay: 0.8,
      stagger: 0.2,
    });

    gsap.to(carRef.current, {
      opacity: 1,
      delay: 1,
    });

    // Scroll animation
    gsap.to(carRef.current, {
      x: 400,
      scale: 1.2,
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  const text = "WELCOME ITZFIZZ";

  return (
    <section className="hero h-screen flex flex-col justify-center items-center bg-black text-white relative overflow-hidden">
      
      {/* Heading */}
      <h1
        ref={headlineRef}
        className="text-4xl md:text-6xl tracking-[10px] flex gap-1"
      >
        {text.split("").map((char, i) => (
          <span key={i} className="opacity-0 translate-y-10 inline-block">
            {char}
          </span>
        ))}
      </h1>

      {/* Stats */}
      <div className="flex gap-10 mt-8">
        <div className="stat opacity-0 translate-y-8 text-center">
          <h2 className="text-2xl font-bold">95%</h2>
          <p>Success</p>
        </div>
        <div className="stat opacity-0 translate-y-8 text-center">
          <h2 className="text-2xl font-bold">120K</h2>
          <p>Users</p>
        </div>
        <div className="stat opacity-0 translate-y-8 text-center">
          <h2 className="text-2xl font-bold">4.9⭐</h2>
          <p>Rating</p>
        </div>
      </div>

      {/* Image */}
      <img
        ref={carRef}
        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
        className="w-[300px] absolute bottom-10 opacity-0"
      />
    </section>
  );
};

export default Hero;