import { useEffect, ReactNode } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemeCard, ThemeCardProps} from './ThemeCard';
import CanvasStand from '@/assets/images/canvas-stand.svg';
import Bathroom from '@/assets/images/bathroom.svg';
import Kitchen from '@/assets/images/kitchen.svg';

export function ThemeList() {

  return (
    <View style={styles.container}>
    <ThemeCard
      image={<Bathroom width={100} height={100}/>}
      title="Lavabo"
      gradientStart='#F1F7FC'
      gradientEnd='#E6F2FD'
      color='#426CF8'
      completedGames={7}
      totalGames={11}
    />

    <ThemeCard
      image={<Kitchen width={100} height={100} />}
      title="Cocina"
      gradientStart='#F4FBF0'
      gradientEnd='#EDF7E5'
      color='#7DC857'
      completedGames={3}
      totalGames={18}
    />

    <ThemeCard
      image={<CanvasStand width={100} height={100} />}
      title="Arte"
      gradientStart='#FDFBFE'
      gradientEnd='#EBDEEF'
      color='#A380AF'
      completedGames={3}
      totalGames={6}
    />
    <ThemeCard
      image={<Bathroom width={100} height={100}/>}
      title="Lavabo"
      gradientStart='#F1F7FC'
      gradientEnd='#E6F2FD'
      color='#426CF8'
      completedGames={7}
      totalGames={11}
    />

    <ThemeCard
      image={<Kitchen width={100} height={100} />}
      title="Cocina"
      gradientStart='#F4FBF0'
      gradientEnd='#EDF7E5'
      color='#7DC857'
      completedGames={3}
      totalGames={18}
    />

    <ThemeCard
      image={<CanvasStand width={100} height={100} />}
      title="Arte"
      gradientStart='#FDFBFE'
      gradientEnd='#EBDEEF'
      color='#A380AF'
      completedGames={3}
      totalGames={6}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
});
