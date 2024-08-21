import React from 'react'
import '../../style/InvoiceAlertButton.css'
import { FaBell } from "react-icons/fa";

function InvoiceAlertButton() {
  return (
    <a className="InvoiceAlertButton" href='/AlertInvoices'>
        <div>Invoice Alerts</div> {<FaBell className="InvoiceAlertButton-icon"/>}
    </a>
  )
}

export default InvoiceAlertButton