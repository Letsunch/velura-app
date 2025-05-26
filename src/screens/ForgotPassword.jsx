import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/config';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleReset = async () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent! Check your inbox.');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>Reset Your Password</h1>
          <p style={styles.subtitle}>Enter your email to receive a reset link</p>
        </div>

        <div style={styles.formContainer}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="your@email.com"
            />
          </div>

          <button 
            onClick={handleReset} 
            style={styles.resetButton}
            disabled={!email}
          >
            Send Reset Link
          </button>

          <div style={styles.footer}>
            <Link to="/login" style={styles.link}>
              <svg style={styles.arrowIcon} viewBox="0 0 24 24">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
              </svg>
              Return to Login
            </Link>
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
    backgroundImage: 'url(https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: '500px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    padding: '2.5rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
    letterSpacing: '1px',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#b38b6d',
    fontStyle: 'italic',
  },
  formContainer: {
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
  resetButton: {
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
  footer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '1.5rem',
    fontSize: '0.9rem',
  },
  link: {
    color: '#b38b6d',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease',
    ':hover': {
      color: '#fff',
      textDecoration: 'underline',
    },
  },
  arrowIcon: {
    width: '18px',
    height: '18px',
    fill: '#b38b6d',
    transition: 'all 0.3s ease',
  },
};