import React from 'react'

import InvoiceDetails2 from './InvoiceDetails2';

import { useLocation } from "react-router-dom";

 

function InvoiceDetails2new(){

    const {state} = useLocation();
    return (
      <>
      <InvoiceDetails2 id={state.id}  />
      </>

    )

}

 

export default InvoiceDetails2new