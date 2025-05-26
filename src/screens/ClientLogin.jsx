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
      <div style={styles.glassCard}>
        <div style={styles.logo}>VELURA</div>
        <h1 style={styles.title}>Client Portal</h1>
        <p style={styles.subtitle}>Access your appointments and preferences</p>
        
        <div style={styles.formGroup}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <div style={styles.inputGloss}></div>
        </div>
        
        <div style={styles.formGroup}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <div style={styles.inputGloss}></div>
        </div>
        
        <button 
          onClick={handleLogin} 
          style={styles.loginButton}
        >
          <span style={styles.buttonText}>Sign In</span>
          <div style={styles.buttonGloss}></div>
        </button>
        
        <div style={styles.footer}>
          <Link to="/forgot-password" style={styles.link}>Forgot password?</Link>
          <span style={styles.divider}>|</span>
          <Link to="/register" style={styles.link}>Create account</Link>
        </div>
      </div>
      <div style={styles.reflection}></div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
    fontFamily: '"Montserrat", sans-serif',
    position: 'relative',
    overflow: 'hidden',
    '::before': {
      content: '""',
      position: 'absolute',
      top: '-50%',
      left: '-50%',
      width: '200%',
      height: '200%',
      background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
      opacity: '0.6',
      animation: 'glow 8s infinite alternate',
    },
  },
  glassCard: {
    position: 'relative',
    width: '380px',
    padding: '40px',
    background: 'rgba(255, 255, 255, 0.85)',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    zIndex: '1',
    overflow: 'hidden',
    '::before': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      height: '6px',
      background: 'linear-gradient(90deg, #b38b6d 0%, #d4a373 50%, #b38b6d 100%)',
    },
  },
  logo: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#b38b6d',
    textAlign: 'center',
    letterSpacing: '4px',
    marginBottom: '10px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#777',
    textAlign: 'center',
    marginBottom: '30px',
    letterSpacing: '0.5px',
  },
  formGroup: {
    position: 'relative',
    marginBottom: '25px',
  },
  input: {
    width: '100%',
    padding: '14px 20px',
    fontSize: '15px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.7)',
    transition: 'all 0.3s ease',
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
    ':focus': {
      outline: 'none',
      borderColor: '#b38b6d',
      boxShadow: '0 0 0 2px rgba(179, 139, 109, 0.2)',
    },
  },
  inputGloss: {
    position: 'absolute',
    top: '1px',
    left: '1px',
    right: '1px',
    height: '50%',
    background: 'linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)',
    borderRadius: '8px 8px 0 0',
    pointerEvents: 'none',
  },
  loginButton: {
    position: 'relative',
    width: '100%',
    padding: '16px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#fff',
    background: 'linear-gradient(to right, #b38b6d, #d4a373)',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(179, 139, 109, 0.3)',
    marginTop: '10px',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(179, 139, 109, 0.4)',
    },
  },
  buttonText: {
    position: 'relative',
    zIndex: '1',
  },
  buttonGloss: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    height: '50%',
    background: 'linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)',
    borderRadius: '8px 8px 0 0',
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '25px',
    fontSize: '13px',
  },
  link: {
    color: '#b38b6d',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    ':hover': {
      color: '#9a755a',
      textDecoration: 'underline',
    },
  },
  divider: {
    margin: '0 10px',
    color: '#ccc',
  },
  reflection: {
    position: 'absolute',
    bottom: '-100px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '300px',
    height: '100px',
    background: 'linear-gradient(to top, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%)',
    borderRadius: '50%',
    filter: 'blur(20px)',
    opacity: '0.6',
  },
  '@keyframes glow': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
};