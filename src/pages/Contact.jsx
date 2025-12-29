import { useState, useRef, useEffect } from 'react'
import { gsap, easings } from '../utils/animations'
import BentoCard from '../components/ui/BentoCard'
import useSmoothScroll from '../hooks/useSmoothScroll'
import emailjs from '@emailjs/browser'
import { EMAILJS_CONFIG } from '../config/emailjs'

const contactLinks = [
    {
        title: 'Email',
        value: 'tanishqkhandelwal18072002@gmail.com',
        href: 'mailto:tanishqkhandelwal18072002@gmail.com',
        icon: '✉️',
    },
    {
        title: 'LinkedIn',
        value: 'Tanishq Khandelwal',
        href: 'https://www.linkedin.com/in/tanishq-khandelwal-bab4a9211/',
        icon: '💼',
    },
    {
        title: 'GitHub',
        value: 'tanishq8000',
        href: 'https://github.com/tanishq8000',
        icon: '🐙',
    },
]

export default function Contact() {
    const containerRef = useRef(null)
    const formRef = useRef(null)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState('')

    useSmoothScroll()

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.3 })

            tl.fromTo('.contact-header',
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, duration: 1.2, ease: easings.cinematic }
            )

            tl.fromTo('.contact-link-card',
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: easings.cinematic },
                '-=0.8'
            )

            tl.fromTo('.contact-form-card',
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 1, ease: easings.cinematic },
                '-=0.6'
            )

        }, containerRef)

        return () => ctx.revert()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError('')

        // Initialize EmailJS with your public key
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)

        try {
            // Send email using EmailJS
            const result = await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    message: formData.message,
                    to_name: 'Alex Morrison', // Replace with your name
                }
            )

            console.log('Email sent successfully:', result)
            setSubmitted(true)
            setFormData({ name: '', email: '', message: '' })

            // Hide success message after 5 seconds
            setTimeout(() => setSubmitted(false), 5000)
        } catch (err) {
            console.error('Failed to send email:', err)
            setError('Failed to send message. Please try again or email me directly.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div ref={containerRef} className="contact-page" style={{ paddingTop: '140px' }}>
            <div className="container">
                {/* Header */}
                <div className="contact-header" style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <p className="meta-text" style={{ marginBottom: '1rem' }}>Get in Touch</p>
                    <h1 style={{ marginBottom: '1.5rem' }}>Let's Build Something Great</h1>
                    <p className="large-text" style={{ maxWidth: '700px', margin: '0 auto' }}>
                        Have a project in mind or want to collaborate? I'm always interested
                        in hearing about new opportunities and challenges.
                    </p>
                </div>

                {/* Contact Links */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '5rem',
                }}>
                    {contactLinks.map((link, i) => (
                        <a
                            key={i}
                            href={link.href}
                            target={link.href.startsWith('http') ? '_blank' : undefined}
                            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="contact-link-card"
                            style={{ textDecoration: 'none' }}
                        >
                            <BentoCard style={{ height: '100%' }}>
                                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{link.icon}</div>
                                <p className="meta-text" style={{ marginBottom: '0.5rem' }}>{link.title}</p>
                                <p style={{ color: 'var(--color-text)', fontSize: '1rem' }}>{link.value}</p>
                            </BentoCard>
                        </a>
                    ))}
                </div>

                {/* Contact Form */}
                <BentoCard large className="contact-form-card" style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Send a Message</h2>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label
                                htmlFor="name"
                                className="meta-text"
                                style={{ display: 'block', marginBottom: '0.75rem' }}
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '1rem 1.25rem',
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: '16px',
                                    fontSize: '1rem',
                                    color: 'var(--color-text)',
                                    fontFamily: 'inherit',
                                    transition: 'all 0.3s',
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--color-cyan)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="meta-text"
                                style={{ display: 'block', marginBottom: '0.75rem' }}
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '1rem 1.25rem',
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: '16px',
                                    fontSize: '1rem',
                                    color: 'var(--color-text)',
                                    fontFamily: 'inherit',
                                    transition: 'all 0.3s',
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--color-cyan)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="message"
                                className="meta-text"
                                style={{ display: 'block', marginBottom: '0.75rem' }}
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="6"
                                style={{
                                    width: '100%',
                                    padding: '1rem 1.25rem',
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: '16px',
                                    fontSize: '1rem',
                                    color: 'var(--color-text)',
                                    fontFamily: 'inherit',
                                    resize: 'vertical',
                                    transition: 'all 0.3s',
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--color-cyan)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                                padding: '1.25rem 3rem',
                                background: isSubmitting ? '#666' : 'var(--color-cyan)',
                                color: '#000',
                                border: 'none',
                                borderRadius: '100px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s',
                                boxShadow: '0 0 30px var(--color-cyan-glow)',
                                opacity: isSubmitting ? 0.7 : 1,
                            }}
                            onMouseEnter={(e) => !isSubmitting && (e.target.style.transform = 'translateY(-2px)')}
                            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>

                        {error && (
                            <p style={{
                                textAlign: 'center',
                                color: '#ec4899',
                                padding: '1rem',
                                background: 'rgba(236, 72, 153, 0.1)',
                                borderRadius: '12px',
                            }}>
                                ✗ {error}
                            </p>
                        )}

                        {submitted && (
                            <p style={{
                                textAlign: 'center',
                                color: 'var(--color-cyan)',
                                padding: '1rem',
                                background: 'rgba(0, 217, 255, 0.1)',
                                borderRadius: '12px',
                            }}>
                                ✓ Message sent successfully! I'll get back to you soon.
                            </p>
                        )}
                    </form>
                </BentoCard>
            </div>
        </div>
    )
}
