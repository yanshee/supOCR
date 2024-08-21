import React from 'react'
import COGeneratePicklist from './COGeneratePicklist';
import { useLocation } from "react-router-dom";

function COGeneratePicklistNew(){
    const {state} = useLocation();

    return (
      <>
      <COGeneratePicklist idSelected={state.idSelected}/>
      </> 
    )
}

export default COGeneratePicklistNew