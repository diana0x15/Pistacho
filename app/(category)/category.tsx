import { useContext } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";

import { GameContext } from "@/context/GameContext";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import ProgressBar from "@/components/ProgressBar";
import GameEntry from "@/components/GameEntry";
import { getAssetComponent } from "@/components/CategoryCard";
import { getWindowWidth } from "@/constants/Dimensions";
import categories from "@/data/categories.json";
import Crossword from "@/constants/Crossword";

// Route URL: app/{categoryId}.
export default function CategoryScreen() {
  const { completedGames, crosswords } = useContext(GameContext);

  // Get the data for the current category.
  const { categoryId } = useLocalSearchParams();
  const category = categories.find((category) => category.id === categoryId);
  if (category === undefined) {
    useNavigation().goBack();
    return;
  }

  // Get the games in the current category.
  const games = crosswords.filter((crossword: Crossword) => {
    return crossword.category === categoryId;
  });

  const paddedGames = [...games];
  for (let i = 1; i <= 6; ++i) {
    paddedGames.push({ id: i + "", category: categoryId });
  }

  // Compute the progress stats for the current category.
  const completedGamesInThisCategory = games.filter((game: Crossword) => {
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
            <ThemedText type="titleSecondary">{category.name}</ThemedText>
          </View>
        </View>
        <View style={styles.progressContainer}>
          <ThemedText>
            {completedCount}/{totalCount} crucigramas
          </ThemedText>
          <ProgressBar
            color={category.colors.accent}
            progress={progress}
            style="elevated"
          />
        </View>
        <View style={styles.gridWrapper}>
          <View style={styles.grid}>
            {paddedGames.map((crossword, index) => (
              <View
                key={crossword.id}
                style={[
                  (index % 3 === 0 || index % 3 === 1) &&
                  index >= paddedGames.length - (paddedGames.length % 3)
                    ? styles.alignLeft
                    : null,
                ]}
              >
                <GameEntry
                  gameId={crossword.id}
                  categoryId={category.id}
                  isCompleted={completedGames.includes(crossword.id)}
                  isLocked={index >= games.length}
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
