import { useState, useRef } from 'react';
import { registerClient } from '../firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

export default function ClientRegister() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleRegister = async () => {
    if (!email || !username || !password || !confirmPass || !profilePic) {
      alert("Please fill all fields and upload a profile picture");
      return;
    }

    if (password !== confirmPass) {
      alert("Passwords do not match");
      return;
    }

    try {
      await registerClient(email, password, username, profilePic);
      navigate('/client-login');
    } catch (err) {
      alert("Registration failed: " + err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>Join Velura</h1>
          <p style={styles.subtitle}>Create your exclusive account</p>
        </div>

        <div style={styles.profileSection}>
          <div style={styles.profileImageContainer} onClick={triggerFileInput}>
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile preview"
                style={styles.profileImage}
              />
            ) : (
              <div style={styles.profilePlaceholder}>
                <svg style={styles.cameraIcon} viewBox="0 0 24 24">
                  <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1 0 .33.03.65.07.97l-2.11 1.66c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66z" />
                </svg>
              </div>
            )}
            <div style={styles.changePhotoLabel}>Add Profile Photo</div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </div>

        <div style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              placeholder="Choose your username"
            />
          </div>

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

          <div style={styles.formGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              style={styles.input}
              placeholder="••••••••"
            />
          </div>

          <button 
            onClick={handleRegister} 
            style={styles.registerButton}
            disabled={!email || !username || !password || !confirmPass || !profilePic}
          >
            Create Account
          </button>

          <div style={styles.footer}>
            <span style={styles.loginText}>Already have an account?</span>
            <Link to="/client-login" style={styles.loginLink}>Sign in</Link>
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
    backgroundImage: 'url(https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
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
    marginBottom: '1.5rem',
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
  profileSection: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1.5rem',
  },
  profileImageContainer: {
    position: 'relative',
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid rgba(179, 139, 109, 0.5)',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  profilePlaceholder: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  cameraIcon: {
    width: '32px',
    height: '32px',
    fill: 'rgba(255, 255, 255, 0.7)',
  },
  changePhotoLabel: {
    position: 'absolute',
    bottom: '0',
    width: '100%',
    backgroundColor: 'rgba(179, 139, 109, 0.7)',
    color: '#fff',
    fontSize: '12px',
    textAlign: 'center',
    padding: '6px 0',
    fontWeight: '500',
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
  registerButton: {
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
  loginText: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  loginLink: {
    color: '#b38b6d',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    ':hover': {
      color: '#fff',
      textDecoration: 'underline',
    },
  },
};