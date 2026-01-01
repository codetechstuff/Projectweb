import React from 'react'

export default function Testimonials(){
  const reviews = [
    {name:'Priya S.',text:'Amazing service! The cleaner was on time and did a fantastic job.',rating:5},
    {name:'Rajesh K.',text:'Booked an electrician, fixed everything quickly. Highly recommend.',rating:5},
    {name:'Anita M.',text:'Salon at home was perfect. Will book again!',rating:4}
  ]

  return (
    <section className="testimonials container">
      <h2>What Our Customers Say</h2>
      <div className="reviews-grid">
        {reviews.map((r,i)=>(
          <div key={i} className="review-card">
            <div className="stars">{'⭐'.repeat(r.rating)}</div>
            <p>"{r.text}"</p>
            <cite>- {r.name}</cite>
          </div>
        ))}
      </div>
    </section>
  )
}