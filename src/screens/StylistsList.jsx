import React from 'react';
import { useNavigate } from 'react-router-dom';

import Portrait1 from '../assets/Portrait-1.jpg';
import Portrait2 from '../assets/Portrait-2.jpg';
import Portrait3 from '../assets/Portrait-3.jpg';

export default function StylistsList() {
  const navigate = useNavigate();

  const stylists = [
    {
      id: 1,
      name: 'Lebo Styles',
      image: Portrait1,
      specialty: 'Braids & Natural Hair',
    },
    {
      id: 2,
      name: 'Thato Barber',
      image: Portrait2,
      specialty: 'Precision Fades & Beards',
    },
    {
      id: 3,
      name: 'Zanele Cuts',
      image: Portrait3,
      specialty: 'Color & Highlights',
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Choose Your Stylist</h2>
        <p style={styles.subtitle}>Select from our talented professionals</p>
      </div>
      <div style={styles.cardsContainer}>
        {stylists.map((stylist) => (
          <div 
            style={styles.card} 
            key={stylist.id}
            onClick={() => navigate('/booking', { state: { stylist } })}
          >
            <div style={styles.imageContainer}>
              <img 
                src={stylist.image} 
                alt={stylist.name} 
                style={styles.cardImg} 
              />
              <div style={styles.specialtyBadge}>{stylist.specialty}</div>
            </div>
            <div style={styles.cardContent}>
              <h3 style={styles.cardName}>{stylist.name}</h3>
              <button style={styles.cardButton}>
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '60px 20px',
    backgroundColor: '#f8f9fa',
    fontFamily: "'Inter', sans-serif",
    minHeight: '100vh',
  },
  header: {
    textAlign: 'center',
    marginBottom: '50px',
    maxWidth: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '42px',
    color: '#1a1a1a',
    marginBottom: '12px',
    fontWeight: '600',
    letterSpacing: '0.5px',
  },
  subtitle: {
    color: '#6c757d',
    fontSize: '18px',
    marginBottom: '0',
    fontWeight: '300',
  },
  cardsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  card: {
    background: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  imageContainer: {
    position: 'relative',
    height: '250px',
    overflow: 'hidden',
  },
  cardImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  },
  specialtyBadge: {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    backgroundColor: 'rgba(27, 31, 59, 0.9)',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
    letterSpacing: '0.5px',
  },
  cardContent: {
    padding: '25px',
  },
  cardName: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '22px',
    color: '#1a1a1a',
    marginBottom: '15px',
    fontWeight: '600',
  },
  cardButton: {
    backgroundColor: 'transparent',
    color: '#1B1F3B',
    border: '1px solid #1B1F3B',
    padding: '10px 20px',
    borderRadius: '4px',
    fontFamily: "'Inter', sans-serif",
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    width: '100%',
  },
};
