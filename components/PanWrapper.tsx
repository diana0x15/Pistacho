import React from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

interface PanWrapperProps {
  children: React.ReactNode;
}

const PanWrapper: React.FC<PanWrapperProps> = ({ children }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const offsetX = useSharedValue(0); // Stores last position
  const offsetY = useSharedValue(0);

  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const panGesture = Gesture.Pan()
    .onStart(() => {
      // Set initial translation to last known position
      translateX.value = offsetX.value;
      translateY.value = offsetY.value;
    })
    .onUpdate((event) => {
      // Update position based on gesture movement
      translateX.value = offsetX.value + event.translationX;
      translateY.value = offsetY.value + event.translationY;

      // TODO: Clamp the movement within limits
    })
    .onEnd(() => {
      // Store final position when the gesture ends
      offsetX.value = translateX.value;
      offsetY.value = translateY.value;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.wrapper, animatedStyle]}>
          <View>{children}</View>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
    overflow: "hidden",
  },
  wrapper: {
    flex: 1,
  },
});

export default PanWrapper;
