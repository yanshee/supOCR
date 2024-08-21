import React from 'react'
import '../../style/CostChangeAlertButton.css'
import { FaBell } from "react-icons/fa";

function ASN_Alert_button() {
  return (
    <button class="ASN_Alert_button">
        <div>Cost Change Alerts</div> {<FaBell class="ASN_Alert_button i"/>}
    </button>
  )
}

export default ASN_Alert_button