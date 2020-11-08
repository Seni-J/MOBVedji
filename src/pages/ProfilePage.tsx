import React, {useState} from 'react';
import {View, Text, StyleSheet,Button} from 'react-native';
import axios from 'axios';
import {getUser, getTokenStorage} from './data/UserData';
import AsyncStorage from '@react-native-community/async-storage';

const ProfilePage = ({navigation}) => {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  let userInfo

  if(!user){
    getTokenStorage().then(token =>{
      getUser(token).then(res => {
        setUser(res)
        setLoading(true)
      });
    })
  }
  const styles = StyleSheet.create({
    baseText: {
      textAlign: 'center',
      textAlignVertical: 'center',
      fontWeight: 'bold',
      fontSize: 18,
      marginTop:250,
      justifyContent: 'center',
    },
    nameText: {
      fontSize: 20,
      marginTop: 50,
      fontWeight: 'bold',
      textAlign: 'center',
      textAlignVertical: 'center',
    }
  });

  const clearAppData = async function() {
    try {
        const keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);
    } catch (error) {
        console.error('Error clearing app data.');
    }
}
  if(loading && user){
    userInfo = (
      <>
        <Text style={styles.baseText}>Bonjour</Text>
        <Text style={styles.nameText}>{user.firstname} {user.lastname}</Text>
      </>
    );
  }
  
  return (
    <View>
      {userInfo}
      <Button onPress={clearAppData} title="Clear Local Storage" />
    </View>
    ); 
};

export default ProfilePage;