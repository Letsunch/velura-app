// src/firebase/auth.js

import { auth } from './config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

/**
 * Register a new user (admin sign-up)
 * @param {string} email
 * @param {string} password
 * @returns {Promise<UserCredential>}
 */
export const registerUser = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

/**
 * Log in an existing user (admin login)
 * @param {string} email
 * @param {string} password
 * @returns {Promise<UserCredential>}
 */
export const loginUser = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

/**
 * Log out the currently authenticated user
 * @returns {Promise<void>}
 */
export const logoutUser = async () => {
  return await signOut(auth);
};

/**
 * Optional: Listen for auth state changes
 * @param {function} callback - receives the current user or null
 * @returns {function} unsubscribe
 */
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};
