import { useState } from 'react';
import { registerUser } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';

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
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Admin Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPass}
        onChange={(e) => setConfirmPass(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
      />
      <button onClick={handleRegister} style={{ padding: '10px 20px' }}>
        Register Admin
      </button>
    </div>
  );
}
