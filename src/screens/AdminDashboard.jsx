import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import {
  FiCalendar,
  FiUser,
  FiScissors,
  FiPlus,
  FiFilter,
  FiBarChart2,
  FiChevronDown,
  FiLogOut,
} from 'react-icons/fi';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'bookings'));
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setBookings(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
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
    labels: filteredBookings.map((b) => new Date(b.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Bookings',
        data: filteredBookings.map(() => 1),
        fill: true,
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(99, 102, 241, 1)',
        pointBorderColor: '#fff',
        pointRadius: 4,
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
    maintainAspectRatio: false,
  };

  const containerStyle = {
    fontFamily: 'Segoe UI, sans-serif',
    background: 'linear-gradient(to bottom right, #f0f4ff, #e8eaff)',
    minHeight: '100vh',
    padding: '30px',
    color: '#2c2c2c',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  };

  const statsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '20px',
    marginBottom: '40px',
  };

  const cardStyle = {
    background: '#fff',
    border: '1px solid #dbeafe',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
  };

  const sectionStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '30px',
  };

  const chartBox = {
    flex: 2,
    background: '#fff',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.03)',
  };

  const recentBox = {
    flex: 1,
    background: '#fff',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.03)',
    maxHeight: '360px',
    overflowY: 'auto',
  };

  const bookingCard = {
    borderBottom: '1px solid #f3f4f6',
    padding: '12px 0',
    display: 'flex',
    justifyContent: 'space-between',
  };

  const buttonStyle = {
    background: 'linear-gradient(to right, #6366f1, #8b5cf6)',
    color: '#fff',
    padding: '10px 16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const profileButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '8px 12px',
    borderRadius: '8px',
    position: 'relative',
    ':hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
  };

  const profileDropdownStyle = {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '8px 0',
    minWidth: '160px',
    zIndex: 100,
    display: showProfileDropdown ? 'block' : 'none',
  };

  const dropdownItemStyle = {
    padding: '8px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
    // Example: signOut(auth).then(() => navigate('/login'));
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '4px' }}>Dashboard</h1>
          <p>Manage bookings and view analytics</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button style={buttonStyle}>
            <FiPlus /> Add Stylist
          </button>
          <div style={{ position: 'relative' }}>
            <button 
              style={profileButtonStyle}
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#6366f1',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <FiUser />
              </div>
              <span>Admin</span>
              <FiChevronDown />
            </button>
            <div style={profileDropdownStyle}>
              <div 
                style={dropdownItemStyle}
                onClick={handleLogout}
              >
                <FiLogOut /> Logout
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of your component remains the same */}
      <div style={statsStyle}>
        <div style={cardStyle}>
          <div>
            <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>Total Bookings</p>
            <h2 style={{ fontSize: '1.5rem' }}>{bookings.length}</h2>
          </div>
          <FiCalendar />
        </div>
        <div style={cardStyle}>
          <div>
            <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>Today</p>
            <h2 style={{ fontSize: '1.5rem' }}>
              {
                bookings.filter(
                  (b) => new Date(b.date).toDateString() === today.toDateString()
                ).length
              }
            </h2>
          </div>
          <FiCalendar />
        </div>
        <div style={cardStyle}>
          <div>
            <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>Tomorrow</p>
            <h2 style={{ fontSize: '1.5rem' }}>
              {
                bookings.filter(
                  (b) => new Date(b.date).toDateString() === tomorrow.toDateString()
                ).length
              }
            </h2>
          </div>
          <FiCalendar />
        </div>
        <div style={cardStyle}>
          <div>
            <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>This Month</p>
            <h2 style={{ fontSize: '1.5rem' }}>
              {
                bookings.filter((b) => {
                  const d = new Date(b.date);
                  return (
                    d.getMonth() === today.getMonth() &&
                    d.getFullYear() === today.getFullYear()
                  );
                }).length
              }
            </h2>
          </div>
          <FiCalendar />
        </div>
      </div>

      <div style={sectionStyle}>
        <div style={chartBox}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}
          >
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiBarChart2 /> Bookings Overview
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiFilter />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                style={{ padding: '6px 10px', borderRadius: '6px' }}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="thisMonth">This Month</option>
              </select>
            </div>
          </div>
          <div style={{ height: '300px' }}>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        <div style={recentBox}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FiCalendar /> Recent Bookings
          </h2>
          {loading ? (
            <p>Loading...</p>
          ) : filteredBookings.length === 0 ? (
            <p>No bookings found</p>
          ) : (
            filteredBookings.slice(0, 5).map((booking) => (
              <div key={booking.id} style={bookingCard}>
                <div>
                  <p><strong>{booking.userName || `User ${booking.userId?.slice(0, 6)}`}</strong></p>
                  <p style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <FiScissors />
                    {booking.stylistName || `Stylist ${booking.stylistId?.slice(0, 6)}`}
                  </p>
                </div>
                <div>
                  <p>{new Date(booking.date).toLocaleDateString()}</p>
                  <small>{new Date(booking.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}