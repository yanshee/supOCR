import React, { useState,useEffect, useRef} from 'react'
import HomeNav from '../Navbar/HomeNav'
import {FaArrowLeft, FaBell,FaCross, FaFile, FaFileAlt, FaFileArchive, FaFileDownload, FaFileSignature, FaSearch, FaTrash} from "react-icons/fa";
import '../../style/InvoiceDetails.css'
import InvoiceAlertButton from '../Buttons/InvoiceAlertButton'
import FullLengthSearchbar from '../Searchbars/FullLengthSearchbar';
import SortButton from '../Buttons/SortButton';
import FilterButton from '../Buttons/FilterButton';
import axios from 'axios';
import { useNavigate} from "react-router-dom";

function InvoiceDetails2({id}) {

    let navigate = useNavigate();
   console.log('data', id);
   
    const [creationDate, setcreationDate] = useState()
    const [poData, setpoData] = useState([]);
    const [currentDate, setCurrentDate] = useState(getDate()); 
    const [selectedCoId, setSelectedCoIds] = useState([]);
    const [selectedItemId,setSelectedItemId]=useState([]);
    const [itemselected, setitemselected] = useState([]);
    const [totalamount, settotalamount] = useState(0);
    const [totalItems,settotalItems]=useState(0);
   const [costButton, setCostButton]=useState(true);
   const [addItemButton,setaddItemButton]=useState(false);
   
    
    
   

    function getDate() {
      const today = new Date();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const date = today.getDate();
      return `${month}/${date}/${year}`;
    }

  

    const handleChange=(event)=>{
        const{name,value}=event.target;
        setData((prevData)=>({
            ...prevData,
            [name]:value,
        
        }));
    };
    
    useEffect(() => {
         setSelectedCoIds(id?.CoId)
         setSelectedItemId(id?.ids)
         },[id?.CoId,id?.ids]);

         console.log("item id",selectedItemId)
         console.log("po id",selectedCoId)

    useEffect(() => {
        if(Array.isArray(id?.OrderData)&& Array.isArray(selectedItemId)){
            const filteredData=id?.OrderData.filter(item=>selectedItemId.includes(item.itemId))
            setpoData(filteredData)
        }
        // setpoData(id?.OrderData?.filter(item => selectedItemId.includes(item.itemId))) 
         }, [id?.OrderData,selectedItemId]);

    console.log("order data",id?.OrderData)

    useEffect(() => {
        if(Array.isArray(poData)&& poData.length>0){
        let total = poData.reduce((previousValue, currentValue) => {
          const totalprice = previousValue + currentValue.totalCost;
          return totalprice*.18+totalprice;
        }, 0);
        settotalamount(total);

        let allItems = poData.reduce((previousValue, currentValue) => {
            const allitems = previousValue + currentValue.invoiceqty;
            return allitems;
          }, 0);
          settotalItems(allItems)
    setData({...Data,"poNumber":selectedCoId.toString() ,"invoiceDueAmount": total, "invoiceTotalAmount": total,"totalItemQty":allItems, "invoicedItems": JSON.stringify(poData), "totalUniqueItems": poData.length, })} }, [poData])
     console.log("total amount",totalamount)
     console.log("invoiceqty",totalItems)


      const [Data,setData]=useState({
        
        "uniqueId": "",
        "invoiceId": "string",
        "invoiceDate": currentDate,
        "invoiceType": "Standard",
        "Currency": "INR",
        "invoiceTotalAmount": totalamount,
        "invoiceDueAmount": totalamount,
        "nettedAmt": 0,
        "invoiceStatus": "New",
        "poNumber": selectedCoId.toString() ,
        "invoiceOnHoldFlag": "N",
        "invoicePaymentStatus": "Not Paid",
        "invoiceDueDate": "",
        "totalItemQty":totalItems,
        "totalUniqueItems": poData?.length,
        "attachments": "string",
        "deliveryAddress": "",
        "senderAddress": id?.store.toString(),
        "created_datetime": "string",
        "customerId": "string",
        "invoicedItems": JSON.stringify(poData)   
    });
    
      // useEffect(() => {
      //   let total = itemselected.reduce((previousValue, currentValue) => {
      //     const totalprice = previousValue + currentValue.totalcost;
      //     return totalprice*.18+totalprice;
      //   }, 0);

      //   settotalamount(total);
      // setData({...Data,  "invoiceDueAmount":  total, "invoiceTotalAmount": total, "invoicedItems": JSON.stringify(itemselected), "totalItemQty": itemselected.length, }) }, [itemselected])
      
console.log("Data", Data);

// function createinvoice(e)
// {
//     e.preventDefault();

//     axios({
//         method: 'post',
//         url: 'http://localhost:4040/api/invoice/service/invoice/createInvoice',
//         data: Data,
//       })
//         .then(function (response) {
//          console.log("response", response.data);
//          if ( response.data) {
//             //  alert('Invoice Created');
//             // window.location = "/InvoicesMain";
//             const pathCompute='/InvoiceCreationSuccess'
//             navigate(pathCompute,{ state: {id: {
//               InvNo:response.data,
//               ItemDetails:poData,
//               CompleteData:Data
//               // itemDetails:selectedItem
//             }}}); 
          
//           } else {
//             // alert('Invoice Creation Failed');
           
//           }
//         })
//         .catch(function (error) {
//           console.log('error', error.response.data);
//         });  
//     }

function createinvoice(e) {
    e.preventDefault();
    axios({
        method: 'post',
        url: "http://localhost:4040/api/invoice/service/invoice/createInvoice",
        data: {
        "uniqueId": "",
        "invoiceId": "string",
        "invoiceDate": currentDate,
        "invoiceType": "",
        "Currency": "INR",
        "invoiceTotalAmount": totalamount,
        "invoiceDueAmount": totalamount,
        "nettedAmt": 0,
        "invoiceStatus": "New",
        "poNumber": selectedCoId.toString() ,
        "invoiceOnHoldFlag": "N",
        "invoicePaymentStatus": "Not Paid",
        "invoiceDueDate": "",
        "totalItemQty":totalItems,
        "totalUniqueItems": poData?.length,
        "attachments": "string",
        "deliveryAddress": "",
        "senderAddress": id?.store.toString(),
        "created_datetime": "string",
        "customerId": "string",
        "invoicedItems": JSON.stringify(poData)     
        }
        // data: itemselected
    })
        .then(function (response) {
            console.log("response.data", response.data);
            const pathCompute='/InvoiceCreationSuccess'
            navigate(pathCompute,{ state: {id: {
              InvNo:response.data,
              ItemDetails:poData,
              CompleteData:Data
            }}});             
        })
        .catch(function (error) {
            console.log('error', error.response.data.message);
        });
}

console.log("po data",poData)

    
  return (
    
    <div>
       <HomeNav/>
       <div className='title'>
          <div class='Back-button'>
                     {<FaArrowLeft className='PurchaseOrderMain-Ricons-Back'/>}
                     
                     <a onClick={() => navigate(-1)} class='PurchaseOrderMain-Back-a' style={{textDecoration:'none'}}>Back</a>
                     {/* <text onClick={navigate('/CustomerOrderMain')} class='PurchaseOrderMain-Back-a' >Back</text> */}
                
                     {/* <text onClick={navigate('/CustomerOrderMain')} class='PurchaseOrderMain-Back-a' >Back</text> */}
                 </div>
         <text>Create Invoice</text>
         <div class='PurchaseOrderMain-notification'>
         <a href='/AlertInvoices' className='CreateInvBtn1'>Invoice Alert &nbsp; {<FaBell/>}</a>
         </div>
         
       </div>
        
       <div className='InvoiceDetailsTitle'>Invoice Details</div>
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
               <input  value={currentDate} type='text' onChange={handleChange} name='invoiceDate' id="date"></input>
               <input value="Standard" type='text' onChange={handleChange} name='invoiceType'></input>
               <input type='text' onChange={handleChange} name='invoiceStatus' value="New" disabled></input>
               <input type='text'onChange={handleChange}  name='Currency' value="INR" disabled ></input>
               <input value={totalamount.toFixed(2)} type='number' onChange={handleChange} name='invoiceTotalAmount' disabled></input>
               <input value={totalamount.toFixed(2)} type='number' onChange={handleChange} name='invoiceDueAmount' disabled></input>
               <input type='number' onChange={handleChange} name='nettedAmt' disabled value={Data.nettedAmt}></input>
               <input value={totalItems} type='number' onChange={handleChange}  name='totalItemQty' disabled></input>
             </div>
           </div>
           <div className='mid-pane'>
             <div className='mid-container'>
                 <p>Selected PO(s) :</p>
                 <div className='TableWrapper'>
                   <table>
                    
                     {id?.CoId?.map((individualExcelData, index) => (  
                      <tr>
                        <td>{individualExcelData}</td>
                      </tr>
                      ))}
                     
                   </table>
                 </div><br/>
                 <p>Delivery Address :</p>
                 <textarea onChange={handleChange} name='deliveryAddress' rows="5" cols="50"></textarea>
                <div className='wrap'>
                <div className='fieldName'>
                 <p>Total Items</p>
                 </div>
                 <div className='inputFields'>
                 <input value={Data.totalUniqueItems} type='number'  name='totalItemQty' disabled></input>
                 </div>
                </div>
                   
             </div>
           </div>
           <div className='right-pane'>
             <div className='right-container'>
                 {/* <div>
                     Attachments : <text className='fileFormat'> ( .pdf, .docx , .jpeg files only )</text>
                     <br/><br/>
                     <input onChange={handleChange} className='AttachmentsInput' type='file' multiple></input>
                 </div> */}
                 <br/><br/><br/>
                 <div className='right-div'>Invoice Number : <input  onChange={handleChange} name='invoiceNumber' disabled ></input></div>
                 <br/>
                 <div>
                     <p>Sender Address :</p>
                     <textarea value={id?.store} name='senderAddress' rows="3" cols="50"></textarea>
                 </div>
                 <br/>
                 <div>
                     Payment Status : <input type="text" value="-" onChange={handleChange}  disabled></input>
                 </div>
             </div>
           </div>
       </div>
       <br/><br/>
       <div className='ItemDetailsTitle'>Item Details</div>
       <div>
           <br/>
           <div className="outer-wrapper">
 <div className="table-wrapper">
   <table className="table">
                 <thead>
                     {/* <th>-</th> */}
                     <th>Item ID</th>
                     <th>Purchase Order Number</th>
                     <th>Product</th>
                     <th>Purchase Order Quantity</th>
                     <th>Inventory Quantity</th>
                     <th>Cost</th>
                     <th>Total Cost</th>
                    
                 </thead>
                 <tbody>
                     

                     {poData?.map((individualData, index) => ( 
                        <tr>
                        {/* <td> <input id={individualData?.itemId} value={individualData?.itemId}  type='checkbox' ></input></td> */}
                        <td>{individualData?.itemId}</td>
                        <td>{individualData?.poNum}</td>
                        <td>{individualData?.itemName}</td>
                        <td>{individualData?.orderedQty}</td>
                        <td>{individualData?.invoiceqty}</td>
                        <td>{individualData?.price}</td>
                        <td>{individualData?.totalCost}</td>
                       
                    </tr>
                      ))}
                     
                 </tbody>
             </table>
            
           </div>
       </div>
       </div>
       {/* <a  className='nextBtn' onClick={additems}>Add Items</a><br/><br/><br/><br/> */}
       {/* {costButton && (<button className='ItemListing-Edit-btn' onClick={fetchPriceAndUpdateData}>Populate Cost</button>)} */}
       <a  className='nextBtn' onClick={createinvoice}>Generate Invoice</a>

       {/* Approved Itmes started */}

       {/* <div className='ItemDetailsTitle'>Approved Item Details</div>
       <div>
           <br/>
           
             <div className="outer-wrapper">
 <div className="table-wrapper">
   <table className="table">
                 <thead>
                    
                     <th>Item ID</th>
                     <th>Purchase Order Number</th>
                     <th>Product</th>
                     <th>Purchase Order Quantity</th>
                     <th>Inventory Quantity</th>
                     <th>Cost</th>
                     <th>Total Cost</th>
                 </thead>
                 <tbody>
                     

                     {itemselected?.map((individualData, index) => ( 
                        <tr>
                        <td>{individualData?.itemId}</td>
                        <td>{individualData?.poNum}</td>
                        <td>{individualData?.itemName}</td>
                        <td>{individualData?.orderedQty}</td>
                        <td> <input type="text" value={individualData?.invoiceqty} className='invQty' name='invQty'></input> </td>
                        <td>₹500</td>
                        <td name='totalcost'> {individualData?.invoiceqty * 500} </td>
                    </tr>
                      ))}
                     
                 </tbody>
             </table>
             
           </div>
       </div>
       </div>
       <div class="invoice-total">
         Invoice Total: <span>{totalamount.toFixed(2)}</span> 
         <a  className='nextBtn1' onClick={createinvoice}>Generate Invoice</a>
       </div>
      
      
       <br/>
      
       <div>
          
          
           <br/>
           
       </div>
       <br/>

       <div>
          
          
       </div>
       <br/> */}

       {/* <div className='InvoiceTotal'>
         <text>Invoice Total :  &nbsp;&nbsp;&nbsp;₹ </text>
         <input type="number" disabled></input>
       </div>
       <br/><br/><br/> */}
       
     
     </div>
 
 )
};

export default InvoiceDetails2;