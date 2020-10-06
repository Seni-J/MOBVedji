import React,{useState} from 'react';
import {View, Text, Image, StyleSheet,  FlatList, ActivityIndicator} from 'react-native';
import {Header, ListItem} from 'react-native-elements';
import {getTokenStorage} from './data/UserData'


const BasketPage = ({navigation}) => {
    const [token, setToken] = useState()
    const [basket, setBasket] = useState()


    return(
        <View>

        </View>
    );

  };
  export default BasketPage;