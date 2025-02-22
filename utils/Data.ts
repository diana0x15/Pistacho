import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import * as FileSystem from "expo-file-system";

import { GameWithCategory } from "@/constants/Game";

const CATEGORY_COUNT = 3;
import category1 from "@/data/games/1.json";
import category2 from "@/data/games/2.json";
import category3 from "@/data/games/3.json";

export function getGamesInCategory(category: string) {
  switch (category) {
    case "1":
      return category1;
    case "2":
      return category2;
    case "3":
      return category3;
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

  const randomIndex = Math.floor(Math.random() * availableGames.length);
  return availableGames[randomIndex];
}
