import React, {useState} from 'react'
import ServiceCard from './components/ServiceCard'
import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Toast from './components/Toast'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import Subscription from './components/Subscription'
import BackButton from './components/BackButton'
import BookingFlow from './components/BookingFlow'

const initialServices = [
  {id:1,title:'Plumbing Repair',category:'Plumbing',price:'₹499',rating:4.5,desc:'Fix leaks and installations',img:'https://source.unsplash.com/collection/1424340/400x300'},
  {id:2,title:'Electrician Visit',category:'Electrician',price:'₹399',rating:4.4,desc:'Wiring and fixture fixes',img:'https://source.unsplash.com/collection/888146/400x300'},
  {id:3,title:'RO Service',category:'Appliances',price:'₹299',rating:4.6,desc:'RO water purifier installation and repair',img:'https://source.unsplash.com/collection/190727/400x300'},
  {id:4,title:'House Cleaning',category:'Cleaning',price:'₹899',rating:4.6,desc:'Deep cleaning for your home',img:'https://source.unsplash.com/collection/891/400x300'}
]

export default function App(){
  const [services] = useState(initialServices)
  const [results, setResults] = useState(initialServices)
  const [query, setQuery] = useState('')
  const [modal, setModal] = useState({open:false,service:null})
  const [view, setView] = useState('home')
  const [toast, setToast] = useState('')
  const [currentUser, setCurrentUser] = useState(()=>{
    try{ return JSON.parse(localStorage.getItem('currentUser')) }catch(e){return null}
  })
  const [selectedService, setSelectedService] = useState(null)

  const categories = Array.from(new Set(initialServices.map(s=>s.category)))

  const categoryIcons = {
    Salon: '💇',
    Plumbing: '🔧',
    Cleaning: '🧹',
    Electrician: '⚡',
    Appliances: '🔌',
    Carpenter: '🔨'
  }

  function doSearch(){
    const q = query.trim().toLowerCase()
    if(!q) return setResults(services)
    setResults(services.filter(s=>s.title.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)))
  }

  function openBooking(s){ 
    setSelectedService(s)
    setView('booking')
  }
  function closeBooking(){ setModal({open:false,service:null}) }

  function navigate(to){
    setView(to || 'home')
    if(to==='home') setResults(services)
    // Add handling for other views if needed
  }

  function onAuthSuccess(){
    const u = JSON.parse(localStorage.getItem('currentUser')||'null')
    setCurrentUser(u)
    setToast('Welcome '+(u?.name||'') )
    setView('home')
  }

  function filterByCategory(cat){ setResults(services.filter(s=>s.category===cat)) }

  if(view==='signup'){
    return (
      <div>
        <Navbar onNavigate={navigate} />
        <BackButton onBack={()=>navigate('home')} />
        <SignUp onSuccess={onAuthSuccess} onCancel={()=>navigate('home')} />
        <Toast message={toast} onClose={()=>setToast('')} />
      </div>
    )
  }

  if(view==='signin'){
    return (
      <div>
        <Navbar onNavigate={navigate} />
        <BackButton onBack={()=>navigate('home')} />
        <SignIn onSuccess={onAuthSuccess} onCancel={()=>navigate('home')} />
        <Toast message={toast} onClose={()=>setToast('')} />
      </div>
    )
  }

  if(view==='book'){
    return (
      <div>
        <Navbar onNavigate={navigate} />
        <BackButton onBack={()=>navigate('home')} />
        <Subscription />
        <Toast message={toast} onClose={()=>setToast('')} />
      </div>
    )
  }

  if(view==='booking-flow'){
    return (
      <div>
        <Navbar onNavigate={navigate} />
        <BackButton onBack={()=>navigate('home')} />
        <BookingFlow 
          onBack={()=>navigate('home')}
          onConfirm={(booking)=>{
            alert(`Booking confirmed for ${booking.service.title} on ${booking.date} at ${booking.timeSlot}`)
            setToast('Booking confirmed!')
            navigate('home')
          }}
        />
        <Toast message={toast} onClose={()=>setToast('')} />
      </div>
    )
  }

  return (
    <div>
      <Navbar onNavigate={navigate} />
      <main>
        <section className="hero">
          <div className="container">
            <h1>Home Services at Your Doorstep</h1>
            <div className="search-row">
              <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search for home services like cleaning, plumbing, salon..." />
              <button onClick={doSearch}>Search</button>
            </div>
            <div className="categories" id="categories">
              {categories.map(cat=> (
                <button key={cat} className="cat" onClick={()=>filterByCategory(cat)}>{categoryIcons[cat] || '🛠️'} {cat}</button>
              ))}
            </div>
          </div>
        </section>

        <section className="stats">
          <div className="container">
            <div className="stats-grid">
              <div className="stat">
                <div className="stat-icon">😊</div>
                <h3>10,000+</h3>
                <p>Happy Customers</p>
              </div>
              <div className="stat">
                <div className="stat-icon">✅</div>
                <h3>50,000+</h3>
                <p>Services Delivered</p>
              </div>
              <div className="stat">
                <div className="stat-icon">👨‍🔧</div>
                <h3>500+</h3>
                <p>Verified Professionals</p>
              </div>
              <div className="stat">
                <div className="stat-icon">⭐</div>
                <h3>4.8</h3>
                <p>Average Rating</p>
              </div>
            </div>
          </div>
        </section>

        <section className="services container">
          <h2>Popular Services</h2>
          <div className="services-grid">
            {results.map(s=> (
              <ServiceCard key={s.id} service={s} onBook={()=>setView('booking-flow')} />
            ))}
          </div>
        </section>

        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />

      {modal.open && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal-content">
            <button className="modal-close" onClick={closeBooking}>×</button>
            <h3>{modal.service.title}</h3>
            <p>{modal.service.category} • {modal.service.price}</p>
            <form onSubmit={(e)=>{e.preventDefault();alert('Booking request sent');closeBooking();}}>
              <label>Name <input required /></label>
              <label>Phone <input required /></label>
              <button type="submit">Request Booking</button>
            </form>
          </div>
        </div>
      )}
      <Toast message={toast} onClose={()=>setToast('')} />
      <Chatbot />
    </div>
  )
}
