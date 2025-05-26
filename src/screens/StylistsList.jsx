import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function StylistsList() {
  const [stylists, setStylists] = useState([]);

  useEffect(() => {
    const fetchStylists = async () => {
      const snapshot = await getDocs(collection(db, 'stylists'));
      setStylists(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchStylists();
  }, []);

  return (
    <div>
      <h2>Stylists</h2>
      {stylists.map((stylist) => (
        <div key={stylist.id}>
          <h3>{stylist.name}</h3>
          <Link to={`/book/${stylist.id}`}>Book</Link>
        </div>
      ))}
    </div>
  );
}
