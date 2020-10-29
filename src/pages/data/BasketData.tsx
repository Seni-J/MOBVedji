import React,{useState} from 'react';
import axios, { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

var basket

export const getBasketStorage = async () => {
    basket = JSON.parse(await AsyncStorage.getItem('basket'))
    return basket
}

export const removeBasket = async() => {
    await AsyncStorage.setItem('basket', JSON.stringify([]))
}

export const removeProductFromBasket = async(product) => {
    var newBasket=basket.filter(({id}) => id != product.id)
    basket = newBasket
    await AsyncStorage.setItem('basket', JSON.stringify(newBasket))
}

export const addProductToBasket = async(product) => {
    let basket = JSON.parse(await AsyncStorage.getItem('basket'))

    if (basket === null){ 
        basket = []
    }

    product.quantity = 1
    
    AsyncStorage.setItem('basket', JSON.stringify([...basket, product]))
}