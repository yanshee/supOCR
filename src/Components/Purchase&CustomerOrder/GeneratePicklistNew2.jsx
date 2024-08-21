import React from 'react'
import COGenerateInvoice from './COGenerateInvoice';
import { useLocation } from "react-router-dom";

function GeneratePicklistNew2(){
    const {state} = useLocation();

    return (
      <>
      <COGenerateInvoice id={state.id}/>
      </> 
    )
}

export default GeneratePicklistNew2