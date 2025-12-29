import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function ProjectCard({ project, index }) {
    const [rotateX, setRotateX] = useState(0)
    const [rotateY, setRotateY] = useState(0)
    const cardRef = useRef(null)

    const handleMouseMove = (e) => {
        if (!cardRef.current) return

        const rect = cardRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateXValue = ((y - centerY) / centerY) * -10
        const rotateYValue = ((x - centerX) / centerX) * 10

        setRotateX(rotateXValue)
        setRotateY(rotateYValue)
    }

    const handleMouseLeave = () => {
        setRotateX(0)
        setRotateY(0)
    }

    return (
        <motion.article
            ref={cardRef}
            className="project-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transformStyle: 'preserve-3d',
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div style={{ overflow: 'hidden' }}>
                <img
                    src={project.image}
                    alt={project.title}
                    className="project-card-image"
                    loading="lazy"
                />
            </div>
            <div className="project-card-content">
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-description">{project.description}</p>
                <div className="project-card-tags">
                    {project.tags.map((tag, i) => (
                        <span key={i} className="tag">{tag}</span>
                    ))}
                </div>
            </div>
        </motion.article>
    )
}
