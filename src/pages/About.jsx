import { useRef, useEffect } from 'react'
import { gsap, easings } from '../utils/animations'
import BentoCard from '../components/ui/BentoCard'
import TechPill from '../components/ui/TechPill'
import useSmoothScroll from '../hooks/useSmoothScroll'
import profileImage from '../utils/latest pho.jpg'

const skills = {
    languages: ['C/C++', 'C#', 'Java', 'JavaScript', 'TypeScript', 'SQL'],
    frameworks: ['React.js', 'ASP.NET Core', 'Node.js', 'Next.js', 'REST APIs'],
    architecture: ['CQRS', 'Event-Driven Architecture', 'Layered Architecture', 'System Design', 'OOD', 'Microservices', 'Scalability'],
    infrastructure: ['SQL Server', 'MongoDB', 'MySQL', 'Redis', 'Azure (App Insights, Blob Storage, Key Vault)', 'Multi-Tier Caching'],
    devops: ['Jest', 'Cypress', 'Git', 'GitHub', 'CI/CD', 'Docker', 'Grafana', 'Agile'],
    ai: ['LLM Agents', 'Generative AI', 'Agentic AI', 'MCP'],
};


const experience = [
    {
        year: 'Mar 2026 - Present',
        title: 'Intermediate Software Engineer (SDE-2)',
        company: 'Q2 Software, Bengaluru',
        description:
            'Automated onboarding for 100+ enterprise clients by designing a multi-step bulk-ingestion system, cutting onboarding from 3+ hours to ~20 minutes (~90% faster). Contributed to a multi-tier read-through cache (in-process → Redis → Blob → DB), cutting repeat-read latency ~90%. Improved platform resilience with circuit breaker and timeout-guarded reads. Resolved 15+ cross-cutting UI/API defects backed by Jest and Cypress tests. Enabled global readiness across 10+ pages through localization and leveraged AI tooling (Claude/Codex) to accelerate development.',
    },
    {
        year: 'Feb 2024 - Feb 2026',
        title: 'Advanced Associate Software Engineer',
        company: 'Accenture, Bengaluru',
        description:
            'Delivered full-stack feature enhancements for applications serving 10,000+ users, translating client requirements into frontend (React) and backend (Node.js / ASP.NET, SQL Server) changes across multiple production systems. Rebuilt high-traffic UI components (React, ASP.NET Razor, Tailwind) contributing to up to a 20% drop in bounce rate. Improved application reliability by diagnosing API and SQL Server issues, contributing to a 30% reduction in downtime. Sustained 99.9% application uptime by owning production monitoring in Azure and Grafana.',
    },
];


