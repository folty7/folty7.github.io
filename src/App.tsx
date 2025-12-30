import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Code, Briefcase, Globe, ArrowDown } from 'lucide-react'
import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import Marquee from "react-fast-marquee";


function App() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const target = document.querySelector(targetId) as HTMLElement
    if (target && lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: 0,
        duration: 1.2
      })
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-200 dark:bg-slate-800">
        {/* Header Navigation */}
        <div className="absolute top-0 left-0 right-0 z-20 px-8 py-6 flex justify-between items-center">
          <span className="text-sm text-slate">© Code by Andrej Folta</span>
          <nav className="flex gap-8">
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, '#about')}
              className="text-sm text-slate hover:text-slate-600 transition-colors cursor-pointer"
            >
              About
            </a>
            <a
              href="#projects"
              onClick={(e) => scrollToSection(e, '#projects')}
              className="text-sm text-slate hover:text-slate-600 transition-colors cursor-pointer"
            >
              Work
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="text-sm text-slate hover:text-slate-600 transition-colors cursor-pointer"
            >
              Contact
            </a>
          </nav>
        </div>

        {/* Location Badge */}
        <div className="absolute top-32 left-0 z-20 flex items-center gap-3 bg-slate-900 text-white px-6 py-3 rounded-r-full">
          <div className="flex flex-col text-sm">
            <span>Located in Prague & Bratislava</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-slate-700 dark:bg-slate-600 flex items-center justify-center">
            <Globe className="w-6 h-6" />
          </div>
        </div>

        {/* Portrait Image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src="/5B17A9CA-77D4-40BC-BC37-8C28A59A1684_1_201_a.jpeg"
            alt="Portrait"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* Role Badge */}
        <div className="absolute top-1/4 right-12 z-20 text-right">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <ArrowDown className="w-6 text-slate ml-auto mb-4" />
            <div className="text-2xl md:text-3xl font-light text-slate">
              <div>Freelance</div>
              <div>Front-end Developer</div>
            </div>
          </motion.div>
        </div>

        {/* Marquee Name */}
        <div className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden bg-transparent pointer-events-none">
          <Marquee
            autoFill={true}
            pauseOnHover={true}
            speed={100}
          >
            <h1 className="text-[12rem] md:text-[20rem] text-white px-8">
              Andrej Jozef Folta
            </h1>
          </Marquee>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-8 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-32"
          >
            {/* Main Intro */}
            <div className="space-y-12">
              <h2 className="text-6xl md:text-7xl font-light tracking-tight text-slate-900 dark:text-slate-100">
                Helping brands thrive<br />in the digital world
              </h2>

              <div className="flex items-start gap-8 max-w-3xl">
                <div className="text-4xl font-light text-slate-400 dark:text-slate-500">→</div>
                <div className="space-y-6">
                  <p className="text-lg font-normal text-slate-700 dark:text-slate-300 leading-relaxed">
                    Som študent Aplikovanej informatiky so 4-ročnou praxou vo frontend developmente.
                    Vyvíjam moderné webové aplikácie a riešenia pre rôznorodých klientov - od startupov po etablované firmy.
                  </p>
                </div>
              </div>
            </div>

            {/* I can help you with */}
            <div className="space-y-20">
              <h3 className="text-5xl md:text-6xl font-light tracking-tight text-slate-900 dark:text-slate-100">I can help you with</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                {/* Design */}
                <div className="space-y-8 border-t border-slate-200 dark:border-slate-700 pt-8">
                  <div className="text-slate-400 dark:text-slate-500 text-sm font-light">01</div>
                  <h4 className="text-3xl md:text-4xl font-normal text-slate-900 dark:text-slate-100">Design</h4>
                  <p className="text-base font-light text-slate-600 dark:text-slate-400 leading-relaxed">
                    S praxou v navrhovaní webových stránok dodávam silné a user-friendly digitálne dizajny.
                    (Od 2024 len v kombinácii s developmentom)
                  </p>
                </div>

                {/* Development */}
                <div className="space-y-8 border-t border-slate-200 dark:border-slate-700 pt-8">
                  <div className="text-slate-400 dark:text-slate-500 text-sm font-light">02</div>
                  <h4 className="text-3xl md:text-4xl font-normal text-slate-900 dark:text-slate-100">Development</h4>
                  <p className="text-base font-light text-slate-600 dark:text-slate-400 leading-relaxed">
                    Vyvíjam škálovateľné webové stránky od základov, ktoré perfektne ladí s dizajnom.
                    Moje zameranie je na mikro animácie, prechody a interakcie.
                  </p>
                </div>

                {/* The full package */}
                <div className="space-y-8 border-t border-slate-200 dark:border-slate-700 pt-8">
                  <div className="text-slate-400 dark:text-slate-500 text-sm font-light">03</div>
                  <h4 className="text-3xl md:text-4xl font-normal text-slate-900 dark:text-slate-100 flex items-center gap-3">
                    <span className="text-2xl">✦</span> The full package
                  </h4>
                  <p className="text-base font-light text-slate-600 dark:text-slate-400 leading-relaxed">
                    Komplexná webová stránka od konceptu po implementáciu - to ma odlišuje.
                    Moje schopnosti v dizajne a developmente mi umožňujú vytvárať skvele projekty.
                  </p>
                </div>
              </div>
            </div>

            {/* Aktuálne */}
            <div className="max-w-3xl">
              <p className="text-lg font-light text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong className="font-normal text-slate-900 dark:text-slate-100">Aktuálne:</strong> Hľadám príležitosti na internship alebo prácu na dohodu.
                Som otvorený pre remote aj hybrid pozície.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Code className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100">Zručnosti</h2>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Frontend Frameworks</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Vue.js 3', 'React', 'Pinia', 'Vue Router'].map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <p className="text-center font-semibold text-sm text-slate-900 dark:text-slate-100">{skill}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Languages</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['TypeScript', 'JavaScript', 'HTML5', 'CSS3'].map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <p className="text-center font-semibold text-sm text-slate-900 dark:text-slate-100">{skill}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Styling & Design</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['TailwindCSS', 'SCSS', 'SASS', 'Bootstrap', 'PrimeVue', 'Figma'].map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <p className="text-center font-semibold text-sm text-slate-900 dark:text-slate-100">{skill}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Tools & Additional</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Vite', 'Git', 'WordPress', 'REST API', 'GSAP', 'Framer Motion', 'Gulp'].map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <p className="text-center font-semibold text-sm text-slate-900 dark:text-slate-100">{skill}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-white dark:bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100">Projekty</h2>
            </div>
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="text-2xl font-semibold mb-2 text-slate-900 dark:text-slate-100">Single Page Applications</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Implementácia modulárnych SPA pomocou Vue 3 Composition API a React. Type-safe architektúra s TypeScript,
                  Pinia state management, routing systémy s protected routes a REST API integráciou s error handling.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded-full text-sm">
                    Vue 3
                  </span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm">
                    React
                  </span>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full text-sm">
                    TypeScript
                  </span>
                  <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300 rounded-full text-sm">
                    Pinia
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="text-2xl font-semibold mb-2 text-slate-900 dark:text-slate-100">WordPress Development</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Vývoj custom WordPress tém s pokročilým SCSS a vlastným build procesom (Gulp, Webpack).
                  Integrácia moderných JavaScript knižníc, performance optimalizácia, SEO tuning a úspešné migrácie WordPress sites.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm">
                    WordPress
                  </span>
                  <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300 rounded-full text-sm">
                    SCSS
                  </span>
                  <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 rounded-full text-sm">
                    Gulp
                  </span>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded-full text-sm">
                    SEO
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="text-2xl font-semibold mb-2 text-slate-900 dark:text-slate-100">UI/UX Design & Animations</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Design a implementácia responzívnych UI komponentov (PrimeVue, TailwindCSS, Bootstrap).
                  Dark/light theme switching, pokročilé animácie pomocou GSAP a vytvorenie konzistentných design systémov vo Figma.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-300 rounded-full text-sm">
                    TailwindCSS
                  </span>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full text-sm">
                    Figma
                  </span>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded-full text-sm">
                    GSAP
                  </span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm">
                    PrimeVue
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-8 text-slate-900 dark:text-slate-100">Kontakt</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
              Máte projekt alebo nápad? Rád si s vami pohovorím!
            </p>
            <div className="flex gap-6 justify-center">
              <motion.a
                href="mailto:foltadev@gmail.com"
                className="p-4 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail className="w-6 h-6 text-slate-900 dark:text-slate-100" />
              </motion.a>
              <motion.a
                href="https://github.com/folty7"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="w-6 h-6 text-slate-900 dark:text-slate-100" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/andrej-jozef-fo%C4%BEta-981a3b341/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="w-6 h-6 text-slate-900 dark:text-slate-100" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-500 dark:text-slate-400">
        <p>© 2025 Andrej Folta. Všetky práva vyhradené.</p>
      </footer>
    </div>
  )
}

export default App
