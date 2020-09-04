import React,{useState} from 'react';
import {View, Text, Image, StyleSheet,  FlatList, ActivityIndicator} from 'react-native';
import {Header, ListItem} from 'react-native-elements';
import {getTokenStorage, getProducts} from './data/UserData'

const styles = StyleSheet.create({
  });

const ProductListPage = ({navigation}) => {
    const [token, setToken] = useState()
    const [products, setProducts] = useState()

    if(!Array.isArray(products)){
        getTokenStorage().then(token => {setToken(token)})
        getProducts(token).then(res => {
            setProducts(res) 
        })
    }

    return(
        <View>
            { !Array.isArray(products) ? <ActivityIndicator/> :
            (
                <FlatList
                data={products}
                renderItem={({item}) => 
                    <ListItem
                    title={item.name}
                    subtitle={`Prix: ${item.price} CHF`}
                    leftAvatar={{source: {uri:'http://10.229.32.175:8000/storage/pictures/'+item.picture}}}
                    onPress={() => {
                        navigation.navigate('Details', {id: item.id});
                      }}
                    />
            }
            keyExtractor={item => String(item.id)}
            />
        )}
        </View>
    );

  };
  export default ProductListPage;