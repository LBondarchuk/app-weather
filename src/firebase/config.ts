import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD6Jqz8cGZmwv6RGh1umKoHlUMtMOcTBAU',
  authDomain: 'weather-app-327b6.firebaseapp.com',
  projectId: 'weather-app-327b6',
  storageBucket: 'weather-app-327b6.appspot.com',
  messagingSenderId: '810855583467',
  appId: '1:810855583467:web:3c2638b12fedd94190f8ae',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
