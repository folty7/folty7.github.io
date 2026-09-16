import { motion } from 'framer-motion'
import { Fragment, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { caseStudies, type CaseStudyCopy } from '../data/caseStudies'

type Project = {
  slug: string
  title: string
  description: string
  tags: string[]
  githubUrl: string | null
  liveUrl: string | null
}

const monoLabel = 'font-geist-mono text-xs uppercase tracking-[0.1em] text-[#9a9a9a]'
const headingFont = "font-['Helvetica_Neue',Helvetica,Arial,sans-serif] font-semibold"

function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className={`${headingFont} mt-[2.4rem] mb-[0.9rem] text-[1.55rem] leading-tight tracking-[-0.02em]`}>
      {children}
    </h2>
  )
}

function DashList({ children }: { children: ReactNode }) {
  return <ul className="mb-[1.1rem] space-y-[0.4rem]">{children}</ul>
}

function DashItem({ children }: { children: ReactNode }) {
  return (
    <li className="relative pl-[1.15rem] before:absolute before:left-0 before:text-[#9a9a9a] before:content-['-']">
      {children}
    </li>
  )
}

function Flow({ steps }: { steps: string[] }) {
  return (
    <div className="my-7 border border-[#373737] px-4 py-5">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-3 font-geist-mono text-xs uppercase tracking-[0.08em]">
        {steps.map((step, index) => (
          <Fragment key={step}>
            {index > 0 && (
              <svg viewBox="0 0 20 12" className="h-3 w-5 shrink-0 text-[#9a9a9a]" aria-hidden="true">
                <path d="M 1 6 L 13 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M 12 2 L 19 6 L 12 10 Z" fill="currentColor" />
              </svg>
            )}
            <span className={index === steps.length - 1 ? 'text-white' : 'text-[#c4c4c4]'}>{step}</span>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

function ProjectDetail() {
  const { t, i18n } = useTranslation()
  const { slug } = useParams<{ slug: string }>()

  const projects = t('projects.items', { returnObjects: true }) as Project[]
  const currentIndex = projects.findIndex((p) => p.slug === slug)
  const project = currentIndex >= 0 ? projects[currentIndex] : null
  const nextProject = project ? projects[(currentIndex + 1) % projects.length] : null
  const study = slug ? caseStudies[slug] : undefined
  const copy: CaseStudyCopy | undefined = study
    ? i18n.language.startsWith('sk') ? study.sk : study.en
    : undefined

  const languageSwitch = (
    <div className="flex gap-3 font-geist-mono text-xs uppercase tracking-[0.1em]">
      {(['en', 'sk'] as const).map((lng) => (
        <button
          key={lng}
          type="button"
          onClick={() => i18n.changeLanguage(lng)}
          className={`transition-colors ${i18n.language.startsWith(lng) ? 'text-white' : 'text-[#9a9a9a] hover:text-white'}`}
        >
          {lng}
        </button>
      ))}
    </div>
  )

  if (!project || !copy || !study) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] font-geist text-white">
        <div className="mx-auto max-w-2xl px-6 pt-28 pb-14 md:pt-32 md:pb-20">
          <Link to="/" className={`${monoLabel} hover:text-white transition-colors`}>
            ← {t('projectDetail.back')}
          </Link>
          <h1 className={`${headingFont} mt-12 text-[clamp(2rem,5vw,2.75rem)] leading-[1.08] tracking-[-0.02em]`}>
            {t('projectDetail.notFoundHeading')}
          </h1>
          <p className="mt-6 text-[1.0625rem] leading-[1.7] text-[#9a9a9a]">
            {t('projectDetail.notFoundDescription')}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-geist text-white">
      <div className="mx-auto max-w-2xl px-6 pt-28 pb-14 md:pt-32 md:pb-20">
        <div className="flex items-center justify-between">
          <Link to="/" className={`${monoLabel} hover:text-white transition-colors`}>
            ← {t('projectDetail.back')}
          </Link>
          {languageSwitch}
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className={`${monoLabel} mt-12`}>{t('projectDetail.eyebrow')}</p>
          <h1 className={`${headingFont} mt-3 text-[clamp(2rem,5vw,2.75rem)] leading-[1.08] tracking-[-0.02em]`}>
            {project.title}
          </h1>
        </motion.div>

        <article className="mt-10 text-[1.0625rem] leading-[1.7]">
          <p className="mb-[1.1rem]">
            <strong className="font-semibold">{t('projectDetail.typeLabel')}</strong> - {copy.type}
          </p>
          <p className="mb-[1.1rem]">
            <strong className="font-semibold">{t('projectDetail.roleLabel')}</strong> - {copy.role}
          </p>
          <p className="mb-[1.1rem]">
            <strong className="font-semibold">{t('projectDetail.stackLabel')}</strong> - {project.tags.join(', ')}.
          </p>
          {(project.liveUrl || project.githubUrl) && (
            <p className="mb-[1.1rem]">
              <strong className="font-semibold">{t('projectDetail.linksLabel')}</strong> -{' '}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[#9a9a9a]">
                  {t('projectDetail.viewLive')}
                </a>
              )}
              {project.liveUrl && project.githubUrl && ', '}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[#9a9a9a]">
                  GitHub
                </a>
              )}
            </p>
          )}

          <Reveal className="my-7 grid grid-cols-3 border border-[#373737]">
            {copy.stats.map((stat, index) => (
              <div key={stat.label} className={`px-4 py-[18px] ${index > 0 ? 'border-l border-[#373737]' : ''}`}>
                <div className="font-geist-mono text-[clamp(20px,3.4vw,32px)] font-medium tracking-[-0.02em] whitespace-nowrap">
                  {stat.value}
                </div>
                <div className="mt-1.5 font-geist-mono text-[10px] uppercase leading-normal tracking-[0.1em] text-[#9a9a9a]">
                  {stat.label}
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal>
            <SectionHeading>{t('projectDetail.workedOnHeading')}</SectionHeading>
            <DashList>
              {copy.workedOn.map((item) => (
                <DashItem key={item.lead}>
                  <strong className="font-semibold">{item.lead}</strong>
                  {item.detail && <> - {item.detail}</>}
                </DashItem>
              ))}
            </DashList>
          </Reveal>

          {study.screens.length > 0 && (
            <Reveal>
              <SectionHeading>{t('projectDetail.screensHeading')}</SectionHeading>
              <div className="space-y-5">
                {study.screens.map((screen) => (
                  <img
                    key={screen.src}
                    src={screen.src}
                    alt={screen.alt}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full border border-[#373737]"
                  />
                ))}
              </div>
            </Reveal>
          )}

          <Reveal>
            <SectionHeading>{t('projectDetail.hardestHeading')}</SectionHeading>
            <DashList>
              {copy.hardest.map((line) => (
                <DashItem key={line}>{line}</DashItem>
              ))}
            </DashList>
            {copy.flow && <Flow steps={copy.flow} />}
          </Reveal>

          <Reveal>
            <SectionHeading>{t('projectDetail.learnedHeading')}</SectionHeading>
            <DashList>
              {copy.learned.map((line) => (
                <DashItem key={line}>{line}</DashItem>
              ))}
            </DashList>
          </Reveal>
        </article>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-[#373737] pt-8">
          <Link to="/" className={`${monoLabel} hover:text-white transition-colors`}>
            ← {t('projectDetail.backToAll')}
          </Link>
          {nextProject && nextProject.slug !== project.slug && (
            <Link to={`/projects/${nextProject.slug}`} className={`${monoLabel} hover:text-white transition-colors`}>
              {t('projectDetail.nextProject')}: {nextProject.title} →
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail
