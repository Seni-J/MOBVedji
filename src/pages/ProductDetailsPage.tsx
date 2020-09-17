import React,{useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {Card} from 'react-native-elements';
import {getTokenStorage, getProductDetails} from './data/UserData'

const styles = StyleSheet.create({
  });

const ProductDetailsPage = ({navigation}) => {
    const id = navigation.params
    const [token, setToken] = useState()
    const [product, setProduct] = useState()

    getTokenStorage().then(token => {setToken(token)})
    getProductDetails(token,id).then(res => {
        setProduct(res) 
    })

    return(
        <View>
        {product ? (
            <Card title={product.name} image={{uri:'http://10.229.32.175:8000/storage/pictures/'+ product.picture}}>
            <Text>{product.details}</Text>
            <Text>{`stock: ${product.stock}, prix: ${product.price} CHF`}</Text>
            </Card>
        ) : <ActivityIndicator/> }
        </View>
    );

  };
  export default ProductDetailsPage;