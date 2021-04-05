import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Provider} from 'react-redux';
import AppNavigator from './app/Navigator';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import appReducer from './app/Redux/Reducer';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

const store = createStore(appReducer, applyMiddleware(thunk));

function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{backgroundColor: '#FFF', flex: 1}}>
        <View style={styles.container}>
          <Provider store={store}>
            <AppNavigator />
          </Provider>
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
