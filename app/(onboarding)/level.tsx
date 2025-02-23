import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-paper";

import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import ThemedButton from "@/components/ThemedButton";
import CanvasStand from "@/assets/images/illustrations/onboarding/canvas-stand.svg";
import { getWindowWidth } from "@/constants/Dimensions";
import { isNameValid } from "@/utils/Text";

enum Level {
  BEGINNER = "Principiante",
  INTERMEDIATE = "Intermedio",
  ADVANCED = "Avanzado",
}

export default function LevelScreen() {
  const [selectedLevel, setSelectedLevel] = useState(Level.BEGINNER);

  const imageSize = getWindowWidth() * 0.8;

  const LevelOption = (props: { level: Level }) => {
    const isSelected = props.level === selectedLevel;
    const borderColor = isSelected ? "#8BAB52" : "#D9D9D9";
    const backgroundColor = isSelected ? "#E8EEDC" : "transparent";
    const dotColor = isSelected ? "#8BAB52" : "transparent";

    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedLevel(props.level);
        }}
        style={[styles.levelContainer, { borderColor, backgroundColor }]}
      >
        <View style={styles.selectOutline}>
          <View style={[styles.selectDot, { backgroundColor: dotColor }]} />
        </View>
        <ThemedText type="defaultSemiBold" highlight={true}>
          {props.level}
        </ThemedText>
      </TouchableOpacity>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.contentTop}>
        <View style={styles.imageContainer}>
          <CanvasStand height={imageSize} width={imageSize} />
        </View>
      </View>
      <View style={styles.levels}>
        <Text style={styles.text}>
          <ThemedText type="large">¿Cuál es tu nivel de español?</ThemedText>
        </Text>
        <LevelOption level={Level.BEGINNER} />
        <LevelOption level={Level.INTERMEDIATE} />
        <LevelOption level={Level.ADVANCED} />
      </View>

      <View style={styles.buttonContainer}>
        <ThemedButton
          onPress={() => {
            AsyncStorage.setItem("userlevel", selectedLevel);
            AsyncStorage.setItem("onboardingDone", "true");
            router.replace("/(tabs)");
          }}
        >
          Empieza
        </ThemedButton>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
  },
  imageContainer: {
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  contentTop: {
    flex: 1,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  levels: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    paddingInline: 20,
    marginTop: "auto",
    paddingBottom: 40,
  },
  text: {
    width: "100%",
    textAlign: "center",
    marginBottom: 10,
  },
  levelContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "84%",
    height: 54,
    borderWidth: 3,
    borderRadius: 100,
    paddingInline: 20,
    marginBlock: 4,
  },
  selectOutline: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#8BAB52",
    marginRight: 10,
    borderRadius: 100,
  },
  selectDot: {
    width: 10,
    height: 10,
    backgroundColor: "#8BAB52",
    borderRadius: 100,
  },
  buttonContainer: {
    display: "flex",
    gap: 18,
    marginBottom: "12%",
    width: "60%",
  },
});
