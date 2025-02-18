import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { useAnimatedKeyboard, useAnimatedStyle } from "react-native-reanimated";
import Animated from "react-native-reanimated";

import ThemedView from "@/components/ThemedView";
import ThemedText from "@/components/ThemedText";
import CrosswordGrid from "@/components/CrosswordGrid";
import GestureWrapper from "@/components/GestureWrapper";
import GameCompleted from "@/components/GameCompleted";
import ReviewWords from "@/components/ReviewWords";
import gameData from "@/data/games.json";

enum CurrentView {
  GAME = "game",
  GAME_COMPLETE = "game_complete",
  WORDS = "words",
}

export default function GameScreen() {
  const startWordIndex = 0;
  const [clue, setClue] = useState(gameData.words[startWordIndex].clue);
  const [currentView, setCurrentView] = useState(CurrentView.GAME);

  const keyboard = useAnimatedKeyboard();
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: -keyboard.height.value }],
  }));

  const showWordList = () => {
    setCurrentView(CurrentView.WORDS);
  };

  const showGameCompleted = () => {
    setCurrentView(CurrentView.GAME_COMPLETE);
  };

  if (currentView === CurrentView.GAME_COMPLETE) {
    return <GameCompleted showWordList={showWordList} />;
  }

  if (currentView === CurrentView.WORDS) {
    return <ReviewWords />;
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.container}>
        <GestureWrapper>
          <CrosswordGrid
            startIndex={startWordIndex}
            updateClue={(newClue: string) => {
              setClue(newClue);
            }}
            completeGame={showGameCompleted}
          />
        </GestureWrapper>
      </View>
      <Animated.View style={animatedStyles}>
        <View style={styles.clueContainer}>
          <ThemedText type={"subtitle"}>{clue}</ThemedText>
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
    height: 60,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D7DECC",
    paddingInline: 20,
    paddingBlock: 10,
  },
});
