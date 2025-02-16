import { StyleSheet, ScrollView, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { CategoryList } from "@/components/CategoryList";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import { ThemedButton } from "@/components/ThemedButton";
import Pistacho from "@/assets/images/pistacho/pistacho.svg";

export default function HomeScreen() {
  const bottom = useBottomTabOverflow();
  const PADDING_BOTTOM = bottom + 30;
  const PADDING_TOP = 100;

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{
          paddingTop: PADDING_TOP,
          paddingBottom: PADDING_BOTTOM,
        }}
      >
        <View style={styles.header}>
          <View style={styles.title}>
            <ThemedText type="title">¡Hola,</ThemedText>
            <ThemedText type="title" highlight={true}>
              Diana!
            </ThemedText>
            <View style={styles.buttonContainer}>
              <ThemedButton
                mode="primary"
                onPress={() => {
                  console.log("hi");
                }}
              >
                Juego aleatorio
              </ThemedButton>
            </View>
          </View>
          <Pistacho width="180" height="180" style={styles.pistacho} />
        </View>
        <View style={styles.listContainer}>
          <ThemedText type="subtitle">Mi progreso:</ThemedText>
          <CategoryList />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingInline: 20,
    display: "flex",
    flexDirection: "row",
  },
  title: {
    flex: 1,
  },
  pistacho: {
    transform: [{ rotate: "-20deg" }],
    marginRight: -90,
  },
  buttonContainer: {
    maxWidth: 200,
    marginTop: 20,
  },
  listContainer: {
    paddingInline: 20,
    paddingBlock: 30,
    gap: 10,
  },
});
