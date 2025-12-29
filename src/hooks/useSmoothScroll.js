import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../utils/animations'

export default function useSmoothScroll() {
    const lenisRef = useRef(null)

    useEffect(() => {
        // Initialize Lenis for smooth scrolling
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2,
        })

        lenisRef.current = lenis

        // Connect Lenis to GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update)

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000)
        })

        gsap.ticker.lagSmoothing(0)

        // Handle anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault()
                const target = document.querySelector(anchor.getAttribute('href'))
                if (target) {
                    lenis.scrollTo(target)
                }
            })
        })

        return () => {
            lenis.destroy()
            gsap.ticker.remove(lenis.raf)
        }
    }, [])

    return lenisRef
}
