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
      <div style={styles.glassCard}>
        <div style={styles.logo}>VELURA</div>
        <h1 style={styles.title}>Create Your Account</h1>
        <p style={styles.subtitle}>Join our exclusive clientele</p>

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
            <div style={styles.changePhotoLabel}>Click to change photo</div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </div>

        <div style={styles.formGroup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
        </div>

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

        <div style={styles.formGroup}>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            style={styles.input}
          />
        </div>

        <button onClick={handleRegister} style={styles.registerButton}>
          Create Account
        </button>

        <div style={styles.footer}>
          <span style={styles.loginText}>Already have an account?</span>
          <Link to="/client-login" style={styles.loginLink}>Sign in</Link>
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
  glassCard: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#fff',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
    padding: '40px 32px',
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
    marginBottom: '4px',
    color: '#1f2937',
  },
  subtitle: {
    fontSize: '13px',
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: '24px',
  },
  profileSection: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '24px',
  },
  profileImageContainer: {
    position: 'relative',
    width: '96px',
    height: '96px',
    borderRadius: '50%',
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    width: '28px',
    height: '28px',
    fill: '#9ca3af',
  },
  changePhotoLabel: {
    position: 'absolute',
    bottom: '0',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    color: '#fff',
    fontSize: '11px',
    textAlign: 'center',
    padding: '3px 0',
    fontWeight: '500',
  },
  formGroup: {
    marginBottom: '16px',
  },
  input: {
    width: '93%',
    padding: '12px 14px',
    fontSize: '14px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    backgroundColor: '#fff',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  registerButton: {
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
    marginTop: '18px',
    textAlign: 'center',
    fontSize: '13px',
    color: '#6b7280',
  },
  loginText: {
    marginRight: '6px',
  },
  loginLink: {
    color: '#b38b6d',
    textDecoration: 'none',
    fontWeight: '500',
  },
};
