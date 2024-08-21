import React from 'react'
import { useLocation } from "react-router-dom";
import InvoiceSummaryCompletion from './InvoiceSummaryCompletion';


function InvoiceSummaryCompletionNew(){
    const {state} = useLocation();

    return (
      <>
      <InvoiceSummaryCompletion id={state.id}  />
      </>
    )
}

export default InvoiceSummaryCompletionNew