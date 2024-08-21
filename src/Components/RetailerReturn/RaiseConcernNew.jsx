
import React from 'react'
import RetailerReturnRaiseConcern from './RetailerReturnRaiseConcern';
import { useLocation } from "react-router-dom";

function RaiseConcernNew(){
    const {state} = useLocation();

    return (
      <>
      <RetailerReturnRaiseConcern idSelected={state.idSelected}  />
      </>
  
    )
}

export default RaiseConcernNew