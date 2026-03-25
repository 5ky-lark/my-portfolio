export const profile = {
    fullName: 'Skylark Magsilang',
    shortName: 'SKY',
    role: 'Software Engineer',
    location: 'Philippines',
    employer: '8MB LLC (Zagged)',
    employerLocation: 'Delaware, USA',
    heroBadge: "Let's build something",
    heroDescription:
        "Just a dev who hates repetitive tasks, so I automate everything. Full-stack builder, with AI as my sidekick.",
    resumePath: '/SKYLARK MAGSILANG CV.pdf',
    resumeDownloadName: 'SKYLARK_MAGSILANG_CV.pdf',
    email: 'skylarkmagsilangsl@gmail.com',
}

export const socialLinks = {
    github: 'https://github.com/5ky-lark',
    linkedin: 'https://www.linkedin.com/in/skylarkmagsilang/',
    facebook: 'https://web.facebook.com/skyzzxxcc/',
}

export const navigationLinks = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
]

export const impactStats = [
    { value: 50, suffix: '+', label: 'Discord Servers Automated' },
    { value: 60, suffix: 'K+', label: 'Emails/Month Automated' },
    { value: 1.5, suffix: 'K+', label: 'UGC Creators Onboarded' },
]

export const skillCategories = [
    {
        title: 'Languages',
        skills: ['JavaScript', 'TypeScript', 'Python', 'SQL'],
    },
    {
        title: 'Frontend',
        skills: ['React', 'Next.js', 'Vite', 'Tailwind CSS'],
    },
    {
        title: 'Backend',
        skills: ['Node.js', 'Express.js', 'Flask', 'FastAPI'],
    },
    {
        title: 'Databases',
        skills: ['PostgreSQL', 'MongoDB', 'SQLite', 'Supabase'],
    },
    {
        title: 'DevOps & Cloud',
        skills: ['Docker', 'Railway', 'Render', 'Vercel'],
    },
    {
        title: 'Tools & Other',
        skills: ['Discord.py', 'Selenium', 'SMTP', 'Git'],
    },
]

export const aboutTechGroups = [
    {
        title: 'Languages',
        skills: skillCategories.find(({ title }) => title === 'Languages')?.skills ?? [],
    },
    {
        title: 'Frontend',
        skills: skillCategories.find(({ title }) => title === 'Frontend')?.skills ?? [],
    },
    {
        title: 'Backend',
        skills: skillCategories.find(({ title }) => title === 'Backend')?.skills ?? [],
    },
    {
        title: 'Database & DevOps',
        skills: [
            ...(skillCategories.find(({ title }) => title === 'Databases')?.skills ?? []),
            ...(skillCategories.find(({ title }) => title === 'DevOps & Cloud')?.skills ?? []),
        ],
    },
]

export const contactChannels = [
    {
        key: 'email',
        href: `mailto:${profile.email}`,
        label: profile.email,
    },
    {
        key: 'github',
        href: socialLinks.github,
        label: 'github.com/5ky-lark',
    },
    {
        key: 'facebook',
        href: socialLinks.facebook,
        label: 'facebook.com/skyzzxxcc',
    },
]

export const featuredProjects = [
    'Discord Automation Bots: 50+ servers, 30,000+ members, Python/PostgreSQL.',
    'Gemini AI Media Generator: Integrates Gemini with Discord bots, cutting SaaS costs by 60-70%.',
    'Email and Outreach Automation: ~60K emails/month with rate-limited worker pipelines.',
    'TikTok and Reddit Data Pipelines: Automated lead discovery and creator research at scale.',
    'EMS Dental E-commerce: Full-stack Next.js app with PayMongo and an AI assistant.',
]