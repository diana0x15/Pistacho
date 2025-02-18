import { StyleSheet, ScrollView, View } from "react-native";

import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import ProgressBar from "@/components/ProgressBar";
import GameEntry from "@/components/GameEntry";
import BathroomReduced from "@/assets/images/illustrations/bathroom-reduced.svg";
import { getWindowWidth } from "@/constants/Dimensions";

export default function Category() {
  const squareSize = getWindowWidth() / 3 - 50;

  return (
    <ThemedView style={[styles.container]}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <BathroomReduced height={170} width={150} />
          <View style={styles.title}>
            <ThemedText type="title">Lavabo</ThemedText>
          </View>
        </View>
        <View style={styles.progressContainer}>
          <ThemedText>3/22 crucigramas</ThemedText>
          <ProgressBar color="#75A7D3" progress={3 / 22} style="elevated" />
        </View>
        <View style={styles.grid}>
          <GameEntry
            isCompleted={true}
            isLocked={false}
            index={1}
            viewSize={squareSize}
          />
          <GameEntry
            isCompleted={true}
            isLocked={false}
            index={2}
            viewSize={squareSize}
          />
          <GameEntry
            isCompleted={true}
            isLocked={false}
            index={3}
            viewSize={squareSize}
          />
          <GameEntry
            isCompleted={true}
            isLocked={false}
            index={4}
            viewSize={squareSize}
          />
          <GameEntry
            isCompleted={false}
            isLocked={false}
            index={5}
            viewSize={squareSize}
          />
          <GameEntry
            isCompleted={false}
            isLocked={false}
            index={6}
            viewSize={squareSize}
          />
          <GameEntry
            isCompleted={false}
            isLocked={false}
            index={7}
            viewSize={squareSize}
          />
          <GameEntry
            isCompleted={false}
            isLocked={false}
            index={8}
            viewSize={squareSize}
          />
          <GameEntry
            isCompleted={false}
            isLocked={false}
            index={9}
            viewSize={squareSize}
          />
          <GameEntry
            isCompleted={false}
            isLocked={true}
            index={10}
            viewSize={squareSize}
          />
          <GameEntry
            isCompleted={false}
            isLocked={true}
            index={11}
            viewSize={squareSize}
          />
          <GameEntry
            isCompleted={false}
            isLocked={true}
            index={12}
            viewSize={squareSize}
          />
          <GameEntry
            isCompleted={false}
            isLocked={true}
            index={13}
            viewSize={squareSize}
          />
          <GameEntry
            isCompleted={false}
            isLocked={true}
            index={14}
            viewSize={squareSize}
          />
          <GameEntry
            isCompleted={false}
            isLocked={true}
            index={15}
            viewSize={squareSize}
          />
          <GameEntry
            isCompleted={false}
            isLocked={true}
            index={16}
            viewSize={squareSize}
          />
          <GameEntry
            isCompleted={false}
            isLocked={true}
            index={17}
            viewSize={squareSize}
          />
          <GameEntry
            isCompleted={false}
            isLocked={true}
            index={18}
            viewSize={squareSize}
          />
          <GameEntry
            isCompleted={false}
            isLocked={true}
            index={19}
            viewSize={squareSize}
          />
          <GameEntry
            isCompleted={false}
            isLocked={true}
            index={20}
            viewSize={squareSize}
          />
          <GameEntry
            isCompleted={false}
            isLocked={true}
            index={21}
            viewSize={squareSize}
          />
          <GameEntry
            isCompleted={false}
            isLocked={true}
            index={22}
            viewSize={squareSize}
          />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingBottom: 20,
  },
  grid: {
    marginTop: 40,
    paddingInline: 40,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 32,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    display: "flex",
    marginTop: 20, // Needed to align with the bathroom image.
  },
  progressContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  entriesList: {
    marginTop: 40,
    gap: 20,
  },
});
