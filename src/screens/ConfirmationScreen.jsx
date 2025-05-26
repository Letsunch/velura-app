import { Link } from 'react-router-dom';

export default function ConfirmationScreen() {
  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.content}>
        <div style={styles.icon}>✓</div>
        <h1 style={styles.title}>Your Appointment Is Confirmed</h1>
        <p style={styles.message}>
          Thank you for choosing Velura. Your reservation has been secured with our salon.
          A detailed confirmation has been sent to your email with preparation instructions
          and cancellation policy.
        </p>
        <div style={styles.detailsBox}>
          <h3 style={styles.detailsTitle}>Your Reservation Details</h3>
          <p style={styles.detail}><strong>Date:</strong> June 15, 2024</p>
          <p style={styles.detail}><strong>Time:</strong> 2:00 PM</p>
          <p style={styles.detail}><strong>Stylist:</strong> Sophia Laurent</p>
          <p style={styles.detail}><strong>Service:</strong> Premium Hair Coloring</p>
          <p style={styles.detail}><strong>Location:</strong> 9400 Wilshire Blvd, Beverly Hills</p>
        </div>
        <div style={styles.buttonGroup}>
          <Link to="/" style={styles.primaryButton}>
            Back to Home
          </Link>
          <Link to="/stylists" style={styles.secondaryButton}>
            Book Another Service
          </Link>
        </div>
        <p style={styles.note}>
          For any changes or special requests, please call us at <strong>(310) 555-7878</strong>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    height: '100vh',
    width: '100%',
    backgroundImage: 'url(https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    textAlign: 'center',
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
    maxWidth: '800px',
    width: '100%',
  },
  icon: {
    fontSize: '5rem',
    fontWeight: 'bold',
    color: '#b38b6d',
    marginBottom: '1.5rem',
    lineHeight: '1',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    letterSpacing: '1px',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
  },
  message: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    marginBottom: '2.5rem',
    maxWidth: '700px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  detailsBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '4px',
    padding: '2rem',
    marginBottom: '2.5rem',
    textAlign: 'left',
  },
  detailsTitle: {
    fontSize: '1.3rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
    color: '#b38b6d',
    textAlign: 'center',
  },
  detail: {
    fontSize: '1rem',
    marginBottom: '0.8rem',
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '500px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
  },
  primaryButton: {
    display: 'inline-block',
    padding: '12px 30px',
    backgroundColor: '#b38b6d',
    color: '#fff',
    border: 'none',
    borderRadius: '0',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '600',
    letterSpacing: '1px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    textTransform: 'uppercase',
    ':hover': {
      backgroundColor: '#9a755a',
    },
  },
  secondaryButton: {
    display: 'inline-block',
    padding: '12px 30px',
    backgroundColor: 'transparent',
    color: '#fff',
    border: '1px solid #fff',
    borderRadius: '0',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '600',
    letterSpacing: '1px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    textTransform: 'uppercase',
    ':hover': {
      backgroundColor: '#fff',
      color: '#000',
    },
  },
  note: {
    fontSize: '0.9rem',
    fontStyle: 'italic',
    opacity: '0.8',
  },
};