import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import ThemedButton from "@/components/ThemedButton";

export default function FormScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.contentTop}>
        <View style={styles.pistachoContainer}></View>
        <View style={styles.textContainer}>
          <Text style={{ textAlign: "center" }}>
            <ThemedText type="titleSecondary">Quien?</ThemedText>
          </Text>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <ThemedButton
          mode={"secondary"}
          onPress={() => {
            AsyncStorage.setItem("hasSeenLogin", "true");
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
