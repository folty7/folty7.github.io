import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Code, Briefcase, User, Globe, ArrowDown } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-200 dark:bg-slate-800">
        {/* Header Navigation */}
        <div className="absolute top-0 left-0 right-0 z-20 px-8 py-6 flex justify-between items-center">
          <span className="text-sm text-slate-600 dark:text-slate-400">© Code by Andrej Folta</span>
          <nav className="flex gap-8">
            <a href="#projects" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">Work</a>
            <a href="#about" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">About</a>
            <a href="#contact" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">Contact</a>
          </nav>
        </div>

        {/* Location Badge */}
        <div className="absolute top-32 left-8 z-20 flex items-center gap-3 bg-slate-900 dark:bg-slate-700 text-white px-6 py-3 rounded-full">
          <div className="flex flex-col text-xs">
            <span>Located</span>
            <span>in the</span>
            <span>Slovakia</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-slate-700 dark:bg-slate-600 flex items-center justify-center">
            <Globe className="w-6 h-6" />
          </div>
        </div>

        {/* Portrait Image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative w-full max-w-2xl h-full"
          >
            <img
              src="../public/E79A7E4E-4247-4858-96EC-73B2DD898DC7_1_105_c.jpeg"
              alt="Portrait"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </div>

        {/* Role Badge */}
        <div className="absolute top-1/3 right-12 z-20 text-right">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <ArrowDown className="w-6 h-6 text-slate-700 dark:text-slate-300 ml-auto mb-4" />
            <div className="text-2xl md:text-3xl font-light text-slate-800 dark:text-slate-200">
              <div>Freelance</div>
              <div>Designer & Developer</div>
            </div>
          </motion.div>
        </div>

        {/* Marquee Name */}
        <div className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden bg-transparent pointer-events-none">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
            className="flex whitespace-nowrap"
          >
            {[...Array(3)].map((_, i) => (
              <h1 key={i} className="text-[12rem] md:text-[20rem] font-bold text-white dark:text-slate-900 opacity-60 px-8">
                Andrej Folta
              </h1>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-white dark:bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <User className="w-8 h-8 text-blue-600" />
              <h2 className="text-4xl font-bold">O mne</h2>
            </div>
            <div className="space-y-6 text-left">
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                Som študent Aplikovanej informatiky so 4-ročnou praxou vo frontend developmente.
                Vyvíjam moderné webové aplikácie a riešenia pre rôznorodých klientov - od startupov po etablované firmy.
              </p>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">🎯 Čo ponúkam:</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300">
                  <li>4 roky reálnych skúseností s komerčnými projektami</li>
                  <li>Implementácia modulárnych Single Page Applications (Vue 3, React)</li>
                  <li>WordPress custom development a optimalizácia</li>
                  <li>UI/UX dizajn a responzívny dizajn</li>
                  <li>Performance optimization a debugging komplexných aplikácií</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">📊 Dosiahnuté výsledky:</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300">
                  <li>Úspešne dodaných 10+ projektov rôznej komplexnosti</li>
                  <li>Zlepšenie load time implementáciou lazy loading a code splitting</li>
                  <li>Vytvorenie reusable component libraries znižujúcich development time</li>
                </ul>
              </div>

              <div className="bg-blue-50 dark:bg-slate-700 p-4 rounded-lg">
                <p className="text-slate-700 dark:text-slate-200">
                  <strong>📌 Aktuálne:</strong> Hľadám príležitosti na internship alebo prácu na dohodu.
                  Som otvorený pre remote, hybrid aj on-site pozície.
                </p>
              </div>
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
              <Code className="w-8 h-8 text-blue-600" />
              <h2 className="text-4xl font-bold">Zručnosti</h2>
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
                      <p className="text-center font-semibold text-sm">{skill}</p>
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
                      <p className="text-center font-semibold text-sm">{skill}</p>
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
                      <p className="text-center font-semibold text-sm">{skill}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Tools & Additional</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Vite', 'Git', 'WordPress', 'REST API', 'GSAP', 'Gulp'].map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <p className="text-center font-semibold text-sm">{skill}</p>
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
              <Briefcase className="w-8 h-8 text-blue-600" />
              <h2 className="text-4xl font-bold">Projekty</h2>
            </div>
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="text-2xl font-semibold mb-2">Single Page Applications</h3>
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
                <h3 className="text-2xl font-semibold mb-2">WordPress Development</h3>
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
                <h3 className="text-2xl font-semibold mb-2">UI/UX Design & Animations</h3>
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
            <h2 className="text-4xl font-bold mb-8">Kontakt</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
              Máte projekt alebo nápad? Rád si s vami pohovorím!
            </p>
            <div className="flex gap-6 justify-center">
              <motion.a
                href="mailto:your.email@example.com"
                className="p-4 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="w-6 h-6" />
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
