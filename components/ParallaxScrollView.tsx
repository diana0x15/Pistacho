import { ReactElement, PropsWithChildren } from "react";
import { View, Animated, ScrollView, StyleSheet } from "react-native";

type Props = PropsWithChildren<{
  header: ReactElement;
  headerHeight: number;
}>;

export default function ParallaxScrollView({
  children,
  header,
  headerHeight,
}: Props) {
  const scrollY = new Animated.Value(0);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Animated.View
        style={[
          styles.headerContainer,
          { height: headerHeight },
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 200],
                  outputRange: [0, -50],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
        ]}
      >
        {header}
      </Animated.View>

      {/* Foreground Content */}
      <ScrollView
        contentContainerStyle={{ paddingTop: headerHeight }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.contentContainer}>{children}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    position: "absolute",
    width: "100%",
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    backgroundColor: "#fff",
    paddingInline: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 3,
    shadowColor: "#888",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
});
