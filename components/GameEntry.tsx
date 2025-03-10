import { useMemo } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { createGrid } from "./CrosswordGrid";
import { Game } from "@/constants/Game";

export type GameEntryProps = {
  game: Game;
  categoryId: string;
  index: number;
  primaryColor: string;
  secondaryColor: string;
  isCompleted: boolean;
  isLocked: boolean;
  size: number;
  onPress: () => void;
};

export default function GameEntry(props: GameEntryProps) {
  const LockIcon = () => {
    if (!props.isLocked) {
      return null;
    }
    return (
      <View style={{ position: "absolute" }}>
        <Ionicons size={30} name="lock-closed" color={"#ACACAC"} />
      </View>
    );
  };
  const CheckIcon = () => {
    if (!props.isCompleted) {
      return null;
    }
    return (
      <View style={{ position: "absolute" }}>
        <Ionicons name="trophy" size={46} color={props.primaryColor} />
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

  const PreviewGrid = () => {
    if (props.isLocked) {
      return null;
    }
    const grid = useMemo(() => {
      return createGrid(props.game.words, true);
    }, []);

    return grid.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.gridRow}>
        {row.map((cell, colIndex) => (
          <View
            key={colIndex}
            style={[
              styles.gridCell,
              cell === null
                ? undefined
                : { backgroundColor: props.primaryColor },
            ]}
          />
        ))}
      </View>
    ));
  };

  const Entry = () => {
    return (
      <View
        style={[styles.container, { width: props.size, height: props.size }]}
      >
        <View style={[styles.square, specialStyling]}>
          <PreviewGrid />
        </View>
        <CheckIcon />
        <LockIcon />
      </View>
    );
  };

  const specialStyling = {
    backgroundColor: props.isLocked ? "#E9E9E9" : props.secondaryColor,
    opacity: props.isCompleted ? 0.3 : 0.9,
    borderColor: props.primaryColor,
    borderWidth: props.isCompleted ? 3 : 0,
  };

  return props.isLocked ? (
    <Entry />
  ) : (
    <TouchableOpacity onPress={props.onPress}>
      <Entry />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  gridRow: {
    flexDirection: "row",
    opacity: 0.8,
  },
  gridCell: {
    height: 6,
    width: 6,
    margin: 0.5,
    borderRadius: 1.5,
  },
});
