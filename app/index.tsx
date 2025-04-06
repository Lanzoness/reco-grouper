import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Slider from '@react-native-community/slider';
import { useState } from 'react';

export default function Index() {
  const [seatCount, setSeatCount] = useState(19); // Default to 19 as in the image
  const [groupCount, setGroupCount] = useState(5); // Default to 5 as in the image
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, side === 'l' && styles.activeButton]}
            onPress={() => setSide('l')}
          >
            <Text style={styles.buttonText}>Left</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, side === 'r' && styles.activeButton]}
            onPress={() => setSide('r')}
          >
            <Text style={styles.buttonText}>Right</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.seatsContainer}>
          {displaySeat(seatCount, groupCount, side)}
        </View>
      </ScrollView>
    </View>
  );
}

const displaySeat = (seatCount: number, groupCount: number, side: string) => {
  const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFA500', '#800080']; // Red, Green, Blue, Orange, Purple

  const topRowWidth = 8; // Fixed top row width as per image
  const sideColumnHeight = Math.floor((seatCount - topRowWidth) / 2);
  const remainingSeatsForRight = seatCount - topRowWidth - sideColumnHeight;


  return Array.from({ length: seatCount }, (_, index) => {
    const colorIndex = side === 'l'
      ? index % groupCount
      : (seatCount - 1 - index) % groupCount;

    let row = 0;
    let col = 0;

    if (index < sideColumnHeight) {
      // Left side column
      row = sideColumnHeight - 1 - index; // Go upwards
      col = 0;
    } else if (index < sideColumnHeight + topRowWidth) {
      // Bottom row
      row = sideColumnHeight;
      col = index - sideColumnHeight;
    } else if (index < seatCount) {
      // Right side column
      row = sideColumnHeight - 1 - (index - (sideColumnHeight + topRowWidth)); // Go upwards, starting from same top as left
      col = topRowWidth - 1;
    } else {
      return null; // Should not reach here, but for safety
    }


    return (
      <View
        key={index}
        style={[
          styles.seat,
          { backgroundColor: colors[colorIndex] },
          {
            position: 'absolute',
            left: col * 40, // 40 = seat width (30) + gap (10)
            top: row * 40,
          }
        ]}
      />
    );
  }).filter(Boolean); // Filter out null elements if any
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20, // Add some padding at the top and bottom
  },
  baseText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 32,
    marginBottom: 20, // Add margin below the title
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000000',
  },
  activeButton: {
    backgroundColor: '#CCCCCC',
  },
  buttonText: {
    fontSize: 16,
  },
  seatsContainer: {
    width: 400,
    height: 400,
    position: 'relative',
    marginTop: 20,
    backgroundColor: '#F0F0F0', // Adding background to see the container
  },
  seat: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: '#000000',
  },
});