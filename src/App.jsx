import { LangProvider } from './i18n'
import Header from './components/Header'
import Home from './components/Home'
import Projects from './components/Projects'
import Skills from './components/Skills'
import AboutMe from './components/AboutMe'
import Contact from './components/Contact'
import Footer from './components/Footer'

function Divider() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
    </div>
  )
}

export default function App() {
  return (
    <LangProvider>
      <div className="bg-slate-900 font-mono overflow-x-hidden">
        <Header />
        <main>
          <Home />
          <Divider />
          <Projects />
          <Divider />
          <Skills />
          <Divider />
          <AboutMe />
          <Divider />
          <Contact />
        </main>
        <Footer />
      </div>
    </LangProvider>
  )
}
