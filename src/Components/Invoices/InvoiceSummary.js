import React, { useState, useEffect } from 'react'

import logo from '../../images/KPMG-logo.jpg'

import '../../style/OrderSummary.css'

import HomeNav from '../Navbar/HomeNav'
import HomeButton from '../Buttons/HomeButton'

import { FaUserAlt, FaInfoCircle, FaBell, FaSearch, FaFilter, FaSort, FaFileExport, FaArrowAltCircleUp, FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";

import { FaHome, FaArrowLeft } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import axios from 'axios';

const cors = require('cors');



function InvoiceSummary({ id }) {


  let navigate = useNavigate();

  const [currentData, setcurrentData] = useState(null);
  const [invoicedItems, setinvoicedItems] = useState(null);


  //alert(id);

  useEffect(() => {

    const itemdata = async () => {

      await axios

        .get(`http://localhost:4040/api/invoice/service/invoice/getInvoiceDetails?invoiceId=${id}`)

        .then((res) => {

          setcurrentData(res.data)
          console.log(currentData);
        }).catch((err) => {
          console.log(err);
        })

    }

    itemdata()
  }, [])

  // const jsonObject = JSON.parse(currentData.itemDetails);
  // JSON.parse(currentData.invoicedItems);
  // console.log("currentData", JSON.parse(currentData?.invoicedItems));

  console.log("Hi there", currentData?.invoicedItems)
  const poarray = currentData?.poNumber.split(',');
  useEffect(() => {
    if (currentData) {
      setinvoicedItems(JSON.parse(currentData?.invoicedItems));
    } else {
      setinvoicedItems(null); // Or any default value you want
    }
  }, [currentData])

  console.log("invoicedItems", invoicedItems?.itemdetails);






  return (

    <div>

      <div>

        <HomeNav />

      </div>
      <div class='Invoices-heading'>
        <HomeButton />
        <button onClick={() => navigate(-1)} class='back_button_dc'><FaArrowLeft
          style={{
            fontSize: "10px",
            marginRight: "5px",
            outline: "none",
            border: "none",
          }}
        />
          Back
        </button>
        <div className='InvoiceTitle'>
          <p>Invoice</p>
        </div>
        <div class='PurchaseOrderMain-notification'>
          <a href='/AlertItemListing' className='CreateInvBtn1'>Invoice Alert &nbsp; {<FaBell />}</a>
        </div>
      </div>


      {/* <div class='PurchaseOrderMain-description'>

        <div class='PurchaseOrderMain-description-content'>

             <div class='PurchaseOrderMain-component-Home'>

                 {<FaHome className='PurchaseOrderMain-Ricons-Home'/>}

             </div>

             <div class='Back-button'>
                     {<FaArrowLeft className='PurchaseOrderMain-Ricons-Back'/>}
                     <a href='/InvoicesMain' class='PurchaseOrderMain-Back-a' style={{textDecoration:'none'}}>Back</a>
                 </div>
                       

             <div class='PurchaseOrderMain-component-heading'>

                 <p>Invoices</p>

             </div>
 

             <div class='PurchaseOrderMain-notification'> */}

      {/* <div class='PurchaseOrderMain-notification-alerts'>

                     <a class='PurchaseOrderMain-notification-a'>Order Alerts</a>

                     {<FaBell className='PurchaseOrderMain-Ricons'/>}

                </div>

             </div>       */}
      {/* <a href='/AlertInvoices' className='CreateInvBtn1'>Invoice Alert &nbsp; {<FaBell/>}</a>
</div>
        </div> */}

      {/* <div class='PurchaseOrderMain-searchbar'>

        <div class='PurchaseOrderMain-searchbar-container'>

                <input placeholder="Search here"/>

                {<FaSearch className='PurchaseOrderMain-Ricons-search'/>}

        </div>

    </div> */}

      {/* <div class='PurchaseOrderMain-Operations'>

                <div class='PurchaseOrderMain-Download'>

                    <a class='PurchaseOrderMain-Operations-content-a'>Export All</a>

                    {<FaFileExport className='PurchaseOrderMain-Ricons-down'/>}

                </div>

                <div class='PurchaseOrderMain-FilterBy'>

                    <a class='PurchaseOrderMain-Operations-content-a'>FilterBy</a>

                    {<FaFilter className='PurchaseOrderMain-Ricons-fil'/>}

                </div>

                <div class='PurchaseOrderMain-SortBy'>

                    <a class='PurchaseOrderMain-Operations-content-a'>SortBy</a>

                    {<FaSort className='PurchaseOrderMain-Ricons-sort'/>}

                </div>

            </div> */}

      {/* </div> */}

      <div className='InvoiceDetailsTitle'>Invoice ID #{currentData?.invoiceId}</div>
      <div className='DetailContainer'>
        <div className='left-pane'>
          <div className='fieldName'>
            <p>Creation Date</p>
            <p>Invoice Type </p>
            <p>Invoice Status </p>
            <p>Currency</p>
            <p>Total Amount</p>
            <p>Due Amount</p>
            <p>Netted Amount</p>
            <p>Total Qty</p>
          </div>
          <div className='inputFields'>
            <input value={currentData?.invoiceDate} type='text' name='invoiceDate' id="date" disabled></input>
            <input value={currentData?.invoiceType} type='text' name='invoiceType' disabled></input>
            <input type='text' name='invoiceStatus' value={currentData?.invoiceStatus} disabled></input>
            <input type='text' name='Currency' value={currentData?.currency} disabled ></input>
            <input value={currentData?.invoiceTotalAmount} type='number' name='invoiceTotalAmount' disabled></input>
            <input value={currentData?.invoiceDueAmount} type='number' name='invoiceDueAmount' disabled></input>
            <input type='number' name='nettedAmt' disabled value={currentData?.nettedAmt}></input>
            <input value={currentData?.totalItemQty} type='number' name='totalItemQty' disabled></input>
          </div>
        </div>
        <div className='mid-pane'>
          <div className='mid-container'>
            <p>Selected PO(s) :</p>
            <div className='TableWrapper'>
              <table>

                {poarray?.map((individualExcelData, index) => (
                  <tr>
                    <td>{individualExcelData}</td>
                  </tr>
                ))}

              </table>
            </div>
            <br />
            <p>Delivery Address :</p>
            <textarea value={currentData?.deliveryAddress} name='deliveryAddress' rows="5" cols="50"></textarea>
          </div>
        </div>
        <div className='right-pane'>
          <div className='right-container'>

            <br /><br /><br />
            <div className='right-div'>Invoice Number : <input value={currentData?.invoiceId} name='invoiceNumber' disabled ></input></div>
            <br />
            <div>
              <p>Sender Address :</p>
              <textarea value={currentData?.senderAddress} name='senderAddress' rows="3" cols="50"></textarea>
            </div>
            <br />
            <div>
              Payment Status : <input type="text" value={currentData?.invoicePaymentStatus} name='paymentStatus' disabled></input>
            </div>
          </div>
        </div>
      </div>
      <br /><br />
      <div className='ItemDetailsTitle'>Item Details</div>
      <div>
        <br />


        <div className="outer-wrapper">

          <div className="table-wrapper">

            <table className="table">



              <thead>

                <tr>

                  <th>item id</th>

                  <th>item name</th>

                  <th>P.O Number</th>
                  <th>P.O Quantity</th>

                  <th>Invoice Qty</th>


                  <th>Cost</th>
                  <th>Total cost</th>

                </tr>

              </thead>

              <tbody>




                {invoicedItems?.map((items, index) => {
                  console.log("dcb", items)
                  return (

                    <tr>

                      <td>{items.itemId}</td>
                      <td>{items.itemName}</td>
                      <td>{items.poNum}</td>
                      <td>{items.orderedQty}</td>
                      <td>{items.invoiceqty}</td>
                      <td>₹ {items.price}</td>
                      <td>₹ {items.totalCost}</td>

                    </tr>
                  )
                })}







              </tbody>

            </table>

            <br />

          </div>

        </div>




        {/* <div class='ASN-Info'>

                    <p>ASN Info</p>

                    {<FaArrowAltCircleUp className='OrderSummary-Ricons-Uparraow'/>}

     </div>

  <div className="outer-wrapper">

            <div className="table-wrapper">

              <table className="table">

 

                <thead>

                  <tr>

                    <th>Item id</th>

                    <th>Items</th>

                    <th>P.O. Qty</th>

                    <th>Shipped Qty</th>

                    <th>Delivered Qty</th>

                  </tr>

                </thead>

              </table>

              <br />

            </div>

  </div>   */}

      </div>

</div>

      )

    }

      export default InvoiceSummary;