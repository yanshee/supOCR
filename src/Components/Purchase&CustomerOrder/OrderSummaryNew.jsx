
// import React from 'react'
// import OrderSummary from './OrderSummary';
// import { useLocation } from "react-router-dom";

// function OrderSummaryNew(){
//     const {state} = useLocation();

//     return (
//       <>
//       <OrderSummary id={state.id}  />
//       </>
  
//     )
// }

// export default OrderSummaryNew

import React from 'react'
import OrderSummary from './OrderSummary';
import { useLocation } from "react-router-dom";

 

function OrderSummaryNew(){
    const {state} = useLocation();
    return (
      <>
      <OrderSummary id={state.id}  />
      </>
    )
}

export default OrderSummaryNew