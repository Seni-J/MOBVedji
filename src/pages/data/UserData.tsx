import {React} from 'react';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const token = "";

export const UserData = () => {
    const setToken = async(val:string) => {
        AsyncStorage.setItem('@token', val)
    }

    const getToken = async () => {
        return await AsyncStorage.getItem('@token')
    }

    return {setToken, getToken}
} 
