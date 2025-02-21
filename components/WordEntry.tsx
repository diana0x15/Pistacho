import { useState, useContext } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { GameContext } from "@/context/GameContext";
import ThemedText from "./ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { VocabEntry } from "@/constants/Vocabulary";

type WordEntryProps = {
  vocabEntry: VocabEntry;
  hasActionButton?: boolean;
  isSaved?: boolean;
};

export default function WordEntry({
  vocabEntry,
  hasActionButton = false,
  isSaved = false,
}: WordEntryProps) {
  const { addSavedWord, removeSavedWord } = useContext(GameContext);

  const [isSavedState, setIsSavedState] = useState(isSaved);

  const action = hasActionButton ? (
    isSavedState ? (
      <IconSymbol size={28} name="bookmark.fill" color={"#8BAB52"} />
    ) : (
      <IconSymbol size={28} name="bookmark" color={"#7E7E7E"} />
    )
  ) : undefined;

  async function triggerSaved() {
    if (isSavedState) {
      await removeSavedWord(vocabEntry);
      setIsSavedState(false);
    } else {
      await addSavedWord(vocabEntry);
      setIsSavedState(true);
    }
  }

  return (
    <View style={styles.conatiner}>
      <View style={styles.leftSide}>
        <ThemedText type={"cardTitle"} style={styles.title}>
          {vocabEntry.word}
        </ThemedText>
        <ThemedText>{vocabEntry.clue}</ThemedText>
      </View>
      <View style={styles.rightSide}>
        <TouchableOpacity onPress={triggerSaved}>{action}</TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    display: "flex",
    flexDirection: "row",
  },
  leftSide: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    paddingRight: 20,
  },
  rightSide: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    textTransform: "uppercase",
  },
  subtitle: {},
  action: {},
});
