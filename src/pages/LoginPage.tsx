import React,{useState} from 'react';
import {View, TextInput, Text, Button, SafeAreaView, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import {getTokenStorage,setTokenStorage,getUser} from './data/UserData'



const LoginPage = ({navigation}) => {
  const [token, setToken] = useState()
  getTokenStorage().then(token => {setToken(token)})
  
  return(
    <Formik
    initialValues={{token: token}}
    enableReinitialize={true}
    onSubmit={async (values) =>{ 
      const user = await getUser(values.token)
      console.log(user)
      if(!user.error){
        alert("Bienvenue, " + user.firstname + " " + user.lastname)
        setTokenStorage(values.token)
        getTokenStorage().then(token=>{
          setToken(token)
        })
      }
      else{
        alert("Token incorrect")
        setToken("Token incorrect")
      }
    }
    }>
    {({handleChange, handleBlur, handleSubmit, values}) => (
      <SafeAreaView>
        <View>
          <Text>Connexion avec Token</Text>
          <TextInput
            onChangeText={handleChange('token')}
            onBlur={handleBlur('token')}
            placeholder="Rentrez le token de connexion"
            value={values.token}
          />
          <Button onPress={handleSubmit} title="Login" />
          <Text>Token: {token}</Text>
          
        </View>
      </SafeAreaView>
    )}
    </Formik>
  );
};
export default LoginPage;