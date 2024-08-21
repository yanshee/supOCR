import React from 'react'
import CustomerOrderSummary from './CustomerOrderSummary';
import { useLocation } from "react-router-dom";

function CustomerOrderSummaryNew(){
    const {state} = useLocation();

    return (
      <>
      <CustomerOrderSummary id={state.id}  />
      </> 
    )
}

export default CustomerOrderSummaryNew