import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import * as FileSystem from "expo-file-system";

const FOLDER_PATH = "@/data/games";
const folderPath = FileSystem.documentDirectory + "/data/games"; // Modify as needed
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
