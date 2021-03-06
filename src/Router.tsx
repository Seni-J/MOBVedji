import React,{useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import StocksPage from './pages/StocksPage';
import BasketPage from './pages/BasketPage';
import {getTokenStorage, getUser} from './pages/data/UserData';
import {BasketContainer,StockContainer} from './pages/data/containers';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function ProductsStackScreen() {
 return (
  <Stack.Navigator initialRouteName="Products">
    <Stack.Screen name="Products" component={ProductListPage} options={{title: "Produits"}}/>
    <Stack.Screen name="Details" component={ProductDetailsPage} options={{title: "Detail du produit"}}/>
  </Stack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
   <Stack.Navigator initialRouteName="Profil">
     <Stack.Screen name="Profil" component={ProfilePage} options={{title: "Profil"}}/>
     <Stack.Screen name="Stocks" component={StocksPage} options={{title: "Validation du Stock"}}/>
   </Stack.Navigator>
   );
 }

export default function Router() {
  const [token, setToken] = useState()
  getTokenStorage().then(token => {setToken(token)})
  
  let nav = (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomePage} options={{title: "Page d'accueil"}}/>
      <Stack.Screen name="Login" component={LoginPage} options={{title: "Page de connexion"}}/>
      <Stack.Screen name="Register" component={RegisterPage} options={{title: "Page d'inscription"}}/>
    </Stack.Navigator>
  );

  if(token){
    nav = (
      <Tab.Navigator initialRouteName="Profil">
        <Tab.Screen
          name="Produits"
          component={ProductsStackScreen}
          options={{
            tabBarIcon: () => (
              <Icon name="apple-alt" size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Panier"
          component={BasketPage}
          options={{
            tabBarIcon: () => (
              <Icon name="shopping-basket" size={24}  />
            ),
          }}
        />
        <Tab.Screen
          name="Profil"
          component={ProfileStackScreen}
          options={{
            tabBarIcon: () => (
              <Icon name="user" size={24}  />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <BasketContainer.Provider>
      <StockContainer.Provider>
      {nav}
      </StockContainer.Provider>
      </BasketContainer.Provider>
    </NavigationContainer>
  );
}
