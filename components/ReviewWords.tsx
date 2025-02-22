import { useState, useContext } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { RFPercentage } from "react-native-responsive-fontsize";

import { GameContext } from "@/context/GameContext";
import ThemedText from "./ThemedText";
import ThemedView from "./ThemedView";
import WordEntry from "./WordEntry";
import { getAssetComponent } from "@/components/CategoryCard";
import categories from "@/data/categories.json";
import { countWords } from "@/utils/Text";
import { Word } from "@/constants/Game";
import { DefinitionType, VocabEntry } from "@/constants/Vocabulary";
import WIP from "@/components/WIP";

type ReviewWordsProps = {
  categoryId: string;
  words: Word[];
};

export default function ReviewWords(props: ReviewWordsProps) {
  const { savedWords } = useContext(GameContext);

  const category = categories.find((c) => c.id === props.categoryId);

  const [currentView, setCurrentView] = useState(DefinitionType.CLUE);

  const numberOfLines = countWords(category?.name) === 1 ? 1 : 2;

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          {category ? getAssetComponent(category?.image, 150) : null}
          <View style={styles.titleWrapper}>
            <Text
              numberOfLines={numberOfLines}
              adjustsFontSizeToFit
              style={styles.title}
            >
              {category?.name}
            </Text>
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
              const isSaved = savedWords.find((savedWord: VocabEntry) => {
                return savedWord.word === vocabEntry.word;
              });
              return (
                <WordEntry
                  key={index}
                  vocabEntry={vocabEntry}
                  hasActionButton={true}
                  isSaved={isSaved}
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
    paddingInline: 20,
  },
  titleWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  title: {
    textAlign: "left",
    fontSize: RFPercentage(5),
    fontWeight: "bold",
    fontFamily: "Hanken Grotesk",
    color: "#7F7F7F",
    marginLeft: 8,
    flexWrap: "wrap",
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
