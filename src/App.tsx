import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import BubbleMenu from './components/BubbleMenu'
import { LenisProvider, useLenis } from './context/LenisContext'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'

function GlobalMenu() {
  const { t } = useTranslation()
  const { lenis } = useLenis()
  const location = useLocation()
  const navigate = useNavigate()

  const goToSection = (targetId: string) => {
    if (location.pathname !== '/') {
      navigate('/')
      // wait for Home to mount and Lenis to reset, then scroll
      setTimeout(() => {
        const el = document.querySelector(targetId) as HTMLElement | null
        if (el && lenis) {
          lenis.scrollTo(el, { offset: 0, duration: 2 })
        } else if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 250)
      return
    }
    const target = document.querySelector(targetId) as HTMLElement | null
    if (target && lenis) {
      lenis.scrollTo(target, { offset: 0, duration: 2 })
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const goToTop = () => {
    if (location.pathname !== '/') {
      navigate('/')
      return
    }
    if (lenis) lenis.scrollTo(0, { duration: 2 })
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
        goToTop()
      }
    },
    {
      label: t('menu.about'),
      href: '#about',
      ariaLabel: t('menu.about'),
      rotation: 8,
      hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' },
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        goToSection('#about')
      }
    },
    {
      label: t('menu.education'),
      href: '#education',
      ariaLabel: t('menu.education'),
      rotation: -8,
      hoverStyles: { bgColor: '#06b6d4', textColor: '#ffffff' },
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        goToSection('#education')
      }
    },
    {
      label: t('menu.skills'),
      href: '#skills',
      ariaLabel: t('menu.skills'),
      rotation: 8,
      hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' },
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        goToSection('#skills')
      }
    },
    {
      label: t('menu.projects'),
      href: '#projects',
      ariaLabel: t('menu.projects'),
      rotation: 8,
      hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' },
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        goToSection('#projects')
      }
    },
    {
      label: t('menu.contact'),
      href: '#contact',
      ariaLabel: t('menu.contact'),
      rotation: -8,
      hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' },
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        goToSection('#contact')
      }
    }
  ]

  return (
    <BubbleMenu
      items={items}
      menuAriaLabel="Toggle navigation"
      menuBg="#ffffff"
      menuContentColor="#111111"
      useFixedPosition={true}
      animationEase="back.out(1.5)"
      animationDuration={0.5}
      staggerDelay={0.12}
    />
  )
}

function App() {
  return (
    <LenisProvider>
      <GlobalMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </LenisProvider>
  )
}

export default App
