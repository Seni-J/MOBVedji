import React from 'react';
import axios, { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

/*export const setBasketStorage = async(val) => {
    AsyncStorage.setItem('basket', JSON.stringify(val))
}*/

export const getBasketStorage = async () => {
    return JSON.parse(await AsyncStorage.getItem('basket'))
}

export const removeBasket = async() => {
    await AsyncStorage.setItem('basket', JSON.stringify([]))
}

export const addProductToBasket = async(product) => {
    let basket = JSON.parse(await AsyncStorage.getItem('basket'))

    if (basket === null){ 
        basket = []
    }

    product.quantity = 1
    AsyncStorage.setItem('basket', JSON.stringify([...basket, product]))
}