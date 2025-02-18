import { StyleSheet, Text, ScrollView, View, Dimensions } from "react-native";

import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import CategoryList from "@/components/CategoryList";
import ThemedButton from "@/components/ThemedButton";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import Pistacho from "@/assets/images/pistacho/pistacho.svg";
import { getAdjustedTextSize } from "@/utils/Text";
import {
  getBottomInset,
  getBottomTabHeight,
  getTopInset,
  getVisibleHeight,
} from "@/constants/Dimensions";

export default function HomeScreen() {
  const SCREEN_HEIGHT = getVisibleHeight() - getBottomTabHeight();
  const PADDING_BOTTOM = getBottomInset() + getTopInset() + 10;
  const HEADER_HEIGHT = SCREEN_HEIGHT * 0.6;
  const PISTACHO_SIZE = HEADER_HEIGHT * 0.6;

  const Header = () => {
    const [name] = "Diana".split(" ", 1);

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
            <ThemedButton
              mode="primary"
              onPress={() => {
                console.log("hi");
              }}
            >
              Juego aleatorio
            </ThemedButton>
          </View>
        </View>
        <View style={styles.headerRightSide}>
          <Pistacho
            width={PISTACHO_SIZE}
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
        <CategoryList />
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
    flex: 6,
    display: "flex",
    flexDirection: "column",
    paddingLeft: 20,
  },
  headerRightSide: {
    flex: 4,
    display: "flex",
    justifyContent: "center",
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
    transform: [{ rotate: "-20deg" }],
  },
  listContainer: {
    paddingInline: 20,
    paddingTop: 30,
    gap: 10,
  },
});
