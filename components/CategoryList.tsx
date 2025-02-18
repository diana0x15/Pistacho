import { StyleSheet, View } from "react-native";

import CategoryCard from "./CategoryCard";
import Bathroom from "@/assets/images/illustrations/bathroom.svg";
import Rainbow from "@/assets/images/illustrations/rainbow.svg";
import LivingRoom from "@/assets/images/illustrations/living-room.svg";
import Burger from "@/assets/images/illustrations/burger.svg";
import CanvasStand from "@/assets/images/illustrations/canvas-stand.svg";
import CityRoad from "@/assets/images/illustrations/city-road.svg";
import Autumn from "@/assets/images/illustrations/autumn.svg";
import Mac from "@/assets/images/illustrations/imac.svg";
import Calculator from "@/assets/images/illustrations/calculator.svg";
import Christmas from "@/assets/images/illustrations/christmas.svg";
import Sneezing from "@/assets/images/illustrations/sneezing.svg";
import GymGuy from "@/assets/images/illustrations/gym-guy.svg";
import Wallet from "@/assets/images/illustrations/wallet.svg";
import categories from "@/data/categories.json";

function getAssetComponent(name: string, size: number) {
  switch (name) {
    case "burger":
      return <Burger width={size} height={size} />;
    case "living-room":
      return <LivingRoom width={size} height={size} />;
    case "canvas-stand":
      return <CanvasStand width={size} height={size} />;
    case "city-road":
      return <CityRoad width={size} height={size} />;
    case "autumn":
      return <Autumn width={size} height={size} />;
    case "imac":
      return <Mac width={size} height={size} />;
    case "gym-guy":
      return <GymGuy width={size} height={size} />;
    case "wallet":
      return <Wallet width={size} height={size} />;
    case "calculator":
      return <Calculator width={size} height={size} />;
    case "christmas":
      return <Christmas width={size} height={size} />;
    case "sneezing":
      return <Sneezing width={size} height={size} />;
    default:
      return <Bathroom width={size} height={size} />;
  }
}

export default function CategoryList() {
  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          image={getAssetComponent(category.image, 100)}
          title={category.name}
          gradientStart={category.colors.gradient_start}
          gradientEnd={category.colors.gradient_end}
          color={category.colors.accent}
          completedGames={7}
          totalGames={11}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
});
