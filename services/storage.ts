import { VocabEntry } from "@/constants/Vocabulary";
import AsyncStorage from "@react-native-async-storage/async-storage";

const COMPLETED_GAMES = "completedGames";
const SAVED_WORDS = "savedWords";

export const saveWord = async (word: VocabEntry) => {
  try {
    let words = await AsyncStorage.getItem(SAVED_WORDS);
    let wordList = words ? JSON.parse(words) : [];
    wordList.push(word);
    await AsyncStorage.setItem(SAVED_WORDS, JSON.stringify(wordList));
  } catch (error) {
    console.error("Error saving word:", error);
  }
};

export const unsaveWord = async (word: VocabEntry) => {
  try {
    let savedWords = await AsyncStorage.getItem(SAVED_WORDS);
    let vocabEntryList = savedWords ? JSON.parse(savedWords) : [];
    const updatedWordList = vocabEntryList.filter(
      (entry: VocabEntry) => entry.word !== word.word
    );
    await AsyncStorage.setItem(SAVED_WORDS, JSON.stringify(updatedWordList));
  } catch (error) {
    console.error("Error unsaving word:", error);
  }
};

export const getSavedWords = async () => {
  try {
    let words = await AsyncStorage.getItem(SAVED_WORDS);
    return words ? JSON.parse(words) : [];
  } catch (error) {
    console.error("Error fetching words:", error);
    return [];
  }
};

export const completeGame = async (gameId: string) => {
  try {
    let games = await AsyncStorage.getItem(COMPLETED_GAMES);
    let gameList = games ? JSON.parse(games) : [];
    gameList.push(gameId);
    await AsyncStorage.setItem(COMPLETED_GAMES, JSON.stringify(gameList));
  } catch (error) {
    console.error("Error saving completed game:", error);
  }
};

export const getCompletedGames = async () => {
  try {
    let games = await AsyncStorage.getItem(COMPLETED_GAMES);
    return games ? JSON.parse(games) : [];
  } catch (error) {
    console.error("Error fetching completed games:", error);
    return [];
  }
};
