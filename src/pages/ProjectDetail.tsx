import { motion } from 'framer-motion'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Github } from 'lucide-react'
import { Fragment } from 'react'
import Marquee from 'react-fast-marquee'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { useLenis } from '../context/LenisContext'
import { caseStudies } from '../data/caseStudies'

type Project = {
  slug: string
  title: string
  description: string
  tags: string[]
  githubUrl: string | null
  liveUrl: string | null
}

function ProjectDetail() {
  const { t, i18n } = useTranslation()
  const { slug } = useParams<{ slug: string }>()
  const { lenis, scrollY } = useLenis()

  const projects = t('projects.items', { returnObjects: true }) as Project[]
  const currentIndex = projects.findIndex((p) => p.slug === slug)
  const project = currentIndex >= 0 ? projects[currentIndex] : null
  const nextProject = project ? projects[(currentIndex + 1) % projects.length] : null
  const study = slug ? caseStudies[slug] : undefined
  const copy = study ? (i18n.language.startsWith('sk') ? study.sk : study.en) : undefined

  const scrollToOverview = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const target = document.querySelector('#overview') as HTMLElement | null
    if (target && lenis) lenis.scrollTo(target, { offset: 0, duration: 2 })
  }

  if (!project || !study || !copy) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-8">
        <div className="max-w-xl space-y-8 text-center">
          <h1 className="text-4xl md:text-6xl font-light tracking-tight text-slate-900">
            {t('projectDetail.notFoundHeading')}
          </h1>
          <p className="text-base font-light text-slate-600 leading-relaxed">
            {t('projectDetail.notFoundDescription')}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded bg-slate-900 px-5 py-3 text-sm font-light text-white transition-colors hover:bg-blue-600"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{t('projectDetail.notFoundCta')}</span>
          </Link>
        </div>
      </div>
    )
  }

  const heroScreen = study.screens[0]
  const totalProjects = projects.length

  return (
    <div className="min-h-screen bg-white relative">
      {/* Hero Section */}
      <section className="relative md:min-h-screen min-h-[70vh] flex items-end overflow-hidden bg-slate-200 z-20">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-30 px-4 md:px-8 py-6 flex justify-between items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-md text-slate-600 hover:text-blue-500 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{t('projectDetail.back')}</span>
          </Link>
          <div className="flex gap-2">
            <button
              onClick={() => i18n.changeLanguage('en')}
              className={`px-3 py-1 text-xs rounded transition-colors ${i18n.language === 'en'
                ? 'bg-blue-500 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
            >
              EN
            </button>
            <button
              onClick={() => i18n.changeLanguage('sk')}
              className={`px-3 py-1 text-xs rounded transition-colors ${i18n.language === 'sk'
                ? 'bg-blue-500 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
            >
              SK
            </button>
          </div>
        </div>

        {/* Project index badge */}
        <div className="absolute md:top-32 top-20 left-0 z-20 flex items-center gap-3 bg-slate-900 text-white md:px-6 px-3 md:py-3 py-2 rounded-r-full">
          <div className="flex flex-col md:text-sm text-xs">
            <span className="uppercase tracking-wider">
              {String(currentIndex + 1).padStart(2, '0')} / {String(totalProjects).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Parallax visual */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translateY(${scrollY * 0.4}px)`,
            willChange: 'transform'
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="w-full h-full bg-gradient-to-br from-slate-300 via-slate-200 to-slate-400 relative"
          >
            {heroScreen && (
              <img
                src={heroScreen.src}
                alt={heroScreen.alt}
                className="absolute inset-0 w-full h-full object-cover object-top opacity-35 blur-[2px]"
              />
            )}
            <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
          </motion.div>
        </div>

        {/* Title block */}
        <div className="relative z-20 w-full px-4 md:px-8 pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="text-sm font-light text-slate-500 uppercase tracking-widest">
                {t('projects.heading')}
              </div>
              <h1 className="text-4xl md:text-7xl xl:text-8xl font-light tracking-tight text-slate-900 max-w-5xl">
                {project.title}
              </h1>
              <div className="flex items-center gap-4 pt-4">
                <a
                  href="#overview"
                  onClick={scrollToOverview}
                  className="inline-flex items-center gap-2 text-sm font-light text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <ArrowDown className="h-4 w-4" />
                  <span>{t('projectDetail.overviewHeading')}</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section id="overview" className="py-16 md:py-32 px-8 bg-white relative">
        <div className="max-w-7xl mx-auto space-y-20 md:space-y-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-12"
          >
            <h2 className="text-5xl md:text-7xl font-light tracking-tight text-blue-600">
              {t('projectDetail.overviewHeading')}
            </h2>
            <div className="flex items-start gap-8 max-w-3xl">
              <div className="hidden md:block text-4xl font-light text-blue-600">→</div>
              <div className="space-y-6">
                <p className="text-lg font-normal text-slate-700 leading-relaxed">{copy.type}</p>
                <p className="text-base font-light text-slate-600 leading-relaxed">{project.description}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-slate-200 pt-12"
          >
            <div className="space-y-2">
              <h3 className="text-sm font-light text-slate-400 uppercase tracking-wider">
                {t('projectDetail.roleLabel')}
              </h3>
              <p className="text-lg font-normal text-slate-900">{copy.role}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-light text-slate-400 uppercase tracking-wider">
                {t('projectDetail.stackHeading')}
              </h3>
              <p className="text-lg font-light text-slate-700">{project.tags.join(' · ')}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-light text-slate-400 uppercase tracking-wider">
                {t('projectDetail.linksLabel')}
              </h3>
              <div className="flex flex-col gap-2 items-start">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-lg font-light text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>{t('projectDetail.viewLive')}</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-lg font-light text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-12"
          >
            <h3 className="text-3xl md:text-4xl font-light tracking-tight text-slate-900">
              {t('projectDetail.resultsHeading')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {copy.stats.map((stat) => (
                <div key={stat.label} className="space-y-3">
                  <div className="text-5xl font-light text-blue-600">{stat.value}</div>
                  <p className="text-base font-light text-slate-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What I worked on */}
      <section className="py-16 md:py-32 px-8 bg-white relative">
        <div className="max-w-7xl mx-auto space-y-10 md:space-y-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl font-light tracking-tight text-slate-900"
          >
            {t('projectDetail.workedOnHeading')}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {copy.workedOn.map((item, index) => (
              <motion.div
                key={item.lead}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + (index % 2) * 0.1 }}
                className="grid grid-cols-[3rem_1fr] gap-4 border-t border-slate-200 pt-6"
              >
                <div className="text-slate-400 text-sm font-light pt-1">{String(index + 1).padStart(2, '0')}</div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-normal text-slate-900">{item.lead}</h4>
                  {item.detail && (
                    <p className="text-base font-light text-slate-600 leading-relaxed">{item.detail}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Screens */}
      {study.screens.length > 0 && (
        <section className="py-16 md:py-32 px-8 bg-white relative">
          <div className="max-w-7xl mx-auto space-y-12 md:space-y-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl font-light tracking-tight text-slate-900"
            >
              {t('projectDetail.galleryHeading')}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              {study.screens.map((screen, index) => (
                <motion.div
                  key={screen.src}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className={`relative overflow-hidden rounded-sm bg-slate-100 border border-slate-200 ${index === 0 ? 'md:col-span-2' : ''}`}
                >
                  <img
                    src={screen.src}
                    alt={screen.alt}
                    loading="lazy"
                    decoding="async"
                    className="block w-full h-auto"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* The hardest problem */}
      <section className="py-16 md:py-32 px-8 bg-slate-900 relative">
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-10 md:space-y-16"
          >
            <h2 className="text-5xl md:text-6xl font-light tracking-tight text-white">
              {t('projectDetail.hardestHeading')}
            </h2>

            <div className="max-w-4xl space-y-6">
              {copy.hardest.map((line, index) => (
                <p
                  key={line}
                  className={index === 0
                    ? 'text-2xl md:text-3xl font-light text-white leading-snug'
                    : 'text-lg font-light text-slate-300 leading-relaxed'}
                >
                  {line}
                </p>
              ))}
            </div>

            {copy.flow && (
              <div className="flex flex-wrap items-center gap-3 border-t border-slate-700 pt-10">
                {copy.flow.map((step, index) => (
                  <Fragment key={step}>
                    {index > 0 && <ArrowRight className="h-4 w-4 text-blue-400 shrink-0" />}
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className={`rounded-full border px-4 py-2 text-sm font-light ${index === copy.flow!.length - 1
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-slate-700 text-slate-300'
                        }`}
                    >
                      {step}
                    </motion.span>
                  </Fragment>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* What I've learned */}
      <section className="py-16 md:py-32 px-8 bg-white relative">
        <div className="max-w-7xl mx-auto space-y-10 md:space-y-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-light tracking-tight text-blue-600"
          >
            {t('projectDetail.learnedHeading')}
          </motion.h2>

          <div className="max-w-3xl space-y-8">
            {copy.learned.map((line, index) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className="border-l-2 border-blue-600 pl-8"
              >
                <p className="text-lg font-light text-slate-600 leading-relaxed">{line}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Live preview */}
      {(project.liveUrl || project.githubUrl) && (
        <section className="py-16 md:py-32 px-8 bg-white relative border-t border-slate-200">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center"
            >
              <h2 className="text-5xl md:text-6xl font-light tracking-tight text-slate-900">
                {t('projectDetail.ctaHeading')}
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded bg-slate-900 px-5 py-3 text-sm font-light text-white transition-colors hover:bg-blue-600"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>{t('projectDetail.viewLive')}</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded border border-slate-300 px-5 py-3 text-sm font-light text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-900"
                  >
                    <Github className="h-4 w-4" />
                    <span>{t('projectDetail.viewGithub')}</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Next project */}
      {nextProject && (
        <section className="relative overflow-hidden bg-slate-900 py-16 md:py-32 px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="text-sm font-light text-slate-500 uppercase tracking-widest">
                {t('projectDetail.nextProject')}
              </div>
              <Link
                to={`/projects/${nextProject.slug}`}
                className="group inline-flex items-end gap-6 text-white"
              >
                <span className="text-4xl md:text-7xl font-light tracking-tight group-hover:text-blue-400 transition-colors">
                  {nextProject.title}
                </span>
                <ArrowUpRight className="h-8 w-8 md:h-12 md:w-12 group-hover:text-blue-400 group-hover:-translate-y-2 group-hover:translate-x-2 transition-all" />
              </Link>
            </motion.div>
          </div>

          {/* Marquee bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-0 overflow-hidden pointer-events-none opacity-30">
            <Marquee autoFill={true} speed={60}>
              <span className="text-[5rem] md:text-[10rem] xl:text-[12rem] text-slate-700 px-8 font-light">
                {nextProject.title} -
              </span>
            </Marquee>
          </div>
        </section>
      )}

      <footer className="py-8 text-center text-slate-400 bg-slate-900 relative">
        <p className="relative z-10">{t('footer.copyright')}</p>
      </footer>
    </div>
  )
}

export default ProjectDetail
