import React from 'react';
import axios, { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

// Gère l'erreur 401 avec un interceptor, à déplacer dans un fichier config axios que tu importera dans index.tsx 
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
   const response = await axios.get('http://192.168.1.125:8000/api/me', {
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
 
