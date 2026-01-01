import React from 'react'

export default function HowItWorks(){
  const steps = [
    {title:'Choose Service',desc:'Browse categories and select what you need.',icon:'🔍'},
    {title:'Book Professional',desc:'Pick a verified pro based on reviews and ratings.',icon:'👨‍🔧'},
    {title:'Get Service',desc:'Enjoy hassle-free service at your doorstep.',icon:'🏠'}
  ]

  return (
    <section className="how-it-works container">
      <h2>How It Works</h2>
      <div className="steps-grid">
        {steps.map((step,i)=>(
          <div key={i} className="step-card">
            <div className="step-icon">{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}