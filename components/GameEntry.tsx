import { Link } from "expo-router";
import { StyleSheet, View, Text } from "react-native";

import { IconSymbol } from "@/components/ui/IconSymbol";

export type GameEntryProps = {
  gameId: string;
  index: number;
  isCompleted: boolean;
  isLocked: boolean;
  size: number;
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
    <Link push href={{ pathname: "../game", params: { gameId: props.gameId } }}>
      <View
        style={[styles.container, { width: props.size, height: props.size }]}
      >
        <View
          style={[
            styles.square,
            props.isCompleted ? styles.completed : undefined,
            props.isLocked ? styles.locked : undefined,
          ]}
        >
          <GameIndex />
          <CheckIcon />
          <LockIcon />
        </View>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 6,
  },
  square: {
    height: "100%",
    width: "100%",
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
