import React from 'react'

import InvoiceSummary from './InvoiceSummary';

import { useLocation } from "react-router-dom";

 

function InvoiceSummarynew(){

    const {state} = useLocation();

 

    return (

      <>

      <InvoiceSummary id={state.id}  />

      </>

    )

}

 

export default InvoiceSummarynew