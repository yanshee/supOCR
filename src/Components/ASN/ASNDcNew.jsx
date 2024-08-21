import React from 'react'
import { useLocation } from "react-router-dom";
import ASNGenerateEWay from './ASNGenerateEway';

 

function ASNDcNew(){
    const {state} = useLocation();
    return (
      <>
      <ASNGenerateEWay id={state.id}  />
      </>
    )
}

export default ASNDcNew