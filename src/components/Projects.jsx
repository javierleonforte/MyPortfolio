import { useEffect, useRef, useState } from 'react'

const projects = [
  {
    id: 'chickenclicker',
    title: 'Chicken Clicker!',
    image: '/assets/chickenclicker.png',
    description: 'An Idle Clicker game developed with HTML, CSS and JavaScript. Click your way to the top!',
    tags: ['HTML','JavaScript', 'TailwindCSS', 'React'],
    tagColors: ['bg-yellow-500/10 text-yellow-400 border-yellow-500/30'],
    github: 'https://github.com/javierleonforte/ChickenClicker',
    live: 'https://chickenclicker-ten.vercel.app/',
  },
  {
    id: 'landing',
    title: 'Landing Page - Dot Dager',
    image: '/assets/landing.png',
    description: 'A Landing Page for the content creator known as Dot Dager, built with JavaScript and TailwindCSS.',
    tags: ['HTML', 'CSS', 'JavaScript', 'TailwindCSS'],
    tagColors: ['bg-cyan-500/10 text-cyan-400 border-cyan-500/30'],
    github: 'https://github.com/javierleonforte/dotDagerEvent',
    live: 'https://dotdager-dun.vercel.app',
  },
  {
    id: 'ubicaciongamer',
    title: 'Ubicación Gamer - E-Commerce',
    image: '/assets/ubicaciongamer.png',
    description: 'An E-Commerce website for gaming products, built with React and TailwindCSS. Browse and shop the latest gaming gear!',
    tags: ['HTML', 'JavaScript', 'TailwindCSS', 'React'],
    tagColors: ['bg-cyan-500/10 text-cyan-400 border-cyan-500/30'],
    github: 'https://github.com/javierleonforte/ubicacion-gamer',
    live: 'https://ubicaciongamer.vercel.app',
  },
  {
    id: 'portfolio',
    title: 'This Portfolio',
    image: '/assets/myportfolio.png',
    description: 'My personal portfolio website, built with React and TailwindCSS. Showcasing my projects, skills and experience in a clean and modern design.',
    tags: ['HTML', 'JavaScript', 'TailwindCSS', 'React'],
    tagColors: ['bg-cyan-500/10 text-cyan-400 border-cyan-500/30'],
    github: 'https://github.com/javierleonforte/MyPortfolio',
    live: 'https://myportfolio-alpha-wine-38.vercel.app',
  },
]

function TagIcon({ tag }) {
  const icons = {
    JavaScript: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="currentColor">
        <path d="M11.714 1H2.286C1.576 1 1 1.576 1 2.286v9.428C1 12.424 1.576 13 2.286 13h9.428C12.424 13 13 12.424 13 11.714V2.286C13 1.576 12.424 1 11.714 1zM7.53 10.36c0 1.168-.686 1.7-1.685 1.7-.902 0-1.425-.466-1.693-1.031l.919-.554c.177.313.338.579.726.579.37 0 .605-.145.605-.71V6.53h1.128v3.83zm2.668 1.7c-1.048 0-1.725-.498-2.055-1.152l.919-.554c.24.394.557.686 1.111.686.466 0 .766-.233.766-.557 0-.386-.306-.522-.822-.75l-.282-.12c-.814-.346-1.352-.782-1.352-1.701 0-.846.645-1.49 1.65-1.49.718 0 1.232.25 1.602.903l-.879.562c-.192-.346-.4-.482-.723-.482-.33 0-.538.21-.538.482 0 .338.209.474.694.686l.281.12c.959.41 1.497.83 1.497 1.773 0 1.013-.798 1.57-1.867 1.57z"/>
      </svg>
    ),
    TailwindCSS: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.5 9.51a4.22 4.22 0 0 1-1.91-1.34A5.77 5.77 0 0 0 12 6a4.72 4.72 0 0 0-5 4 3.23 3.23 0 0 1 3.5-1.49 4.32 4.32 0 0 1 1.91 1.35A5.77 5.77 0 0 0 17 12a4.72 4.72 0 0 0 5-4 3.2 3.2 0 0 1-3.5 1.51zm-13 4.98a4.22 4.22 0 0 1 1.91 1.34A5.77 5.77 0 0 0 12 18a4.72 4.72 0 0 0 5-4 3.23 3.23 0 0 1-3.5 1.49 4.32 4.32 0 0 1-1.91-1.35A5.8 5.8 0 0 0 7 12a4.72 4.72 0 0 0-5 4 3.2 3.2 0 0 1 3.5-1.51z"/>
      </svg>
    ),
    HTML: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.325 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.74-8.157H8.531z" />
      </svg>
    ),
    CSS: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm17.09 4.412H5.41l.233 2.622h10.059l-.232 2.718H6.341l.233 2.718h8.564l-.325 3.425-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.74-8.157H8.531l-.233-2.718h9.552z" />
      </svg>
    ),
    React: (
      <svg className="w-3.5 h-3.5" viewBox="-11.5 -10.23174 23 20.46348" fill="none">
        <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
        <g stroke="currentColor" strokeWidth="1">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    ),
  }

  return icons[tag] || null
}

function ProjectCard({ project, index }) {
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
    <div
      ref={ref}
      className={`project-card max-w-sm w-full transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48 bg-slate-900">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            e.currentTarget.parentElement.classList.add('flex', 'items-center', 'justify-center')
            e.currentTarget.style.display = 'none'
          }}
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-blue-900/0 hover:bg-blue-900/20 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-gray-200 text-xl font-semibold mb-2">{project.title}</h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 text-xs px-2 py-0.5 rounded border bg-blue-700/10 text-blue-400 border-blue-700/30 font-mono"
            >
              <TagIcon tag={tag} />
              {tag}
            </span>
          ))}
        </div>

        <p className="text-gray-500 text-sm leading-relaxed mb-5">{project.description}</p>

        <div className="flex gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="btn-outline flex items-center gap-2 text-xs"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="btn-primary text-xs"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Live Demo
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const titleRef = useRef(null)
  const [titleVisible, setTitleVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true) },
      { threshold: 0.3 }
    )
    if (titleRef.current) observer.observe(titleRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
      {/* Section header */}
      <div
        ref={titleRef}
        className={`mb-16 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        <p className="text-blue-700 text-xs tracking-[0.25em] uppercase mb-2">// what I&apos;ve built</p>
        <div className="flex items-center gap-4">
          <h2 className="section-title">Projects</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-blue-700/50 to-transparent max-w-sm" />
        </div>
      </div>

      {/* Cards grid */}
      <div className="flex flex-wrap justify-center gap-8">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
