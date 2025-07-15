import React from 'react'
import Abouthero from '../components/About/abouthero'
import Mission from '../components/About/Mission'
import Craftmanship from '../components/About/Craftmanship'
import Milestone from '../components/About/Milestone'
import Cta from '../components/About/Cta'

function About() {
  return (
    <div>
      <Abouthero />
      <Mission />
      <Craftmanship />
      <Milestone />
      <Cta />
    </div>
  )
}

export default About