import React, {useState} from 'react'

const categories = [
  {id: 'plumbing', name: 'Plumbing', icon: '🔧'},
  {id: 'electrician', name: 'Electrician', icon: '⚡'},
  {id: 'cleaning', name: 'House Cleaning', icon: '🧹'},
  {id: 'appliances', name: 'Appliances', icon: '🔌'}
]

const servicesData = {
  plumbing: [
    {id: 1, title: 'Plumbing Repair', price: '₹499', desc: 'Fix leaks and installations', img: 'https://source.unsplash.com/collection/1424340/400x300'}
  ],
  electrician: [
    {id: 2, title: 'Electrician Visit', price: '₹399', desc: 'Wiring and fixture fixes', img: 'https://source.unsplash.com/collection/888146/400x300'}
  ],
  cleaning: [
    {id: 3, title: 'House Cleaning', price: '₹899', desc: 'Deep cleaning for your home', img: 'https://source.unsplash.com/collection/891/400x300'}
  ],
  appliances: [
    {id: 4, title: 'RO Service', price: '₹299', desc: 'RO water purifier installation and repair', img: 'https://source.unsplash.com/collection/190727/400x300'}
  ]
}

const timeSlots = ['9:00 AM - 12:00 PM', '12:00 PM - 3:00 PM', '3:00 PM - 6:00 PM', '6:00 PM - 9:00 PM']

export default function BookingFlow({onBack, onConfirm}) {
  const [step, setStep] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedService, setSelectedService] = useState(null)
  const [date, setDate] = useState('')
  const [timeSlot, setTimeSlot] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [errors, setErrors] = useState({})

  const steps = ['Category', 'Service', 'Date & Time', 'Details', 'Summary']

  function nextStep() {
    if (step === 0 && !selectedCategory) return
    if (step === 1 && !selectedService) return
    if (step === 2 && (!date || !timeSlot)) return
    if (step === 3 && (!name.trim() || !phone.trim() || !address.trim())) return
    setStep(step + 1)
  }

  function prevStep() {
    setStep(step - 1)
  }

  function handleConfirm() {
    onConfirm({service: selectedService, date, timeSlot, name, phone, address})
  }

  function clearError(field) {
    if (errors[field]) setErrors({...errors, [field]: ''})
  }

  function validateStep() {
    const newErrors = {}
    if (step === 2) {
      if (!date) newErrors.date = 'Please select a date'
      if (!timeSlot) newErrors.timeSlot = 'Please select a time slot'
    } else if (step === 3) {
      if (!name.trim()) newErrors.name = 'Please enter your name'
      if (!phone.trim()) newErrors.phone = 'Please enter your phone number'
      if (!address.trim()) newErrors.address = 'Please enter your address'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleNext() {
    if (validateStep()) nextStep()
  }

  return (
    <div className="booking-flow">
      <div className="container">
        <div className="progress-indicator">
          {steps.map((s, i) => (
            <div key={i} className={`step ${i <= step ? 'active' : ''}`}>
              <div className="step-number">{i + 1}</div>
              <div className="step-label">{s}</div>
            </div>
          ))}
        </div>

        {step === 0 && (
          <div className="step-content">
            <h2>Select a Category</h2>
            <div className="categories-grid">
              {categories.map(cat => (
                <div
                  key={cat.id}
                  className={`category-card ${selectedCategory === cat.id ? 'selected' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <div className="icon">{cat.icon}</div>
                  <h3>{cat.name}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="step-content">
            <h2>Select a Service</h2>
            <div className="services-grid">
              {servicesData[selectedCategory].map(service => (
                <div
                  key={service.id}
                  className={`service-card ${selectedService?.id === service.id ? 'selected' : ''}`}
                  onClick={() => setSelectedService(service)}
                >
                  <img src={service.img} alt={service.title} />
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                  <p className="price">{service.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step-content">
            <h2>Select Date & Time</h2>
            <div className="date-time">
              <label>
                Date
                <input
                  type="date"
                  value={date}
                  onChange={e => {setDate(e.target.value); clearError('date')}}
                  required
                />
                {errors.date && <p className="error">{errors.date}</p>}
              </label>
              <div className="time-slots">
                <h3>Time Slot</h3>
                {timeSlots.map(t => (
                  <button
                    key={t}
                    className={`time-slot ${timeSlot === t ? 'selected' : ''}`}
                    onClick={() => {setTimeSlot(t); clearError('timeSlot')}}
                  >
                    {t}
                  </button>
                ))}
                {errors.timeSlot && <p className="error">{errors.timeSlot}</p>}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-content">
            <h2>Enter Your Details</h2>
            <form className="details-form">
              <label>
                Name
                <input
                  type="text"
                  value={name}
                  onChange={e => {setName(e.target.value); clearError('name')}}
                  placeholder="Enter your full name"
                  required
                />
                {errors.name && <p className="error">{errors.name}</p>}
              </label>
              <label>
                Phone
                <input
                  type="tel"
                  value={phone}
                  onChange={e => {setPhone(e.target.value); clearError('phone')}}
                  placeholder="Enter your phone number"
                  required
                />
                {errors.phone && <p className="error">{errors.phone}</p>}
              </label>
              <label>
                Address
                <textarea
                  value={address}
                  onChange={e => {setAddress(e.target.value); clearError('address')}}
                  placeholder="Enter your full address"
                  required
                />
                {errors.address && <p className="error">{errors.address}</p>}
              </label>
            </form>
          </div>
        )}

        {step === 4 && (
          <div className="step-content">
            <h2>Booking Summary</h2>
            <div className="summary">
              <div className="summary-item">
                <span>Service:</span>
                <span>{selectedService.title}</span>
              </div>
              <div className="summary-item">
                <span>Date:</span>
                <span>{date}</span>
              </div>
              <div className="summary-item">
                <span>Time:</span>
                <span>{timeSlot}</span>
              </div>
              <div className="summary-item">
                <span>Name:</span>
                <span>{name}</span>
              </div>
              <div className="summary-item">
                <span>Phone:</span>
                <span>{phone}</span>
              </div>
              <div className="summary-item">
                <span>Address:</span>
                <span>{address}</span>
              </div>
              <div className="summary-item total">
                <span>Total:</span>
                <span>{selectedService.price}</span>
              </div>
            </div>
          </div>
        )}

        <div className="step-actions">
          {step > 0 && <button onClick={prevStep} className="btn secondary">Back</button>}
          {step < 4 && <button onClick={handleNext} className="btn primary">Next</button>}
          {step === 4 && <button onClick={handleConfirm} className="btn primary">Confirm Booking</button>}
        </div>
      </div>
      <button className="back-btn" onClick={onBack}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}