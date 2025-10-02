import React from 'react'
import Navbar from '../Components/LandingPageComponents/Navbar'
import HeroSection from '../Components/LandingPageComponents/HeroSection'
import Features from '../Components/LandingPageComponents/Features'
import Footer from '../Components/LandingPageComponents/Footer'
import ProblemsSection from '../Components/LandingPageComponents/ProblemSection'
import HowItWorksSection from '../Components/LandingPageComponents/HowItWorksSection'

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ProblemsSection />
      <Features />
      <HowItWorksSection />
      <Footer />
    </>
  )
}

export default LandingPage