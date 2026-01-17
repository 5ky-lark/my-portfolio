import { useEffect, useState } from 'react'

const ClientMarquee = () => {
    const [theme, setTheme] = useState('dark')

    // Logos in the public/marquee folder
    const logos = [
        { src: '/marquee/690ceb7cbb41e489c9bdd3d6_1906-New Straight Logo_black lg.png', alt: '1906' },
        { src: '/marquee/691342bb7a7f54f8dd37fea8_logo1.svg', alt: 'Delta' },
        { src: '/marquee/691342bb8f700a0d8b4e196b_logo7.svg', alt: 'Client' },
        { src: '/marquee/691342bbaa6af3703a71ec75_logo12.svg', alt: 'Pacagen' },
        { src: '/marquee/691342bbbd02a0da554174e9_logo8.svg', alt: 'Graymatter' },
        { src: '/marquee/691342bbdc1b17f80ca52a3f_logo11.svg', alt: 'Manuka Health' },
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
    const renderLogo = (logo, index, prefix) => (
        <div key={`${prefix}-${index}`} className="client-marquee-item">
            <img
                src={logo.src}
                alt={logo.alt}
                className={`client-marquee-logo ${theme === 'dark' ? 'invert-logo' : ''}`}
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
                    {/* Repeat logos 4 times to ensure no gaps on any screen width */}
                    {logos.map((logo, i) => renderLogo(logo, i, 'a'))}
                    {logos.map((logo, i) => renderLogo(logo, i, 'b'))}
                    {logos.map((logo, i) => renderLogo(logo, i, 'c'))}
                    {logos.map((logo, i) => renderLogo(logo, i, 'd'))}
                </div>
            </div>
        </section>
    )
}

export default ClientMarquee
