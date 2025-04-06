import { ScrollView, StyleSheet, Text, View } from "react-native";
import Slider from '@react-native-community/slider';
import { useState } from 'react';

export default function Index() {
  const [seatCount, setSeatCount] = useState(1);
  const [groupCount, setGroupCount] = useState(1);
  const [side, setSide] = useState('l');

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.baseText}>Recollection Groupings Tool</Text>
        <Text>Number of Seats: {seatCount}</Text>
        <Slider
          style={{width: 400, height: 40}}
          minimumValue={1}
          maximumValue={40}
          step={1}
          value={seatCount}
          onValueChange={setSeatCount}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
        <Text>Number of Groups: {groupCount}</Text>
        <Slider
          style={{width: 200, height: 40}}
          minimumValue={2}
          maximumValue={5}
          step={1}
          value={groupCount}
          onValueChange={setGroupCount}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
        <View style={styles.seatsContainer}>
          {displaySeat(seatCount)}
        </View>
      </ScrollView>
    </View>
  );
}

const displaySeat = (seatCount: number) => {
  return Array.from({ length: seatCount }, (_, index) => (
    <View key={index} style={styles.seat} />
  ));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  baseText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 32,
  },
  seatsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginTop: 20,
  },
  seat: {
    width: 30,
    height: 30,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#000000',
  },
});
