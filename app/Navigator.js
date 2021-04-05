import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Helper Functions
import NavigationService from "./NavigationService";

//Before Login Screens
import Detail from "./Screens/BeforeLogin/Detail";
import Welcome from "./Screens/BeforeLogin/Welcome";

// Before and after login Stacks Initilization
const RootStack = createStackNavigator();
const BeforeLoginStack = createStackNavigator();

//Before Login Stack
function BeforeLogin() {
  return (
    <BeforeLoginStack.Navigator>
      <BeforeLoginStack.Screen name="Home" component={Welcome} />
      <BeforeLoginStack.Screen name="Detail" component={Detail} />
    </BeforeLoginStack.Navigator>
  );
}

//Root Navigator
function AppNavigator() {
  return (
    <NavigationContainer
      ref={(navigatorRef) => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    >
      <RootStack.Navigator headerMode="none">
        <RootStack.Screen name="Before" component={BeforeLogin} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
