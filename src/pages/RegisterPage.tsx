import React from 'react';
import {Formik} from 'formik';
import {View, TextInput, Text, Button, SafeAreaView, StyleSheet} from 'react-native';
import axios from 'axios';
import * as Yup from 'yup';


const SignupSchema = Yup.object().shape({
  firstname: Yup.string()
    .required('Le prénom est requis.'),
  lastname: Yup.string()
    .required('Le nom de famille est requis.'),
  phonenumber: Yup.string()
    .min(5, 'Le numéro de téléphone doit faire au moins 5 charactères.')
    .required('Un numéro de téléphone valide est requis.'),
});

const styles = StyleSheet.create({
  box: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
    marginBottom: 5,
  },
});

const RegisterPage = ({navigation}) => {
  return (
    <Formik
      initialValues={{firstname: '', lastname: '', phonenumber: ''}}
      validationSchema={SignupSchema}
      onSubmit={values =>
        axios
          .post('http://192.168.1.125:8000/api/user/apply', values)
          .then(res => {
            alert("L'inscription a été effectuée ! Merci de patienter pour l'envoi de votre jeton de connexion.");
            console.log(res);
            console.log(res.data);
          })
          .catch(error => {
            alert("Une erreur est survenue.");
            console.log(error);
            })
      }>
      {({handleChange, handleBlur, handleSubmit, values,touched, errors}) => (
        <SafeAreaView>
          <View>
            <Text style={{marginTop: 10}}>Prénom</Text>
            <TextInput
              onChangeText={handleChange('firstname')}
              onBlur={handleBlur('firstname')}
              style={styles.box}
              placeholder="Entrez votre prénom"
              value={values.firstname}
            />
            {touched.firstname && errors.firstname &&
              <Text style={{ fontSize: 12, color: '#FF0D10', marginBottom: 5 }}>{errors.firstname}</Text>
            }    
            <Text>Nom</Text>
            <TextInput
              onChangeText={handleChange('lastname')}
              onBlur={handleBlur('lastname')}
              style={styles.box}
              placeholder="Entrez votre nom"
              value={values.lastname}
            />
            {touched.lastname && errors.lastname &&
              <Text style={{ fontSize: 12, color: '#FF0D10', marginBottom: 5 }}>{errors.lastname}</Text>
            }    
            <Text>Numéro de téléphone</Text>
            <TextInput
              onChangeText={handleChange('phonenumber')}
              onBlur={handleBlur('phonenumber')}
              style={styles.box}
              placeholder="Entrez votre numéro de téléphone"
              keyboardType={"phone-pad"}
              value={values.phonenumber}
            />
            {touched.phonenumber && errors.phonenumber &&
              <Text style={{ fontSize: 12, color: '#FF0D10', marginBottom: 5}}>{errors.phonenumber}</Text>
            }    
            <View>
              <Button onPress={handleSubmit} title="Créer le compte" />
            </View>
          </View>
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default RegisterPage;