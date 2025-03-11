import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";

import ThemedText from "./ThemedText";
import ThemedView from "./ThemedView";
import ThemedButton from "./ThemedButton";
import Pistacho from "@/assets/images/pistacho/pistacho.svg";
import { getWindowWidth } from "@/constants/Dimensions";

interface Callbacks {
  showWordList: () => void;
}

export default function GameCompleted(callbacks: Callbacks) {
  const circleSize = getWindowWidth() * 0.8;
  const pistachoSize = getWindowWidth() * 0.5;

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
              Has completado otro crucigrama.
            </ThemedText>
          </Text>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <ThemedButton mode={"secondary"} onPress={callbacks.showWordList}>
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
