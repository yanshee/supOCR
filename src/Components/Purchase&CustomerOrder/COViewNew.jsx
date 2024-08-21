import React from 'react'
import { useLocation } from "react-router-dom";
import COView from './COView';

function COViewNew(){
    const {state} = useLocation();

    return (
      <>
      <COView id={state.id}/>
      </> 
    )
}

export default COViewNew