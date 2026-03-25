import { Github, Mail, Facebook, Linkedin } from 'lucide-react'
import { profile, socialLinks } from '../data/portfolioData'

const footerLinks = [
    { href: socialLinks.github, label: 'GitHub', icon: Github },
    { href: socialLinks.facebook, label: 'Facebook', icon: Facebook },
    { href: socialLinks.linkedin, label: 'LinkedIn', icon: Linkedin },
    { href: `mailto:${profile.email}`, label: 'Email', icon: Mail },
]

function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-links">
                    {footerLinks.map(({ href, label, icon: Icon }) => (
                        <a
                            key={label}
                            href={href}
                            target={href.startsWith('mailto:') ? undefined : '_blank'}
                            rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                            className="footer-link"
                            aria-label={label}
                        >
                            <Icon size={20} />
                        </a>
                    ))}
                </div>

                <p className="footer-text">
                    Designed & Built with care by <span>{profile.fullName}</span>
                </p>
                <p className="footer-copyright">
                    © {currentYear} — All rights reserved. Ship fast, break nothing.
                </p>
            </div>
        </footer>
    )
}

export default Footer
