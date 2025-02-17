import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import WordEntry from "@/components/WordEntry";

export default function VocabularyScreen() {
  const PADDING_TOP = 80;

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingTop: PADDING_TOP }}>
        <View style={styles.header}>
          <ThemedText type="title" style={{ fontSize: 52, lineHeight: 52 }}>
            Bolsita de Pistachos
          </ThemedText>
        </View>

        <View style={styles.wordsContainer}>
          <View style={styles.switchContainer}>
            <SegmentedControl
              values={["Pistas", "Traducciones"]}
              selectedIndex={0}
              onChange={(event) => {}}
            />
          </View>
          <WordEntry />
          <WordEntry />
          <WordEntry />
          <WordEntry />
          <WordEntry />
          <WordEntry />
          <WordEntry />
          <WordEntry />
          <WordEntry />
          <WordEntry />
          <WordEntry />
          <WordEntry />
          <WordEntry />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
  },
  header: {
    display: "flex",
    alignItems: "center",
    paddingBlock: 20,
  },
  wordsContainer: {
    width: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingInline: 40,
    gap: 18,
    paddingBottom: 40,
  },
  switchContainer: {
    width: "80%",
    paddingBlock: 10,
  },
});
