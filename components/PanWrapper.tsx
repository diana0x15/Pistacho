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
  // Panning values:
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  // Zooming values:
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

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

  const zoomGesture = Gesture.Pinch()
    .onUpdate((e) => {
      const newScaleValue = savedScale.value * e.scale;
      // Limit the zoom level
      if (newScaleValue > 0.5 && newScaleValue < 1.5) {
        scale.value = newScaleValue;
      }
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const gestures = Gesture.Simultaneous(panGesture, zoomGesture);

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={gestures}>
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
