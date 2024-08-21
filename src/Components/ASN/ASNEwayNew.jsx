import React from 'react'
import { useLocation } from "react-router-dom";
import ASNGenerateAwb from './ASNGenerateAwb';

 

function ASNEwayNew(){
    const {state} = useLocation();
    return (
      <>
      <ASNGenerateAwb id={state.id}  />
      </>
    )
}

export default ASNEwayNew