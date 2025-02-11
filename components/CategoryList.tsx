import { StyleSheet, View } from 'react-native';

import { CategoryCard } from './CategoryCard';
import CanvasStand from '@/assets/images/canvas-stand.svg';
import Bathroom from '@/assets/images/bathroom.svg';
import Kitchen from '@/assets/images/kitchen.svg';

export function CategoryList() {

  return (
    <View style={styles.container}>
    <CategoryCard
      image={<Bathroom width={100} height={100}/>}
      title="Lavabo"
      gradientStart='#F1F7FC'
      gradientEnd='#E6F2FD'
      color='#426CF8'
      completedGames={7}
      totalGames={11}
    />

    <CategoryCard
      image={<Kitchen width={100} height={100} />}
      title="Cocina"
      gradientStart='#F4FBF0'
      gradientEnd='#EDF7E5'
      color='#7DC857'
      completedGames={3}
      totalGames={18}
    />

    <CategoryCard
      image={<CanvasStand width={100} height={100} />}
      title="Arte"
      gradientStart='#FDFBFE'
      gradientEnd='#EBDEEF'
      color='#A380AF'
      completedGames={3}
      totalGames={6}
    />
    <CategoryCard
      image={<Bathroom width={100} height={100}/>}
      title="Lavabo"
      gradientStart='#F1F7FC'
      gradientEnd='#E6F2FD'
      color='#426CF8'
      completedGames={7}
      totalGames={11}
    />

    <CategoryCard
      image={<Kitchen width={100} height={100} />}
      title="Cocina"
      gradientStart='#F4FBF0'
      gradientEnd='#EDF7E5'
      color='#7DC857'
      completedGames={3}
      totalGames={18}
    />

    <CategoryCard
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
