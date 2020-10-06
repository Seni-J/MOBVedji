import React,{useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {Card} from 'react-native-elements';
import {getTokenStorage, getProductDetails} from './data/UserData'

const styles = StyleSheet.create({
  });

const ProductDetailsPage = ({route,navigation}) => {
    const {id} = route.params
    const [token, setToken] = useState()
    const [product, setProduct] = useState()

    if(product == null){
        getTokenStorage().then(token => {setToken(token)})
        getProductDetails(token,id).then(res => {
            setProduct(res)
        })
    }

    return(
        <View>
        {product != null && !Object.keys(product).includes("error") ? (
            <Card title={product.name} image={{uri:'http://10.229.32.175:8000/storage/pictures/'+ product.picture}}>
                <Text>{product.details}</Text>
                <Text>{`stock: ${product.stock}, prix: ${product.price} CHF`}</Text>
                {product.suppliers != null && product.suppliers.length > 0 ? (
                <Card title="Fournisseurs">
                    {
                    product.suppliers.map((supplier, i) => {
                        return (
                        <View key={i}>
                            <Text>{`Nom de l'entreprise: ${supplier.company_name}`}</Text>
                            <Text>{`Ville: ${supplier.city}`}</Text>
                        </View>
                        );
                    })
                    }
                </Card>
                ) : <Card title="Fournisseurs"><Text>Pas de fournisseur disponible</Text></Card>
            }
            </Card>
            
        ) :<ActivityIndicator/> }
        </View>
    );

  };
  export default ProductDetailsPage;