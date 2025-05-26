import { Link } from 'react-router-dom';

export default function HomeScreen() {
  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.content}>
        <h1 style={styles.title}>Welcome to Velura</h1>
        <p style={styles.subtitle}>Beverly Hills' Premier Hair Experience</p>
        <Link to="/stylists" style={styles.button}>
          Discover Our Master Stylists
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    height: '100vh',
    width: '100%',
    backgroundImage: 'url(https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    textAlign: 'center',
    fontFamily: '"Playfair Display", serif',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  content: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '800px',
    padding: '2rem',
  },
  title: {
    fontSize: '4.5rem',
    fontWeight: '700',
    marginBottom: '1rem',
    letterSpacing: '2px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  },
  subtitle: {
    fontSize: '1.5rem',
    marginBottom: '3rem',
    fontStyle: 'italic',
    fontWeight: '300',
    letterSpacing: '1px',
  },
  button: {
    display: 'inline-block',
    padding: '15px 30px',
    backgroundColor: 'transparent',
    color: '#fff',
    border: '2px solid #fff',
    borderRadius: '0',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    letterSpacing: '1px',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#fff',
      color: '#000',
    },
  },
};