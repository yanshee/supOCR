import React from 'react'
import InvoiceCreationSuccess from './InvoiceCreationSuccess';
import { useLocation } from "react-router-dom";

 

function InvoiceCreationSuccessNew(){

    const {state} = useLocation();
    return (
      <>
      <InvoiceCreationSuccess id={state.id}  />
      </>

    )

}

 

export default InvoiceCreationSuccessNew