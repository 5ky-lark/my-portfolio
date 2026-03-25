import { useState, useEffect, useRef } from 'react'
import { aboutTechGroups, impactStats, profile } from '../data/portfolioData'

function formatStatValue(value) {
    return Number.isInteger(value) ? value : value.toFixed(1)
}

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
                setCount(value < 10 ? Number(current.toFixed(1)) : Math.floor(current))
            }
        }, duration / steps)

        return () => clearInterval(timer)
    }, [isVisible, value])

    return (
        <div className="stat-item" ref={ref}>
            <div className="stat-number">{formatStatValue(count)}{suffix}</div>
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
                            Based in the {profile.location}, building for {profile.employer} in {profile.employerLocation} remotely. I make bots, automate workflows, and build web apps that solve real operational problems. If there's a repeatable task, I look for a reliable system to handle it.
                        </p>

                        <div className="about-stats">
                            {impactStats.map((stat) => (
                                <AnimatedStat key={stat.label} {...stat} />
                            ))}
                        </div>
                    </div>

                    <div className="about-tech">
                        <h4>Tech Stack</h4>

                        {aboutTechGroups.map(({ title, skills }) => (
                            <div key={title} className="tech-category">
                                <div className="tech-category-label">{title}</div>
                                <div className="tech-grid">
                                    {skills.map((tech) => (
                                        <div key={tech} className="tech-item">{tech}</div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
