import * as React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';

// Helper Functions
import NavigationService from './NavigationService';
import * as Storage from '../app/service/AsyncStoreConfig';

//Before Login Screens
import Detail from './Screens/BeforeLogin/Detail';
import Welcome from './Screens/BeforeLogin/Welcome';

//After Login Screens
import Homepage from './Screens/AfterLogin/Homepage';

// Before and after login Stacks Initilization
const RootStack = createStackNavigator();
const BeforeLoginStack = createStackNavigator();
const AfterLoginStack = createStackNavigator();

// Loader Screen
function SplashScreen() {
  return (
    <View style={[styles.loading]}>
      <ActivityIndicator size="large" color="gray" />
    </View>
  );
}
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

//After Login Stack
function AfterLogin() {
  return (
    <AfterLoginStack.Navigator>
      <AfterLoginStack.Screen name="Home" component={Homepage} />
    </AfterLoginStack.Navigator>
  );
}
//Root Navigator
function AppNavigator() {
  const state = useSelector(state => state.loginReducer);
  const dispatch = useDispatch();
  React.useEffect(() => {
    //   auth().onAuthStateChanged(user => {
    //         console.log("--------->", user)
    // });

    Storage.getData('UserId').then(data => {
      if (data) {
        dispatch({type: 'Restore_email', data: data});
      } else {
        dispatch({type: 'Logout_success'});
      }
    });
  }, []);

  return (
    <NavigationContainer
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}>
      <RootStack.Navigator headerMode="none">
        {!state.hideProgress ? (
          <RootStack.Screen name="Splash" component={SplashScreen} />
        ) : state.UserId == null ? (
          <RootStack.Screen name="Before" component={BeforeLogin} />
        ) : (
          <RootStack.Screen name="After" component={AfterLogin} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
