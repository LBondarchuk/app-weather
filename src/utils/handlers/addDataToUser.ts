import { doc, setDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { CollectionName } from '../types/colectionsTypes';

export const addCityToUser = async <T>(
  userId: string,
  collectionName: CollectionName,
  cityWeather: T,
  setLoading: (val: boolean) => void,
) => {
  setLoading(true);
  try {
    const userRef = doc(db, collectionName, userId);
    await setDoc(userRef, { [collectionName]: arrayUnion(cityWeather) }, { merge: true });
  } catch (error) {
    console.error(`Error adding ${collectionName} to user:`, error);
  } finally {
    setLoading(false);
  }
};

export default addCityToUser;
