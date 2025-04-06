import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <ScrollView>
      <Text style={styles.baseText}>Recollection Groupings Tool</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  baseText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 32,
  },
});
