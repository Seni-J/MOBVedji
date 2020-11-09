import React,{useState} from 'react';
import axios, { AxiosResponse } from 'axios';

export const useStockContainer = () => {
  const [stock, setStock] = useState([]);
  const [vals,setVals] = useState([]);

  function addProduct(product) {
    if(!stock.find(({id}) => id == product.id))
    {
        const val = {
            "id": product.id,
            "quantity": product.stock
        }
        setVals([...vals,val])
      setStock([...stock, product])
    }
  }

  function validateNewStock(token){
      const res = {
          'quantities' : vals
      }

      console.log(res)
    axios
    .post('http://10.229.32.175:8000/api/products/stock', JSON.stringify(res), {
        headers: {Authorization: 'Bearer ' + token},
    })
    .then(res => {
      alert("La modification des données a été effectuée.");
    })
    .catch(error => {
        if(error.response.status === 400){
            alert("Données invalides")
        }else if (error.response.status === 404){
            alert("Le produit n'existe pas.")
        }else{
        alert("Une erreur est survenue.");
        console.log(error);
        }
      })
  }

  function reload(){
      setStock([])
  }

  return {stock, setStock, addProduct,validateNewStock,reload};
};
