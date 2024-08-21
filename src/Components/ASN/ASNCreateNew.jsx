import React from 'react'
import { useLocation } from "react-router-dom";
import ASNGenerateDC from './ASNGenerateDC';

 

function ASNCreateNew(){
    const {state} = useLocation();
    return (
      <>
      <ASNGenerateDC id={state.id}  />
      </>
    )
}

export default ASNCreateNew