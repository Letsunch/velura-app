import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { auth, db } from '../firebase/config';
import { addDoc, collection } from 'firebase/firestore';

export default function BookingScreen() {
  const { stylistId } = useParams();
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleBooking = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      await addDoc(collection(db, "bookings"), {
        userId: user.uid,
        stylistId,
        date,
        bookedAt: new Date()
      });
      navigate("/confirmation");
    } catch (err) {
      alert("Failed to book: " + err.message);
    }
  };

  return (
    <div>
      <h2>Book Appointment</h2>
      <input type="date" onChange={(e) => setDate(e.target.value)} />
      <button onClick={handleBooking}>Confirm</button>
    </div>
  );
}
