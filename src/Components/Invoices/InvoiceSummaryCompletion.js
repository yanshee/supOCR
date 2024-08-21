import React,{useState,useEffect} from 'react'
import logo from '../../images/KPMG-logo.jpg'
import '../../style/OrderSummary.css'
import HomeNav from '../Navbar/HomeNav'
import HomeButton from '../Buttons/HomeButton'
import {FaUserAlt,FaInfoCircle, FaBell,FaAngleDoubleDown, FaSearch, FaFilter, FaSort, FaFileExport, FaArrowAltCircleUp, FaArrowCircleDown, FaArrowCircleUp} from "react-icons/fa";
import { FaHome,FaArrowLeft} from "react-icons/fa";
import { useNavigate} from "react-router-dom";
import axios from 'axios';
const cors = require('cors');

 

function InvoiceSummaryCompletion({id}) {


  let navigate = useNavigate();

    const [currentData, setcurrentData] = useState(null);
    const [invoicedItems, setinvoicedItems] = useState(null);
    const [expand,setexpand]=useState(true)

    const toggleExpanded=()=>{
      setexpand(!expand)
    }

    console.log("id",id)
    useEffect(() => {
    setcurrentData(id?.CompleteData)
     },[id?.CompleteData])
     console.log("current Data",currentData)

   useEffect(() => { 
    if (currentData) {
      setinvoicedItems(JSON.parse(currentData?.invoicedItems));
    } else {
      setinvoicedItems(null); // Or any default value you want
    }
   },[currentData])

//     console.log("invoicedItems", invoicedItems?.itemdetails);

function paymentreminder(e)
{
    e.preventDefault();
    axios({
        method: 'post',
        url: 'http://localhost:4040/api/invoice/service/invoice/sendPaymentReminder?invoiceIdArray[]='+id?.InvNo, 
      })
        .then(function (response) {
         console.log(" payment response", response.data);
         if ( response) {
            
            window.location = "/AlertInvoices"; 
          } else {
            alert('Payment Reminder Failed');
           
          }
        })
        .catch(function (error) {
          console.log('error', error);
        });
}

 


    return (

<div>

      <div>

      <HomeNav/>

  </div>
  <div class='Invoices-heading'>
                <HomeButton/>
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
         <a href='/AlertItemListing' className='CreateInvBtn1'>Invoice Alert &nbsp; {<FaBell/>}</a>
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

     <div class='Po-summary'>

                    <p>Invoice #{id?.InvNo}</p> 
                    {<FaAngleDoubleDown onClick={toggleExpanded} className='OrderSummary-Ricons-Uparraow' />}

     </div>
     {expand && (<div>
        <div className="invoice">
     <div class='item1'>
            <label class='item-fields1'>Payment Status: </label>
            <input className='RetailerReturnTextInput1' value={currentData?.invoicePaymentStatus}></input>
            </div>
            <div class='item1'>
            <label class='item-fields1'>Payment Due Date: </label>
            <input className='RetailerReturnTextInput1' value={currentData?.invoiceDate}></input>
            </div>
            </div>
     <div class='PO-wrapper1'>
        <div class='left-wrapper'>
            <div class='item'>
            <label class='item-fields'>Invoice No: </label>
            <input className='RetailerReturnTextInput' value={id?.InvNo}></input>
            </div>

            <div class='item'>
            <label class='item-fields'>Invoice Creation Date: </label>
            <input className='RetailerReturnTextInput' value={currentData?.invoiceDate}></input>
            </div>

            <div class='item'>
            <label class='item-fields'>Invoice Type: </label>
            <input className='RetailerReturnTextInput' value={currentData?.invoiceType}></input>
            </div>

            <div class='item'>
            <label class='item-fields'>Invoice Status: </label>
            <input className='RetailerReturnTextInput' value={currentData?.invoiceStatus}></input>
            </div>   

            <div class='item'>
            <label class='item-fields'>Currency: </label>
            <input className='RetailerReturnTextInput' value={currentData?.Currency}></input>
            </div> 
        </div>


        <div class='mid-wrapper'>
       
            <div class='item'>
            <label class='item-fields'>Total Quantity: </label>
            <input className='RetailerReturnTextInput' value={currentData?.totalItemQty}></input>
            </div>

            <div class='item'>
            <label class='item-fields'>Total Item: </label>
            <input className='RetailerReturnTextInput' value={currentData?.totalUniqueItems}></input>
            </div>
<p><b>Payment Details</b></p>
            <div class='item'>
            <label class='item-fields'>Total Amount: </label>
            <input className='RetailerReturnTextInput' value={currentData?.invoiceTotalAmount}></input>
            </div> 
            <div class='item'>
            <label class='item-fields'>Due Amount: </label>
            <input className='RetailerReturnTextInput' value={currentData?.invoiceDueAmount}></input>
            </div>    
        </div>

 

        <div class='right-wrapper'>
        <div class='item'>
            <label class='item-fields'>PO Number: </label>
            <input className='RetailerReturnTextInput' value={currentData?.poNumber}></input>
            </div>
            <div class='item'>
            <label class='item-fields'>Sender Address: </label>
            <input className='Address' value={currentData?.senderAddress}></input>
            </div>

            <div class='item'>
            <label class='item-fields'>Delivery Address: </label>
            <input className='Address' value={currentData?.deliveryAddress}></input>
            </div>

            <div class='item'>
                <p></p>
            </div>  
        </div>
     </div>

 

     {/* <div class='Item-Details'>

                    <p>Item Details</p>

                    {<FaArrowAltCircleUp className='OrderSummary-Ricons-Uparraow' />}

     </div> */}

   

<div className="outer-wrapper">
  <div className="table-wrapper">
    <table className="table">
      <thead>
        <tr>

          <th>Item Id</th>
          <th>Item Name</th>
          <th>P.O Number</th>
          <th>Quantity</th>
          <th>Invoice Qty</th>
          <th>Invoiced Price</th>
          <th>Total Price</th>

        </tr>
      </thead>
      <tbody>
    
    
      {invoicedItems?.map((items, index) =>{
         console.log("dcb",items)
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
      } )}
  
      </tbody>
    </table> 
    <br />
  </div>
  </div>
 
</div>)}
<a  className='nextBtn' onClick={paymentreminder}>Send Payment Reminder</a>

  </div>  

 

    )

    }

   export default InvoiceSummaryCompletion;