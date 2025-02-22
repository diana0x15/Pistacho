import { useContext } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { useRouter } from "expo-router";

import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import ThemedButton from "@/components/ThemedButton";
import CategoryCard from "@/components/CategoryCard";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { GameContext } from "@/context/GameContext";
import { UserContext } from "@/context/UserContext";
import Pistacho from "@/assets/images/pistacho/pistacho-rotated.svg";
import { getAdjustedTextSize } from "@/utils/Text";
import {
  getBottomInset,
  getBottomTabHeight,
  getTopInset,
  getVisibleHeight,
  getWindowWidth,
} from "@/constants/Dimensions";
import { getRandomGame } from "@/utils/Data";
import categories from "@/data/categories.json";

export default function HomeScreen() {
  const { completedGames } = useContext(GameContext);
  const { name } = useContext(UserContext);
  const router = useRouter();

  const SCREEN_HEIGHT = getVisibleHeight() - getBottomTabHeight();
  const SCREEN_WIDTH = getWindowWidth();
  const PADDING_BOTTOM = getBottomInset() + getTopInset() + 10;
  const HEADER_HEIGHT = SCREEN_HEIGHT * 0.6;
  const PISTACHO_SIZE = HEADER_HEIGHT * 0.6;

  function openRandomGame() {
    const { id, category } = getRandomGame(completedGames);
    router.push(`/(game)/game?gameId=${id}&categoryId=${category}`);
  }

  const Header = () => {
    // Dynamically adjust font size based on the length of the name
    let textSize = getAdjustedTextSize(name, 64);
    const fontStyle = {
      fontSize: textSize,
      lineHeight: textSize,
    };

    return (
      <View style={[styles.header, { height: HEADER_HEIGHT }]}>
        <View style={styles.headerLeftSide}>
          <View style={styles.title}>
            <ThemedText type="title" style={fontStyle}>
              ¡Hola,
            </ThemedText>
            <ThemedText type="title" style={fontStyle} highlight={true}>
              {name}!
            </ThemedText>
          </View>
          <View style={styles.buttonContainer}>
            <ThemedButton mode="primary" onPress={openRandomGame}>
              Juego aleatorio
            </ThemedButton>
          </View>
        </View>
        <View style={styles.headerRightSide}>
          <Pistacho
            width={SCREEN_WIDTH * 0.4}
            height={PISTACHO_SIZE}
            style={styles.pistacho}
          />
        </View>
      </View>
    );
  };

  const Content = () => {
    return (
      <View style={[styles.listContainer, { paddingBottom: PADDING_BOTTOM }]}>
        <ThemedText type="subtitle">Mi progreso:</ThemedText>
        <View style={styles.list}>
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </View>
      </View>
    );
  };

  const ParallaxScroll = () => {
    return (
      <ParallaxScrollView header={<Header />} headerHeight={HEADER_HEIGHT}>
        {<Content />}
      </ParallaxScrollView>
    );
  };

  const RegularScroll = () => {
    return (
      <ScrollView>
        <Header />
        <Content />
      </ScrollView>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <RegularScroll />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    paddingBlock: 40,
  },
  headerLeftSide: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    paddingLeft: 20,
  },
  headerRightSide: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  title: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  buttonContainer: {
    maxWidth: 200,
    marginTop: "auto",
  },
  pistacho: {
    marginBottom: -30,
  },
  listContainer: {
    paddingInline: 20,
    paddingTop: 30,
    gap: 10,
  },
  list: {
    gap: 20,
  },
});
