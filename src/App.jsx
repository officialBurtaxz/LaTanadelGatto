import { useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import Home from './pages/Home'
import MenuPage from './pages/MenuPage'

// Base path per il deploy (GitHub Pages serve sotto /LaTanadelGatto/).
// In dev BASE_URL = "/" -> basename vuoto, in prod = "/LaTanadelGatto/".
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

function ScrollToHash() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 50)
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [hash, pathname])

  return null
}

function Router() {
  return (
    <BrowserRouter basename={basename}>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<MenuPage />} />
      </Routes>
    </BrowserRouter>
  )
}

function App() {
  return <Router />
}

export default App