import { useState } from 'react';
import { registerUser } from '../firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

export default function AdminRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password || !confirmPass) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPass) {
      alert("Passwords do not match");
      return;
    }

    try {
      await registerUser(email, password);
      alert("Admin account created successfully!");
      navigate('/admin-login');
    } catch (err) {
      alert("Registration failed: " + err.message);
    }
  };

  return (
    <>
      <style>
        {`
          .inputField {
            padding: 12px;
            background-color: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 4px;
            color: #fff;
            font-size: 1rem;
            width: 100%;
          }

          .inputField::placeholder {
            color: rgba(255, 255, 255, 0.5);
          }

          .inputField:focus {
            outline: none;
            border-color: #b38b6d;
          }

          .registerBtn {
            padding: 15px;
            background-color: #b38b6d;
            color: #fff;
            border: none;
            border-radius: 4px;
            font-size: 1rem;
            font-weight: 600;
            letter-spacing: 1px;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 1rem;
          }

          .registerBtn:hover {
            background-color: #9a755a;
          }

          .registerBtn:disabled {
            background-color: #555;
            cursor: not-allowed;
          }

          .loginLink {
            color: #b38b6d;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
          }

          .loginLink:hover {
            color: #fff;
            text-decoration: underline;
          }
        `}
      </style>

      <div style={styles.container}>
        <div style={styles.overlay}></div>
        <div style={styles.content}>
          <div style={styles.header}>
            <h1 style={styles.title}>Admin Registration</h1>
            <p style={styles.subtitle}>Create your Velura management account</p>
          </div>

          <div style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="inputField"
                placeholder="admin@velura.com"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="inputField"
                placeholder="••••••••"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Confirm Password</label>
              <input
                type="password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className="inputField"
                placeholder="••••••••"
              />
            </div>

            <button
              onClick={handleRegister}
              className="registerBtn"
              disabled={!email || !password || !confirmPass}
            >
              Register Admin Account
            </button>

            <div style={styles.footerWrapper}>
              <div style={styles.footer}>
                <span style={styles.loginText}>Already have an account?</span>
                <Link to="/admin-login" className="loginLink">Sign in</Link>
              </div>
              <div style={styles.clientSignup}>
                <Link to="/client-register" className="loginLink">Sign up as Client</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
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
  footerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '1.5rem',
    gap: '0.5rem',
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '0.9rem',
    gap: '0.5rem',
  },
  clientSignup: {
    fontSize: '0.9rem',
  },
  loginText: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
};
