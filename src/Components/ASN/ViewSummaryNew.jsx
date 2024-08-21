import React from 'react'
import { useLocation } from "react-router-dom";
import ASNViewSummary from './ASNViewSummary';

 

function ViewSummaryNew(){
    const {state} = useLocation();
    return (
      <>
      <ASNViewSummary id={state.id}  />
      </>
    )
}

export default ViewSummaryNew