import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import ThemedButton from "@/components/ThemedButton";
import Pistacho from "@/assets/images/pistacho/pistacho.svg";
import { getWindowWidth } from "@/constants/Dimensions";
import { GameContext } from "@/context/GameContext";
import { getGamesInCategory } from "@/utils/Data";

// Route URL: /game/celebration?gameId=123&categoryId=456.
export default function CelebrationScreen() {
  const { completedGames } = useContext(GameContext);

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

  const circleSize = getWindowWidth() * 0.8;
  const pistachoSize = getWindowWidth() * 0.5;

  const message =
    completedGames.length > 0
      ? "Has completado otro crucigrama."
      : "Has completado tu primer crucigrama.";

  return (
    <ThemedView style={styles.container}>
      <View style={styles.contentTop}>
        <View style={styles.pistachoContainer}>
          <View
            style={[
              styles.pistachoBackground,
              { height: circleSize, width: circleSize },
            ]}
          >
            <View
              style={[styles.pistachoShadow, { height: 220, width: 220 }]}
            />
            <Pistacho
              style={styles.pistacho}
              height={pistachoSize}
              width={pistachoSize}
            />
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={{ textAlign: "center" }}>
            <ThemedText type="subtitle" highlight={true}>
              ¡Crujiente!
            </ThemedText>
            <ThemedText type="subtitle"> </ThemedText>
            <ThemedText style={{ color: "#585858" }} type="subtitle">
              {message}
            </ThemedText>
          </Text>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <ThemedButton
          mode={"secondary"}
          onPress={() => {
            router.replace(
              `/game/words?gameId=${gameId}&categoryId=${categoryId}`
            );
          }}
        >
          Revisa las palabras
        </ThemedButton>
        <ThemedButton onPress={router.back}>Siguente</ThemedButton>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    flex: 1,
  },
  pistachoContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  pistachoBackground: {
    backgroundColor: "#FAFAFA",
    borderRadius: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBlock: 6,
  },
  pistacho: {
    position: "absolute",
  },
  pistachoShadow: {
    backgroundColor: "#EFEFEF",
    borderRadius: 1000,
    position: "absolute",
    bottom: -160,
  },
  textContainer: {
    marginTop: "auto",
    width: "100%",
    paddingInline: 20,
  },
  contentTop: {
    flex: 1,
    width: "100%",
  },
  buttonsContainer: {
    display: "flex",
    gap: 18,
    marginBlock: "12%",
  },
});
