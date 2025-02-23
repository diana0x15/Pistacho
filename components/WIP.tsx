import { View, StyleSheet, ScrollView, Image } from "react-native";

import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import ToolBox from "@/assets/images/illustrations/other/toolbox.svg";

export default function WIP() {
  return (
    <ThemedView style={styles.container}>
      <ToolBox height={250} width={250} style={styles.image} />
      <ThemedText type="large">En desarollo...</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    opacity: 0.6,
  },
  image: {
    marginBottom: -40,
  },
});
