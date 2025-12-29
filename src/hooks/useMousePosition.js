import { useState, useEffect, useCallback } from 'react'

export default function useMousePosition() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [normalizedPosition, setNormalizedPosition] = useState({ x: 0, y: 0 })

    const handleMouseMove = useCallback((event) => {
        const { clientX, clientY } = event
        const { innerWidth, innerHeight } = window

        // Absolute position
        setMousePosition({ x: clientX, y: clientY })

        // Normalized position (-1 to 1)
        setNormalizedPosition({
            x: (clientX / innerWidth) * 2 - 1,
            y: -(clientY / innerHeight) * 2 + 1,
        })
    }, [])

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove, { passive: true })

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [handleMouseMove])

    return {
        mousePosition,
        normalizedPosition,
        // Get position relative to an element
        getRelativePosition: (element) => {
            if (!element) return { x: 0, y: 0 }
            const rect = element.getBoundingClientRect()
            return {
                x: ((mousePosition.x - rect.left) / rect.width) * 2 - 1,
                y: -((mousePosition.y - rect.top) / rect.height) * 2 + 1,
            }
        },
    }
}
