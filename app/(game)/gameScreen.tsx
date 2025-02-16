import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ProgressBar } from "@/components/ProgressBar";
import CrosswordGrid, { CrosswordGridProps } from "@/components/CrosswordGrid";
import GestureWrapper from "@/components/GestureWrapper";
import { Game } from "@/constants/Game";

export default function Category() {
  const PADDING_TOP = 80;
  const startWordIndex = 0;
  const [clue, setClue] = useState(Game.words[startWordIndex].clue);

  return (
    <ThemedView style={[styles.background, { paddingTop: PADDING_TOP }]}>
      <KeyboardAvoidingView
        style={[styles.keyboardAvoidingView]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.progressContainer}>
          <ProgressBar color={"#75A7D3"} progress={0.2} style="elevated" />
        </View>
        <View style={styles.gameContainer}>
          <GestureWrapper>
            <CrosswordGrid
              startIndex={startWordIndex}
              updateClue={(newClue: string) => {
                setClue(newClue);
              }}
            />
          </GestureWrapper>
        </View>
        <View style={styles.clueContainer}>
          <ThemedText type={"subtitle"}>{clue}</ThemedText>
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  keyboardAvoidingView: {
    display: "flex",
    flex: 1,
  },
  progressContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginBlock: 30,
  },
  gameContainer: {
    marginTop: 10,
    flex: 1,
  },
  clueContainer: {
    width: "100%",
    height: 80,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D7DECC",
    marginTop: "auto",
  },
});
