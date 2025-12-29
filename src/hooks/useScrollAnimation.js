import { useState, useEffect, useCallback } from 'react'

export default function useScrollAnimation() {
    const [scrollY, setScrollY] = useState(0)
    const [scrollProgress, setScrollProgress] = useState(0)
    const [scrollDirection, setScrollDirection] = useState('down')
    const [lastScrollY, setLastScrollY] = useState(0)

    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY
        const windowHeight = window.innerHeight
        const documentHeight = document.documentElement.scrollHeight

        // Calculate scroll progress (0 to 1)
        const progress = currentScrollY / (documentHeight - windowHeight)

        // Determine scroll direction
        const direction = currentScrollY > lastScrollY ? 'down' : 'up'

        setScrollY(currentScrollY)
        setScrollProgress(Math.min(Math.max(progress, 0), 1))
        setScrollDirection(direction)
        setLastScrollY(currentScrollY)
    }, [lastScrollY])

    useEffect(() => {
        // Set initial values
        handleScroll()

        // Add scroll listener with passive option for better performance
        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [handleScroll])

    return {
        scrollY,
        scrollProgress,
        scrollDirection,
        // Helper to check if past a certain scroll threshold
        isPast: (threshold) => scrollY > threshold,
        // Get section progress (useful for section-based animations)
        getSectionProgress: (startY, endY) => {
            if (scrollY < startY) return 0
            if (scrollY > endY) return 1
            return (scrollY - startY) / (endY - startY)
        },
    }
}
