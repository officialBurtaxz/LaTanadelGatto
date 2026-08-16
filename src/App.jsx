import { useEffect } from 'react'
import {
  HashRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import Home from './pages/Home'
import MenuPage from './pages/MenuPage'

// Base path per gli asset (GitHub Pages serve sotto /LaTanadelGatto/).
// Con HashRouter il routing avviene nel fragment (#/menu) e non richiede
// fallback lato server: ogni URL diretto funziona senza 404.html custom.
function Router() {
  return (
    <HashRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<MenuPage />} />
      </Routes>
    </HashRouter>
  )
}

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

function App() {
  return <Router />
}

export default App