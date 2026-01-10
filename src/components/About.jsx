import { useState, useEffect, useRef } from 'react'

const techStack = {
    languages: ['JavaScript', 'TypeScript', 'Python', 'SQL'],
    frontend: ['React', 'Next.js', 'Vite', 'Tailwind CSS'],
    backend: ['Node.js', 'Express.js', 'Flask', 'FastAPI'],
    database: ['PostgreSQL', 'SQLite', 'Supabase'],
    devops: ['Docker', 'Railway', 'Render', 'Vercel'],
}

const stats = [
    { value: 40, suffix: '+', label: 'Discord Servers Automated' },
    { value: 60, suffix: 'K+', label: 'Emails/Month Automated' },
    { value: 200, suffix: 'K+', label: 'Leads Scraped & Enriched' },
]

function AnimatedStat({ value, suffix, label }) {
    const [count, setCount] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.3 }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => observer.disconnect()
    }, [isVisible])

    useEffect(() => {
        if (!isVisible) return

        const duration = 2000
        const steps = 60
        const increment = value / steps
        let current = 0

        const timer = setInterval(() => {
            current += increment
            if (current >= value) {
                setCount(value)
                clearInterval(timer)
            } else {
                setCount(Math.floor(current))
            }
        }, duration / steps)

        return () => clearInterval(timer)
    }, [isVisible, value])

    return (
        <div className="stat-item" ref={ref}>
            <div className="stat-number">{count}{suffix}</div>
            <div className="stat-label">{label}</div>
        </div>
    )
}

function About() {
    return (
        <section className="section about" id="about">
            <div className="container">
                <div className="about-content">
                    <div className="about-text">
                        <h3>About Me</h3>
                        <h2>Building systems that scale</h2>
                        <p>
                            I'm a Full Stack Developer based in the Philippines, currently working remotely
                            for 8MB LLC (Zagged) in Delaware, USA. I specialize in building automation
                            systems, AI-powered systems, and high-performance web solutions.
                        </p>
                        <p>
                            I combine AI-assisted development tools with proven software development principles to ship production-ready systems quickly and reliably.
                        </p>

                        <div className="about-stats">
                            {stats.map((stat, index) => (
                                <AnimatedStat key={index} {...stat} />
                            ))}
                        </div>
                    </div>

                    <div className="about-tech">
                        <h4>Tech Stack</h4>

                        <div className="tech-category">
                            <div className="tech-category-label">Languages</div>
                            <div className="tech-grid">
                                {techStack.languages.map(tech => (
                                    <div key={tech} className="tech-item">{tech}</div>
                                ))}
                            </div>
                        </div>

                        <div className="tech-category">
                            <div className="tech-category-label">Frontend</div>
                            <div className="tech-grid">
                                {techStack.frontend.map(tech => (
                                    <div key={tech} className="tech-item">{tech}</div>
                                ))}
                            </div>
                        </div>

                        <div className="tech-category">
                            <div className="tech-category-label">Backend</div>
                            <div className="tech-grid">
                                {techStack.backend.map(tech => (
                                    <div key={tech} className="tech-item">{tech}</div>
                                ))}
                            </div>
                        </div>

                        <div className="tech-category">
                            <div className="tech-category-label">Database & DevOps</div>
                            <div className="tech-grid">
                                {[...techStack.database, ...techStack.devops].map(tech => (
                                    <div key={tech} className="tech-item">{tech}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
