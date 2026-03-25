const experiences = [
    {
        title: 'Software Engineer',
        company: '8MB LLC (Zagged)',
        location: 'Delaware, USA (Remote)',
        date: 'June 2025 - Present',
        description: [
            <>Developed and scaled customized automation bots across <strong>50+ Discord servers (30,000+ members)</strong> for U.S. brands to manage onboarding, moderation, account setup, payment submissions, video submissions, and creator content reviews, significantly reducing manual operations at scale</>,
            <>Built a web application integrating Gemini with Discord bots to automate media generation for creators, reducing SaaS costs by <strong>60–70%</strong></>,
            <>Engineered automation pipelines for email outreach and TikTok/Reddit data scraping, scaling outreach to <strong>~60K emails/month</strong>, automating lead discovery with rate-limited crawlers and worker pipelines, reducing SaaS costs, and driving the onboarding of <strong>1.5K+ UGC content creators</strong></>,
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
