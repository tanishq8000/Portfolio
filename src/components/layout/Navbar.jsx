import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
    { name: 'Work', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Resume', path: 'https://drive.google.com/file/d/1rl5TEFhh-EBKSUgzbzN5Vke-ZTa20_xl/view', external: true },
]

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className="navbar">
            <div className={`navbar-pill ${isScrolled ? 'scrolled' : ''}`}>
                <Link to="/" className="navbar-logo">
                    TK
                </Link>

                <ul className="navbar-links">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            {link.external ? (
                                <a
                                    href={link.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="navbar-link"
                                >
                                    {link.name}
                                </a>
                            ) : (
                                <Link
                                    to={link.path}
                                    className={`navbar-link ${location.pathname === link.path ? 'active' : ''}`}
                                >
                                    {link.name}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}
