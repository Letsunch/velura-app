import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function StylistsList() {
  const [stylists, setStylists] = useState([]);

  const sampleStylists = [
    {
      name: 'Sophia Laurent',
      specialty: 'Creative Director',
      bio: 'Paris-trained color specialist with 15 years experience in high-fashion looks.',
      image: 'https://images.unsplash.com/photo-1559599101-f09722fb4948',
      type: 'hairdresser'
    },
    {
      name: 'James Van Der Zee',
      specialty: 'Master Barber',
      bio: 'Celebrity barber specializing in precision cuts and beard sculpting.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
      type: 'barber'
    },
    {
      name: 'Isabella Rossi',
      specialty: 'Extension Specialist',
      bio: 'Italian-born hair artist known for her flawless extensions and red carpet styles.',
      image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1',
      type: 'hairdresser'
    },
    {
      name: 'Marcus Johnson',
      specialty: 'Classic Barber',
      bio: 'Traditional barber with modern flair, expert in fades and hot towel shaves.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
      type: 'barber'
    },
    {
      name: 'Lena Chen',
      specialty: 'Texture Expert',
      bio: 'Specializes in curly and textured hair, creating customized care routines.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
      type: 'hairdresser'
    },
    {
      name: 'Diego Martinez',
      specialty: 'Beard Specialist',
      bio: 'Award-winning barber focused on beard grooming and styling.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      type: 'barber'
    }
  ];

  useEffect(() => {
    const fetchAndSeedStylists = async () => {
      const stylistsRef = collection(db, 'stylists');

      try {
        const snapshot = await getDocs(stylistsRef);

        if (snapshot.empty) {
          console.warn('Firestore empty — inserting sample stylists...');
          for (const stylist of sampleStylists) {
            await addDoc(stylistsRef, stylist);
          }

          const newSnapshot = await getDocs(stylistsRef);
          const data = newSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setStylists(data);
        } else {
          const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setStylists(data);
        }
      } catch (error) {
        console.error('Error fetching or inserting stylists:', error);
        setStylists(sampleStylists.map((s, i) => ({ id: (i + 1).toString(), ...s })));
      }
    };

    fetchAndSeedStylists();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Our Master Stylists</h1>
        <p style={styles.subtitle}>Artisans of Beauty & Precision</p>
      </div>

      <div style={styles.grid}>
        {stylists.map((stylist) => (
          <div key={stylist.id} style={styles.card}>
            <div
              style={{
                ...styles.cardImage,
                backgroundImage: `url(${stylist.image})`
              }}
            >
              <div style={styles.cardOverlay}></div>
              <span style={styles.cardType}>{stylist.type === 'barber' ? 'BARBER' : 'HAIRDRESSER'}</span>
            </div>
            <div style={styles.cardContent}>
              <h3 style={styles.cardName}>{stylist.name}</h3>
              <p style={styles.cardSpecialty}>{stylist.specialty}</p>
              <p style={styles.cardBio}>{stylist.bio}</p>
              <Link to={`/book/${stylist.id}`} style={styles.bookButton}>
                Book Consultation
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '4rem 2rem',
    backgroundColor: '#f9f5f0',
    minHeight: '100vh',
    fontFamily: '"Playfair Display", serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  title: {
    fontSize: '3rem',
    fontWeight: '700',
    color: '#333',
    marginBottom: '0.5rem',
    letterSpacing: '1px',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#777',
    fontStyle: 'italic',
    fontWeight: '300',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '2rem',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '4px',
    overflow: 'hidden',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  cardImage: {
    height: '300px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  },
  cardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.7))',
  },
  cardType: {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: '5px 10px',
    fontSize: '0.8rem',
    letterSpacing: '1px',
  },
  cardContent: {
    padding: '1.5rem',
  },
  cardName: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#333',
  },
  cardSpecialty: {
    fontSize: '1rem',
    color: '#b38b6d',
    marginBottom: '1rem',
    fontWeight: '500',
  },
  cardBio: {
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '1.5rem',
    lineHeight: '1.6',
  },
  bookButton: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: 'transparent',
    color: '#b38b6d',
    border: '1px solid #b38b6d',
    borderRadius: '0',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '600',
    letterSpacing: '1px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
};
