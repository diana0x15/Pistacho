import { Link } from "expo-router";
import { StyleSheet, View, Text } from "react-native";

import { IconSymbol } from "@/components/ui/IconSymbol";

export type GameEntryProps = {
  index: number;
  viewSize: number;
  isCompleted: boolean;
  isLocked: boolean;
};

export default function GameEntry(props: GameEntryProps) {
  const LockIcon = () => {
    if (!props.isLocked) {
      return null;
    }
    return (
      <View style={{ position: "absolute" }}>
        <IconSymbol size={40} name="lock" color={"#BDBDBD"} />
      </View>
    );
  };
  const CheckIcon = () => {
    if (!props.isCompleted) {
      return null;
    }
    return (
      <View style={{ position: "absolute" }}>
        <IconSymbol size={40} name="checkmark" color={"#fff"} />
      </View>
    );
  };
  const GameIndex = () => {
    if (props.isLocked) {
      return null;
    }
    return (
      <View style={{ position: "absolute" }}>
        <Text style={styles.gameIndex}>{props.index}</Text>
      </View>
    );
  };

  return (
    <Link push href="../game">
      <View
        style={[
          styles.container,
          props.isCompleted ? styles.completed : undefined,
          props.isLocked ? styles.locked : undefined,
          { width: props.viewSize, height: props.viewSize },
        ]}
      >
        <GameIndex />
        <CheckIcon />
        <LockIcon />
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#F3F9FB",
  },
  completed: {
    backgroundColor: "#75A7D3",
  },
  locked: {
    backgroundColor: "#EFEFEF",
  },
  gameIndex: {
    fontSize: 30,
    color: "#75A7D3",
  },
});
