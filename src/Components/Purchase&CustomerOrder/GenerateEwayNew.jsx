import React from 'react'
import { useLocation } from "react-router-dom";
import COGenerateEWay from './COGenerateEWay';

function GenerateEwayNew(){
    const {state} = useLocation();

    return (
      <>
      <COGenerateEWay id={state.id}/>
      </> 
    )
}

export default GenerateEwayNew