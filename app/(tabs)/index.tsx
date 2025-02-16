import { StyleSheet, ScrollView, View, Dimensions } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { CategoryList } from "@/components/CategoryList";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import { ThemedButton } from "@/components/ThemedButton";
import Pistacho from "@/assets/images/pistacho/pistacho.svg";
import ParallaxScrollView from "@/components/ParallaxScrollView";

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  const bottom = useBottomTabOverflow();
  const HEADER_HEIGHT = height * 0.6;
  const PISTACHO_SIZE = HEADER_HEIGHT * 0.5;
  const PADDING_BOTTOM = bottom + 30;

  const Header = () => {
    return (
      <View style={[styles.header, { height: HEADER_HEIGHT }]}>
        <View style={styles.headerLeftSide}>
          <View style={styles.title}>
            <ThemedText type="title">¡Hola,</ThemedText>
            <ThemedText type="title" highlight={true}>
              Diana!
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
      <View style={styles.listContainer}>
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
    <ThemedView style={[styles.container, { paddingBottom: PADDING_BOTTOM }]}>
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
    paddingBlock: 30,
    gap: 10,
  },
});