export default function About() {
    const containerRef = useRef(null)

    useSmoothScroll()

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.3 })

            tl.fromTo('.about-hero',
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, duration: 1.2, ease: easings.cinematic }
            )

            tl.fromTo('.about-intro p',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: easings.cinematic },
                '-=0.6'
            )

            gsap.fromTo('.skill-section',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: easings.cinematic,
                    scrollTrigger: {
                        trigger: '.skills-container',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    }
                }
            )

            gsap.fromTo('.timeline-item',
                { opacity: 0, x: -60 },
                {
                    opacity: 1,
                    x: 0,
                    stagger: 0.2,
                    duration: 1,
                    ease: easings.cinematic,
                    scrollTrigger: {
                        trigger: '.experience-timeline',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    }
                }
            )

        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={containerRef} className="about-page" style={{ paddingTop: '140px' }}>
            <div className="container">
                {/* Hero */}
                <div className="about-hero" style={{ textAlign: 'center', marginBottom: '8rem' }}>
                    <div style={{
                        width: '200px',
                        height: '200px',
                        margin: '0 auto 2rem',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '2px solid var(--color-cyan)',
                        position: 'relative',
                    }}>
                        <img
                            src={profileImage}
                            alt="Profile"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'radial-gradient(circle, transparent 60%, rgba(0, 217, 255, 0.2))',
                        }}></div>
                    </div>

                    <h1 style={{ marginBottom: '1.5rem' }}>About Me</h1>
                    <p className="large-text" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        I’m a software engineer passionate about building scalable, high-performance web applications that solve real-world problems.
                    </p>
                </div>

                {/* Intro */}
                <div className="about-intro" style={{ maxWidth: '900px', margin: '0 auto 8rem', textAlign: 'center' }}>
                    <p style={{ marginBottom: '1.5rem' }}>
                        I'm Tanishq Khandelwal, currently working as an Intermediate Software Engineer (SDE-2) at Q2 Software with over 3 years of experience in building full-stack web applications. I've worked on designing and developing scalable, performant, and maintainable solutions using modern web technologies.
                    </p>
                    <p style={{ marginBottom: '1.5rem' }}>
                        My experience spans across frontend and backend development, where I enjoy building clean APIs, efficient data flows, multi-tier caching systems, and user-focused interfaces. I focus on writing reliable code and choosing the right tools to solve real-world problems effectively.
                    </p>
                    <p style={{ marginBottom: '1.5rem' }}>
                        I have a strong foundation in Data Structures and Algorithms and actively practice competitive programming to sharpen my problem-solving skills:
                    </p>
                    <p>
                        LeetCode Knight (Max Rating: 2025 | Top 2.2% | 1270+ Solved)
                    </p>
                    <p>GFG (Max Rating: 1879 | 1000+ Solved)</p>
                    <p style={{ marginBottom: '1.5rem' }}>Ranked 1st among 3,000+ participants in an inter-university coding competition</p>

                    <p style={{ marginBottom: '1.5rem' }}>Always open to meaningful conversations and opportunities to build something impactful together.</p>

                    <a
                        href="https://drive.google.com/file/d/15MGtATXUEjWW7Kj4gz4-WYvNTbvKUo7E/view"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '1rem 2.5rem',
                            background: 'var(--color-cyan)',
                            color: '#000',
                            borderRadius: '100px',
                            textDecoration: 'none',
                            fontWeight: '600',
                            fontSize: '1rem',
                            transition: 'all 0.3s',
                            boxShadow: '0 0 30px var(--color-cyan-glow)',
                            marginTop: '1rem'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                        Download Resume
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                    </a>
                </div>

                {/* Skills */}
                <div className="skills-container" style={{ marginBottom: '8rem' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '4rem' }}>Tech Stack</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {Object.entries(skills).map(([category, items]) => (
                            <BentoCard key={category} className="skill-section">
                                <h3 style={{
                                    fontSize: '1.125rem',
                                    marginBottom: '1.5rem',
                                    color: 'var(--color-cyan)',
                                    textTransform: 'capitalize',
                                }}>
                                    {category}
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {items.map((skill, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                padding: '0.75rem',
                                                background: 'rgba(255, 255, 255, 0.03)',
                                                borderRadius: '12px',
                                                fontSize: '0.95rem',
                                                color: 'var(--color-text-secondary)',
                                            }}
                                        >
                                            {skill}
                                        </div>
                                    ))}
                                </div>
                            </BentoCard>
                        ))}
                    </div>
                </div>

                {/* Experience */}
                <div style={{ marginBottom: '8rem' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '4rem' }}>Experience</h2>

                    <div className="experience-timeline" style={{ maxWidth: '900px', margin: '0 auto' }}>
                        {experience.map((exp, index) => (
                            <BentoCard
                                key={index}
                                className="timeline-item"
                                style={{ marginBottom: '2rem' }}
                            >
                                <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '2rem', alignItems: 'start' }}>
                                    <span className="meta-text" style={{ color: 'var(--color-cyan)' }}>
                                        {exp.year}
                                    </span>
                                    <div>
                                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                                            {exp.title}
                                        </h3>
                                        <p style={{
                                            color: 'var(--color-text-muted)',
                                            marginBottom: '1rem',
                                            fontSize: '0.95rem'
                                        }}>
                                            {exp.company}
                                        </p>
                                        <p style={{ color: 'var(--color-text-secondary)' }}>{exp.description}</p>
                                    </div>
                                </div>
                            </BentoCard>
                        ))}
                    </div>
                </div>

                {/* Philosophy */}
                <div className="philosophy-section">
                    <p className="philosophy-quote">
                        Great software isn't just about code—it's about solving real problems
                        with elegant, scalable systems that stand the test of time.
                    </p>
                </div>
            </div>
        </div >
    )
}
