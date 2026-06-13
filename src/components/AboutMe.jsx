import { useEffect, useRef, useState } from 'react'

const highlights = [
  { value: '4+', label: 'Years coding' },
  { value: '22', label: 'Years old' },
  { value: '∞', label: 'Curiosity' },
]

export default function AboutMe() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="aboutme" className="py-24 px-6 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="mb-16">
        <p className="text-blue-700 text-xs tracking-[0.25em] uppercase mb-2">// who I am</p>
        <div className="flex items-center gap-4">
          <h2 className="section-title">About me</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-blue-700/50 to-transparent max-w-sm" />
        </div>
      </div>

      <div
        ref={ref}
        className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-start transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Image column */}
        <div className="flex-shrink-0 self-center lg:self-start">
          <div className="relative">
            {/* Decorative corner brackets */}
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-blue-700" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-blue-700" />

            <div className="w-64 h-80 md:w-72 md:h-96 rounded-lg overflow-hidden bg-slate-800 border border-slate-700">
              <img
                src="/assets/file.png"
                alt="Javier Leonforte"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.parentElement.classList.add('flex', 'items-center', 'justify-center')
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.insertAdjacentHTML('afterend', '<span class="text-5xl font-bold text-blue-400">JL</span>')
                }}
              />
            </div>

            {/* Stat chips */}
            <div className="mt-4 flex gap-3 justify-center">
              {highlights.map(({ value, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center bg-slate-800 border border-slate-700 hover:border-blue-700/50 rounded-lg px-3 py-2 transition-colors duration-300"
                >
                  <span className="text-blue-400 font-bold text-lg leading-none">{value}</span>
                  <span className="text-gray-500 text-xs mt-0.5">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Text column */}
        <div className="flex-1">
          <h3 className="text-gray-200 text-2xl font-semibold mb-6">
            Hi! I&apos;m <span className="text-blue-500">Javier Leonforte</span>
          </h3>

          <div className="space-y-4 text-gray-400 leading-relaxed">
            <p>
              A 22-year-old self-taught front-end developer from Argentina. My journey in web development began when I was just 16, driven by a deep curiosity and passion for creating digital experiences.
            </p>
            <p>
              Over the years, I&apos;ve honed my skills through dedication, countless hours of learning, and hands-on practice. My goal is to craft clean, efficient, and user-friendly interfaces that bring ideas to life on the web.
            </p>
            <p>
              I thrive on challenges, always eager to explore new tools, frameworks, and methodologies to stay ahead in the fast-evolving tech landscape.
            </p>
            <p>
              When I&apos;m not coding, you can find me diving into new projects, expanding my knowledge, or simply enjoying some music.
            </p>
          </div>

          {/* Current status */}
          <div className="mt-6 flex items-center gap-2 text-sm text-gray-500 font-mono bg-slate-800/60 border border-slate-700 rounded-lg px-4 py-2.5 w-fit">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>Currently learning TypeScript, Next.js & PostgreSQL</span>
          </div>

          {/* CV download */}
          <a
            href="/assets/CV_JavierLeonforte.pdf"
            download="CV_JavierLeonforte.pdf"
            className="btn-primary mt-8 w-fit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download CV
          </a>
        </div>
      </div>
    </section>
  )
}
