import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import {ProgressBar} from '@/components/ProgressBar';
import React from 'react';

export type ThemeCardProps = {
  image: React.ReactNode,
  title: string,
  gradientStart: string,
  gradientEnd: string,
  color: string,
  completedGames: number,
  totalGames: number,
};

export function ThemeCard(props: ThemeCardProps) {

  return (
      <LinearGradient
        colors={[props.gradientStart, props.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{x: 1, y: 0}}
        style={styles.card}>
            {props.image}
            <View style={styles.cardContent}>
              <ThemedText type='cardTitle'>{props.title}</ThemedText>
              <ThemedText>{props.completedGames}/{props.totalGames} crucigramas</ThemedText>
              <ProgressBar progress={props.completedGames/props.totalGames} color={props.color} />
            </View>
        </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 120,
    borderRadius: 20,
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardContent: {
    display: 'flex',
  }
});
