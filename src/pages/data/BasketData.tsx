import React from 'react';
import axios, { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export const setBasketStorage = async(val) => {
    AsyncStorage.setItem('basket', val)
}

export const getBasketStorage = async () => {
    return await AsyncStorage.getItem('basket')
}