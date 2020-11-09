import React,{useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Card} from 'react-native-elements';
import {getTokenStorage, getProductDetails} from './data/UserData'
import {BasketContainer} from './data/containers';

const styles = StyleSheet.create({
  });

const ProductDetailsPage = ({route,navigation}) => {
    const {id} = route.params
    const [token, setToken] = useState()
    const [product, setProduct] = useState()
    const basketContainer = BasketContainer.useContainer();

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
                <TouchableOpacity
                style={{backgroundColor:"#0f20d9",width:"15%",marginLeft:"80%",borderRadius:20,alignItems: "center"}}
                onPress={() => {basketContainer.addProduct(product)
                alert('Le produit : ' + product.name +' a été ajouté avec succès.')}}
                >
                    <Icon name="cart-plus" color="white" size={24} />
                </TouchableOpacity>
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