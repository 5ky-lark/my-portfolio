const experiences = [
    {
        title: 'Software Developer',
        company: '8MB LLC (Zagged)',
        location: 'Delaware, USA (Remote)',
        date: 'June 2025 - Present',
        description: [
            <>Built and scaled customization automation bots across <strong>40+ Discord servers (15,000+ members)</strong>, automating workflows and reducing manual operational effort at scale</>,
            <>Built a production web app integrating Google's Gemini 3 Pro image API with Discord bots to automate media asset generation for content creators, producing <strong>1,000+ images weekly</strong> and significantly improving content delivery speed for creators across multiple platforms</>,
            <>Built and maintained an automated email web app that increased daily sending from ~100 manual emails to <strong>~2,000 automated emails (~60,000/month)</strong>, significantly reducing manual work and cutting SaaS subscription costs by <strong>~$300/month</strong> while maintaining <strong>99% uptime</strong></>,
            <>Built a TikTok data scraper processing <strong>100+ profiles per minute</strong>, reducing request time from <strong>~4.2s to ~0.8s</strong> and lowering memory usage from <strong>~1.8 GB to ~450 MB</strong> using caching, worker pooling, and rate-limited automation to support high-volume creator research</>,
            <>Built a Reddit lead scraping and outreach system processing <strong>hundreds of leads per run</strong>, using rate-limited crawlers, background workers, and SMTP pipelines to automate email discovery and outreach, <strong>replacing hours of manual lead research with a single automated run</strong></>,
        ],
    },
]

const education = [
    {
        title: 'Bachelor of Science in Information Technology',
        company: 'New Era University',
        date: 'Expected June 2026',
        description: [],
    },
]

function Experience() {
    return (
        <section className="section" id="experience">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Experience</h2>
                    <p className="section-subtitle">
                        My professional journey and the impact I've made
                    </p>
                </div>

                <div className="experience-timeline">
                    {experiences.map((exp, index) => (
                        <div key={index} className="experience-item">
                            <div className="experience-dot"></div>
                            <div className="experience-card">
                                <div className="experience-header">
                                    <div>
                                        <h3 className="experience-title">{exp.title}</h3>
                                        <div className="experience-company">
                                            {exp.company} • {exp.location}
                                        </div>
                                    </div>
                                    <span className="experience-date">{exp.date}</span>
                                </div>
                                <ul className="experience-description">
                                    {exp.description.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}

                    {education.map((edu, index) => (
                        <div key={index} className="experience-item">
                            <div className="experience-dot"></div>
                            <div className="experience-card">
                                <div className="experience-header">
                                    <div>
                                        <h3 className="experience-title">{edu.title}</h3>
                                        <div className="experience-company">{edu.company}</div>
                                    </div>
                                    <span className="experience-date">{edu.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Experience
