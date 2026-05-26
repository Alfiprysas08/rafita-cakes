import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/12.13.0/firebase-database.js';

const firebaseConfig = {
  apiKey: 'AIzaSyB9N_1P1gtm7bIqLIl8ffXRRaVSQ0c6v-4',
  authDomain: 'rafitacakes.firebaseapp.com',
  databaseURL: 'https://rafitacakes-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'rafitacakes',
  storageBucket: 'rafitacakes.firebasestorage.app',
  messagingSenderId: '484516474097',
  appId: '1:484516474097:web:911e9cf488ecdb12bccd50',
  measurementId: 'G-1TEJ1CR3F6'
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
