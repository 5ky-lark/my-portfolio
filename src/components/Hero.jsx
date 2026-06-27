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
                <div className="hero-profile-container reveal">
                    <img src="/profile.jpg" alt="Skylark Magsilang" className="hero-profile-img" />
                </div>

                <h1 className="hero-title reveal">
                    <span className="hero-name">Skylark Magsilang</span>
                </h1>

                <p className="hero-subtitle reveal">
                    Full Stack Developer
                </p>

                <p className="hero-description reveal">
                    Full-stack developer focused on automation and efficiency, leveraging AI to streamline workflows
                </p>

                <div className="hero-buttons reveal">
                    <a href="/assets/docs/SKYLARK_MAGSILANG_CV.pdf" download="SKYLARK_MAGSILANG_CV.pdf" className="btn btn-primary">
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
