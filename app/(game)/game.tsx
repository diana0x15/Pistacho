import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { ProgressBar } from "@/components/ProgressBar";
import CrosswordGrid from "@/components/CrosswordGrid";

export default function Category() {
  const PADDING_TOP = 80;

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
          <CrosswordGrid />
        </View>
        <View style={styles.clueContainer}></View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  progressContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginBlock: 30,
  },
  gameContainer: {
    marginTop: 10,
    width: "100%",
  },
  clueContainer: {
    width: "100%",
    height: 80,
    backgroundColor: "#D7DECC",
    marginTop: "auto",
  },
});
