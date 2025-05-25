// StylistsList.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function StylistsList() {
  const navigate = useNavigate();

  const stylists = [
    {
      id: 1,
      name: 'Lebo Styles',
      image: 'https://images.unsplash.com/photo-1603415526960-f8fcd6d6b27d',
      specialty: 'Braids & Natural Hair',
    },
    {
      id: 2,
      name: 'Thato Barber',
      image: 'https://images.unsplash.com/photo-1592503254352-019c7e60c62f',
      specialty: 'Precision Fades & Beards',
    },
    {
      id: 3,
      name: 'Zanele Cuts',
      image: 'https://images.unsplash.com/photo-1604014238647-f3c9150e35f1',
      specialty: 'Color & Highlights',
    },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Choose Your Stylist</h2>
      <div style={styles.cardsContainer}>
        {stylists.map((stylist) => (
          <div style={styles.card} key={stylist.id}>
            <img src={stylist.image} alt={stylist.name} style={styles.cardImg} />
            <h3 style={styles.cardName}>{stylist.name}</h3>
            <p style={styles.cardSpecialty}>{stylist.specialty}</p>
            <button
              style={styles.cardButton}
              onClick={() => navigate('/booking', { state: { stylist } })}
            >
              Book {stylist.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px 20px',
    backgroundColor: '#E5E8EC',
    fontFamily: 'Lato, sans-serif',
    textAlign: 'center',
  },
  title: {
    fontFamily: 'Playfair Display, serif',
    fontSize: '36px',
    color: '#1B1F3B',
    marginBottom: '40px',
  },
  cardsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
  },
  card: {
    background: 'white',
    borderRadius: '20px',
    padding: '20px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
  },
  cardImg: {
    width: '100%',
    borderRadius: '15px',
    marginBottom: '15px',
  },
  cardName: {
    fontFamily: 'Playfair Display, serif',
    fontSize: '22px',
    color: '#1B1F3B',
    marginBottom: '5px',
  },
  cardSpecialty: {
    color: '#405DE6',
    fontSize: '14px',
    marginBottom: '15px',
  },
  cardButton: {
    backgroundColor: '#1B1F3B',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '25px',
    fontFamily: 'Inter, sans-serif',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};
