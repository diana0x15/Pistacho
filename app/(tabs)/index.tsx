import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Pistacho from '@/assets/images/pistacho.svg';

export default function HomeScreen() {

  return (
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedView style={styles.title}>
            <ThemedText type="title">¡Hola,</ThemedText>
            <ThemedText type="title" highlight={true}>Diana!</ThemedText>
          </ThemedView>
          <Pistacho width="240" height="240" style={styles.pistacho}/>
        </ThemedView>
      </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 100,
  },
  header: {
    paddingLeft: 30,
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    width: '130%',
  },
  title: {
    flex: 1,
  },
  pistacho:  {
    transform: [{rotate: '-20deg'}],
    flex: 1,
  }
});
