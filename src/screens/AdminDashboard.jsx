import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchBookings = async () => {
      const snapshot = await getDocs(collection(db, 'bookings'));
      setBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchBookings();
  }, []);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const filterBookings = (booking) => {
    const bookingDate = new Date(booking.date);
    switch (filter) {
      case 'today':
        return bookingDate.toDateString() === today.toDateString();
      case 'tomorrow':
        return bookingDate.toDateString() === tomorrow.toDateString();
      case 'thisMonth':
        return (
          bookingDate.getMonth() === today.getMonth() &&
          bookingDate.getFullYear() === today.getFullYear()
        );
      default:
        return true;
    }
  };

  const filteredBookings = bookings.filter(filterBookings);

  const chartData = {
    labels: filteredBookings.map((b) =>
      new Date(b.date).toLocaleDateString()
    ),
    datasets: [
      {
        label: 'Bookings',
        data: filteredBookings.map(() => 1),
        fill: false,
        borderColor: 'blue',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          + Add Stylist
        </button>
      </div>

      <div className="flex gap-4 mb-4">
        <button onClick={() => setFilter('all')} className="filter-btn">All</button>
        <button onClick={() => setFilter('today')} className="filter-btn">Today</button>
        <button onClick={() => setFilter('tomorrow')} className="filter-btn">Tomorrow</button>
        <button onClick={() => setFilter('thisMonth')} className="filter-btn">This Month</button>
      </div>

      <ul className="mb-6">
        {filteredBookings.map((booking) => (
          <li key={booking.id} className="border-b py-2">
            <strong>{booking.userId}</strong> booked <strong>{booking.stylistId}</strong> on{' '}
            {new Date(booking.date).toLocaleDateString()}
          </li>
        ))}
      </ul>

      <div>
        <h3 className="text-xl font-semibold mb-2">Bookings Overview</h3>
        <Line data={chartData} />
      </div>
    </div>
  );
}
