import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { auth, db } from '../firebase/config';
import { addDoc, collection } from 'firebase/firestore';

export default function BookingScreen() {
  const { stylistId } = useParams();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00');
  const [service, setService] = useState('cut-and-style');
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();

  // Sample stylist data - replace with actual data fetch
  const stylist = {
    id: stylistId,
    name: "Sophia Laurent",
    specialty: "Creative Director",
    image: "https://images.unsplash.com/photo-1559599101-f09722fb4948"
  };

  const services = [
    { id: 'cut-and-style', name: 'Cut & Style', duration: '60 min', price: '$150' },
    { id: 'color', name: 'Color Service', duration: '120 min', price: '$250' },
    { id: 'extensions', name: 'Extensions', duration: '180 min', price: '$350' },
    { id: 'treatment', name: 'Treatment', duration: '45 min', price: '$90' }
  ];

  const availableTimes = [
    '10:00', '11:30', '13:00', '14:30', '16:00', '17:30'
  ];

  const handleBooking = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      await addDoc(collection(db, "bookings"), {
        userId: user.uid,
        stylistId,
        stylistName: stylist.name,
        date,
        time,
        service,
        notes,
        bookedAt: new Date()
      });
      navigate("/confirmation");
    } catch (err) {
      alert("Failed to book: " + err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>Book Your Appointment</h1>
          <p style={styles.subtitle}>With {stylist.name}, {stylist.specialty}</p>
        </div>

        <div style={styles.bookingContainer}>
          <div style={styles.stylistCard}>
            <div 
              style={{
                ...styles.stylistImage,
                backgroundImage: `url(${stylist.image})`
              }}
            ></div>
            <div style={styles.stylistInfo}>
              <h3 style={styles.stylistName}>{stylist.name}</h3>
              <p style={styles.stylistSpecialty}>{stylist.specialty}</p>
            </div>
          </div>

          <div style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Select Date</label>
              <input 
                type="date" 
                style={styles.input}
                onChange={(e) => setDate(e.target.value)} 
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Select Time</label>
              <select 
                style={styles.select}
                value={time}
                onChange={(e) => setTime(e.target.value)}
              >
                {availableTimes.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Select Service</label>
              <select 
                style={styles.select}
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                {services.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} - {s.duration} - {s.price}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Special Requests</label>
              <textarea 
                style={styles.textarea}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special requests or notes for your stylist..."
              />
            </div>

            <button 
              style={styles.bookButton}
              onClick={handleBooking}
              disabled={!date}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
    width: '100%',
    backgroundImage: 'url(https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontFamily: '"Playfair Display", serif',
    padding: '2rem',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  content: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: '1000px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
    letterSpacing: '1px',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#b38b6d',
    fontStyle: 'italic',
  },
  bookingContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '2rem',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    padding: '2rem',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
  stylistCard: {
    display: 'flex',
    flexDirection: 'column',
  },
  stylistImage: {
    height: '250px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
  stylistInfo: {
    textAlign: 'center',
  },
  stylistName: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
  },
  stylistSpecialty: {
    fontSize: '1rem',
    color: '#b38b6d',
    fontStyle: 'italic',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: '600',
    letterSpacing: '0.5px',
  },
  input: {
    padding: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '1rem',
    '::placeholder': {
      color: 'rgba(255, 255, 255, 0.5)',
    },
    ':focus': {
      outline: 'none',
      borderColor: '#b38b6d',
    },
  },
  select: {
    padding: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '1rem',
    ':focus': {
      outline: 'none',
      borderColor: '#b38b6d',
    },
  },
  textarea: {
    padding: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '1rem',
    minHeight: '100px',
    resize: 'vertical',
    ':focus': {
      outline: 'none',
      borderColor: '#b38b6d',
    },
  },
  bookButton: {
    padding: '15px',
    backgroundColor: '#b38b6d',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: '600',
    letterSpacing: '1px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '1rem',
    ':hover': {
      backgroundColor: '#9a755a',
    },
    ':disabled': {
      backgroundColor: '#555',
      cursor: 'not-allowed',
    },
  },
};