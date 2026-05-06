const experiences = [
    {
        title: 'Software Engineer (Full-time)',
        company: '8MB LLC (Zagged)',
        location: 'Remote (New York, USA)',
        date: 'June 2025 - Present',
        description: [
            <>Developed and scaled customized automation bots across <strong>50+ Discord servers (30,000+ members)</strong> for U.S. brands to manage onboarding, moderation, account setup, video submissions, payment submissions, and content checks of content creators, significantly reducing manual operations.</>,
            <>Built an internal automation tool for email outreach and TikTok/Reddit scraping, scaling to over <strong>60,000 emails/month</strong> reducing SaaS costs, and enabling onboarding of over <strong>1,500 UGC creators</strong>.</>,
            <>Developed a web application for the content lead, integrating Gemini with Discord bots to automate creator media generation and reducing SaaS costs by <strong>60–70%</strong>.</>,
            <>Built a scraping-based tool for brand managers to automate counting of creator posts across social media, processing over <strong>100,000 posts/month</strong> and eliminating manual reporting.</>,
        ],
    },
    {
        title: 'Web Developer (Part-time)',
        company: 'TaxFirmSystems',
        location: 'Remote (Florida, USA)',
        date: 'January 2026 - Present',
        description: [
            <>Strengthened security and data quality of dashboard through role-based permissions, password recovery, email verification, rate limiting, and sanitized webhook ingestion.</>,
            <>Improved client onboarding funnel by building trial signup and verification systems, converting over <strong>5,000 website visits</strong> into over <strong>100 qualified signup leads</strong>, tracked via a custom admin dashboard/CRM.</>,
            <>Automated lead delivery and assignment through dashboard authenticating webhook APIs, validation, sanitization, and email notifications, reducing manual handling and speeding up lead distribution.</>,
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
                <div className="section-header reveal">
                    <h2 className="section-title">Experience</h2>
                    <p className="section-subtitle">
                        My professional journey and the impact I've made
                    </p>
                </div>

                <div className="experience-timeline">
                    {experiences.map((exp, index) => (
                        <div key={index} className="experience-item reveal">
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
                        <div key={index} className="experience-item reveal">
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
