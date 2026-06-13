import { useEffect, useRef, useState } from 'react'

const socials = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/javier-leonforte-221870304/',
    hover: 'hover:text-blue-500 hover:border-blue-500/40',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/javii.leonforte/',
    hover: 'hover:text-pink-400 hover:border-pink-500/40',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/+541125773310',
    hover: 'hover:text-green-400 hover:border-green-500/40',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
      </svg>
    ),
  },
]

export default function Contact() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState({ to_name: '', to_email: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      // Replace with your EmailJS credentials
      const result = await window.emailjs?.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        form,
        'YOUR_PUBLIC_KEY'
      )
      if (result?.status === 200) {
        setStatus('success')
        setForm({ to_name: '', to_email: '', message: '' })
        setTimeout(() => setStatus(null), 5000)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus(null), 4000)
    }
  }

  const inputClass =
    'w-full bg-slate-800/60 border border-slate-700 rounded-lg px-4 py-2.5 text-gray-300 text-sm font-mono ' +
    'placeholder-gray-600 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700/50 ' +
    'hover:border-slate-600 transition-all duration-200'

  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="mb-16">
        <p className="text-blue-700 text-xs tracking-[0.25em] uppercase mb-2">// get in touch</p>
        <div className="flex items-center gap-4">
          <h2 className="section-title">Contact</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-blue-700/50 to-transparent max-w-sm" />
        </div>
      </div>

      <div
        ref={ref}
        className={`flex flex-col lg:flex-row gap-12 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 space-y-5">
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex-1 space-y-1.5">
              <label htmlFor="to_name" className="text-gray-500 text-xs font-mono tracking-wide">
                // name
              </label>
              <input
                type="text"
                id="to_name"
                name="to_name"
                value={form.to_name}
                onChange={handleChange}
                className={inputClass}
                placeholder="Your name"
                required
              />
            </div>
            <div className="flex-1 space-y-1.5">
              <label htmlFor="to_email" className="text-gray-500 text-xs font-mono tracking-wide">
                // email
              </label>
              <input
                type="email"
                id="to_email"
                name="to_email"
                value={form.to_email}
                onChange={handleChange}
                className={inputClass}
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="message" className="text-gray-500 text-xs font-mono tracking-wide">
              // message
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={6}
              className={inputClass + ' resize-none'}
              placeholder="Your message..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? (
              <>
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
                Sending...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
                Send message
              </>
            )}
          </button>

          {/* Status messages */}
          {status === 'success' && (
            <div className="flex items-center gap-2 text-green-400 text-sm font-mono bg-green-400/10 border border-green-400/20 rounded-lg px-4 py-2.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Message sent successfully!
            </div>
          )}
          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-400 text-sm font-mono bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              Something went wrong. Try again or reach me directly.
            </div>
          )}
        </form>

        {/* Social links sidebar */}
        <div className="lg:w-64 space-y-6">
          <p className="text-gray-500 text-sm">Or reach me through:</p>

          <div className="space-y-3">
            {socials.map(({ name, href, hover, icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-3 text-gray-500 border border-slate-700 rounded-lg px-4 py-3 
                  ${hover} hover:bg-slate-800/60 transition-all duration-200 group`}
              >
                <span className="transition-colors duration-200">{icon}</span>
                <span className="text-sm font-mono group-hover:translate-x-0.5 transition-transform duration-200">
                  {name}
                </span>
                <svg
                  className="ml-auto w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
            ))}
          </div>

          {/* Location note */}
          <div className="flex items-center gap-2 text-gray-600 text-xs font-mono">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            Buenos Aires, Argentina
          </div>
        </div>
      </div>
    </section>
  )
}
