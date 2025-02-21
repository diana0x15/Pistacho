import React, { createContext, useState, useEffect } from "react";

import {
  getCompletedGames,
  completeGame,
  getSavedWords,
  saveWord,
  unsaveWord,
} from "@/services/storage";
import { VocabEntry } from "@/constants/Vocabulary";

export const GameContext = createContext<any>(null);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [completedGames, setCompletedGames] = useState<string[]>([]);
  const [savedWords, setSavedWords] = useState<VocabEntry[]>([]);

  useEffect(() => {
    const loadCompletedGames = async () => {
      const saved = await getCompletedGames();
      setCompletedGames(saved);
    };
    const loadSavedWords = async () => {
      const saved = await getSavedWords();
      setSavedWords(saved);
    };
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
        completedGames,
        addCompletedGame,
        savedWords,
        addSavedWord,
        removeSavedWord,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
