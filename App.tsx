import React from "react";
import ToDoScreen from "./pages/ToDoScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Teste from "./pages/TesteScreen";

type RootStackParamList = {
  home: undefined;
  teste: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="home">
              <Stack.Screen name="home" component={ToDoScreen} />
            <Stack.Screen name="teste" component={Teste} />
          </Stack.Navigator>
      </NavigationContainer>
  );
}
