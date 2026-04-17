import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* About Section */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-wide">
            About <span className="text-purple-400">ITZ FIZZ</span>
          </h2>
          <p className="text-lg text-purple-200/80 leading-relaxed max-w-3xl mx-auto">
            Experience the future of digital motion design. We combine cutting-edge technology
            with creative excellence to deliver stunning visual experiences that captivate and inspire.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-16 tracking-wide">
            Our <span className="text-purple-400">Services</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-slate-800/50 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-colors">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Motion Design</h3>
              <p className="text-purple-200/70">Stunning animations that bring your ideas to life with fluid motion and visual impact.</p>
            </div>
            <div className="text-center p-8 bg-slate-800/50 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-colors">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Web Development</h3>
              <p className="text-purple-200/70">Modern, responsive websites built with the latest technologies and best practices.</p>
            </div>
            <div className="text-center p-8 bg-slate-800/50 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-colors">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">UI/UX Design</h3>
              <p className="text-purple-200/70">Intuitive and beautiful user interfaces that provide exceptional user experiences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-20 px-6 bg-gradient-to-b from-slate-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-wide">
            Ready to <span className="text-purple-400">Get Started?</span>
          </h2>
          <p className="text-lg text-purple-200/80 mb-12 leading-relaxed">
            Let's create something amazing together. Contact us to discuss your next project.
          </p>
          <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors duration-300 shadow-lg hover:shadow-purple-500/25">
            Contact Us
          </button>
        </div>
      </section>
    </main>
  );
}