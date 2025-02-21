import { Link } from "expo-router";
import { StyleSheet, View, Text } from "react-native";

import { IconSymbol } from "@/components/ui/IconSymbol";

export type GameEntryProps = {
  gameId: string;
  categoryId: string;
  index: number;
  primaryColor: string;
  secondaryColor: string;
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
        <IconSymbol size={30} name="checkmark" color={"#fff"} />
      </View>
    );
  };
  const GameIndex = () => {
    if (props.isLocked) {
      return null;
    }
    return (
      <View style={{ position: "absolute" }}>
        <Text style={[styles.gameIndex, { color: props.primaryColor }]}>
          {props.index}
        </Text>
      </View>
    );
  };

  const Entry = () => {
    return (
      <View
        style={[styles.container, { width: props.size, height: props.size }]}
      >
        <View style={[styles.square, { backgroundColor: backgroundColor }]}>
          <GameIndex />
          <CheckIcon />
          <LockIcon />
        </View>
      </View>
    );
  };

  const backgroundColor = props.isLocked
    ? "#EFEFEF"
    : props.isCompleted
    ? props.primaryColor
    : props.secondaryColor;

  if (props.isLocked) {
    return <Entry />;
  }
  return (
    <Link
      push
      href={{
        pathname: "../game",
        params: { gameId: props.gameId, categoryId: props.categoryId },
      }}
    >
      <Entry />
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  square: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  gameIndex: {
    fontSize: 30,
    fontWeight: "500",
  },
});
