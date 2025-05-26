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
      <div style={styles.card}>
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
        </div>

        <div style={styles.formGroup}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>

        <button onClick={handleLogin} style={styles.loginButton}>
          Sign In
        </button>

        <div style={styles.footer}>
          <Link to="/forgot-password" style={styles.link}>Forgot password?</Link>
          <span style={styles.divider}>|</span>
          <Link to="/register" style={styles.link}>Create account</Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f3f4f6',
    fontFamily: '"Inter", sans-serif',
    padding: '20px',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#fff',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.06)',
    padding: '36px 32px',
  },
  logo: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#b38b6d',
    textAlign: 'center',
    marginBottom: '8px',
    letterSpacing: '2px',
  },
  title: {
    fontSize: '22px',
    fontWeight: '600',
    textAlign: 'center',
    color: '#1f2937',
    marginBottom: '4px',
  },
  subtitle: {
    fontSize: '13px',
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: '24px',
  },
  formGroup: {
    marginBottom: '16px',
  },
  input: {
    width: '92%',
    padding: '12px 14px',
    fontSize: '14px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    backgroundColor: '#fff',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  },
  loginButton: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#b38b6d',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '4px',
    transition: 'background-color 0.2s ease-in-out',
  },
  footer: {
    marginTop: '20px',
    textAlign: 'center',
    fontSize: '13px',
    color: '#6b7280',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    color: '#b38b6d',
    textDecoration: 'none',
    fontWeight: '500',
  },
  divider: {
    margin: '0 10px',
    color: '#d1d5db',
  },
};
