import { Bot, Image, Mail, Database, Search, ShoppingCart, TrendingUp, Users, Zap, Clock, Lock, Github } from 'lucide-react'

const projects = [
    {
        title: 'Discord Automation Bots',
        description: 'Built and scaled customized automation bots to automate workflows and reduce manual operational effort across multiple Discord servers.',
        icon: Bot,
        metrics: [
            { icon: Users, label: '30,000+ members' },
            { icon: Zap, label: '50+ servers' },
        ],
        tech: ['Discord.py', 'Discord.js', 'Python', 'PostgreSQL', 'Docker'],
    },
    {
        title: 'Gemini AI Media Generator',
        description: 'Production web app integrating Google\'s Gemini 3 Pro image API with Discord bots to automate media asset generation for content creators.',
        icon: Image,
        metrics: [
            { icon: TrendingUp, label: '1,000+ images/week' },
            { icon: Zap, label: 'Real-time generation' },
        ],
        tech: ['React', 'Gemini API', 'Discord.js', 'Node.js'],
    },
    {
        title: 'Email Automation System',
        description: 'Automated email web app that replaced manual sending with intelligent automation, reducing workload and SaaS costs.',
        icon: Mail,
        metrics: [
            { icon: TrendingUp, label: '60,000 emails/month' },
            { icon: Clock, label: '99% uptime' },
            { icon: Zap, label: '$300/mo saved' },
        ],
        tech: ['Flask', 'SMTP', 'PostgreSQL', 'Render'],
        github: 'https://github.com/5ky-lark/email-automation-smtp',
    },
    {
        title: 'TikTok Data Scraper',
        description: 'Data scraper with caching, worker pooling, and rate-limited automation for high-volume creator research.',
        icon: Database,
        metrics: [
            { icon: Zap, label: '100+ profiles/min' },
            { icon: Clock, label: '5x faster (4.2s → 0.8s)' },
            { icon: TrendingUp, label: '75% less memory' },
        ],
        tech: ['Python', 'Selenium', 'Redis', 'Docker'],
        github: 'https://github.com/5ky-lark/tiktok-profile-scraper',
    },
    {
        title: 'Google Maps Data Scraper',
        description: 'FastAPI scraper that collects Google Maps business listings, extracts website emails/phones, and exports clean datasets for outreach workflows.',
        icon: Search,
        metrics: [
            { icon: Users, label: 'All 50 US states' },
            { icon: Zap, label: 'CSV/JSON export' },
            { icon: Clock, label: 'SQLite cached runs' },
        ],
        tech: ['Python', 'FastAPI', 'Playwright', 'SQLite', 'HTTPX'],
        github: 'https://github.com/5ky-lark/google-maps-and-website-scraper',
    },
    {
        title: 'NEU Library Visitor Log',
        description: 'Full-stack campus visitor management system with NEU-restricted Google OAuth, role-aware logging, analytics dashboard, and admin AI assistant.',
        icon: ShoppingCart,
        metrics: [
            { icon: Lock, label: 'Google OAuth + RBAC' },
            { icon: TrendingUp, label: 'Analytics + PDF export' },
            { icon: Bot, label: 'Gemini admin assistant' },
        ],
        tech: ['Next.js 14', 'TypeScript', 'MongoDB', 'NextAuth', 'Tailwind CSS'],
        github: 'https://github.com/5ky-lark/NEU-library-log-google-OAuth2.0',
    },
]

function Projects() {
    return (
        <section className="section projects" id="projects">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Projects</h2>
                    <p className="section-subtitle">
                        A selection of projects showcasing automation, AI, and scalable systems
                    </p>
                </div>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div key={index} className="project-card">
                            <div className="project-header">
                                <div className="project-icon">
                                    <project.icon size={24} />
                                </div>
                                <div className="project-badge">
                                    {project.github ? (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-github-link"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Github size={14} />
                                            <span>View Repo</span>
                                        </a>
                                    ) : (
                                        <div className="project-badge-private">
                                            <Lock size={12} />
                                            <span>Private</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="project-content">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>

                                <div className="project-metrics">
                                    {project.metrics.map((metric, i) => (
                                        <span key={i} className="metric">
                                            <metric.icon size={14} />
                                            {metric.label}
                                        </span>
                                    ))}
                                </div>

                                <div className="project-tech">
                                    {project.tech.map((tech, i) => (
                                        <span key={i}>{tech}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Projects
