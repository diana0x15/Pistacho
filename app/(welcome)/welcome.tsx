import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";

import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import ThemedButton from "@/components/ThemedButton";
import Pistacho from "@/assets/images/pistacho/pistacho.svg";
import { getWindowWidth } from "@/constants/Dimensions";

export default function WelcomeScreen() {
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
            <ThemedText type="titleSecondary">¡Aprende Español con</ThemedText>
            <ThemedText type="titleSecondary"> </ThemedText>
            <ThemedText type="titleSecondary" highlight={true}>
              Pistacho
            </ThemedText>
            <ThemedText type="titleSecondary">!</ThemedText>
          </Text>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <ThemedButton
          mode={"secondary"}
          onPress={() => {
            router.replace("/(welcome)/form");
          }}
        >
          Siguente
        </ThemedButton>
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
    width: "100%",
    paddingInline: 20,
    marginTop: 30,
  },
  contentTop: {
    flex: 1,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    display: "flex",
    gap: 18,
    marginBlock: "12%",
  },
});
