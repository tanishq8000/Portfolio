import { useRef, useEffect } from 'react'
import { gsap, easings } from '../utils/animations'
import BentoCard from '../components/ui/BentoCard'
import useSmoothScroll from '../hooks/useSmoothScroll'
import vibhasImage from '../utils/Vibhas_Image.png'
import snakeImage from '../utils/Snake_Image.png'
import welthImage from '../utils/Welth_Image.png'
import chatImage from '../utils/Chat_Image.png'

const projects = [
    {
        id: 1,
        title: 'Talk-A-Tive - Real-Time Chat Application',
        description:
            'Designed and developed a full-stack real-time chat platform supporting one-to-one and group messaging with typing indicators and instant notifications. Implemented secure authentication using JWT and Bcrypt, real-time communication with Socket.IO, and scalable REST APIs.',
        image: chatImage,
        category: 'Full-Stack Development',
        tech: ['React', 'Node.js', 'Express.js', 'Socket.IO', 'MongoDB', 'JWT'],
        github: 'https://github.com/tanishq8000/Talk-A-Tive',
        live: 'https://talk-a-tive-fiz9.onrender.com/',
    },
    {
        id: 2,
        title: 'Welth - An AI Powered Finance Tracker',
        description:
            'Built a full-stack AI-driven finance tracking platform with multi-account support, budget management, and real-time data visualizations. Integrated Gemini AI for receipt scanning and personalized insights, and automated recurring transactions and reports using serverless workflows.',
        image: welthImage,
        category: 'Full-Stack & AI',
        tech: ['Next.js', 'Prisma', 'Gemini AI', 'Tailwind CSS', 'Inngest', 'MongoDB'],
        github: 'https://github.com/tanishq8000/Welth',
        live: 'https://welth-kohl.vercel.app/',
    },
    {
        id: 3,
        title: 'Snake Mania - A Classic Arcade Game',
        description:
            'Developed a classic Snake game using JavaScript, HTML, and CSS with features like background music, score tracking, and high-score persistence. Focused on smooth gameplay performance, collision detection, and proper handling of game-over scenarios and edge cases.',
        image: snakeImage,
        category: 'Frontend Development',
        tech: ['JavaScript', 'HTML', 'CSS'],
        github: 'https://github.com/tanishq8000/SnakeMania',
        live: 'https://visionary-nougat-354e12.netlify.app/',
    },
    {
        id: 4,
        title: 'A Responsive Portfolio Website For Client',
        description:
            'Designed and developed a fully responsive Portfolio website using HTML, CSS, JavaScript, and Bootstrap to showcase blogs, journey, events, achievements, and posts of Client. Focused on clean UI, accessibility, and a user-friendly layout to deliver an engaging browsing experience across devices.',
        image: vibhasImage,
        category: 'Frontend Development',
        tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
        github: 'https://github.com/tanishq8000/VibhasThakur',
        live: 'https://nimble-taffy-bb8b5c.netlify.app/',
    },
]

export default function Projects() {
    const containerRef = useRef(null)

    useSmoothScroll()

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header animation
            gsap.fromTo('.projects-header',
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: easings.cinematic,
                    delay: 0.3
                }
            )

            // Story cards animation
            gsap.utils.toArray('.story-card').forEach((card, i) => {
                gsap.fromTo(card,
                    { opacity: 0, y: 80 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: easings.cinematic,
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        }
                    }
                )
            })

        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={containerRef} className="projects-page" style={{ paddingTop: '140px' }}>
            <div className="container">
                <div className="projects-header" style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <h1 style={{ marginBottom: '1.5rem' }}>Projects</h1>
                    <p className="large-text" style={{ maxWidth: '700px', margin: '0 auto' }}>
                        A collection of projects showcasing full-stack development, clean architecture,
                        and practical solutions to real-world problems.
                    </p>
                </div>

                <div className="projects-grid">
                    {projects.map((project) => (
                        <BentoCard
                            key={project.id}
                            className="story-card"
                            data-cursor="view"
                        >
                            <div className="bento-card-image">
                                <img src={project.image} alt={project.title} />
                            </div>

                            <div className="story-meta">
                                <span className="meta-text">{project.category}</span>
                            </div>

                            <h2 className="story-title">{project.title}</h2>
                            <p className="story-description">{project.description}</p>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
                                {project.tech.map((tech, i) => (
                                    <span
                                        key={i}
                                        style={{
                                            padding: '0.375rem 0.875rem',
                                            background: 'rgba(0, 217, 255, 0.1)',
                                            border: '1px solid rgba(0, 217, 255, 0.3)',
                                            borderRadius: '100px',
                                            fontSize: '0.75rem',
                                            color: '#00D9FF',
                                        }}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                                <a href={project.github} target='_blank' className="read-story-btn">
                                    Code
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                        <polyline points="12 5 19 12 12 19" />
                                    </svg>
                                </a>
                                <a href={project.live} target='_blank' className="read-story-btn">
                                    Live
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                        <polyline points="12 5 19 12 12 19" />
                                    </svg>
                                </a>
                            </div>
                        </BentoCard>
                    ))}
                </div>
            </div>
        </div >
    )
}
