import * as React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Helper Functions
import NavigationService from './NavigationService';
import * as Storage from '../app/service/AsyncStoreConfig';

//Before Login Screens
import Detail from './Screens/BeforeLogin/Detail';
import Welcome from './Screens/BeforeLogin/Welcome';

// Before and after login Stacks Initilization
const RootStack = createStackNavigator();
const BeforeLoginStack = createStackNavigator();


const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});

//Before Login Stack
function BeforeLogin() {
  return (
    <BeforeLoginStack.Navigator  >
      <BeforeLoginStack.Screen name="Home" component={Welcome} />
      <BeforeLoginStack.Screen name="Detail" component={Detail} />
    </BeforeLoginStack.Navigator>
  );
}


//Root Navigator
function AppNavigator() {

  React.useEffect(() => {
  }, []);

  return (
    <NavigationContainer
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}>
      <RootStack.Navigator headerMode="none">
        <RootStack.Screen name="Before" component={BeforeLogin} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
