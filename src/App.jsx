import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ClientMarquee from './components/ClientMarquee'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'

function App() {
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
