
import React from 'react'
import CustomerReturnDetails from './CustomerReturnDetails';
import { useLocation } from "react-router-dom";

function CustomerReturnDetailsNew(){
    const {state} = useLocation();

    return (
      <>
      <CustomerReturnDetails idSelected={state.idSelected}  />
      </>
  
    )
}

export default CustomerReturnDetailsNew