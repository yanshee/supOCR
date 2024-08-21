
import React from 'react'
import RetailerReturnDetails from './RetailerReturnDetails';
import { useLocation } from "react-router-dom";

function RetailerReturnDetailsNew(){
    const {state} = useLocation();

    return (
      <>
      <RetailerReturnDetails idSelected={state.idSelected} raiseId={state.raiseId} />
      </>
  
    )
}

export default RetailerReturnDetailsNew