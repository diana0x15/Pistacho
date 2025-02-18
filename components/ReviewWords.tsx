import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

import ThemedText from "./ThemedText";
import ThemedView from "./ThemedView";
import WordEntry from "./WordEntry";
import BathroomReduced from "@/assets/images/illustrations/bathroom-reduced.svg";

export default function ReviewWords() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <BathroomReduced height={170} width={150} />
          <View style={styles.title}>
            <ThemedText type="title">Lavabo</ThemedText>
          </View>
        </View>

        <View style={styles.wordsContainer}>
          <View style={styles.switchContainer}>
            <SegmentedControl
              values={["Pistas", "Traducciones"]}
              selectedIndex={0}
              onChange={(event) => {}}
            />
          </View>
          <WordEntry hasActionButton={true} isSaved={true} />
          <WordEntry hasActionButton={true} isSaved={false} />
          <WordEntry hasActionButton={true} isSaved={false} />
          <WordEntry hasActionButton={true} isSaved={true} />
          <WordEntry hasActionButton={true} isSaved={false} />
          <WordEntry hasActionButton={true} isSaved={true} />
          <WordEntry hasActionButton={true} isSaved={false} />
          <WordEntry hasActionButton={true} isSaved={false} />
          <WordEntry hasActionButton={true} isSaved={true} />
          <WordEntry hasActionButton={true} isSaved={false} />
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    display: "flex",
    marginTop: 20, // Needed to align with the bathroom image.
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
