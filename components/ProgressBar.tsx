import { StyleSheet, View } from "react-native";

export type ProgressBarProps = {
  progress: number;
  color: string;
  style?: "default" | "elevated";
};

export default function ProgressBar({
  progress,
  color,
  style = "default",
}: ProgressBarProps) {
  const barColor = style === "default" ? "#fff" : "#E7E2E2";

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
      <View style={[{ backgroundColor: barColor }, styles.dot]} />
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
    width: 20,
    height: 20,
    marginLeft: -8,
    borderRadius: 100,
  },
});
