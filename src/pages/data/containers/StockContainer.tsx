import React,{useState} from 'react';
import axios, { AxiosResponse } from 'axios';

export const useStockContainer = () => {
  const [stock, setStock] = useState([]);
  
  function addProduct(product) {
    if(!stock.find(({id}) => id == product.id))
    {
      setStock([...stock, product])
    }
  }

  function validateNewStock(){
      console.log('we send datas here')
  }

  function reload(){
      setStock([])
  }
  return {stock, setStock, addProduct,validateNewStock,reload};
};
