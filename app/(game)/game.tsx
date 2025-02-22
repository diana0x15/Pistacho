import { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";

import { GameContext } from "@/context/GameContext";
import ThemedView from "@/components/ThemedView";
import ThemedText from "@/components/ThemedText";
import CrosswordGrid from "@/components/CrosswordGrid";
import GestureWrapper from "@/components/GestureWrapper";
import GameCompleted from "@/components/GameCompleted";
import ReviewWords from "@/components/ReviewWords";
import gameData from "@/data/games.json";
import { getGamesInCategory } from "@/utils/Data";

enum CurrentView {
  GAME = "game",
  GAME_COMPLETE = "game_complete",
  WORDS = "words",
}

// Route URL: app/{gameId}.
export default function GameScreen() {
  const { addCompletedGame } = useContext(GameContext);

  // Get the current game data.
  const { gameId, categoryId } = useLocalSearchParams<{
    gameId: string;
    categoryId: string;
  }>();
  const game = getGamesInCategory(categoryId).find((g) => g.id === gameId);
  if (game === undefined) {
    useNavigation().goBack();
    return;
  }

  const startWordIndex = 0;

  const [clue, setClue] = useState(game.words[startWordIndex].clue);
  const [currentView, setCurrentView] = useState(CurrentView.GAME);

  const keyboard = useAnimatedKeyboard();
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: -keyboard.height.value }],
  }));

  const showWordList = () => {
    setCurrentView(CurrentView.WORDS);
  };

  const completeGame = () => {
    addCompletedGame(gameId);
    setCurrentView(CurrentView.GAME_COMPLETE);
  };

  if (currentView === CurrentView.GAME_COMPLETE) {
    return <GameCompleted showWordList={showWordList} />;
  }

  if (currentView === CurrentView.WORDS) {
    return <ReviewWords categoryId={categoryId} words={game.words} />;
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.container}>
        <GestureWrapper>
          <CrosswordGrid
            game={game}
            startIndex={startWordIndex}
            updateClue={(newClue: string) => {
              setClue(newClue);
            }}
            completeGame={completeGame}
          />
        </GestureWrapper>
      </View>
      <Animated.View style={animatedStyles}>
        <View style={styles.clueContainer}>
          <ThemedText
            adjustsFontSizeToFit={true}
            numberOfLines={2}
            type={"subtitle"}
          >
            {clue}
          </ThemedText>
        </View>
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  clueContainer: {
    position: "absolute",
    width: "100%",
    height: 80,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D7DECC",
    paddingInline: 16,
    paddingBlock: 10,
  },
});
