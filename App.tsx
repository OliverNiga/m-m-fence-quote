import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { enableScreens } from "react-native-screens";
import DrawingScreen from "./app/screens/DrawingScreen";
import HomeScreen from "./app/screens/HomeScreen";
import QuoteFormScreen from "./app/screens/QuoteFormScreen";

enableScreens();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerBackTitle: "Back" }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Quotes" }} />
        <Stack.Screen name="QuoteForm" component={QuoteFormScreen} options={{ title: "New Quote" }} />
        <Stack.Screen
          name="Drawing"
          component={DrawingScreen}
          options={{
            title: "Draw Layout",
            headerShown: true
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
