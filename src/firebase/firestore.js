import { db } from './config';
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  query,
  where
} from 'firebase/firestore';

// Get all stylists
export const getStylists = async () => {
  const snapshot = await getDocs(collection(db, 'stylists'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Get a single stylist by ID
export const getStylistById = async (id) => {
  const docRef = doc(db, 'stylists', id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

// Book a stylist with full client info
export const bookStylist = async ({
  userId,
  stylistId,
  stylistName,
  date,
  time,
  service,
  notes,
  firstName,
  lastName,
  clientEmail,
  clientPhone
}) => {
  return await addDoc(collection(db, 'bookings'), {
    userId,
    stylistId,
    stylistName,
    date,
    time,
    service,
    notes,
    firstName,
    lastName,
    clientEmail,
    clientPhone,
    bookedAt: new Date()
  });
};

// Get all bookings for current user
export const getUserBookings = async (userId) => {
  const q = query(collection(db, 'bookings'), where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
