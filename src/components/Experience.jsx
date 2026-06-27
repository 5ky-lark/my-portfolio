const experiences = [
    {
        title: 'Software Developer',
        company: '8MB LLC (Zagged)',
        location: 'New York, USA | Remote',
        date: 'June 2025 - Present',
        description: [
            <>Developed and scaled automation bots across <strong>70+ Discord servers (40,000+ members)</strong> for <strong>7-9 figures</strong> U.S. brands, automating onboarding, moderation, payment submissions, and creator workflows.</>,
            <>Built and operated an internal outreach email automation platform with TikTok and Reddit scraping, Google SMTP, and anti-bot measures to maximize inbox deliverability, scaling outreach to <strong>60,000+ emails/month</strong>, helping onboard <strong>1,500+ UGC creators</strong>, and reducing SaaS costs.</>,
            <>Optimized and scaled a full-stack CRUD content library platform serving <strong>5,000+ monthly visits</strong>, implementing CDN caching, WebP compression, lazy loading, and asset prefetching to achieve <strong>1.27s page load times</strong> while reducing cloud egress costs.</>,
            <>Developed an internal media generation platform integrating Gemini and ChatGPT APIs with Discord bots, reducing SaaS costs by <strong>50%</strong> through optimized API request batching.</>,
            <>Built a concurrent video downloader processing <strong>100K+ TikTok/YouTube URLs</strong> per month across <strong>30 async workers</strong> with persistent pause/resume job tracking, automated anti-rate-limit backoff and auto-organized file output, achieving <strong>~30x faster</strong> bulk downloads for client delivery.</>,
        ],
    },
    {
        title: 'Full Stack Developer',
        company: 'TaxFirmSystems',
        location: 'Florida, USA | Remote',
        date: 'January 2026 - Present',
        description: [
            <>Built a full-stack B2B SaaS lead generation platform using Next.js 16, TypeScript, React 19, and MongoDB with API routes enabling lead acquisition for <strong>70+ tax relief firms</strong>.</>,
            <>Engineered an automated sales pipeline integrating Stripe (with idempotent processing), Calendly, Discord webhook, QStash, and an 8-template drip email sequence, <strong>reducing manual follow-up to 0%</strong>.</>,
            <>Implemented server-side Meta Conversions API with event deduplication to maximize lead quality, powering an ad funnel that generated <strong>200+ tax relief firms leads</strong> nationwide.</>,
        ],
    },
]

const education = [
    {
        title: 'Bachelor of Science in Information Technology',
        company: 'New Era University',
        date: 'June 2026',
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
