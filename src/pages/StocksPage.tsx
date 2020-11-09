import React,{useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Button, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Card} from 'react-native-elements';
import {StockContainer} from './data/containers/';
import {getTokenStorage, getProducts} from './data/UserData'

const styles = StyleSheet.create({
    input: {
       margin: 15,
       height: 40,
       borderColor: '#7a42f4',
       borderWidth: 1
    },
})

const StocksPage = () => {
    const stockContainer = StockContainer.useContainer();
    const [token, setToken] = useState()
    const [products, setProducts] = useState([])
    const [index, setIndex] = useState(0);
    const [firstLoad, setFirstLoad] = useState(true)

    if(!token){
        getTokenStorage().then(token => {setToken(token)})
    }

    if(token && products.length <= 0 && firstLoad){
        getProductList()
        setFirstLoad(false)
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
        {products.length == 0 && stockContainer.stock.length >= 0 ? (
            <View>
                {stockContainer.stock.map((product,i) =>{
                    return(
                    <Text>{product.name} : {product.stock} {product.unit}</Text>
                    );
                })}
                <Button title="Recommencer" color="red" onPress={() => {stockContainer.reload(); getProductList();}}></Button>
                <Button title="Valider" color="green" onPress={() => stockContainer.validateNewStock(token)}></Button>
            </View>
        ): <Text></Text>  }
        {products.length <= 0  ? <ActivityIndicator/> : (
            <Card title={products[index].name} image={{uri:'http://10.229.32.175:8000/storage/pictures/'+ products[index].picture}}>
                <Text>Quantité :</Text>
                <TextInput
                style = {styles.input}
                placeholderTextColor="rgb(180, 180, 180)"
                keyboardType="numeric"
                value={products[index].stock.toString()}
                onChangeText={number => number}
                />
                <Text>Unité : {products[index].unit}</Text>
                <Button title="Passer au suivant" color="blue" onPress={() => checkIndexAsc()}></Button>
                <Button title="Revenir au précédent" color="red" onPress={() => checkIndexDesc()}></Button>
                <Button title="Ok" color="green" onPress={() => {stockContainer.addProduct(products[index])
                products.splice(index,1)
                checkIndexAsc()}}></Button>

            </Card>
        )}
        </View>
    );


  };
  export default StocksPage;