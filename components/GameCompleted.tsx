import { View, Text, StyleSheet, Dimensions } from "react-native";

import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { ThemedButton } from "./ThemedButton";
import Pistacho from "@/assets/images/pistacho/pistacho.svg";

const { width, height } = Dimensions.get("window");

export default function GameCompleted() {
  const circleSize = width * 0.8;

  return (
    <ThemedView style={styles.container}>
      <View style={styles.pistachoContainer}>
        <View
          style={[
            styles.pistachoBackground,
            { height: circleSize, width: circleSize },
          ]}
        >
          <View style={[styles.pistachoShadow, { height: 220, width: 220 }]} />
          <Pistacho style={styles.pistacho} height={220} width={220} />
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
      <View style={styles.buttonsContainer}>
        <ThemedButton mode={"secondary"} onPress={() => {}}>
          Revisa las palabras
        </ThemedButton>
        <ThemedButton onPress={() => {}}>Siguente</ThemedButton>
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
    gap: 60,
    paddingBlock: 80,
  },
  pistachoContainer: {
    paddingTop: 80,
  },
  pistachoBackground: {
    backgroundColor: "#FAFAFA",
    borderRadius: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
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
    width: "100%",
    paddingInline: 20,
  },
  buttonsContainer: {
    display: "flex",
    gap: 18,
    marginTop: "auto",
  },
});
