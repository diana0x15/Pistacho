import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function VocabularyScreen() {

  return (
      <ThemedView style={styles.container}>
        <ThemedView>
          <ThemedText type="title">Hola!</ThemedText>
        </ThemedView>
      </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   padding: 32,
   paddingTop: 100,
  },
});