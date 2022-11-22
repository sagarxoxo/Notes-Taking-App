import React from 'react'

import FirstSection from './FirstSection.js'
import Features from './Features.js'
import About from './About.js'
import Contact from './Contact.js'

export default function Home() {
  return (
    <div>
      <FirstSection />
      <Features />
      <About />
      <Contact />
    </div>
  )
}