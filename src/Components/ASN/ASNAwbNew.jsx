import React from 'react'
import { useLocation } from "react-router-dom";
import AwbGenerationSuccess from './AwbGenerationSuccess';

 

function ASNAwbNew(){
    const {state} = useLocation();
    return (
      <>
      <AwbGenerationSuccess id={state.id}  />
      </>
    )
}

export default ASNAwbNew