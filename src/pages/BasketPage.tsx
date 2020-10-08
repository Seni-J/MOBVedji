import React,{useState} from 'react';
import {View, Text, Image, StyleSheet,  FlatList, ActivityIndicator} from 'react-native';
import {Header, ListItem} from 'react-native-elements';
import { useAsyncStorage } from '@react-native-community/async-storage';


const BasketPage = ({navigation}) => {
    const [token, setToken] = useState()
    const [basket, setBasket] = useAsyncStorage('basket');


    return(
        <View>

        </View>
    );

  };
  export default BasketPage;