import { Github, Mail, Facebook, Linkedin } from 'lucide-react'

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content reveal">
                <div className="footer-links">
                    <a
                        href="https://github.com/5ky-lark"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link"
                        aria-label="GitHub"
                    >
                        <Github size={20} />
                    </a>
                    <a
                        href="https://web.facebook.com/skyzzxxcc/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link"
                        aria-label="Facebook"
                    >
                        <Facebook size={20} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/skylarkmagsilang/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link"
                        aria-label="LinkedIn"
                    >
                        <Linkedin size={20} />
                    </a>
                    <a
                        href="mailto:skylarkmagsilangsl@gmail.com"
                        className="footer-link"
                        aria-label="Email"
                    >
                        <Mail size={20} />
                    </a>
                </div>

                <p className="footer-text">
                    Designed & Built with 💙 by <span>Skylark Magsilang</span>
                </p>
                <p className="footer-copyright">
                    © 2025 — All rights reserved. Ship fast, break nothing.
                </p>
            </div>
        </footer>
    )
}

export default Footer
