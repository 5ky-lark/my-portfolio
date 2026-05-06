import { useEffect, useState } from 'react'

const ClientMarquee = () => {
    const [theme, setTheme] = useState('dark')

    // Logos in the public/marquee folder
    const logos = [
        { src: '/marquee/690ceb7cbb41e489c9bdd3d6_1906-New Straight Logo_black lg.png', alt: '1906', size: 'compact' },
        { src: '/marquee/691342bbbd02a0da554174e9_logo8.svg', alt: 'Graymatter', size: 'wide' },
        { src: '/marquee/691342bb8f700a0d8b4e196b_logo7.svg', alt: 'bolt', size: 'compact' },
        { src: '/marquee/691342bbdc1b17f80ca52a3f_logo11.svg', alt: 'Manuka Health', size: 'wide' },
        { src: '/marquee/691342bb7a7f54f8dd37fea8_logo1.svg', alt: 'Delta', size: 'compact' },
        { src: '/marquee/691342bbaa6af3703a71ec75_logo12.svg', alt: 'Pacagen', size: 'wide' },
        { src: '/marquee/691342bbc5c41e9eaa14cf2a_logo3.svg', alt: 'Hostage Tape', size: 'compact' },
        { src: '/marquee/698e1cd9669f7baa0beea6c1_topicals.svg', alt: 'Topicals', size: 'wide' },
        { src: '/marquee/698e1cd962c4c23d1b3a63cf_gopure.svg', alt: 'goPure', size: 'wide' },
        { src: '/marquee/698e1cd9b3f25b0d1aa6fc58_love-wellness.svg', alt: 'Love Wellness', size: 'wide' },
    ]

    useEffect(() => {
        const handleThemeChange = () => {
            setTheme(document.documentElement.getAttribute('data-theme') || 'dark')
        }

        // Initial theme
        handleThemeChange()

        // Watch for theme changes
        const observer = new MutationObserver(handleThemeChange)
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

        return () => observer.disconnect()
    }, [])

    // Render a single logo item
    const renderLogo = (logo, key, isDuplicate) => (
        <div key={key} className="client-marquee-item" aria-hidden={isDuplicate ? 'true' : undefined}>
            <img
                src={logo.src}
                alt={logo.alt}
                className={`client-marquee-logo logo-${logo.size || 'default'} ${theme === 'dark' ? 'dark-invert' : ''}`}
            />
        </div>
    )

    return (
        <section className="client-marquee-section">
            <div className="container">
                <p className="client-marquee-title">Clients @ Zagged I've Built Automations For:</p>
            </div>
            <div className="client-marquee-wrapper">
                <div className="client-marquee-track">
                    <div className="client-marquee-group">
                        {logos.map((logo, i) => renderLogo(logo, `a-${i}`, false))}
                    </div>
                    <div className="client-marquee-group">
                        {logos.map((logo, i) => renderLogo(logo, `b-${i}`, true))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ClientMarquee
