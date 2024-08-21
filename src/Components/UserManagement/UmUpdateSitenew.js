import React from 'react'

import UMupdatesite from './UmUpdateSite';

import { useLocation } from "react-router-dom";

 

function UMupdatesitenew(){ 

    const {state} = useLocation();

 

    return (

      <>

      <UMupdatesite id={state.id} siteName={state.siteName} />

      </>

    )

}

 

export default UMupdatesitenew