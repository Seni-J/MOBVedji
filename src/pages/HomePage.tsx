import React from 'react';
import {View, Text, Button} from 'react-native';
import {getTokenStorage} from './data/UserData';

const HomePage = ({navigation}) => {
  return (
    <View>
      <Text>MOB-Vedji</Text>
      <Button title="Connexion" onPress={() => navigation.navigate('Login')}></Button>
      <Button title="S'inscrire" onPress={() => navigation.navigate('Register')}></Button>
    </View>
  );
};

export default HomePage;