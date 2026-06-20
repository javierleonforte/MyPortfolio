import { useEffect, useRef, useState } from 'react'
import { useLang } from '../useLang'

const skillGroupsMeta = [
  {
    key: 'languages', skills: ['JavaScript', 'Python', 'Java'],
    accent: 'from-yellow-600/20 to-yellow-900/5', border: 'border-yellow-600/30 hover:border-yellow-500/60',
    dot: 'bg-yellow-500',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  },
  {
    key: 'others', skills: ['HTML', 'CSS', 'SASS', 'SCSS', 'Git'],
    accent: 'from-orange-600/20 to-orange-900/5', border: 'border-orange-600/30 hover:border-orange-500/60',
    dot: 'bg-orange-500',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  },
  {
    key: 'frameworks', skills: ['TailwindCSS', 'React', 'Vite'],
    accent: 'from-cyan-600/20 to-cyan-900/5', border: 'border-cyan-600/30 hover:border-cyan-500/60',
    dot: 'bg-cyan-500',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  },
  {
    key: 'learning', skills: ['TypeScript', 'PostgreSQL', 'Next.js'], learning: true,
    accent: 'from-blue-600/20 to-blue-900/5', border: 'border-blue-600/30 hover:border-blue-500/60',
    dot: 'bg-blue-500',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
  },
]

function SkillCard({ meta, label, activeLabel, index }) {
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
      className={`relative rounded-xl border-2 p-6 bg-gradient-to-br ${meta.accent} ${meta.border}
        hover:shadow-xl bg-slate-800/60 backdrop-blur-sm transition-all duration-500
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {meta.learning && (
        <span className="absolute -top-3 right-4 bg-blue-700 text-gray-200 text-xs px-2 py-0.5 rounded-full font-mono flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />{activeLabel}
        </span>
      )}
      <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-white/10">
        <div className={`w-1 h-6 rounded-full ${meta.dot}`} />
        <span className="text-gray-400">{meta.icon}</span>
        <h3 className="text-gray-300 font-semibold text-sm tracking-wide">{label}</h3>
      </div>
      <ul className="space-y-2">
        {meta.skills.map((skill) => (
          <li key={skill} className="flex items-center gap-2 text-gray-400 text-sm group/item">
            <span className={`w-1 h-1 rounded-full ${meta.dot} flex-shrink-0`} />
            <span className="group-hover/item:text-gray-200 transition-colors duration-200 font-mono">{skill}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Skills() {
  const { t } = useLang()
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
    <section id="skills" className="py-24 px-6 max-w-7xl mx-auto">
      <div ref={titleRef} className={`mb-16 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <p className="text-blue-700 text-xs tracking-[0.25em] uppercase mb-2">{t.skills.eyebrow}</p>
        <div className="flex items-center gap-4">
          <h2 className="section-title">{t.skills.title}</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-blue-700/50 to-transparent max-w-sm" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillGroupsMeta.map((meta, i) => (
          <SkillCard key={meta.key} meta={meta}
            label={t.skills.groups[meta.key]}
            activeLabel={t.skills.groups.active}
            index={i} />
        ))}
      </div>
    </section>
  )
}
