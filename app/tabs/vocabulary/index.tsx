import { useContext, useState } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

import { GameContext } from "@/context/GameContext";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import WordEntry from "@/components/WordEntry";
import {
  getTopInset,
  getWindowHeight,
  getTabViewBottomPadding,
} from "@/constants/Dimensions";
import { VocabEntry } from "@/constants/Vocabulary";
import { DefinitionType } from "@/constants/Vocabulary";
import WIP from "@/components/WIP";

export default function VocabularyScreen() {
  const { savedWords } = useContext(GameContext);

  const [currentView, setCurrentView] = useState(DefinitionType.CLUE);

  const HEIGHT = getWindowHeight();
  const PADDING_TOP = getTopInset() + 20;
  const PADDING_BOTTOM = getTabViewBottomPadding() + 20;

  return (
    <ThemedView style={[styles.container, { paddingTop: PADDING_TOP }]}>
      <Image
        style={[
          styles.shells,
          {
            height: HEIGHT / 3,
            bottom: getTabViewBottomPadding() - 30,
          },
        ]}
        resizeMode={"contain"}
        source={require("../../../assets/images/pistacho/shells.png")}
      />
      <ScrollView>
        <View style={styles.header}>
          <ThemedText type="title" style={{ fontSize: 52, lineHeight: 52 }}>
            Bolsita de Pistachos
          </ThemedText>
        </View>

        <View
          style={[styles.wordsContainer, { paddingBottom: PADDING_BOTTOM }]}
        >
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
            savedWords.map((savedVocabEntry: VocabEntry, index: number) => {
              return <WordEntry key={index} vocabEntry={savedVocabEntry} />;
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
    alignItems: "center",
    paddingBlock: 20,
  },
  wordsContainer: {
    width: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingInline: 30,
    gap: 28,
  },
  switchContainer: {
    width: "80%",
    paddingBlock: 10,
  },
  shells: {
    position: "absolute",
    left: 30,
    opacity: 0.3,
    transform: [{ rotate: "-20deg" }],
  },
});
