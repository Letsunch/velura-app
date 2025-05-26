import { useState } from 'react';
import { loginUser } from '../firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

export default function ClientLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please fill in both fields');
      return;
    }

    try {
      await loginUser(email, password);
      navigate('/');
    } catch (err) {
      alert('Login failed: ' + err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>Welcome Back</h1>
          <p style={styles.subtitle}>Sign in to your Velura account</p>
        </div>

        <div style={styles.form}>
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

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="••••••••"
            />
          </div>

          <button 
            onClick={handleLogin} 
            style={styles.loginButton}
            disabled={!email || !password}
          >
            Sign In
          </button>

          <div style={styles.footer}>
            <Link to="/forgot-password" style={styles.link}>Forgot password?</Link>
            <span style={styles.divider}>|</span>
            <Link to="/register" style={styles.link}>Create account</Link>
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
    backgroundImage: 'url(https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
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
  loginButton: {
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
    gap: '0.5rem',
  },
  link: {
    color: '#b38b6d',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    ':hover': {
      color: '#fff',
      textDecoration: 'underline',
    },
  },
  divider: {
    color: 'rgba(255, 255, 255, 0.3)',
  },
};