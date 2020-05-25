import React from 'react';
import {View, Text, Button} from 'react-native';
import axios from 'axios';

const ProfilePage = ({navigation}) => {
  return (
      axios.get('http://192.168.1.44:8000/api/me', {
        headers: {Authorization: 'Bearer ' + TokenContext},
      }

      )
      axios
          .get('http://192.168.1.44:8000/api/me', {
            headers: {Authorization: 'Bearer ' + values.token},
          })
          .then(res => {
            console.log(res.data);
          })
          .catch(error => console.log(error))
    <View>
        
    <Text></Text>
  </View>
  );
};

export default ProfilePage;