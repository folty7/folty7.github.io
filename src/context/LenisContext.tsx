import Lenis from 'lenis'
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

type LenisContextValue = {
  lenis: Lenis | null
  scrollY: number
}

const LenisContext = createContext<LenisContextValue>({ lenis: null, scrollY: 0 })

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const [scrollY, setScrollY] = useState(0)
  const [, force] = useState(0)
  const location = useLocation()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    })

    lenisRef.current = lenis
    force((n) => n + 1)

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

  useEffect(() => {
    if (!lenisRef.current) return
    lenisRef.current.scrollTo(0, { immediate: true })
    setScrollY(0)
  }, [location.pathname])

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current, scrollY }}>
      {children}
    </LenisContext.Provider>
  )
}

export function useLenis() {
  return useContext(LenisContext)
}
