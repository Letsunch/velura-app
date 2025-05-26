import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const snapshot = await getDocs(collection(db, 'bookings'));
      setBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            {booking.userId} booked stylist {booking.stylistId} on {new Date(booking.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
