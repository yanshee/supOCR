import React from 'react'

import InvoiceDetails from './InvoiceDetails';

import { useLocation } from "react-router-dom";

 

function CreateInvoicesNew(){

    const {state} = useLocation();
    return (
      <>
      <InvoiceDetails id={state.id}  />
      </>

    )

}

 

export default CreateInvoicesNew