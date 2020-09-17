import React,{useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-elements';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import {getTokenStorage, getUser} from './pages/data/UserData';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function Router() {
  const [token, setToken] = useState()
  getTokenStorage().then(token => {setToken(token)})

  let nav = (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomePage} options={{title: "Page d'accueil"}}/>
      <Stack.Screen name="Login" component={LoginPage} options={{title: "Page de connexion"}}/>
      <Stack.Screen name="Register" component={RegisterPage} options={{title: "Page d'inscription"}}/>
      <Stack.Screen name="Profile" component={ProfilePage} options={{title: "Profil"}}/>
      <Stack.Screen name="Details" component={ProductDetailsPage} options={{title: "Detail du produit"}}/>
    </Stack.Navigator>
  );

  if(token){
    nav = (
      <Tab.Navigator initialRouteName="Profile">
        <Tab.Screen
          name="Produits"
          component={ProductListPage}
          options={{
          }}
        />
        <Tab.Screen
          name="Panier"
          component={RegisterPage}
          options={{
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfilePage}
          options={{
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      {nav}
    </NavigationContainer>
  );
}
