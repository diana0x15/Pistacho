import React, { createContext, useState, useEffect } from "react";

import { getCompletedGames, completeGame } from "@/services/storage";

export const GameContext = createContext<any>(null);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [completedGames, setCompletedGames] = useState<string[]>([]);

  useEffect(() => {
    const loadCompletedGames = async () => {
      const saved = await getCompletedGames();
      setCompletedGames(saved);
    };
    loadCompletedGames();
  }, []);

  const addCompletedGame = async (gameId: string) => {
    await completeGame(gameId);
    setCompletedGames([...completedGames, gameId]);
  };

  return (
    <GameContext.Provider value={{ completedGames, addCompletedGame }}>
      {children}
    </GameContext.Provider>
  );
};
