import { Bot, Image, Mail, Database, Search, ShoppingCart, TrendingUp, Users, Zap, Clock, Lock, Github } from 'lucide-react'

const projects = [
    {
        title: 'Discord Automation Bots',
        description: 'Built and scaled customized automation bots to automate workflows and reduce manual operational effort across multiple Discord servers.',
        icon: Bot,
        metrics: [
            { icon: Users, label: '15,000+ members' },
            { icon: Zap, label: '40+ servers' },
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
        title: 'Reddit Lead Scraper',
        description: 'Outreach system with rate-limited crawlers, background workers, and SMTP pipelines to automate email discovery and outreach.',
        icon: Search,
        metrics: [
            { icon: Users, label: 'Hundreds of leads/run' },
            { icon: Zap, label: 'Fully automated' },
        ],
        tech: ['Python', 'Flask', 'SMTP', 'Background Workers'],
    },
    {
        title: 'EMS Dental E-commerce',
        description: 'Capstone project: dental e-commerce platform with CRUD admin workflows, RBAC, Auth, PayMongo integration, and analytics.',
        icon: ShoppingCart,
        metrics: [
            { icon: Zap, label: 'Full-stack solution' },
            { icon: Users, label: 'RBAC system' },
        ],
        tech: ['Next.js', 'Prisma', 'PayMongo', 'PostgreSQL'],
        github: 'https://github.com/5ky-lark/emsdental',
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
