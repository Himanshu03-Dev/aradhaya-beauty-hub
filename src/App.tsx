import { useSmoothScroll } from './hooks/useSmoothScroll'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Services } from './components/sections/Services'
import { ThreeDShowcase } from './components/sections/ThreeDShowcase'
import { BridalSection } from './components/sections/BridalSection'
import { SignatureScroll } from './components/sections/SignatureScroll'
import { Gallery } from './components/sections/Gallery'
import { OfferSection } from './components/sections/OfferSection'
import { InstagramSection } from './components/sections/InstagramSection'
import { BookingSection } from './components/sections/BookingSection'
import { CustomCursor } from './components/ui/CustomCursor'
import { CursorGlow } from './components/ui/CursorGlow'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { IntroLoader } from './components/ui/IntroLoader'
import { SectionNav } from './components/ui/SectionNav'
import { BackToTop } from './components/ui/BackToTop'

export default function App() {
  useSmoothScroll()

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[130] focus:rounded-full focus:bg-wine focus:px-6 focus:py-3 focus:text-sm focus:text-champagne"
      >
        Skip to content
      </a>

      <IntroLoader />
      <ScrollProgress />
      <CursorGlow />
      <CustomCursor />
      <SectionNav />
      <BackToTop />
      <Navbar />

      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Services />
        <ThreeDShowcase />
        <BridalSection />
        <SignatureScroll />
        <Gallery />
        <OfferSection />
        <InstagramSection />
        <BookingSection />
      </main>

      <Footer />
    </>
  )
}
