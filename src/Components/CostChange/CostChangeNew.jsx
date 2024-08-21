import React from 'react'
import { useLocation } from "react-router-dom";
import CostChangeItemEdit from './CostChangeItemEdit';

function CostChangeNew(){
    const {state} = useLocation();

    return (
      <>
      <CostChangeItemEdit idSelected={state.idSelected}  />
      </> 
    )
}

export default CostChangeNew