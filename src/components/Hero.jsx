import { Download, Github, Linkedin } from 'lucide-react'
import { profile, socialLinks } from '../data/portfolioData'

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
                    <img src="/profile.jpg" alt={profile.fullName} className="hero-profile-img" />
                </div>

                <div className="hero-badge">
                    <span className="hero-badge-dot"></span>
                    {profile.heroBadge}
                </div>

                <h1 className="hero-title">
                    <span className="hero-name">{profile.fullName}</span>
                </h1>

                <p className="hero-subtitle">
                    {profile.role}
                </p>

                <p className="hero-description">
                    {profile.heroDescription}
                </p>

                <div className="hero-buttons">
                    <a href={profile.resumePath} download={profile.resumeDownloadName} className="btn btn-primary">
                        <Download size={20} />
                        Download CV
                    </a>
                    <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                        <Github size={20} />
                        GitHub
                    </a>
                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                        <Linkedin size={20} />
                        LinkedIn
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Hero
