import { useContext } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";

import { GameContext } from "@/context/GameContext";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import ProgressBar from "@/components/ProgressBar";
import GameEntry from "@/components/GameEntry";
import { getWindowWidth } from "@/constants/Dimensions";
import { Game } from "@/constants/Game";
import { getAssetComponent } from "@/components/CategoryCard";
import categories from "@/data/categories.json";
import gameData from "@/data/games.json";

export default function CategoryScreen() {
  const { completedGames } = useContext(GameContext);

  // Get the data for the current category.
  const { categoryId } = useLocalSearchParams();
  const category = categories.find((category) => category.id === categoryId);
  if (category === undefined) {
    useNavigation().goBack();
    return;
  }

  // Get the games in the current category.
  const games: Game[] = [];
  category.games.forEach((id) => {
    const game = gameData.find((g) => g.id === id);
    if (game) {
      games.push(game);
    }
  });

  // Compute the progress stats for the current category.
  const completedGamesInThisCategory = games.filter((game) => {
    return completedGames.includes(game.id);
  });
  const totalCount = games.length;
  const completedCount = completedGamesInThisCategory.length;
  const progress = totalCount === 0 ? 0 : completedCount / totalCount;

  // Compute dimensions for the layout.
  const entryWidth = Math.floor((getWindowWidth() - 40) / 3);

  return (
    <ThemedView style={[styles.container]}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          {getAssetComponent(category.image, 150, styles.image)}
          <View style={styles.title}>
            <ThemedText
              type="titleSecondary"
              adjustsFontSizeToFit={true}
              numberOfLines={2}
            >
              {category.name}
            </ThemedText>
          </View>
        </View>
        <View style={styles.progressContainer}>
          <ThemedText>
            {completedCount}/{totalCount} crucigramas
          </ThemedText>
          <ProgressBar color="#75A7D3" progress={progress} style="elevated" />
        </View>
        <View style={styles.gridWrapper}>
          <View style={styles.grid}>
            {games.map((game, index) => (
              <View
                key={game.id}
                style={[
                  (index % 3 === 0 || index % 3 === 1) &&
                  index >= games.length - (games.length % 3)
                    ? styles.alignLeft
                    : null,
                ]}
              >
                <GameEntry
                  gameId={game.id}
                  isCompleted={completedGames.includes(game.id)}
                  isLocked={false}
                  index={index + 1}
                  size={entryWidth}
                  primaryColor={category.colors.accent}
                  secondaryColor={category.colors.gradient_end}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingBottom: 20,
  },
  gridWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  grid: {
    marginTop: 40,
    marginInline: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  alignLeft: {
    marginRight: 0,
  },
  header: {
    display: "flex",
    flexDirection: "row",
  },
  title: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
  },
  image: {
    flex: 1,
  },
  progressContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  entriesList: {
    marginTop: 40,
    gap: 20,
  },
});
