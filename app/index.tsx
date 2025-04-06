import { ScrollView, StyleSheet, Text, View } from "react-native";
import Slider from '@react-native-community/slider';
import { useState } from 'react';

export default function Index() {
  const [value, setValue] = useState(1);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.baseText}>Recollection Groupings Tool</Text>
        <Text>Number of Seats: {value}</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={40}
          step={1}
          value={value}
          onValueChange={setValue}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
      </ScrollView>
    </View>
  );
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
  slider: {
    width: 400, 
    height: 40,
  },
});
