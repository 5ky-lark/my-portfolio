import { Code, Layout, Server, Database, Cloud, Wrench } from 'lucide-react'
import { skillCategories } from '../data/portfolioData'

const skillIcons = {
    Languages: Code,
    Frontend: Layout,
    Backend: Server,
    Databases: Database,
    'DevOps & Cloud': Cloud,
    'Tools & Other': Wrench,
}

function Skills() {
    return (
        <section className="section" id="skills">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Skills</h2>
                    <p className="section-subtitle">
                        Technologies and tools I use to bring ideas to life
                    </p>
                </div>

                <div className="skills-grid">
                    {skillCategories.map((category) => {
                        const Icon = skillIcons[category.title]

                        return (
                            <div key={category.title} className="skill-category">
                                <div className="skill-category-header">
                                    <div className="skill-category-icon">
                                        {Icon ? <Icon size={20} /> : null}
                                    </div>
                                    <h3 className="skill-category-title">{category.title}</h3>
                                </div>
                                <div className="skill-list">
                                    {category.skills.map((skill) => (
                                        <div key={skill} className="skill-item">
                                            {skill}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Skills
