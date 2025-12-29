import { Suspense, lazy, useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Loader from './components/ui/Loader'
import Preloader from './components/Preloader'
import CustomCursor from './components/ui/CustomCursor'
import ScrollToTop from './components/ScrollToTop'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))

function App() {
    const [isLoading, setIsLoading] = useState(true)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        // Check if mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const handlePreloaderComplete = () => {
        setIsLoading(false)
    }

    return (
        <>
            {/* Preloader */}
            {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

            {/* Main content */}
            <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
                <ScrollToTop />
                <Layout>
                    <Suspense fallback={<Loader />}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                        </Routes>
                    </Suspense>
                </Layout>
            </div>
        </>
    )
}

export default App
