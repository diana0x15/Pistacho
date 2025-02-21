import { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

import ThemedText from "./ThemedText";
import ThemedView from "./ThemedView";
import WordEntry from "./WordEntry";
import { getAssetComponent } from "@/components/CategoryCard";
import categories from "@/data/categories.json";
import { Word } from "@/constants/Game";
import { DefinitionType } from "@/constants/Vocabulary";
import WIP from "@/components/WIP";

type ReviewWordsProps = {
  categoryId: string;
  words: Word[];
};

export default function ReviewWords(props: ReviewWordsProps) {
  const category = categories.find((c) => c.id === props.categoryId);

  const [currentView, setCurrentView] = useState(DefinitionType.CLUE);

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          {category
            ? getAssetComponent(category?.image, 150, styles.image)
            : null}
          <View style={styles.title}>
            <ThemedText type="titleSecondary">{category?.name}</ThemedText>
          </View>
        </View>

        <View style={styles.wordsContainer}>
          <View style={styles.switchContainer}>
            <SegmentedControl
              values={["Pistas", "Traducciones"]}
              selectedIndex={0}
              onChange={() => {
                if (currentView === DefinitionType.CLUE) {
                  setCurrentView(DefinitionType.TRANSLATION);
                } else {
                  setCurrentView(DefinitionType.CLUE);
                }
              }}
              appearance={"light"}
            />
          </View>
          {currentView === DefinitionType.TRANSLATION ? (
            <WIP />
          ) : (
            props.words.map((word, index) => {
              const vocabEntry = {
                word: word.word,
                clue: word.clue,
              };
              return (
                <WordEntry
                  key={index}
                  vocabEntry={vocabEntry}
                  hasActionButton={true}
                  isSaved={false}
                />
              );
            })
          )}
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
    marginTop: 20, // Needed to align with the image.
  },
  image: {
    flex: 1,
  },
  wordsContainer: {
    width: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingInline: 30,
    gap: 28,
    paddingBottom: 40,
  },
  switchContainer: {
    width: "80%",
    paddingBlock: 10,
  },
});
