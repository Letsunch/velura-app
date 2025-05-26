// src/firebase/auth.js
import { auth, db } from './config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const registerUser = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = async () => {
  return await signOut(auth);
};

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// ✅ Register client with image, username, and Firestore update
export const registerClient = async (email, password, username, profilePicFile) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Upload profile picture to Firebase Storage
  const storage = getStorage();
  const picRef = ref(storage, `profilePictures/${user.uid}`);
  await uploadBytes(picRef, profilePicFile);
  const imageUrl = await getDownloadURL(picRef);

  // Update Firebase Auth profile (optional, good UX)
  await updateProfile(user, {
    displayName: username,
    photoURL: imageUrl,
  });

  // Save to Firestore under 'clients'
  await setDoc(doc(db, 'clients', user.uid), {
    uid: user.uid,
    email,
    username,
    imageUrl,
    createdAt: serverTimestamp()
  });

  return userCredential;
};
