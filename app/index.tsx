import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Slider from '@react-native-community/slider';
import { useState } from 'react';

export default function Index() {
  const [seatCount, setSeatCount] = useState(20); // Default to 20 as in the image
  const [groupCount, setGroupCount] = useState(5);
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
        <View style={[styles.seatsContainer, calculateSeatsContainerHeight(seatCount)]}>
          {displaySeat(seatCount, groupCount, side)}
        </View>
      </ScrollView>
    </View>
  );
}

const calculateSeatsContainerHeight = (seatCount: number) => {
  const topRowWidth = 8;
  if (seatCount <= topRowWidth) {
    return { height: 40 };
  } else {
    const sideColumnHeight = Math.floor((seatCount - topRowWidth) / 2);
    return { height: (sideColumnHeight + 1) * 40 };
  }
};

const displaySeat = (seatCount: number, groupCount: number, side: string) => {
  const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFA500', '#800080'];
  const topRowWidth = 8;
  const sideColumnHeight = Math.floor((seatCount - topRowWidth) / 2);
  const isEvenLayout = (seatCount - topRowWidth) % 2 === 0;

  let seatCounter = 1;

  return Array.from({ length: seatCount }, (_, index) => {
    let row = 0;
    let col = 0;
    let seatNumber = 0;

    if (seatCount <= topRowWidth) {
      row = 0;
      col = index;
      seatNumber = seatCounter++;
    } else if (index < sideColumnHeight) {
      row = index;
      col = 0;
      seatNumber = seatCounter++;
    } else if (index < sideColumnHeight + topRowWidth) {
      row = sideColumnHeight;
      col = index - sideColumnHeight;
      seatNumber = seatCounter++;
    } else if (index < seatCount) {
      row = sideColumnHeight - 1 - (index - (sideColumnHeight + topRowWidth));
      col = topRowWidth - 1;
      seatNumber = seatCounter++;
    } else {
      return null;
    }

    let colorIndex = (seatNumber - 1) % groupCount; // Color is always sequential for 'l'

    let displaySeatNumber = seatNumber; // Default display number is the sequential seatNumber

    if (side === 'r') {
      displaySeatNumber = seatCount - seatNumber + 1; // Reverse numbering for 'r' side
      colorIndex = (groupCount - 1 - ((seatNumber - 1) % groupCount)); // Keep reversed color for 'r' side as before, or remove if you want sequential color for reversed numbering.
    }


    return (
      <View
        key={index}
        style={[
          styles.seat,
          { backgroundColor: colors[colorIndex] },
          {
            position: 'absolute',
            left: col * 40,
            top: row * 40,
          }
        ]}
      >
        <Text style={styles.seatNumber}>
          {displaySeatNumber}
        </Text>
      </View>
    );
  }).filter(Boolean);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  baseText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 32,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 10,
    marginBottom: 30,
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
    position: 'relative',
    marginTop: 20,
    backgroundColor: '#F0F0F0',
  },
  seat: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  seatNumber: {
    color: 'white',
    fontWeight: 'bold',
  }
});