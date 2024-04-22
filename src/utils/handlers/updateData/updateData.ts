import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { CollectionName } from '../../types/colectionsTypes';

interface HasId {
  id: string;
}

export const updateData = async <T extends HasId>(
  userId: string,
  updatedItem: T,
  collectionName: CollectionName,
) => {
  try {
    const userRef = doc(db, collectionName, userId);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      console.error('User document not found');
      return;
    }
    const items = userDoc.data()[collectionName];
    const index = items.findIndex((item: T) => item.id === updatedItem.id);
    if (index === -1) {
      console.log('item not found');
      return;
    }
    items[index] = updatedItem;
    await setDoc(userRef, { [collectionName]: items });
  } catch (error) {
    console.error('Error updating item for user:', error);
  }
};

export default updateData;
