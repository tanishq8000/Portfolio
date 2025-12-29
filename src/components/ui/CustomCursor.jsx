import { useRef, useEffect } from 'react'
import { gsap } from '../../utils/animations'

export default function CustomCursor() {
    const cursorRef = useRef(null)
    const followerRef = useRef(null)
    const textRef = useRef(null)

    useEffect(() => {
        const cursor = cursorRef.current
        const follower = followerRef.current
        const text = textRef.current
        if (!cursor || !follower) return

        let mouseX = 0
        let mouseY = 0
        let cursorX = 0
        let cursorY = 0
        let followerX = 0
        let followerY = 0

        const handleMouseMove = (e) => {
            mouseX = e.clientX
            mouseY = e.clientY
        }

        // Animation loop for smooth following
        const animate = () => {
            // Cursor (fast)
            cursorX += (mouseX - cursorX) * 0.2
            cursorY += (mouseY - cursorY) * 0.2
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`

            // Follower (slow)
            followerX += (mouseX - followerX) * 0.1
            followerY += (mouseY - followerY) * 0.1
            follower.style.transform = `translate(${followerX}px, ${followerY}px)`

            requestAnimationFrame(animate)
        }

        animate()

        // Hover effects
        const handleLinkEnter = () => {
            gsap.to(cursor, { scale: 0.5, duration: 0.3 })
            gsap.to(follower, { scale: 1.5, duration: 0.3, borderColor: 'rgba(99, 102, 241, 0.5)' })
        }

        const handleLinkLeave = () => {
            gsap.to(cursor, { scale: 1, duration: 0.3 })
            gsap.to(follower, { scale: 1, duration: 0.3, borderColor: 'rgba(255, 255, 255, 0.3)' })
            if (text) text.textContent = ''
        }

        const handleViewEnter = (e) => {
            gsap.to(follower, { scale: 3, duration: 0.3, background: 'rgba(99, 102, 241, 0.1)' })
            if (text) {
                text.textContent = e.target.dataset.cursorText || 'View'
                gsap.to(text, { opacity: 1, duration: 0.3 })
            }
        }

        const handleViewLeave = () => {
            gsap.to(follower, { scale: 1, duration: 0.3, background: 'transparent' })
            if (text) gsap.to(text, { opacity: 0, duration: 0.3 })
        }

        document.addEventListener('mousemove', handleMouseMove)

        // Add hover listeners
        document.querySelectorAll('a, button, .clickable').forEach(el => {
            el.addEventListener('mouseenter', handleLinkEnter)
            el.addEventListener('mouseleave', handleLinkLeave)
        })

        document.querySelectorAll('[data-cursor="view"]').forEach(el => {
            el.addEventListener('mouseenter', handleViewEnter)
            el.addEventListener('mouseleave', handleViewLeave)
        })

        // Hide on mobile
        const mediaQuery = window.matchMedia('(max-width: 768px)')
        if (mediaQuery.matches) {
            cursor.style.display = 'none'
            follower.style.display = 'none'
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    return (
        <>
            <div ref={cursorRef} className="custom-cursor">
                <div className="cursor-dot"></div>
            </div>
            <div ref={followerRef} className="cursor-follower">
                <span ref={textRef} className="cursor-text"></span>
            </div>
        </>
    )
}
