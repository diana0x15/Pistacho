import { useState, useContext, useRef, useEffect } from "react";
import {
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { useLocalSearchParams, router, useNavigation } from "expo-router";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";

import { GameContext } from "@/context/GameContext";
import ThemedView from "@/components/ThemedView";
import CrosswordGrid, { GameControlRef } from "@/components/CrosswordGrid";
import GestureWrapper from "@/components/GestureWrapper";
import GameCompleted from "@/components/GameCompleted";
import ReviewWords from "@/components/ReviewWords";
import HelpMenu from "@/components/HelpMenu";
import { getGamesInCategory } from "@/utils/Data";
import { getAdjustedClueTextSize } from "@/utils/Text";

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
    router.replace("/tabs/home");
    return;
  }

  // Set up the clue.
  const startIndex = 0;
  const [clue, setClue] = useState(game.words[startIndex].clue);
  const gameRef = useRef<GameControlRef>(null);

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

  const NextButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (gameRef.current) {
            gameRef.current.nextWord();
          }
        }}
      >
        <Ionicons size={28} name="chevron-forward" color={"#7E7E7E"} />
      </TouchableOpacity>
    );
  };

  const PrevButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (gameRef.current) {
            gameRef.current.prevWord();
          }
        }}
      >
        <Ionicons size={28} name="chevron-back" color={"#7E7E7E"} />
      </TouchableOpacity>
    );
  };

  const completeGame = () => {
    addCompletedGame(gameId);
    setCurrentView(CurrentView.GAME_COMPLETE);
  };

  const showCurrentWord = () => {};

  // Create the help menu.
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HelpMenu
          firstAction={() => gameRef.current?.showWord()}
          secondAction={() => {
            gameRef.current?.resetGame();
          }}
        />
      ),
    });
  }, [navigation]);

  // Set up the current view (GAME, GAME_COMPLETE or WORDS).
  const [currentView, setCurrentView] = useState(CurrentView.GAME);
  if (currentView === CurrentView.GAME_COMPLETE) {
    return (
      <GameCompleted showWordList={() => setCurrentView(CurrentView.WORDS)} />
    );
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
            startIndex={startIndex}
            updateClue={(newClue: string) => {
              setClue(newClue);
            }}
            completeGame={completeGame}
            ref={gameRef}
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
              <Text
                style={[
                  styles.text,
                  { fontSize: getAdjustedClueTextSize(clue, 22) },
                ]}
              >
                {clue}
              </Text>
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
  },
});
