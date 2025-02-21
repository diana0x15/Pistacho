import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/config/firebaseConfig";
import Crossword from "@/constants/Crossword";
import DictionaryEntry from "@/constants/Dictionary";

export const getCrosswords = async (): Promise<Crossword[]> => {
  try {
    // Fetch all the crosswords from the 'crosswords' collection.
    const querySnapshot = await getDocs(collection(firestore, "crosswords"));

    // Map through the documents and return an array of Crossword objects.
    const crosswords: Crossword[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      console.log(doc.id + " " + data.category);
      return {
        id: doc.id,
        category: data.category,
      };
    });

    return crosswords;
  } catch (error) {
    console.error("Error fetching crosswords:", error);
    return [];
  }
};

export const getDictionary = async (): Promise<DictionaryEntry[]> => {
  try {
    // Fetch all the entries from the 'dictionary' collection.
    const querySnapshot = await getDocs(collection(firestore, "dictionary"));

    // Map through the documents and return an array of DictionaryEntry objects.
    const entries: DictionaryEntry[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        word: data.word,
        clue: data.clue,
        translation: data.translation,
      };
    });

    return entries;
  } catch (error) {
    console.error("Error fetching dictionary:", error);
    return [];
  }
};
