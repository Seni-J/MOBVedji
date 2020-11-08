import React,{useEffect, useState} from 'react';
import {View, Text, TextInput, Button, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native';
import {Header, ListItem} from 'react-native-elements';
import {BasketContainer} from './data/containers/';
import {getTokenStorage, getProducts} from './data/UserData'
import {Picker} from '@react-native-picker/picker'
import axios, { AxiosResponse } from 'axios';


const BasketPage = ({navigation}) => {
    const basketContainer = BasketContainer.useContainer();
    const [token, setToken] = useState()
    const [products, setProducts] = useState([])
    const [price, setPrice] = useState(0);
    const [validate, setValidate] = useState(false);

    useEffect(() => {
        getProductList();
        calculatePrice();
        validateBasket();
      },[basketContainer.basket]);

    if(!token){
        getTokenStorage().then(token => {setToken(token)})
    }else{
      if(products.length <= 0){
        basketContainer.restoreBasket()
        getProductList()
      }
    }
    
    async function getProductList(){
        getProducts(token).then(res => {
            let productList = res.filter(product => {
                return !basketContainer.basket.find(({ id }) => product.id == id)
              })
            setProducts(productList) 
        })
    }

    function calculatePrice()
    {
      var newPrice = 0;
      basketContainer.basket.forEach(product =>{
        newPrice+=(product.quantity * product.price)
      })
      setPrice(newPrice.toFixed(2));
    }
    function validateBasket()
    {
      setValidate(false)
      if(basketContainer.basket.length){
        setValidate(true)
      }
      basketContainer.basket.forEach(product=>{
         if(product.quantity <= 0){
          setValidate(false)
         }
      })
    }

    return(
        <View>
            <FlatList
        data={basketContainer.basket}
        renderItem={({item}) => (
        <View>
            <View >
              <Text>{item.name + ` ${item.price} CHF`}</Text>
              <Text>{item.unit}</Text>
            </View>
            <TextInput
              placeholderTextColor="rgb(180, 180, 180)"
              keyboardType="numeric"
              value={item.quantity.toString()}
              onChangeText={number => basketContainer.changeQuantityProduct(number,item)}
            />
            <Button
                onPress={() => { basketContainer.deleteProductBasket(item)}}
                title="Supprimer"
              />
        </View>
        )}
        keyExtractor={item => String(item.id)}
      />
            <View>
            {products.length <= 0 ? <ActivityIndicator/> : (  
                <Picker
                selectedValue={"-1"}
                onValueChange={(itemValue, itemIndex) => {
                    basketContainer.addProduct(products[itemValue]);
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
            <Text style={{textAlign:"center",fontSize:18}}>{`Prix total: ${price} CHF`}</Text>
            </View>
        </View>
    );

  };
  export default BasketPage;