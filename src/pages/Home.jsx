import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import MenuPreview from '../components/MenuPreview'
import Reviews from '../components/Reviews'
import Location from '../components/Location'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <MenuPreview />
        <Reviews />
        <Location />
      </main>
      <Footer />
    </>
  )
}