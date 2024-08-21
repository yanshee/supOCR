import React from 'react'
import ItemListingItemEditPage from './ItemListingItemEditPage';
import { useLocation } from "react-router-dom";

function ItemListingEditNew(){
    const {state} = useLocation();

    return (
      <>
      <ItemListingItemEditPage idSelected={state.idSelected}  />
      </> 
    )
}

export default ItemListingEditNew



 

