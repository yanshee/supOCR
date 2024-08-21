import React, { useState,useEffect, useRef} from 'react'
import HomeNav from '../Navbar/HomeNav'
import {FaArrowLeft, FaBell,FaCross, FaFile, FaFileAlt, FaFileArchive, FaFileDownload, FaFileSignature, FaSearch, FaTrash} from "react-icons/fa";
import '../../style/InvoiceDetails.css'
import InvoiceAlertButton from '../Buttons/InvoiceAlertButton'
import FullLengthSearchbar from '../Searchbars/FullLengthSearchbar';
import SortButton from '../Buttons/SortButton';
import FilterButton from '../Buttons/FilterButton';
import HomeButton from '../Buttons/HomeButton';
import axios from 'axios';
import { useNavigate} from "react-router-dom";

function InvoiceDetails({id}) {

    let navigate = useNavigate();
   // alert(id);
   console.log('invdet', id);
   
    const [creationDate, setcreationDate] = useState()
      const [poData, setpoData] = useState()
    const [currentDate, setCurrentDate] = useState(getDate()); 
    const [selectedIds, setSelectedIds] = useState([]);
    const [itemselected, setitemselected] = useState([]);
    const [totalamount, settotalamount] = useState(0);
   const [costButton, setCostButton]=useState(true);
   const [addItemButton,setaddItemButton]=useState(false);
   const [isCostPopulated,setIsCostPopulated]=useState(false);
   const [valueexceed,setValueExceed]=useState(false);
    
    const po_ids = id.poid.toString();

    useEffect(() => {
      const itemdata = async () => {
               await axios
      .post("http://localhost:4040/api/invoice/service/invoice/getPoItems?poIdArray[]="+po_ids) 
      .then((res) => {
        setpoData(res.data)
         console.log("h1", res)
      }).catch((err) => {
         console.log(err);
    })
      }
    
      itemdata()
    },[])
   

    function getDate() {
      const today = new Date();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const date = today.getDate();
      return `${month}/${date}/${year}`;
    }

  

    // const handleChange=(event)=>{
    //     const{name,value}=event.target;
    //     setData((prevData)=>({
    //         ...prevData,
    //         [name]:value,
        
    //     }));
    // };

    
     const handleIdCheckboxChange = (e) => {
      setCostButton(false);
      setaddItemButton(true);
      setSelectedIds((prevSelectedBrands) => {
        if (prevSelectedBrands.includes(e.target.value)) {
          return prevSelectedBrands.filter((selectedIds) => selectedIds !== e.target.value);
          
        } else {
          return [...prevSelectedBrands, e.target.value];
        }
      });
    };
    console.log("d", selectedIds)

  //   const handleIdCheckboxOnChange = (e) => {
  // const invdata = poData.map((item)=> { 
  //   if(item.itemId === e.target.name){
  //    return { ...item, 'invoiceqty': e.target.value , 'totalcost':e.target.value*item.price}
  //   }
  //   else
  //   {
  //     return  { ...item  }
  //   }
  //   }) 
  //   setpoData(invdata);
  //   console.log("invdata",invdata)
  //   let total = poData.reduce((previousValue, currentValue) => {
  //     const totalprice = previousValue + currentValue.totalcost;
  //     return totalprice*.18+totalprice;
  //   }, 0);
  //   settotalamount(total);
  //   };
    
  const handleIdCheckboxOnChange = (e) => {
    const invdata = poData.map((item)=> { 
      if(item.itemId === e.target.name){  
       const invoiceQty=parseInt(e.target.value,10);
       const price =parseFloat(item.price);
       if(!isNaN(invoiceQty) && !isNaN(price) && invoiceQty<=item.orderedQty){
        const totalCost=invoiceQty*price;
        document.getElementById("additem").disabled = false;
        return{...item,invoiceqty:invoiceQty,totalCost:totalCost}
       }
       else{
        alert("value exceeds")
        document.getElementById("additem").disabled = true;
        return{...item}
       }
      }
      else
      {
        // setValueExceed(false)
        return  { ...item}
      }
      }) 
      setpoData(invdata);
      console.log("invdata",invdata)
      let total = poData.reduce((previousValue, currentValue) => {
        const totalprice = previousValue + currentValue.totalcost;
        return totalprice*.18+totalprice;
      }, 0);
      settotalamount(total);
      };


      // function additems() {
      //   setitemselected(poData?.filter(item => selectedIds.includes(item.itemId)))   
      // }

      // console.log("data3", itemselected)
     
    //   const [Data,setData]=useState({
        
    //     "uniqueId": "",
    //     "invoiceId": "string",
    //     "invoiceDate": currentDate,
    //     "invoiceType": "",
    //     "Currency": "INR",
    //     "invoiceTotalAmount": "",
       
    //     "nettedAmt": "string",
    //     "invoiceStatus": "New",
    //     "poNumber": po_ids,
    //     "invoiceOnHoldFlag": "N",
    //     "invoicePaymentStatus": "Not Paid",
    //     "invoiceDueDate": "",
    //     "totalItemQty": itemselected?.length,
    //     "totalUniqueItems": "",
    //     "attachments": "string",
    //     "deliveryAddress": "",
    //     "senderAddress": "",
    //     "created_datetime": "string",
    //     "customerId": "string",
    //     "invoicedItems": itemselected.toString()      
    // });

      // useEffect(() => {
      //   let total = itemselected.reduce((previousValue, currentValue) => {
      //     const totalprice = previousValue + currentValue.totalcost;
      //     return totalprice*.18+totalprice;
      //   }, 0);

      //   settotalamount(total);
      // setData({...Data,  "invoiceDueAmount":  total, "invoiceTotalAmount": total, "invoicedItems": JSON.stringify(itemselected), "totalItemQty": itemselected.length, }) }, [itemselected])
      
    
// console.log("Data", Data);
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
//             // alert('Invoice Created');
//             window.location = "/InvoicesMain";
          
//           } else {
//             alert('Invoice Creation Failed');
           
//           }
//         })
//         .catch(function (error) {
//           console.log('error', error);
//         });  
// }

const fetchPriceAndUpdateData=async()=>{
  try{
  const itemIds=poData.map(item=>item.itemId)
  console.log("itemid",itemIds)
  const response=await fetch(`http://localhost:4040/api/invoice/service/invoice/populateCost?poIdArray[]=${itemIds}`)
  const pricesData=await response.json();
  console.log("response",pricesData)
  document.getElementById("populateCost").style.display = "none";
   setIsCostPopulated(true);
  const updatedData=poData.map(item=>({
    ...item,
    price:pricesData.find(price=>price.itemId==item.itemId)?.price
  })) 
  setpoData(updatedData);   
}
catch(error){
  console.error('Failed to fetch prices',error.response.data)
}
 }

// const fetchPriceAndUpdateData = () => {
//   //   setShowPrice(true);
//   // setIsButtonVisible1(true) 
//   const itemIds=poData.map(item=>item.itemId)
//   console.log("itemid",itemIds)
//   axios.get('http://localhost:4040/api/invoice/service/invoice/populateCost?poIdArray[]', {
//      params: {
//        itemId: itemIds
//      }
//    }).then((response) => {
//      const pricesData = response.data;
//      console.log("response", pricesData);
//        const updatedData=poData.map(item=>({
//     ...item,
//     price:pricesData.find(price=>price.itemId==item.itemId)?.price
//   })) 
//   console.log("update",updatedData)
//   setpoData(updatedData);
//     }).catch((error) => {
//       console.error('Failed to fetch prices', error);
//     });
//   };

console.log("po data",poData)



  const proceedButton = () => {
    // console.log("fil",newItemDetails)
    const pathCompute='/InvoiceDetails2'
    navigate(pathCompute,{ state: {id: {
      CoId:id?.poid,
       ids:selectedIds,
       OrderData:poData,
       store:id?.store
      // itemDetails:selectedItem
    }}});    
 }

    
  return (
    <form>
    <div>
       <HomeNav/>
       {/* <div className='title'>
          <div class='Back-button'>
                     {<FaArrowLeft className='PurchaseOrderMain-Ricons-Back'/>}
                     
                     <a onClick={() => navigate(-1)} class='PurchaseOrderMain-Back-a' style={{textDecoration:'none'}}>Back</a>
                     
                 </div>
         <text>Create Invoice</text>
         <div class='PurchaseOrderMain-notification'>
         <a href='/AlertInvoices' className='CreateInvBtn1'>Invoice Alert &nbsp; {<FaBell/>}</a>
         </div>
         
       </div> */}
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
        <div className="InvoiceTitle">
          <p>Create Invoice</p>
        </div>
        <div class='PurchaseOrderMain-notification'>
          <a href='/AlertASN' className='CreateInvBtn1'>ASN Alert &nbsp; {<FaBell />}</a>
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
               {/* <input  value={currentDate} type='text' onChange={handleChange} name='invoiceDate' id="date"></input>
               <input value="Standard" type='text' onChange={handleChange} name='invoiceType'></input>
               <input type='text' onChange={handleChange} name='invoiceStatus' value="New" disabled></input>
               <input type='text'onChange={handleChange}  name='Currency' value="INR" disabled ></input>
               <input value={totalamount.toFixed(2)} type='number' onChange={handleChange} name='invoiceTotalAmount' disabled></input>
               <input value={totalamount.toFixed(2)} type='number' onChange={handleChange} name='invoiceDueAmount' disabled></input>
               <input type='number' onChange={handleChange} name='nettedAmt' disabled></input>
               <input value={selectedIds.length} type='number' onChange={handleChange}  name='totalItemQty' disabled></input> */}
                <input  value={currentDate} type='text' name='invoiceDate' id="date"></input>
               <input value="Standard" type='text'  name='invoiceType'></input>
               <input type='text'  name='invoiceStatus' value="New" disabled></input>
               <input type='text' name='Currency' value="INR" disabled ></input>
               <input type='number'  name='invoiceTotalAmount' disabled></input>
               <input  type='number'  name='invoiceDueAmount' disabled></input>
               <input type='number' name='nettedAmt' disabled></input>
               <input value={selectedIds.length} type='number'   name='totalItemQty' disabled></input>
             </div>
           </div>
           <div className='mid-pane'>
             <div className='mid-container'>
                 <p>Selected PO(s) :</p>
                 <div className='TableWrapper'>
                   <table>
                    
                     {id?.poid?.map((individualExcelData, index) => (  
                      <tr>
                        <td>{individualExcelData}</td>
                      </tr>
                      ))}
                     
                   </table>
                 </div><br/>
                 <p>Delivery Address :</p>
                 <textarea  name='deliveryAddress' rows="5" cols="50"></textarea>
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
                 <div className='right-div'>Invoice Number : <input  name='invoiceNumber' disabled ></input></div>
                 <br/>
                 <div>
                     <p>Sender Address :</p>
                     <textarea  name='senderAddress' rows="3" cols="50" value={id?.store}></textarea>
                 </div>
                 <br/>
                 <div>
                     Payment Status : <input type="text" value="-"  name='paymentStatus' disabled></input>
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
                     <th>-</th>
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
                        <td> <input id={individualData?.itemId} value={individualData?.itemId} onChange={handleIdCheckboxChange}  type='checkbox' disabled={!isCostPopulated}></input></td>
                        <td>{individualData?.itemId}</td>
                        <td>{individualData?.poNum}</td>
                        <td>{individualData?.itemName}</td>
                        <td>{individualData?.orderedQty}</td>
                        <td><input onChange={handleIdCheckboxOnChange} type ="text" className='invQty' name={individualData?.itemId} 
                        disabled={!isCostPopulated} max={individualData?.orderedQty}/></td>
                        <td>{individualData?.price}</td>
                        <td>{isNaN(individualData?.invoiceqty * individualData?.price)?"-":individualData?.invoiceqty * individualData?.price}</td>
                        
                       {/* <td>{individualData?.invoiceqty * individualData?.price}</td> */}
                    </tr>
                      ))}
                     
                 </tbody>
             </table> 
            
           </div>
       </div>
       </div>
       {/* <a  className='nextBtn' onClick={additems}>Add Items</a><br/><br/><br/><br/> */}
       {/* {costButton && (<button className='ItemListing-Edit-btn' onClick={fetchPriceAndUpdateData}>Populate Cost</button>)} */}
{addItemButton && (<button className='ItemListing-Edit-btn' id="additem" onClick={proceedButton} disabled={valueexceed}>Add Items</button>)}
<a id="populateCost" className='nextBtn' onClick={fetchPriceAndUpdateData}>Populate Cost</a><br/><br/><br/><br/>
{/* <a className={'nextBtn ${isDisable ? 'disabled':''}'} style={{}} onClick={fetchPriceAndUpdateData}>Populate Cost</a><br/><br/><br/><br/> */}
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
 </form>
 )
};

export default InvoiceDetails;