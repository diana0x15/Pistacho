import { ReactNode } from "react";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import ThemedText from "@/components/ThemedText";
import ProgressBar from "@/components/ProgressBar";

export type CategoryCardProps = {
  image: ReactNode;
  title: string;
  gradientStart: string;
  gradientEnd: string;
  color: string;
  completedGames: number;
  totalGames: number;
};

export default function CategoryCard(props: CategoryCardProps) {
  return (
    <Link push href="../category">
      <LinearGradient
        colors={[props.gradientStart, props.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.card}
      >
        {props.image}
        <View style={styles.cardContent}>
          <ThemedText type="cardTitle">{props.title}</ThemedText>
          <ThemedText>
            {props.completedGames}/{props.totalGames} crucigramas
          </ThemedText>
          <ProgressBar
            progress={props.completedGames / props.totalGames}
            color={props.color}
          />
        </View>
      </LinearGradient>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 120,
    borderRadius: 20,
    padding: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cardContent: {
    display: "flex",
  },
});
