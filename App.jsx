import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Register from "./screens/Register";
import LogIn from "./screens/auth/LogIn";
import SignUp from "./screens/auth/SignUp";
import SignWith from "./screens/auth/SignWith";
import SetUser from "./screens/SetUser";
import HomePage from "./screens/HomePage";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Services from "./screens/Services";
import CreateEvent from "./screens/CreateEvent";
import Detail from "./screens/Detail";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [data, setData] = useState();
  const [job, setJob] = useState();

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@user");
      setData(JSON.parse(value));
    } catch (error) {
      console.log(error);
    }
  };
  getData();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: "slide_from_left" }}
      >
        {data ? (
          <>
            <Stack.Screen name="setUser" component={SetUser} />
            <Stack.Screen name="home" component={HomePage} />
            <Stack.Screen name="service" component={Services} />
            <Stack.Screen name="event" component={CreateEvent} />
            <Stack.Screen name="detail" component={Detail} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="login"
              options={{
                headerShown: false,
              }}
              component={Register}
            />
            <Stack.Screen
              name="Log in"
              options={{
                headerShown: false,
                animation: "slide_from_left",
              }}
              component={LogIn}
            />
            <Stack.Screen name="Sign up" component={SignUp} />
            <Stack.Screen name="Sign with" component={SignWith} />
            <Stack.Screen name="setUser" component={SetUser} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f00",
  },
});
