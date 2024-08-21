import React from 'react'
import COGeneratePicklist from './COGeneratePicklist';
import { useLocation } from "react-router-dom";
import COPicklistSuccess from './COPicklistSuccess';

function COGenerateInvoiceNew(){
    const {state} = useLocation();

    return (
      <>
      <COPicklistSuccess id={state.id}/>
      </> 
    )
}

export default COGenerateInvoiceNew