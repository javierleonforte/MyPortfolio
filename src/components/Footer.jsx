import { useLang } from '../useLang'

export default function Footer() {
  const { t } = useLang()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-800 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-gray-600 text-sm font-mono">
          <span className="text-blue-700">&lt;</span>
          <span>Javier Leonforte</span>
          <span className="text-blue-700">/&gt;</span>
        </div>
        <p className="text-gray-600 text-xs font-mono">
          &copy; {year} — {t.footer.rights}
        </p>
        <p className="text-gray-700 text-xs font-mono">
          {t.footer.built}{' '}
          <span className="text-blue-700">React</span>
          {' '}+{' '}
          <span className="text-cyan-600">Tailwind</span>
        </p>
      </div>
    </footer>
  )
}
