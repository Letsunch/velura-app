import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [graphData, setGraphData] = useState({ today: 0, week: 0, month: 0 });

  useEffect(() => {
    const fetchBookings = async () => {
      const snapshot = await getDocs(collection(db, 'bookings'));
      const all = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBookings(all);
      setLoading(false);
      calculateStats(all);
    };

    fetchBookings();
  }, []);

  const handleStatusChange = async (id, status) => {
    await updateDoc(doc(db, 'bookings', id), { status });
    setBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, status } : b))
    );
  };

  const calculateStats = (bookings) => {
    const now = new Date();
    const isSameDay = (d) =>
      d.getDate() === now.getDate() &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear();

    const isSameWeek = (d) => {
      const nowWeek = getWeekNumber(now);
      const dateWeek = getWeekNumber(d);
      return now.getFullYear() === d.getFullYear() && nowWeek === dateWeek;
    };

    const isSameMonth = (d) =>
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear();

    let today = 0, week = 0, month = 0;

    bookings.forEach(b => {
      if (b.status === 'accepted') {
        const bookedDate = b.bookedAt?.seconds
          ? new Date(b.bookedAt.seconds * 1000)
          : new Date();

        if (isSameDay(bookedDate)) today++;
        if (isSameWeek(bookedDate)) week++;
        if (isSameMonth(bookedDate)) month++;
      }
    });

    setGraphData({ today, week, month });
  };

  const getWeekNumber = (date) => {
    const firstDay = new Date(date.getFullYear(), 0, 1);
    const dayOfYear = ((date - firstDay + 86400000) / 86400000);
    return Math.ceil(dayOfYear / 7);
  };

  if (loading) return <p style={{ textAlign: 'center' }}>Loading bookings...</p>;

  return (
    <div style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2>📋 All Bookings</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th style={thStyle}>Client</th>
            <th style={thStyle}>Stylist</th>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td style={tdStyle}>{b.userId}</td>
              <td style={tdStyle}>{b.stylistId}</td>
              <td style={tdStyle}>{new Date(b.date).toLocaleDateString()}</td>
              <td style={tdStyle}>{b.status || 'pending'}</td>
              <td style={tdStyle}>
                <button onClick={() => handleStatusChange(b.id, 'accepted')}>✅</button>
                <button onClick={() => handleStatusChange(b.id, 'declined')} style={{ marginLeft: '8px' }}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: '40px' }}>📊 Accepted Bookings Overview</h3>
      <div style={{ maxWidth: '500px', margin: '30px auto' }}>
        <Bar
          data={{
            labels: ['Today', 'This Week', 'This Month'],
            datasets: [
              {
                label: 'Accepted Bookings',
                data: [graphData.today, graphData.week, graphData.month],
                backgroundColor: '#4C7CFF'
              }
            ]
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
              title: { display: false }
            }
          }}
        />
      </div>
    </div>
  );
}

const thStyle = {
  padding: '10px',
  borderBottom: '1px solid #ccc',
  textAlign: 'left'
};

const tdStyle = {
  padding: '10px',
  borderBottom: '1px solid #eee',
};
