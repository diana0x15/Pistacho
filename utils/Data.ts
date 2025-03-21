import { GameWithCategory } from "@/constants/Game";

const CATEGORY_COUNT = 5;
import category1 from "@/data/games/1.json";
import category2 from "@/data/games/2.json";
import category3 from "@/data/games/3.json";
import category4 from "@/data/games/4.json";
import category5 from "@/data/games/5.json";

export function getGamesInCategory(category: string) {
  switch (category) {
    case "1":
      return category1;
    case "2":
      return category2;
    case "3":
      return category3;
    case "4":
      return category4;
    case "5":
      return category5;
    default:
      return [];
  }
}

export function getRandomGame(completedGames: string[]): GameWithCategory {
  const availableGames: GameWithCategory[] = [];
  for (let category = 1; category <= CATEGORY_COUNT; ++category) {
    const games = getGamesInCategory(category + "")
      .filter((g) => !completedGames.includes(g.id))
      .map((g) => {
        return { id: g.id, category };
      });

    availableGames.push(...games);
  }

  // If all games are completed, pick any game.
  if (availableGames.length === 0) {
    for (let category = 1; category <= CATEGORY_COUNT; ++category) {
      const games = getGamesInCategory(category + "").map((g) => {
        return { id: g.id, category };
      });

      availableGames.push(...games);
    }
  }

  const randomIndex = Math.floor(Math.random() * availableGames.length);
  return availableGames[randomIndex];
}
