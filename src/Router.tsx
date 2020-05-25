import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const Stack = createStackNavigator();

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} options={{title: "Page d'accueil"}}/>
        <Stack.Screen name="Login" component={LoginPage} options={{title: "Page de connexion"}}/>
        <Stack.Screen name="Register" component={RegisterPage} options={{title: "Page d'inscription"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
