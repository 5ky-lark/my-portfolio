import { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
]

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const { isDark, toggleTheme } = useTheme()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleLinkClick = () => {
        setIsMobileOpen(false)
    }

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-content">
                <button
                    className="navbar-toggle"
                    onClick={() => setIsMobileOpen(prev => !prev)}
                    aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isMobileOpen}
                    aria-controls="mobile-nav-links"
                >
                    {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
                </button>

                <a href="#" className="navbar-logo">SKY</a>

                <ul id="mobile-nav-links" className={`navbar-links ${isMobileOpen ? 'active' : ''}`}>
                    {navLinks.map(link => (
                        <li key={link.href}>
                            <a href={link.href} onClick={handleLinkClick}>
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="navbar-actions">
                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                    >
                        {isDark ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
