import React from 'react'
import UMupdateuser from './UMupdateuser';
import { useLocation } from "react-router-dom";

function UMUpdateUserNew(){
    const {state} = useLocation();

    return (
      <>
      <UMupdateuser idSelected={state.idSelected}  />
      </> 
    )
}

export default UMUpdateUserNew



 

