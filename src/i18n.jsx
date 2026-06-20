import { useState } from 'react'
import { LangContext } from './LangContext'
import { translations } from './translations'

// Provee el idioma actual, la función para alternarlo y el objeto de traducciones (t).
// El hook useLang vive en ./useLang y el contexto en ./LangContext
// (separados para que React Fast Refresh funcione sin warnings).
export function LangProvider({ children }) {
  const [lang, setLang] = useState('en')
  const t = translations[lang]
  const toggleLang = () => setLang(l => (l === 'en' ? 'es' : 'en'))

  return (
    <LangContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  )
}
