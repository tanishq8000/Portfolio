import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger, easings } from '../../utils/animations'
import MagneticButton from '../ui/MagneticButton'

export default function SkillsCanvas({ skills = [] }) {
    const containerRef = useRef(null)

    useEffect(() => {
        if (!containerRef.current) return

        const orbs = containerRef.current.querySelectorAll('.skill-3d-orb')

        // Floating animation for each orb
        orbs.forEach((orb, i) => {
            const delay = i * 0.15
            const duration = 3 + Math.random() * 2

            gsap.to(orb, {
                y: '+=20',
                duration,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
                delay,
            })

            gsap.to(orb, {
                rotateY: 360,
                duration: duration * 3,
                ease: 'none',
                repeat: -1,
                delay,
            })
        })

        // Scroll-triggered animation
        gsap.fromTo(orbs,
            { scale: 0, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                stagger: { each: 0.1, from: 'random' },
                duration: 0.8,
                ease: easings.back,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                }
            }
        )

        return () => ScrollTrigger.getAll().forEach(t => t.kill())
    }, [skills])

    return (
        <div ref={containerRef} className="skills-3d-container">
            {skills.map((skill, i) => (
                <div
                    key={skill.name}
                    className="skill-3d-orb"
                    style={{
                        '--skill-color': skill.color,
                        '--delay': `${i * 0.1}s`,
                    }}
                >
                    <div className="skill-3d-orb-face front">{skill.name}</div>
                    <div className="skill-3d-orb-face back">{skill.name}</div>
                    <div className="skill-3d-orb-glow"></div>
                </div>
            ))}
        </div>
    )
}
