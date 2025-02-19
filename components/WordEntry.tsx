import { StyleSheet, View } from "react-native";

import ThemedText from "./ThemedText";
import ThemedView from "./ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { VocabEntry } from "@/constants/Vocabulary";

type WordEntryProps = {
  vocabEntry: VocabEntry;
  hasActionButton?: boolean;
  isSaved?: boolean;
};

export default function WordEntry({
  hasActionButton = false,
  isSaved = false,
}: WordEntryProps) {
  const action = hasActionButton ? (
    isSaved ? (
      <IconSymbol size={28} name="bookmark.fill" color={"#8BAB52"} />
    ) : (
      <IconSymbol size={28} name="bookmark" color={"#7E7E7E"} />
    )
  ) : undefined;

  return (
    <View style={styles.conatiner}>
      <View style={styles.leftSide}>
        <ThemedText type={"cardTitle"} style={styles.title}>
          toalla
        </ThemedText>
        <ThemedText>
          Se usa para secarse el cuerpo después de la ducha.
        </ThemedText>
      </View>
      <View style={styles.rightSide}>{action}</View>
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
