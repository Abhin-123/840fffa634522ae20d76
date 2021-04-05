import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import AppNavigator from './app/Navigator';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';


function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{backgroundColor: '#FFF', flex: 1}}>
        <View style={styles.container}>
            <AppNavigator />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
