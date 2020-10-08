import React from 'react';
import axios, { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-community/async-storage';


const api = "http://10.229.32.175:8000/"

axios.interceptors.response.use( (response) =>{
    return response;
},  (error) =>{
    if (401 === error.response.status) {
       return error
    } else {
        return Promise.reject(error);
    }
});

export const setTokenStorage = async(val:string) => {
        AsyncStorage.setItem('@token', val)
    }

export const getTokenStorage = async () => {
    return await AsyncStorage.getItem('@token')
}

export const getUser = async (token) =>{
   const response = await axios.get(api + 'api/me', {
      headers: {Authorization: 'Bearer ' + token},
    })
    if(response.data)
    {
        return response.data.data
    }
    else{
        return {
            "error": response
        }
    }
}

export const getProducts = async (token) =>{
    const response = await axios.get(api + 'api/products', {
       headers: {Authorization: 'Bearer ' + token},
     }) 
     if(response.data)
     {
         return response.data.data
     }
     else{
         return {
             "error": response
         }
     }
 }
 
 export const getProductDetails = async (token,id) =>{
    const response = await axios.get(api + 'api/products/' + id, {
       headers: {Authorization: 'Bearer ' + token},
     }) 
     if(response.data)
     {
         return response.data.data
     }
     else{
         return {
             "error": response
         }
     }
 }
 