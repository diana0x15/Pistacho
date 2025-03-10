import { useState, useContext } from "react";
import { Platform, StyleSheet, View, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";

import { GameContext } from "@/context/GameContext";
import ThemedView from "@/components/ThemedView";
import CrosswordGrid from "@/components/CrosswordGrid";
import GestureWrapper from "@/components/GestureWrapper";
import GameCompleted from "@/components/GameCompleted";
import ReviewWords from "@/components/ReviewWords";
import { getGamesInCategory } from "@/utils/Data";

enum CurrentView {
  GAME = "game",
  GAME_COMPLETE = "game_complete",
  WORDS = "words",
}

// Route URL: /game?gameId=123&categoryId=456.
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

  // Compute the position of the clue to display it on top of the keyboard.
  const getClueTransformation = () => {
    if (Platform.OS === "ios") {
      const keyboard = useAnimatedKeyboard();
      return useAnimatedStyle(() => ({
        transform: [{ translateY: -keyboard.height.value }],
      }));
    } else {
      return {
        transform: [{ translateY: 0 }],
      };
    }
  };
  const clueTransformation = getClueTransformation();

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

  const NextButton = () => {
    return (
      <TouchableOpacity onPress={() => {}}>
        <Ionicons size={28} name="chevron-forward" color={"#7E7E7E"} />
      </TouchableOpacity>
    );
  };

  const PrevButton = () => {
    return (
      <TouchableOpacity onPress={() => {}}>
        <Ionicons size={28} name="chevron-back" color={"#7E7E7E"} />
      </TouchableOpacity>
    );
  };

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
      <Animated.View style={clueTransformation}>
        <View style={styles.clueContainer}>
          <View style={styles.clueContent}>
            <TouchableOpacity>
              <PrevButton />
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <AutoSizeText
                fontSize={20}
                numberOfLines={2}
                mode={ResizeTextMode.max_lines}
                style={styles.text}
              >
                {clue}
              </AutoSizeText>
            </View>
            <TouchableOpacity>
              <NextButton />
            </TouchableOpacity>
          </View>
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
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#D7DECC",
  },
  clueContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  text: {
    fontFamily: "Hanken Grotesk",
    color: "#6E6E6E",
    textAlign: "center",
    fontSize: 20,
  },
});
