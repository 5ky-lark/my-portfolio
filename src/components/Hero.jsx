import { Mail, Download, Github, Linkedin } from 'lucide-react'

function Hero() {
    return (
        <section className="hero" id="hero">
            <div className="hero-background">
                <div className="hero-orb hero-orb-1"></div>
                <div className="hero-orb hero-orb-2"></div>
                <div className="hero-orb hero-orb-3"></div>
            </div>

            <div className="hero-content">
                <div className="hero-profile-container">
                    <img src="/profile.jpg" alt="Skylark Magsilang" className="hero-profile-img" />
                </div>

                <div className="hero-badge">
                    <span className="hero-badge-dot"></span>
                    Let's build something
                </div>

                <h1 className="hero-title">
                    <span className="hero-name">Skylark Magsilang</span>
                </h1>

                <p className="hero-subtitle">
                    Full Stack Developer
                </p>

                <p className="hero-description">
                    Full-stack developer focused on automation and efficiency, leveraging AI to streamline workflows
                </p>

                <div className="hero-buttons">
                    <a href="/assets/docs/resume.pdf" download="SKYLARK_MAGSILANG_CV.pdf" className="btn btn-primary">
                        <Download size={20} />
                        Download CV
                    </a>
                    <a href="https://github.com/5ky-lark" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                        <Github size={20} />
                        GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/skylarkmagsilang/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                        <Linkedin size={20} />
                        LinkedIn
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Hero
