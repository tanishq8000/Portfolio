import { useRef, useEffect } from 'react'
import { gsap } from '../../utils/animations'

export default function MagneticButton({ children, className = '', strength = 0.4, ...props }) {
    const buttonRef = useRef(null)
    const textRef = useRef(null)

    useEffect(() => {
        const button = buttonRef.current
        const text = textRef.current
        if (!button) return

        const handleMouseMove = (e) => {
            const rect = button.getBoundingClientRect()
            const x = e.clientX - rect.left - rect.width / 2
            const y = e.clientY - rect.top - rect.height / 2

            gsap.to(button, {
                x: x * strength,
                y: y * strength,
                duration: 0.4,
                ease: 'power2.out',
            })

            if (text) {
                gsap.to(text, {
                    x: x * strength * 0.5,
                    y: y * strength * 0.5,
                    duration: 0.4,
                    ease: 'power2.out',
                })
            }
        }

        const handleMouseLeave = () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: 'elastic.out(1, 0.3)',
            })

            if (text) {
                gsap.to(text, {
                    x: 0,
                    y: 0,
                    duration: 0.7,
                    ease: 'elastic.out(1, 0.3)',
                })
            }
        }

        button.addEventListener('mousemove', handleMouseMove)
        button.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            button.removeEventListener('mousemove', handleMouseMove)
            button.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [strength])

    return (
        <button ref={buttonRef} className={`magnetic-btn ${className}`} {...props}>
            <span ref={textRef} className="magnetic-btn-text">
                {children}
            </span>
        </button>
    )
}
