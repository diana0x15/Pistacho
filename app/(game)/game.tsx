import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ProgressBar } from '@/components/ProgressBar';
import BathroomReduced from '@/assets/images/bathroom-reduced.svg';
import { GameEntry } from '@/components/GameEntry';
import CrosswordGrid from '@/components/CrosswordGrid';

export default function Category() {

  const PADDING_TOP = 80;

  return ( 
    <ThemedView style={[styles.container, {paddingTop: PADDING_TOP}]}>
      <View style={styles.progressContainer}>
        <ProgressBar color={'#75A7D3'} progress={0.2} style='elevated' />
      </View>
      <CrosswordGrid />
    </ThemedView>)
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  progressContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBlock: 30,
  },
  entriesList: {
    marginTop: 40,
    gap: 20,
  }
});
