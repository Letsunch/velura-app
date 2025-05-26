// src/screens/ProfileUser.jsx
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase/config';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function ProfileUser() {
  const [userData, setUserData] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchUserData = async (uid) => {
      const docRef = doc(db, 'clients', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    };

    const fetchBookings = async (uid) => {
      const q = query(collection(db, 'bookings'), where('userId', '==', uid));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBookings(data);
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user.uid);
        fetchBookings(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!userData) return <p style={{ textAlign: 'center' }}>Loading profile...</p>;

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center' }}>
        <img
          src={userData.imageUrl}
          alt="Profile"
          style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover' }}
        />
        <h2>{userData.username}</h2>
        <p>{userData.email}</p>
      </div>

      <h3 style={{ marginTop: '40px' }}>📅 Recent Bookings</h3>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 0 10px rgba(0,0,0,0.05)'
      }}>
        <thead style={{ backgroundColor: '#f8f9fa' }}>
          <tr>
            <th style={cellStyle}>Stylist ID</th>
            <th style={cellStyle}>Date</th>
            <th style={cellStyle}>Booked At</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? bookings.map(booking => (
            <tr key={booking.id}>
              <td style={cellStyle}>{booking.stylistId}</td>
              <td style={cellStyle}>{new Date(booking.date).toLocaleDateString()}</td>
              <td style={cellStyle}>{new Date(booking.bookedAt.seconds * 1000).toLocaleString()}</td>
            </tr>
          )) : (
            <tr>
              <td colSpan="3" style={{ padding: '10px', textAlign: 'center' }}>No bookings yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const cellStyle = {
  padding: '12px',
  borderBottom: '1px solid #e0e0e0',
  textAlign: 'center'
};
