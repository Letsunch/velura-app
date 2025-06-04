import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { auth } from '../firebase/config';
import { bookStylist } from '../firebase/firestore';

export default function BookingScreen() {
  const { stylistId } = useParams();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00');
  const [service, setService] = useState('cut-and-style');
  const [notes, setNotes] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const navigate = useNavigate();

  const stylist = {
    id: stylistId,
    name: "Sophia Laurent",
    specialty: "Creative Director",
    image: "https://images.unsplash.com/photo-1559599101-f09722fb4948"
  };

  const services = [
  { id: 'cut-and-style', name: 'Cut & Style', duration: '60 min', price: 'R277' },
  { id: 'color', name: 'Color Service', duration: '120 min', price: 'R460' },
  { id: 'extensions', name: 'Extensions', duration: '180 min', price: 'R650' },
  { id: 'treatment', name: 'Treatment', duration: '45 min', price: 'R120' }
];


  const availableTimes = ['10:00', '11:30', '13:00', '14:30', '16:00', '17:30'];

  const isValidSAPhone = (phone) => {
    const saPhoneRegex = /^(?:\+27|0)[6-8][0-9]{8}$/;
    return saPhoneRegex.test(phone);
  };

  const handleBooking = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please login first");
      return;
    }

    if (!firstName || !lastName || !clientEmail || !clientPhone || !date) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!isValidSAPhone(clientPhone)) {
      alert("Please enter a valid South African phone number.");
      return;
    }

    try {
      await bookStylist({
        userId: user.uid,
        stylistId,
        stylistName: stylist.name,
        date,
        time,
        service,
        notes,
        firstName,
        lastName,
        clientEmail,
        clientPhone
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
          <div style={styles.stylistSection}>
            <div
              style={{
                ...styles.stylistImage,
                backgroundImage: `url(${stylist.image})`
              }}
            />
            <div style={styles.stylistInfo}>
              <h3 style={styles.stylistName}>{stylist.name}</h3>
              <p style={styles.stylistSpecialty}>{stylist.specialty}</p>
              <div style={styles.divider}></div>
              <p style={styles.sectionTitle}>Selected Service</p>
              <div style={styles.selectedService}>
                {services.find(s => s.id === service)?.name}
              </div>
              <div style={styles.serviceDetails}>
                {services.find(s => s.id === service)?.duration} • {services.find(s => s.id === service)?.price}
              </div>
            </div>
          </div>

          <div style={styles.formSection}>
            <h3 style={styles.formTitle}>Your Details</h3>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>First Name*</label>
                <input
                  type="text"
                  style={styles.input}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Thabo"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Surname*</label>
                <input
                  type="text"
                  style={styles.input}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="e.g. Mokoena"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Email Address*</label>
                <input
                  type="email"
                  style={styles.input}
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Phone Number*</label>
                <input
                  type="tel"
                  style={styles.input}
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="e.g. 0821234567 or +27821234567"
                />
              </div>
            </div>

            <h3 style={styles.formTitle}>Appointment Details</h3>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Date*</label>
                <input
                  type="date"
                  style={styles.input}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Time</label>
                <select
                  style={styles.input}
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                >
                  {availableTimes.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Service</label>
                <select
                  style={styles.input}
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
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Special Requests</label>
              <textarea
                style={{ ...styles.input, minHeight: '100px' }}
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
            <p style={styles.requiredNote}>* Required fields</p>
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
    backgroundImage: 'url(https://images.unsplash.com/photo-1600334129128-685c5582fd35)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '2rem',
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '8px',
    padding: '2rem',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#b38b6d',
    fontStyle: 'italic',
  },
  bookingContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '2rem',
  },
  stylistSection: {
    flex: 1,
  },
  stylistImage: {
    height: '300px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '8px',
    marginBottom: '1rem',
  },
  stylistInfo: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '1rem',
  },
  stylistName: {
    fontSize: '1.5rem',
    fontWeight: '600',
  },
  stylistSpecialty: {
    fontSize: '1rem',
    color: '#777',
  },
  divider: {
    height: '1px',
    backgroundColor: '#ddd',
    margin: '1rem 0',
  },
  sectionTitle: {
    fontSize: '0.85rem',
    color: '#555',
    marginBottom: '0.5rem',
  },
  selectedService: {
    fontWeight: '600',
  },
  serviceDetails: {
    fontSize: '0.9rem',
    color: '#666',
  },
  formSection: {
    flex: 2,
  },
  formTitle: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
    fontWeight: '600',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1.5rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: '500',
    marginBottom: '0.5rem',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  bookButton: {
    marginTop: '2rem',
    width: '100%',
    padding: '1rem',
    backgroundColor: '#b38b6d',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  requiredNote: {
    fontSize: '0.85rem',
    color: '#555',
    textAlign: 'right',
    marginTop: '1rem',
  },
};
