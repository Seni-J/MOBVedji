import React,{useState} from 'react';
import {View, Text, Image, StyleSheet,  FlatList, ActivityIndicator, TouchableOpacity} from 'react-native';
import {Header, ListItem} from 'react-native-elements';
import { useAsyncStorage } from '@react-native-community/async-storage';
import {getBasketStorage, addProductToBasket, removeBasket} from './data/BasketData'
import {getTokenStorage, getProducts} from './data/UserData'
import {Picker} from '@react-native-picker/picker'


const BasketPage = ({navigation}) => {
    const [token, setToken] = useState()
    const [basket, setBasket] = useState();
    const [products, setProducts] = useState();

    if(!Array.isArray(basket)){
        getBasketStorage().then(res => {setBasket(res)})
    }

    if(!Array.isArray(products)){
        getTokenStorage().then(token => {setToken(token)})
        getProducts(token).then(res => {
            setProducts(res) 
        })
    }
    function refreshBasket(){
        getBasketStorage().then(res => {setBasket(res)})
    }

    return(
        <View>
            <View style={{borderTopColor:"gray", borderTopWidth:1}}>
            {!Array.isArray(products) ? <ActivityIndicator/> : (  
                <Picker
                selectedValue={"-1"}
                onValueChange={(itemValue, itemIndex) => {
                    addProductToBasket(products[itemValue])
                    refreshBasket()
                    console.log(basket)
                    } 
                }
                >
                <Picker.Item label="Séléctionner un produit" value="-1" />
                {
                    products.map((product, i) => {
                    return (
                        <Picker.Item key={i} label={product.name} value={i} />
                    );
                    })
                }
                </Picker>
                )}
            <TouchableOpacity
                onPress={() => console.log('hello2')}
            >
                <Text style={{color:"black"}}>Valider le panier</Text>
            </TouchableOpacity>
            </View>
        </View>
    );

  };
  export default BasketPage;