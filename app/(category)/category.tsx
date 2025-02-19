import { StyleSheet, ScrollView, View } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";

import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import ProgressBar from "@/components/ProgressBar";
import GameEntry from "@/components/GameEntry";
import BathroomReduced from "@/assets/images/illustrations/bathroom-reduced.svg";
import { getWindowWidth } from "@/constants/Dimensions";
import { Game } from "@/constants/Game";
import categories from "@/data/categories.json";
import gameData from "@/data/games.json";

export default function CategoryScreen() {
  // Get the current category data.
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

  const squareSize = getWindowWidth() / 3 - 50;
  const totalGames = games.length;
  // TODO: Read completed games from user data.
  const completedGames = 0;
  const progress = totalGames === 0 ? 0 : completedGames / totalGames;

  return (
    <ThemedView style={[styles.container]}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <BathroomReduced height={170} width={150} />
          <View style={styles.title}>
            <ThemedText type="title">Lavabo</ThemedText>
          </View>
        </View>
        <View style={styles.progressContainer}>
          <ThemedText>
            {completedGames}/{totalGames} crucigramas
          </ThemedText>
          <ProgressBar color="#75A7D3" progress={progress} style="elevated" />
        </View>
        <View style={styles.grid}>
          {games.map((game, index) => (
            <GameEntry
              key={game.id}
              gameId={game.id}
              isCompleted={false}
              isLocked={false}
              index={index + 1}
              viewSize={squareSize}
            />
          ))}
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
  grid: {
    marginTop: 40,
    paddingInline: 40,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 32,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    display: "flex",
    marginTop: 20, // Needed to align with the bathroom image.
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
