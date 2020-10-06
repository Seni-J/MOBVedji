import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';
import {getUser, getTokenStorage} from './data/UserData';

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
    </View>
    ); 
};

export default ProfilePage;