import { useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const pageOrder = ['/', '/projects', '/about', '/contact']

export default function useScrollNavigation() {
    const navigate = useNavigate()
    const location = useLocation()
    const isNavigating = useRef(false)

    useEffect(() => {
        const handleScroll = () => {
            if (isNavigating.current) return

            const scrollTop = window.pageYOffset || document.documentElement.scrollTop
            const scrollHeight = document.documentElement.scrollHeight
            const clientHeight = document.documentElement.clientHeight

            // Check if scrolled to bottom (with small threshold)
            const isAtBottom = scrollTop + clientHeight >= scrollHeight - 50

            if (isAtBottom) {
                const currentIndex = pageOrder.indexOf(location.pathname)
                const nextIndex = currentIndex + 1

                // If there's a next page
                if (nextIndex < pageOrder.length) {
                    isNavigating.current = true
                    navigate(pageOrder[nextIndex])

                    // Reset navigation flag after transition
                    setTimeout(() => {
                        isNavigating.current = false
                    }, 1000)
                }
            }
        }

        // Add scroll listener with debounce
        let timeoutId
        const debouncedScroll = () => {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(handleScroll, 150)
        }

        window.addEventListener('scroll', debouncedScroll)
        return () => {
            window.removeEventListener('scroll', debouncedScroll)
            clearTimeout(timeoutId)
        }
    }, [navigate, location.pathname])
}
