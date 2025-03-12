import { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { TextInput } from "react-native-paper";

import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import ThemedButton from "@/components/ThemedButton";
import Blackboard from "@/assets/images/illustrations/onboarding/blackboard.svg";
import { getWindowWidth } from "@/constants/Dimensions";
import { isNameValid } from "@/utils/Text";
import { UserContext } from "@/context/UserContext";

export default function NameScreen() {
  const { setUserName } = useContext(UserContext);
  const [name, setName] = useState("");

  const imageSize = getWindowWidth() * 0.8;

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.contentTop}>
          <View style={styles.imageContainer}>
            <Blackboard height={imageSize} width={imageSize} />
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            <ThemedText type="large">¿Cómo te llamas?</ThemedText>
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              placeholder="Nombre..."
              placeholderTextColor="#D9D9D9"
              autoCapitalize="words"
              theme={{ roundness: 100 }}
              outlineColor="#8BAB52"
              activeOutlineColor="#8BAB52"
              textColor="#8BAB52"
              style={styles.input}
              onChangeText={(text) => setName(text)}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <ThemedButton
            isDisbaled={!isNameValid(name)}
            onPress={async () => {
              await setUserName(name.split(" ", 1)[0]);
              router.replace("/onboarding/level");
            }}
          >
            Siguente
          </ThemedButton>
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    flex: 1,
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
  textContainer: {
    width: "100%",
    paddingInline: 20,
    marginTop: "auto",
    marginBottom: 20,
  },
  text: {
    width: "100%",
    textAlign: "center",
  },
  inputContainer: {
    padding: 16,
  },
  input: {
    paddingInline: 10,
    backgroundColor: "transparent",
    fontWeight: 600,
    fontSize: 18,
  },
  buttonContainer: {
    display: "flex",
    gap: 18,
    marginBottom: "12%",
    width: "60%",
  },
});
