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
