import React from 'react'
import { useLocation } from "react-router-dom";
import COGenerateAwb from './COGenerateAwb';

function GenerateAwbNew(){
    const {state} = useLocation();

    return (
      <>
      <COGenerateAwb id={state.id}/>
      </> 
    )
}

export default GenerateAwbNew