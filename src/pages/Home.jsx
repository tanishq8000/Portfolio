import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger, easings } from '../utils/animations'
import BentoCard from '../components/ui/BentoCard'
import TechPill from '../components/ui/TechPill'
import useSmoothScroll from '../hooks/useSmoothScroll'
import profileImage from '../utils/latest pho.jpg'
import welthImage from '../utils/Welth_Image.png'
import chatImage from '../utils/Chat_Image.png'

const techStack = [
    'Full-Stack Web Development',
    'Frontend Engineering (React, Next.js)',
    'Backend APIs & Services (Node.js, ASP.NET Core)',
    'RESTful API Design',
    'Database Design & Optimization',
    'Cloud & Application Monitoring (AWS, Azure)',
    'Performance Optimization',
    'Authentication & Security (JWT)',
];

const projectStories = [
    {
        id: 1,
        title: 'Talk-A-Tive - Real Time Chat Application',
        description: 'Built a full-stack real-time chat app using the MERN stack and Socket.IO with support for one-to-one and group messaging, typing indicators, and instant notifications. Implemented secure authentication using JWT and Bcrypt, and developed RESTful APIs with a responsive Chakra UI for scalable, low-latency communication.',
        image: chatImage,
        github: 'https://github.com/tanishq8000/Talk-A-Tive',
        live: 'https://talk-a-tive-fiz9.onrender.com/'
    },
    {
        id: 2,
        title: 'Welth - AI-Powered Finance Tracker',
        description: 'Built a full-stack AI-powered finance tracking platform using Next.js, Prisma, Tailwind, Shadcn UI, and Clerk, supporting multi-account tracking, budget management, and real-time financial visualizations. Integrated Gemini AI for receipt scanning and personalized financial insights, and automated backend workflows with Inngest for recurring transactions, budget alerts, and monthly reports.',
        image: welthImage,
        github: 'https://github.com/tanishq8000/Welth',
        live: 'https://welth-kohl.vercel.app/'
    },
]

