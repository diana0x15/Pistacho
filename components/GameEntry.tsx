import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import CircularProgress from './CircularProgress';

export type GameEntryProps = {
  title: string,
  wordCount: number, 
  progress: number,
  index: number,
};

const Checkmark = () => {
  return (
    <Link push href="../game">
      <View style={[styles.progressCircle, {backgroundColor: '#75A7D3'}]}>
        <IconSymbol size={28} name="checkmark" color={'#fff'} />
      </View>
  </Link>)
}

const Progress = ({ progress }: { progress: number }) => {
  
  return (
    <View style={styles.progressCircle}>
      <CircularProgress color='#75A7D3' bgColor='transparent' progress={progress*100} />
      <View style={{position: 'absolute'}}>
        <ThemedText >{progress*100}%</ThemedText>
      </View>
    </View>
  );
}

export function GameEntry(props: GameEntryProps) {
  const flexDirection = props.index % 2 ? 'row' : 'row-reverse';
  const position = props.index % 2 ? 50 : -50;

  return (
      <View style={[styles.container, {flexDirection: flexDirection, marginLeft: position}]}>
          {props.progress === 1 ? <Checkmark /> : <Progress progress={props.progress}/>}
          <View>
            <ThemedText>some content</ThemedText>
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 120,
    display: 'flex',
    borderRadius: 100,
    backgroundColor: '#F3F9FB',
    padding: 15,
    alignItems: 'center',
    gap: 30,
  },
  progressCircle: {
    display: 'flex',
    height: 100,
    width: 100,
    borderRadius: 100,
    backgroundColor: '#F3F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
