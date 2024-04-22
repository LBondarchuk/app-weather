import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { CollectionName } from '../../types/colectionsTypes';
interface HasId {
  id: string;
}

export const removeDataFromUser = async <T extends HasId>(
  userId: string,
  collectionName: CollectionName,
  id: string,
) => {
  try {
    const userRef = doc(db, collectionName, userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const itemsArray: T[] = userDoc.data()[collectionName];

      const itemIndex = itemsArray.findIndex((item) => item.id === id);

      if (itemIndex !== -1) {
        itemsArray.splice(itemIndex, 1);
        await updateDoc(userRef, { [collectionName]: itemsArray });
      }
    } else {
      console.log(`User document with ID "${userId}" does not exist.`);
    }
  } catch (error) {
    console.error(`Error removing ${collectionName} from user:`, error);
  }
};

export default removeDataFromUser;
