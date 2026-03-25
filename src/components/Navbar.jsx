import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { navigationLinks, profile } from '../data/portfolioData'

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
                <a href="#" className="navbar-logo">{profile.shortName}</a>

                <ul className={`navbar-links ${isMobileOpen ? 'active' : ''}`}>
                    {navigationLinks.map(link => (
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
