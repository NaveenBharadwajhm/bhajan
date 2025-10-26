import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import HomeScreen from "./components/HomeScreen";
import LyricsScreen from "./components/LyricsScreen";
import { BhajanProvider } from "./components/BhajanContext";

const Stack = createNativeStackNavigator();

const prefixes = Platform.OS === 'web' && typeof window !== 'undefined'
  ? [window.location.origin]
  : [];

const linking = { prefixes, config: { screens: { Home: '', Lyrics: 'lyrics' } } };


export default function App() {
  return (
    <>
      <BhajanProvider>
        <NavigationContainer linking={linking} fallback={<View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text>Loading...</Text></View>}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Lyrics" component={LyricsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </BhajanProvider>
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
