import React from 'react'

export default function Subscription(){
  const plans = [
    {
      name: 'Basic',
      price: '₹499/month',
      features: ['1 service booking', 'Basic support', 'Email notifications'],
      icon: '🛠️'
    },
    {
      name: 'Standard',
      price: '₹999/month',
      features: ['5 service bookings', 'Priority support', 'SMS notifications', 'Discounts'],
      icon: '🔧'
    },
    {
      name: 'Premium',
      price: '₹1499/month',
      features: ['Unlimited bookings', '24/7 support', 'Exclusive deals', 'Free cancellations'],
      icon: '💎'
    },
    {
      name: 'Pro',
      price: '₹1999/month',
      features: ['All Premium features', 'Dedicated manager', 'Custom services', 'VIP access'],
      icon: '👑'
    }
  ]

  return (
    <div className="container subscription-page">
      <h1>Choose Your Subscription Plan</h1>
      <div className="plans-grid">
        {plans.map((plan, i) => (
          <div key={i} className="plan-card">
            <div className="plan-icon">{plan.icon}</div>
            <h3>{plan.name}</h3>
            <div className="plan-price">{plan.price}</div>
            <ul>
              {plan.features.map((f, j) => (
                <li key={j}>{f}</li>
              ))}
            </ul>
            <button className="cta">Subscribe Now</button>
          </div>
        ))}
      </div>
    </div>
  )
}