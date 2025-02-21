import { StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export type ProgressBarProps = {
  progress: number; // Number between 0 and 1.
  color: string;
  style?: "default" | "elevated";
};

export default function ProgressBar({
  progress,
  color,
  style = "default",
}: ProgressBarProps) {
  const barColor = style === "default" ? "#fff" : "#E7E2E2";
  const dotColor = progress === 1 ? color : barColor;
  const trophyColor = progress === 1 ? "#fff" : color;

  return (
    <View style={styles.container}>
      <View style={[{ backgroundColor: barColor }, styles.bar]}>
        <View
          style={[
            { width: `${progress * 100}%`, backgroundColor: color },
            styles.progress,
          ]}
        />
      </View>
      <View style={[{ backgroundColor: dotColor }, styles.dot]}>
        <Ionicons name="trophy" size={10} color={trophyColor} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  bar: {
    overflow: "hidden",
    width: 160,
    height: 10,
    borderRadius: 100,
  },
  progress: {
    height: 10,
    borderRadius: 100,
  },
  dot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    marginLeft: -8,
    borderRadius: 100,
  },
});
