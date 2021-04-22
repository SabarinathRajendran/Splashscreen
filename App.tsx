import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";

import {
  useFonts,
  Inter_900Black,
  Inter_400Regular,
} from "@expo-google-fonts/inter";

import { OnBoarding } from "./src/screens/Authentication";

const AuthenticationStack = createStackNavigator();

/*const fonts = {
  "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
};
*/

const AuthenticationNavigator = () => {
  return (
    <AuthenticationStack.Navigator headerMode="none">
      <AuthenticationStack.Screen name="OnBoarding" component={OnBoarding} />
    </AuthenticationStack.Navigator>
  );
};

export default function App() {
  let [FontLoading] = useFonts({
    Inter_900Black,
    Inter_400Regular,
  });

  if (!FontLoading) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <AuthenticationNavigator />
      </NavigationContainer>
    );
  }
}
