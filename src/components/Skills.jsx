import { Code, Layout, Server, Database, Cloud, Wrench } from 'lucide-react'

const skillCategories = [
    {
        title: 'Languages',
        icon: Code,
        skills: ['JavaScript', 'TypeScript', 'Python', 'SQL'],
    },
    {
        title: 'Frontend',
        icon: Layout,
        skills: ['React', 'Next.js', 'Tailwind CSS', 'HTML/CSS'],
    },
    {
        title: 'Backend',
        icon: Server,
        skills: ['Node.js', 'Express.js', 'Flask', 'FastAPI', 'REST APIs'],
    },
    {
        title: 'Databases',
        icon: Database,
        skills: ['PostgreSQL', 'SQLite', 'Supabase', 'Redis'],
    },
    {
        title: 'DevOps & Cloud',
        icon: Cloud,
        skills: ['Docker', 'Railway', 'Render', 'Vercel', 'SSH', 'Git'],
    },
    {
        title: 'Tools & Other',
        icon: Wrench,
        skills: ['Cursor AI', 'Discord.py', 'Selenium', 'SMTP', 'Gunicorn'],
    },
]

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
                    {skillCategories.map((category, index) => (
                        <div key={index} className="skill-category">
                            <div className="skill-category-header">
                                <div className="skill-category-icon">
                                    <category.icon size={20} />
                                </div>
                                <h3 className="skill-category-title">{category.title}</h3>
                            </div>
                            <div className="skill-list">
                                {category.skills.map((skill, i) => (
                                    <div key={i} className="skill-item">
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Skills
