import { useContext } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Bathroom from "@/assets/images/illustrations/categories/bathroom.svg";
import LivingRoom from "@/assets/images/illustrations/categories/living-room.svg";
import Burger from "@/assets/images/illustrations/categories/burger.svg";
import CanvasStand from "@/assets/images/illustrations/categories/canvas-stand.svg";
import CityRoad from "@/assets/images/illustrations/categories/city-road.svg";
import Autumn from "@/assets/images/illustrations/categories/autumn.svg";
import Mac from "@/assets/images/illustrations/categories/imac.svg";
import Calculator from "@/assets/images/illustrations/categories/calculator.svg";
import Christmas from "@/assets/images/illustrations/categories/christmas.svg";
import Sneezing from "@/assets/images/illustrations/categories/sneezing.svg";
import GymGuy from "@/assets/images/illustrations/categories/gym-guy.svg";
import Wallet from "@/assets/images/illustrations/categories/wallet.svg";
import ITGirl from "@/assets/images/illustrations/categories/it-girl.svg";
import { GameContext } from "@/context/GameContext";
import ThemedText from "@/components/ThemedText";
import ProgressBar from "@/components/ProgressBar";
import { Category } from "@/constants/Category";

export function getAssetComponent(name: string, size: number, style?: any) {
  switch (name) {
    case "burger":
      return <Burger width={size} height={size} style={style} />;
    case "living-room":
      return <LivingRoom width={size} height={size} style={style} />;
    case "canvas-stand":
      return <CanvasStand width={size} height={size} style={style} />;
    case "city-road":
      return <CityRoad width={size} height={size} style={style} />;
    case "autumn":
      return <Autumn width={size} height={size} style={style} />;
    case "imac":
      return <Mac width={size} height={size} style={style} />;
    case "gym-guy":
      return <GymGuy width={size} height={size} style={style} />;
    case "wallet":
      return <Wallet width={size} height={size} style={style} />;
    case "calculator":
      return <Calculator width={size} height={size} style={style} />;
    case "christmas":
      return <Christmas width={size} height={size} style={style} />;
    case "sneezing":
      return <Sneezing width={size} height={size} />;
    case "it-girl":
      return <ITGirl width={size} height={size} />;
    default:
      return <Bathroom width={size} height={size} />;
  }
}

export default function CategoryCard({
  category,
  onPress,
}: {
  category: Category;
  onPress: () => void;
}) {
  const { completedGames } = useContext(GameContext);

  // Compute the progress stats for the current category.
  const completedGamesInThisCategory = category.games.filter((gameId) => {
    return completedGames.includes(gameId);
  });
  const totalCount = category.games.length;
  const completedCount = completedGamesInThisCategory.length;
  const progress = totalCount === 0 ? 0 : completedCount / totalCount;

  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={[category.colors.gradient_start, category.colors.gradient_end]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.card}
      >
        {getAssetComponent(category.image, 100)}
        <View style={styles.cardContent}>
          <ThemedText type="cardTitle">{category.name}</ThemedText>
          <ThemedText>
            {completedCount}/{totalCount} crucigramas
          </ThemedText>
          <ProgressBar progress={progress} color={category.colors.accent} />
        </View>
      </LinearGradient>
    </TouchableOpacity>
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
