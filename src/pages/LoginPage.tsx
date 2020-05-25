import React from 'react';
import {View, TextInput, Text, Button, SafeAreaView, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {UserData} from './data/UserData'



const LoginPage = ({navigation}) => {
  UserData.getToken().then(to => {console.log(to)})
  return(
    <Formik
    initialValues={{token: ''}}
    onSubmit={values =>
      axios
        .get('http://192.168.1.125:8000/api/me', {
          headers: {Authorization: 'Bearer ' + values.token},
        })
        .then(res => {
          console.log(res.data)
          UserData.setToken(values.token)
          getToken()
          alert("Bienvenue, " + res.data.data.firstname + " " + res.data.data.lastname)
        })
        .catch(error => console.log(error))
    }>
    {({handleChange, handleBlur, handleSubmit, values}) => (
      <SafeAreaView>
        <View>
          <Text>Connexion avec Token</Text>
          <TextInput
            onChangeText={handleChange('token')}
            onBlur={handleBlur('token')}
            placeholder="Rentrez le token de connexion"
            secureTextEntry
            value={values.token}
          />
          <Button onPress={handleSubmit} title="Login" />
          <Text>Token:</Text>
          
        </View>
      </SafeAreaView>
    )}
    </Formik>
  );
};
export default LoginPage;