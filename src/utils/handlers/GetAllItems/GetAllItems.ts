import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { CollectionName } from '../../types/colectionsTypes';

export const getAllItems = async <T>(
  userId: string,
  collectionName: CollectionName,
  callback: (items: T[]) => void,
) => {
  const docRef = doc(db, collectionName, userId);

  const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
    if (docSnapshot.exists()) {
      const items = docSnapshot.data()[collectionName];
      callback(items);
    } else {
      console.log('No such document!');
    }
  });

  return unsubscribe;
};
