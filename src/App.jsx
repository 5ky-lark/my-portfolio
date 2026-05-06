// Last updated: 2026-01-20
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ClientMarquee from './components/ClientMarquee'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'

function App() {
    // Force scroll to top on mount — fixes in-app browsers (Facebook, Instagram)
    // auto-scrolling past hero content that starts with opacity: 0
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        const activate = (el) => {
            el.classList.add('active')
        }

        const observe = () => {
            const revealEls = document.querySelectorAll('.reveal')
            if (!revealEls.length) return null

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            activate(entry.target)
                            observer.unobserve(entry.target)
                        }
                    })
                },
                {
                    threshold: 0.12,
                    rootMargin: '0px 0px -8% 0px',
                }
            )

            revealEls.forEach((el) => observer.observe(el))
            return observer
        }

        let observer = observe()
        const heroTimeout = setTimeout(() => {
            document
                .querySelectorAll('.hero .reveal:not(.active)')
                .forEach(activate)
        }, 80)

        return () => {
            clearTimeout(heroTimeout)
            if (observer) observer.disconnect()
        }
    }, [])

    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <ClientMarquee />
                <About />
                <Experience />
                <Projects />
            </main>
            <Footer />
            <ChatWidget />
        </>
    )
}

export default App
