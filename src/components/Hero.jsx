import { Mail, Download, Github } from 'lucide-react'

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
                    Just a dev who hates repetitive tasks, so I automate everything. Full-stack builder, with AI as my sideb*tch.
                </p>

                <div className="hero-buttons">
                    <a href="/SKYLARK MAGSILANG CV.pdf" download="SKYLARK_MAGSILANG_CV.pdf" className="btn btn-primary">
                        <Download size={20} />
                        Download CV
                    </a>
                    <a href="https://github.com/5ky-lark" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                        <Github size={20} />
                        View GitHub
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Hero
