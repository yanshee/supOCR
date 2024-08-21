
import React from 'react'
import CustomerReturnRaiseConcern from './CustomerReturnRaiseConcern';
import { useLocation } from "react-router-dom";

function CRRaiseConcernNew(){
    const {state} = useLocation();

    return (
      <>
      <CustomerReturnRaiseConcern idSelected={state.idSelected}  />
      </>
  
    )
}

export default CRRaiseConcernNew