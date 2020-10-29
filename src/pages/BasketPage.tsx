import React,{useEffect, useState} from 'react';
import {View, Text, TextInput, Button, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native';
import {Header, ListItem} from 'react-native-elements';
import {getBasketStorage, addProductToBasket, removeProductFromBasket} from './data/BasketData'
import {getTokenStorage, getProducts} from './data/UserData'
import {Picker} from '@react-native-picker/picker'


const BasketPage = ({navigation}) => {
    const [token, setToken] = useState()
    const [basket, setBasket] = useState()
    const [products, setProducts] = useState()


    if(!Array.isArray(basket)){
        getBasketStorage().then(res => {setBasket(res)})
        console.log(basket)
    }

    if(!Array.isArray(products)){
        getTokenStorage().then(token => {setToken(token)})

        getProducts(token).then(res => {
            let productList = res.filter(product => {
                return !basket.find(({ id }) => product.id == id)
              })
            setProducts(productList) 
        })
    }

    function refreshBasket(){
        getBasketStorage().then(res => {setBasket(res)})
        getProducts(token).then(res => {
            let productList = res.filter(product => {
                return !basket.find(({ id }) => product.id == id)
              })
            setProducts(productList) 
        })
    }

    return(
        <View>
            <FlatList
        data={basket}
        renderItem={({item}) => (
        <View>
            <View >
              <Text>{item.name + ` ${item.price} CHF`}</Text>
              <Text>{item.unit}</Text>
            </View>
            <TextInput
              keyboardType="numeric"
              value={item.quantity.toString()}
            />
            <Button
                onPress={() => {removeProductFromBasket(item) }}
                title="Supprimer"
              />
        </View>
        )}
        keyExtractor={item => String(item.id)}
      />
            <View>
            {!Array.isArray(products) ? <ActivityIndicator/> : (  
                <Picker
                selectedValue={"-1"}
                onValueChange={(itemValue, itemIndex) => {
                    addProductToBasket(products[itemValue])
                    console.log(basket)
                    } 
                }
                >
                <Picker.Item label="Veuillez choisir un produit" value="-1" />
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