export default function Home() {
    const containerRef = useRef(null)

    useSmoothScroll()

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero animations
            const tl = gsap.timeline({ delay: 0.5 })

            tl.fromTo('.hero-profile-card',
                { opacity: 0, x: -60 },
                { opacity: 1, x: 0, duration: 1.2, ease: easings.cinematic }
            )

            tl.fromTo('.hero-title-section h1',
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, duration: 1, ease: easings.cinematic },
                '-=0.8'
            )

            tl.fromTo('.hero-title-section .meta-text',
                { opacity: 0 },
                { opacity: 1, duration: 0.8, ease: easings.smooth },
                '-=0.6'
            )

            tl.fromTo('.hero-description',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: easings.cinematic },
                '-=0.5'
            )

            tl.fromTo('.tech-pill',
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, stagger: 0.08, duration: 0.6, ease: easings.back },
                '-=0.4'
            )

            // Story cards scroll animation
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

            // Philosophy quote animation
            gsap.fromTo('.philosophy-quote',
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: easings.cinematic,
                    scrollTrigger: {
                        trigger: '.philosophy-section',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    }
                }
            )

        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={containerRef} className="home-page">
            {/* Hero Section - Bento Grid */}
            <section className="section">
                <div className="container">
                    <div className="hero-bento-grid">
                        {/* Profile Card - Sticky */}
                        <BentoCard className="hero-profile-card">
                            <div className="hero-avatar">
                                <img
                                    src={profileImage}
                                    alt="Profile"
                                />
                            </div>
                            <h3 style={{ marginBottom: '0.5rem' }}>Tanishq Khandelwal</h3>
                            <p className="meta-text" style={{ marginBottom: '1.5rem' }}>Software Engineer</p>
                            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                Building scalable, high-performance web applications from frontend to backend.
                            </p>

                            <a
                                href="https://drive.google.com/file/d/1rl5TEFhh-EBKSUgzbzN5Vke-ZTa20_xl/view"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.875rem 1.75rem',
                                    background: 'transparent',
                                    color: 'var(--color-cyan)',
                                    border: '1px solid var(--color-cyan)',
                                    borderRadius: '100px',
                                    textDecoration: 'none',
                                    fontWeight: '600',
                                    fontSize: '0.875rem',
                                    transition: 'all 0.3s',
                                    width: '100%',
                                    justifyContent: 'center'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = 'var(--color-cyan)'
                                    e.target.style.color = '#000'
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = 'transparent'
                                    e.target.style.color = 'var(--color-cyan)'
                                }}
                            >
                                Download Resume
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                            </a>
                        </BentoCard>

                        {/* Main Content */}
                        <div className="hero-content">
                            {/* Title Section */}
                            <div className="hero-title-section">
                                <p className="meta-text">Full-Stack • Frontend • Backend</p>
                                <h1>Building End-to-End Web Experiences</h1>
                                <p className="hero-description">
                                    I build modern, scalable web applications by working across both frontend and backend. From crafting clean, responsive user interfaces to designing robust APIs and data-driven systems, I enjoy turning ideas into reliable, high-performance products using the right tools for the job.
                                </p>
                            </div>

                            {/* Tech Stack Pills */}
                            <div>
                                <h3 style={{ marginBottom: '1.5rem' }}>Core Expertise</h3>
                                <div className="tech-pills-container">
                                    {techStack.map((tech, i) => (
                                        <TechPill key={i}>{tech}</TechPill>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="stats-grid">
                                <div className="stat-item">
                                    <span className="stat-number">2+</span>
                                    <span className="stat-label">Years Experience</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">5+</span>
                                    <span className="stat-label">Projects Shipped</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">99%</span>
                                    <span className="stat-label">Client Satisfaction</span>
                                </div>
                            </div>

                            {/* Competitive Programming Section */}
                            <div style={{ marginTop: '4rem' }}>
                                <h2 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Competitive Programming</h2>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                                    {/* LeetCode */}
                                    <a
                                        href="https://leetcode.com/u/tanishq18072002/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <BentoCard style={{ height: '100%', cursor: 'pointer' }}>
                                            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🏆</div>
                                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--color-cyan)' }}>LeetCode</h3>
                                            <p className="meta-text" style={{ marginBottom: '0.5rem' }}>Knight Badge</p>
                                            <p style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.25rem' }}>2025 (Top 2.2%)</p>
                                            <p className="meta-text" style={{ marginBottom: '0.75rem' }}>Max Rating</p>
                                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>1150+ Problems Solved</p>
                                        </BentoCard>
                                    </a>

                                    {/* GeeksforGeeks */}
                                    <a
                                        href="https://www.geeksforgeeks.org/profile/tanishqkhandelwal18072002"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <BentoCard style={{ height: '100%', cursor: 'pointer' }}>
                                            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⭐</div>
                                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--color-lavender)' }}>GeeksforGeeks</h3>
                                            <p className="meta-text" style={{ marginBottom: '0.5rem' }}>4 Star Coder</p>
                                            <p style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.25rem' }}>2980+</p>
                                            <p className="meta-text" style={{ marginBottom: '0.75rem' }}>Coding Score</p>
                                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>1000+ Problems Solved</p>
                                        </BentoCard>
                                    </a>

                                    {/* CodeChef */}
                                    <a
                                        href="https://www.codechef.com/users/tanishq1807"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <BentoCard style={{ height: '100%', cursor: 'pointer' }}>
                                            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⭐</div>
                                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--color-magenta)' }}>CodeChef</h3>
                                            <p className="meta-text" style={{ marginBottom: '0.5rem' }}>3 Star Coder</p>
                                            <p style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.25rem' }}>1758*</p>
                                            <p className="meta-text" style={{ marginBottom: '0.75rem' }}>Max Rating</p>
                                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>300+ Problems Solved</p>
                                        </BentoCard>
                                    </a>

                                    {/* Codeforces */}
                                    <a
                                        href="https://codeforces.com/profile/tanishq2002"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <BentoCard style={{ height: '100%', cursor: 'pointer' }}>
                                            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>👨‍💻</div>
                                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--color-blue)' }}>Codeforces</h3>
                                            <p className="meta-text" style={{ marginBottom: '0.5rem' }}>Pupil</p>
                                            <p style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.25rem' }}>1300+</p>
                                            <p className="meta-text" style={{ marginBottom: '0.75rem' }}>Max Rating</p>
                                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>300+ Problems Solved</p>
                                        </BentoCard>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* Project Stories */}
            < section className="section" >
                <div className="container">
                    <h2 style={{ marginBottom: '3rem', textAlign: 'center' }}>Featured Projects</h2>

                    <div className="projects-grid">
                        {projectStories.map((story) => (
                            <BentoCard
                                key={story.id}
                                className="story-card"
                                data-cursor="view"
                            >
                                <div className="bento-card-image">
                                    <img src={story.image} alt={story.title} />
                                </div>

                                <h2 className="story-title">{story.title}</h2>
                                <p className="story-description">{story.description}</p>

                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                                    <a
                                        href={story.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="read-story-btn"
                                        onClick={(e) => { e.preventDefault(); window.open(story.github, '_blank'); }}
                                    >
                                        Code
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                            <polyline points="12 5 19 12 12 19" />
                                        </svg>
                                    </a>

                                    <a
                                        href={story.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="read-story-btn"
                                        onClick={(e) => { e.preventDefault(); window.open(story.live, '_blank'); }}
                                    >
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
            </section >

            {/* Philosophy Section */}
            < section className="philosophy-section" >
                <div className="container">
                    <p className="philosophy-quote">
                        Great software isn't just about code—it's about solving real problems
                        with elegant, scalable systems that stand the test of time.
                    </p>
                </div>
            </section >
        </div >
    )
}
