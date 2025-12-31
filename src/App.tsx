import { motion } from 'framer-motion'
import { Globe, ArrowDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import Marquee from "react-fast-marquee"
import { useTranslation } from 'react-i18next'
import BubbleMenu from './components/BubbleMenu'



function App() {
  const { t, i18n } = useTranslation()
  const lenisRef = useRef<Lenis | null>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    })

    lenisRef.current = lenis

    // Update scroll position for parallax effect
    lenis.on('scroll', ({ scroll }: { scroll: number }) => {
      setScrollY(scroll)
    })

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
        duration: 2
      })
    }
  }

  const items = [
  {
    label: t('menu.home'),
    href: '#',
    ariaLabel: t('menu.home'),
    rotation: -8,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' },
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { duration: 2 })
      }
    }
  },
  {
    label: t('menu.about'),
    href: '#about',
    ariaLabel: t('menu.about'),
    rotation: 8,
    hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' },
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => scrollToSection(e, '#about')
  },
  {
    label: t('menu.projects'),
    href: '#projects',
    ariaLabel: t('menu.projects'),
    rotation: 8,
    hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' },
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => scrollToSection(e, '#projects')
  },
  // {
  //   label: t('menu.blog'),
  //   href: '#',
  //   ariaLabel: t('menu.blog'),
  //   rotation: 8,
  //   hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' },
  //   onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
  //     e.preventDefault()
  //     // Blog section doesn't exist yet
  //   }
  // },
  {
    label: t('menu.contact'),
    href: '#contact',
    ariaLabel: t('menu.contact'),
    rotation: -8,
    hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' },
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => scrollToSection(e, '#contact')
  }
];

  return (
    <>
    {/* pre neskorsie pouzitie */}
        {/* <div className="fixed w-full h-full z-1">
          <LaserFlow
            color="#528bff"
            wispDensity={1}
            flowSpeed={0.35}
            verticalSizing={2}
            horizontalSizing={0.5}
            fogIntensity={0.45}
            fogScale={0.3}
            wispSpeed={15}
            wispIntensity={5}
            flowStrength={0.25}
            decay={1.1}
            horizontalBeamOffset={0}
            verticalBeamOffset={-0.5}
          />
        </div> */}

    <div className="fixed w-full h-full top-[1vh] right-10 z-10">
        <BubbleMenu
          items={items}
          menuAriaLabel="Toggle navigation"
          menuBg="#ffffff"
          menuContentColor="#111111"
          useFixedPosition={false}
          animationEase="back.out(1.5)"
          animationDuration={0.5}
          staggerDelay={0.12}
        />
    </div>

    <div className="min-h-screen bg-white relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-200 z-20">
        {/* Header Navigation */}
        <div className="absolute top-0 left-0 right-0 z-20 px-8 py-6 flex justify-between items-center">
          <span className="text-sm text-slate-600">{t('header.copyright')}</span>
          <nav className="flex gap-8 items-center">
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, '#about')}
              className="text-sm text-slate-600 hover:text-blue-500 transition-colors cursor-pointer"
            >
              {t('header.about')}
            </a>
            <a
              href="#skills"
              onClick={(e) => scrollToSection(e, '#skills')}
              className="text-sm text-slate-600 hover:text-blue-500 transition-colors cursor-pointer"
            >
              {t('header.techStack')}
            </a>
            <a
              href="#projects"
              onClick={(e) => scrollToSection(e, '#projects')}
              className="text-sm text-slate-600 hover:text-blue-500 transition-colors cursor-pointer"
            >
              {t('header.work')}
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="text-sm text-slate-600 hover:text-blue-500 transition-colors cursor-pointer"
            >
              {t('header.contact')}
            </a>
            <div className="flex gap-2 ml-4 border-l border-slate-300 pl-4">
              <button
                onClick={() => i18n.changeLanguage('en')}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  i18n.language === 'en'
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => i18n.changeLanguage('sk')}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  i18n.language === 'sk'
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                SK
              </button>
            </div>
          </nav>
        </div>

        {/* Location Badge */}
        <div className="absolute top-32 left-0 z-20 flex items-center gap-3 bg-slate-900 text-white px-6 py-3 rounded-r-full">
          <div className="flex flex-col text-sm">
            <span>{t('hero.location')}</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center">
            <Globe className="w-6 h-6" />
          </div>
        </div>

        {/* Portrait Image */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            willChange: 'transform'
          }}
        >
          <motion.img
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            // src="/5B17A9CA-77D4-40BC-BC37-8C28A59A1684_1_201_a.jpeg"
            src="/roma_landscape.jpeg"
            alt="Portrait"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Role Badge */}
        <div className="absolute top-1/4 right-12 z-20 text-right">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <ArrowDown className="w-6 text-blue-500 ml-auto mb-4" />
            <div className="text-2xl md:text-3xl font-light text-slate-600">
              <div>{t('hero.role')}</div>
              <div className="text-blue-500">{t('hero.title')}</div>
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
            <h1 className="text-[5rem] md:text-[20rem] text-white px-8">
              Andrej J. Folta -
            </h1>
          </Marquee>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-8 bg-white relative">
        <div className="max-w-7xl mx-auto space-y-32">
          {/* Main Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-12"
          >
            <h2 className="text-6xl md:text-7xl font-light tracking-tight text-blue-600">
              {t('about.heading')}</h2>

            <div className="flex items-start gap-8 max-w-3xl">
              <div className="text-4xl font-light text-blue-600">→</div>
              <div className="space-y-6">
                <p className="text-lg font-normal text-slate-700 leading-relaxed">
                  {t('about.intro')}
                </p>
                <p className="text-base font-light text-slate-600 leading-relaxed">
                  {t('about.description')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* What I Offer */}
          <div className="space-y-20">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl font-light tracking-tight text-slate-900"
            >
              {t('about.whatIOffer')}
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {/* Vue.js Expertise */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-8 border-t border-slate-200 pt-8"
              >
                <div className="text-slate-400 text-sm font-light">01</div>
                <h4 className="text-3xl md:text-4xl font-normal text-slate-900">{t('about.services.vue.title')}</h4>
                <p className="text-base font-light text-slate-600 leading-relaxed">
                  {t('about.services.vue.description')}
                </p>
              </motion.div>

              {/* WordPress Development */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-8 border-t border-slate-200 pt-8"
              >
                <div className="text-slate-400 text-sm font-light">02</div>
                <h4 className="text-3xl md:text-4xl font-normal text-slate-900">{t('about.services.wordpress.title')}</h4>
                <p className="text-base font-light text-slate-600 leading-relaxed">
                  {t('about.services.wordpress.description')}
                </p>
              </motion.div>

              {/* UI/UX & Modern Stack */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-8 border-t border-slate-200 pt-8"
              >
                <div className="text-slate-400 text-sm font-light">03</div>
                <h4 className="text-3xl md:text-4xl font-normal text-slate-900">{t('about.services.uiux.title')}</h4>
                <p className="text-base font-light text-slate-600 leading-relaxed">
                  {t('about.services.uiux.description')}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-12"
          >
            <h3 className="text-3xl md:text-4xl font-light tracking-tight text-slate-900">{t('about.resultsHeading')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              <div className="space-y-3">
                <div className="text-5xl font-light text-blue-600">10+</div>
                <p className="text-base font-light text-slate-600">{t('about.results.projects')}</p>
              </div>
              <div className="space-y-3">
                <div className="text-5xl font-light text-blue-600">4</div>
                <p className="text-base font-light text-slate-600">{t('about.results.experience')}</p>
              </div>
            </div>
            <div className="pt-4 max-w-3xl">
              <p className="text-base font-light text-slate-600 leading-relaxed">
                {t('about.resultsDescription')}
              </p>
            </div>
          </motion.div>

          {/* Aktuálne */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-3xl border-l-2 border-blue-600 pl-8"
          >
            <p className="text-lg font-light text-slate-600 leading-relaxed">
              <strong className="font-normal text-blue-600">{t('about.currentlyHeading')}</strong> {t('about.currentlyDescription')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="skills" className="py-32 px-8 bg-slate-900 relative">
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-20"
          >
            <h2 className="text-5xl md:text-6xl font-light tracking-tight text-white">
              {t('skills.heading')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16">
              <div className="space-y-6">
                <h3 className="text-sm font-light text-slate-500 uppercase tracking-wider">{t('skills.categories.frontend')}</h3>
                <div className="space-y-3">
                  {['Vue.js 3', 'React', 'Pinia', 'Vue Router'].map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="text-lg font-light text-slate-300"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-sm font-light text-slate-500 uppercase tracking-wider">{t('skills.categories.languages')}</h3>
                <div className="space-y-3">
                  {['TypeScript', 'JavaScript', 'SQL', 'HTML5', 'CSS3'].map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="text-lg font-light text-slate-300"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-sm font-light text-slate-500 uppercase tracking-wider">{t('skills.categories.styling')}</h3>
                <div className="space-y-3">
                  {['TailwindCSS', 'SCSS', 'SASS', 'Bootstrap', 'PrimeVue', 'Figma'].map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="text-lg font-light text-slate-300"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-sm font-light text-slate-500 uppercase tracking-wider">{t('skills.categories.tools')}</h3>
                <div className="space-y-3">
                  {['Vite', 'Git', 'WordPress', 'REST API', 'GSAP', 'Framer Motion', 'Webpack'].map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="text-lg font-light text-slate-300"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-8 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-20"
          >
            <h2 className="text-5xl md:text-6xl font-light tracking-tight text-slate-900">
              {t('projects.heading')}
            </h2>

            <div className="space-y-24">
              {/* Project 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-slate-200 pt-8"
              >
                <div className="md:col-span-1">
                  <h3 className="text-sm font-light text-slate-400 uppercase tracking-wider mb-2">01</h3>
                  <h4 className="text-2xl md:text-3xl font-normal text-slate-900">
                    {t('projects.items.spa.title')}
                  </h4>
                </div>
                <div className="md:col-span-2 space-y-4">
                  <p className="text-base font-light text-slate-600 leading-relaxed">
                    {t('projects.items.spa.description')}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <span className="text-sm font-light text-slate-500">Vue 3</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-sm font-light text-slate-500">React</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-sm font-light text-slate-500">TypeScript</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-sm font-light text-slate-500">Pinia</span>
                  </div>
                </div>
              </motion.div>

              {/* Project 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-slate-200 pt-8"
              >
                <div className="md:col-span-1">
                  <h3 className="text-sm font-light text-slate-400 uppercase tracking-wider mb-2">02</h3>
                  <h4 className="text-2xl md:text-3xl font-normal text-slate-900">
                    {t('projects.items.wordpress.title')}
                  </h4>
                </div>
                <div className="md:col-span-2 space-y-4">
                  <p className="text-base font-light text-slate-600 leading-relaxed">
                    {t('projects.items.wordpress.description')}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <span className="text-sm font-light text-slate-500">WordPress</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-sm font-light text-slate-500">SCSS</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-sm font-light text-slate-500">Webpack</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-sm font-light text-slate-500">SEO</span>
                  </div>
                </div>
              </motion.div>

              {/* Project 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-slate-200 pt-8"
              >
                <div className="md:col-span-1">
                  <h3 className="text-sm font-light text-slate-400 uppercase tracking-wider mb-2">03</h3>
                  <h4 className="text-2xl md:text-3xl font-normal text-slate-900">
                    {t('projects.items.uiux.title')}
                  </h4>
                </div>
                <div className="md:col-span-2 space-y-4">
                  <p className="text-base font-light text-slate-600 leading-relaxed">
                    {t('projects.items.uiux.description')}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <span className="text-sm font-light text-slate-500">TailwindCSS</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-sm font-light text-slate-500">Figma</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-sm font-light text-slate-500">GSAP</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-sm font-light text-slate-500">PrimeVue</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-8 bg-slate-900 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-20"
          >
            <h2 className="text-5xl md:text-6xl font-light tracking-tight text-white">
              {t('contact.heading')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-8">
                <p className="text-lg font-light text-slate-300 leading-relaxed">
                  {t('contact.description')}
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-light text-slate-500 uppercase tracking-wider mb-2">{t('contact.email')}</h3>
                    <a
                      href="mailto:foltadev@gmail.com"
                      className="text-lg font-light text-white hover:text-blue-400 transition-colors"
                    >
                      foltadev@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-sm font-light text-slate-500 uppercase tracking-wider">{t('contact.socials')}</h3>
                <div className="space-y-4">
                  <motion.a
                    href="https://github.com/folty7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-lg font-light text-white hover:text-blue-400 transition-colors group"
                    whileHover={{ x: 5 }}
                  >
                    <svg className="w-5 h-5 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    <span>GitHub</span>
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/andrej-jozef-fo%C4%BEta-981a3b341/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-lg font-light text-white hover:text-blue-400 transition-colors group"
                    whileHover={{ x: 5 }}
                  >
                    <svg className="w-5 h-5 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span>LinkedIn</span>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-400 bg-slate-900 relative">
        <p className="relative z-10">{t('footer.copyright')}</p>
      </footer>
    </div>
    </>
  )
}

export default App
