import React from 'react'
import { useLocation } from "react-router-dom";
import ASNView_details from './ASNView_details';

 

function ASNViewDetailsNew(){
    const {state} = useLocation();
    return (
      <>
      <ASNView_details id={state.id}  />
      </>
    )
}

export default ASNViewDetailsNew