import React,{useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Card} from 'react-native-elements';
import {getTokenStorage, getProducts} from './data/UserData'

const styles = StyleSheet.create({
  });

const StocksPage = ({route,navigation}) => {
    const [token, setToken] = useState()
    const [products, setProducts] = useState([])
    const [index, setIndex] = useState(0);


    if(!token){
        getTokenStorage().then(token => {setToken(token)})
    }

    if(token && products.length <= 0){
        getProductList()
    }

    function getProductList(){
        getProducts(token).then(res => {
            setProducts(res) 
        })    
    }

    function checkIndexAsc(){
        setIndex(index + 1)
        if(index >= products.length-1){
            setIndex(0)
        }
    }
    function checkIndexDesc(){
        setIndex(index - 1)
        if(index <= 0){
            setIndex(products.length - 1)
        }
    }

    return(
        <View>
        {products.length <= 0  ? <ActivityIndicator/> : (
            <Card title={products[index].name} image={{uri:'http://10.229.32.175:8000/storage/pictures/'+ products[index].picture}}>
                <Text>Quantité : {products[index].stock}</Text>
                <Text>Unité : {products[index].unit}</Text>
                <Button title="Passer au suivant" color="green" onPress={() => checkIndexAsc()}></Button>
                <Button title="Revenir au précédent" color="green" onPress={() => checkIndexDesc()}></Button>
            </Card>
        )  }
        </View>
    );


  };
  export default StocksPage;