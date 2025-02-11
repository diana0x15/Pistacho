import { StyleSheet, View, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import CanvasStand from '@/assets/images/canvas-stand.svg'
import { DimensionValue } from 'react-native';

export type ProgressBarProps = {
  progress: number,
  color: string,
};

export function ProgressBar({progress, color} : ProgressBarProps) {

  return (
    <View style={styles.container}> 
      <View style={styles.bar}>
        <View style={[{ width: `${progress*100}%`, backgroundColor: color }, styles.progress]} />
      </View>
      <View style={styles.dot} />
    </View>
      
  );
}

const styles = StyleSheet.create({
  container: {
    height: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bar: {
    overflow: 'hidden',
    width: 160,
    height: 10,
    backgroundColor: 'white',
    borderRadius: 100,
  },
  progress: {
    height: 10,
    borderRadius: 100,
  },
  dot: {
    width: 20,
    height: 20,
    marginLeft: -8,
    borderRadius: 100,
    backgroundColor: 'white',
  }
});
