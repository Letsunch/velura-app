import React from 'react';
import { useNavigate } from 'react-router-dom';

import Portrait1 from '../assets/Portrait-1.jpg';
import Portrait2 from '../assets/Portrait-2.jpg';
import Portrait3 from '../assets/Portrait-3.jpg';

export default function StylistsList() {
  const navigate = useNavigate();

  // Random soft background color generator
  const softColors = [
    '#f0f4f8', // Very light blue-gray
    '#f8f5f2', // Warm white
    '#f3f7fb', // Ice blue
    '#f9f7f3', // Soft ivory
    '#f5f9f7', // Mint cream
  ];
  const randomBgColor = softColors[Math.floor(Math.random() * softColors.length)];

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
    <div style={{...styles.container, backgroundColor: randomBgColor}}>
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
              <div style={styles.glossOverlay}></div> {/* Gloss effect */}
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
    fontFamily: "'Inter', sans-serif",
    minHeight: '100vh',
    transition: 'background-color 0.5s ease', // Smooth transition if color changes
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
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    position: 'relative',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)',
    },
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
    zIndex: 2,
  },
  glossOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '60%',
    background: 'linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)',
    zIndex: 1,
    pointerEvents: 'none',
    borderRadius: '12px 12px 0 0',
  },
  cardContent: {
    padding: '25px',
    position: 'relative',
    zIndex: 2,
    background: 'white',
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
    '&:hover': {
      backgroundColor: '#1B1F3B',
      color: 'white',
    },
  },
};