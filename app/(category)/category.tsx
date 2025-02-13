import { StyleSheet, ScrollView, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ProgressBar } from '@/components/ProgressBar';
import BathroomReduced from '@/assets/images/bathroom-reduced.svg';
import { GameEntry } from '@/components/GameEntry';

export default function Category() {

  const PADDING_TOP = 80;

  return ( <ThemedView style={styles.container}>
    <ScrollView contentContainerStyle={{ paddingTop: PADDING_TOP}}>
      <View style={styles.header}>
        <BathroomReduced height={170} width={150}/>
        <View style={styles.title}>
          <ThemedText type="title">Lavabo</ThemedText>
        </View>
      </View>
      <View style={styles.progressContainer}>
        <ThemedText>7/11 crucigramas</ThemedText>
        <ProgressBar color="#75A7D3" progress={0.5} style="elevated" />
      </View>
      <View style={styles.entriesList}>
        <GameEntry title="Juego 1" wordCount={5} progress={1} index={0} />
        <GameEntry title="Juego 1" wordCount={5} progress={0.5} index={1} />
        <GameEntry title="Juego 1" wordCount={5} progress={0} index={2} />
        <GameEntry title="Juego 1" wordCount={5} progress={1} index={3} />
      </View>
    </ScrollView>
  </ThemedView>)
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    display: 'flex',
    marginTop: 20, // Needed to align with the bathroom image.
  },
  progressContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  entriesList: {
    marginTop: 40,
    gap: 20,
  }
});
