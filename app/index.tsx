import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
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
  
  return Array.from({ length: seatCount }, (_, index) => {
    const colorIndex = side === 'l' 
      ? index % groupCount 
      : (seatCount - 1 - index) % groupCount;
    
    return (
      <View 
        key={index} 
        style={[
          styles.seat, 
          { backgroundColor: colors[colorIndex] }
        ]} 
      />
    );
  });
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginTop: 20,
  },
  seat: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: '#000000',
  },
});
