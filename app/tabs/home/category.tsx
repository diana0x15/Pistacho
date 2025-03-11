import { useContext } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { RFPercentage } from "react-native-responsive-fontsize";

import { GameContext } from "@/context/GameContext";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import ProgressBar from "@/components/ProgressBar";
import GameEntry from "@/components/GameEntry";
import { getAssetComponent } from "@/components/CategoryCard";
import {
  getWindowWidth,
  getTabViewBottomPadding,
} from "@/constants/Dimensions";
import { getGamesInCategory } from "@/utils/Data";
import { countWords } from "@/utils/Text";
import categories from "@/data/categories.json";

// Route URL: /tabs/home/category?categoryId=123
export default function CategoryScreen() {
  const { completedGames } = useContext(GameContext);

  const PADDING_BOTTOM = getTabViewBottomPadding();

  function openGame(gameId: string, categoryId: string) {
    router.push(`/game?gameId=${gameId}&categoryId=${categoryId}`);
  }

  // Get the data for the current category.
  const { categoryId } = useLocalSearchParams();
  const category = categories.find((category) => category.id === categoryId);
  if (category === undefined) {
    router.replace("/tabs/home");
    return;
  }

  // Get the games in the current category.
  const games = getGamesInCategory(category.id);
  const paddedGames = [...games];
  for (let i = 1; i <= 6; ++i) {
    paddedGames.push({ id: i + "", words: [] });
  }

  // Compute the progress stats for the current category.
  const completedGamesInThisCategory = games.filter((game) => {
    return completedGames.includes(game.id);
  });
  const totalCount = games.length;
  const completedCount = completedGamesInThisCategory.length;
  const progress = totalCount === 0 ? 0 : completedCount / totalCount;

  // Compute dimensions for the layout.
  const entryWidth = Math.floor((getWindowWidth() - 40) / 3);
  const numberOfLines = countWords(category.name) === 1 ? 1 : 2;

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollView,
          { paddingBottom: PADDING_BOTTOM },
        ]}
      >
        <View style={styles.header}>
          {getAssetComponent(category.image, 150)}
          <View style={styles.titleWrapper}>
            <Text
              numberOfLines={numberOfLines}
              adjustsFontSizeToFit
              style={styles.title}
            >
              {category.name}
            </Text>
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
            {paddedGames.map((game, index) => (
              <View
                key={game.id}
                style={[
                  (index % 3 === 0 || index % 3 === 1) &&
                  index >= paddedGames.length - (paddedGames.length % 3)
                    ? styles.alignLeft
                    : null,
                ]}
              >
                <GameEntry
                  game={game}
                  categoryId={category.id}
                  isCompleted={completedGames.includes(game.id)}
                  isLocked={index >= games.length}
                  index={index + 1}
                  size={entryWidth}
                  primaryColor={category.colors.accent}
                  secondaryColor={category.colors.gradient_end}
                  onPress={() => {
                    openGame(game.id, category.id);
                  }}
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
    paddingInline: 20,
  },
  titleWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  title: {
    textAlign: "left",
    fontSize: RFPercentage(6),
    fontWeight: "bold",
    fontFamily: "Hanken Grotesk",
    color: "#7F7F7F",
    marginLeft: 8,
    flexWrap: "wrap",
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
