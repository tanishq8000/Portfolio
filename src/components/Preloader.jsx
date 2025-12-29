import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Preloader({ onComplete }) {
    const preloaderRef = useRef(null)
    const progressRef = useRef(null)
    const textRef = useRef(null)
    const counterRef = useRef(null)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                // Exit animation
                const exitTl = gsap.timeline({
                    onComplete: () => onComplete?.()
                })

                exitTl
                    .to(textRef.current, {
                        y: -100,
                        opacity: 0,
                        duration: 0.6,
                        ease: 'power3.inOut',
                    })
                    .to(counterRef.current, {
                        y: -50,
                        opacity: 0,
                        duration: 0.4,
                        ease: 'power3.inOut',
                    }, '-=0.4')
                    .to(preloaderRef.current, {
                        yPercent: -100,
                        duration: 1,
                        ease: 'power4.inOut',
                    }, '-=0.2')
            }
        })

        // Animate progress
        const duration = 2.5
        const progressAnimation = { value: 0 }

        tl.to(progressAnimation, {
            value: 100,
            duration,
            ease: 'power2.inOut',
            onUpdate: () => {
                const value = Math.round(progressAnimation.value)
                setProgress(value)
                if (progressRef.current) {
                    progressRef.current.style.width = `${value}%`
                }
            }
        })

        // Text reveal animation
        tl.fromTo(textRef.current?.querySelectorAll('.char') || [],
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.05,
                duration: 0.8,
                ease: 'power3.out'
            },
            0.2
        )

        return () => tl.kill()
    }, [onComplete])

    const text = "PORTFOLIO"

    return (
        <div ref={preloaderRef} className="preloader">
            <div className="preloader-content">
                <div ref={textRef} className="preloader-text">
                    {text.split('').map((char, i) => (
                        <span key={i} className="char" style={{ display: 'inline-block' }}>
                            {char}
                        </span>
                    ))}
                </div>

                <div className="preloader-progress-container">
                    <div ref={progressRef} className="preloader-progress-bar"></div>
                </div>

                <div ref={counterRef} className="preloader-counter">
                    <span className="preloader-counter-value">{progress}</span>
                    <span className="preloader-counter-percent">%</span>
                </div>
            </div>

            <div className="preloader-bg">
                <div className="preloader-bg-layer"></div>
                <div className="preloader-bg-layer"></div>
            </div>
        </div>
    )
}
