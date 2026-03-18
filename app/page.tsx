import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ClassTypes from '@/components/ClassTypes'
import MarqueeDivider from '@/components/MarqueeDivider'
import ProgramTabs from '@/components/ProgramTabs'
import Pricing from '@/components/Pricing'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ClassTypes />
        <MarqueeDivider />
        <ProgramTabs />
        <MarqueeDivider />
        <Pricing />
      </main>
      <Footer />
    </>
  )
}
