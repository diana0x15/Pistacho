import React, { createContext, useState, useEffect } from "react";

import {
  getCompletedGames,
  completeGame,
  getSavedWords,
  saveWord,
  unsaveWord,
} from "@/services/storage";
import { VocabEntry } from "@/constants/Vocabulary";
import Crossword from "@/constants/Crossword";
import { getCrosswords, getDictionary } from "@/services/firestoreService";
import DictionaryEntry from "@/constants/Dictionary";

export const GameContext = createContext<any>(null);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [crosswords, setCrosswords] = useState<Crossword[]>([]);
  const [dictionary, setDictionary] = useState<DictionaryEntry[]>([]);
  const [completedGames, setCompletedGames] = useState<string[]>([]);
  const [savedWords, setSavedWords] = useState<VocabEntry[]>([]);

  useEffect(() => {
    const fetchCrosswords = async () => {
      const crosswordsData = await getCrosswords();
      setCrosswords(crosswordsData);
    };

    const fetchDictionary = async () => {
      const dictionary = await getDictionary();
      setDictionary(dictionary);
    };

    const loadCompletedGames = async () => {
      const saved = await getCompletedGames();
      setCompletedGames(saved);
    };
    const loadSavedWords = async () => {
      const saved = await getSavedWords();
      setSavedWords(saved);
    };

    fetchCrosswords();
    fetchDictionary();
    loadCompletedGames();
    loadSavedWords();
  }, []);

  const addCompletedGame = async (gameId: string) => {
    await completeGame(gameId);
    setCompletedGames([...completedGames, gameId]);
  };

  const addSavedWord = async (vocabEntry: VocabEntry) => {
    await saveWord(vocabEntry);
    setSavedWords([...savedWords, vocabEntry]);
  };

  const removeSavedWord = async (vocabEntry: VocabEntry) => {
    await unsaveWord(vocabEntry);
    setSavedWords((prevState) => {
      const updatedList = prevState.filter(
        (entry: VocabEntry) => entry.word !== vocabEntry.word
      );
      return updatedList;
    });
  };

  return (
    <GameContext.Provider
      value={{
        crosswords,
        dictionary,
        completedGames,
        savedWords,
        addCompletedGame,
        addSavedWord,
        removeSavedWord,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
