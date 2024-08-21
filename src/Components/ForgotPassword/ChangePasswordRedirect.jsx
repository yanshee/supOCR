import React from 'react'
import ChangePassword from './ChangePassword'
import { useLocation } from "react-router-dom";

 

function ChangePasswordRedirect() {
    const {state} = useLocation();

  return (
    <>
    <ChangePassword name={state.name}  />
    </>

  )

}

 

export default ChangePasswordRedirect