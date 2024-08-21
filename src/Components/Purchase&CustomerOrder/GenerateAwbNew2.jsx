import React from 'react'
import { useLocation } from "react-router-dom";
import COAwbGenerationSuccess from './COAwbGenerationSuccess';

function GenerateAwbNew2(){
    const {state} = useLocation();

    return (
      <>
      <COAwbGenerationSuccess id={state.id}/>
      </> 
    )
}

export default GenerateAwbNew2