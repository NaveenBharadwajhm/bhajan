import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import HomeScreen from "./components/HomeScreen";
import LyricsScreen from "./components/LyricsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      {/* <View style={styles.container}>
        <Text>Welcome!</Text>
        <StatusBar style="auto" />
      </View> */}
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Lyrics" component={LyricsScreen} />
        </Stack.Navigator>
      </NavigationContainer>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
