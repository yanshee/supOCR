import React,{useState,useEffect} from 'react'
import logo from '../../images/KPMG-logo.jpg'
import '../../style/OrderSummary.css'
import '../../style/Return.css'
import HomeNav from '../Navbar/HomeNav'
import HomeButton from '../Buttons/HomeButton'
import {FaUserAlt,FaInfoCircle, FaBell, FaEye,FaSearch, FaFilter, FaSort, FaFileExport, FaArrowAltCircleUp, FaArrowCircleDown, FaArrowCircleUp} from "react-icons/fa";
import { FaHome,FaArrowLeft,FaAngleDoubleDown} from "react-icons/fa";
import { useNavigate} from "react-router-dom";
import axios from 'axios';
import { findAllByPlaceholderText } from '@testing-library/react'
const cors = require('cors');

function COGenerateInvoice({id}) {
    let navigate = useNavigate();
    const [currentData, setcurrentData] = useState(null);
    const [price, setPrice]=useState(0);
    const [response,setresponse]=useState();
    const [gst, setgst]=useState(0);
    const [finalprice, setfinalprice]=useState(0);
    const [iteminfo, setiteminfo] = useState([]);
    const [itemselected,setitemselected]=useState([]);
    const [itemdetails,setitemdetails]=useState([]);
    const [totalQty, settotalQty] = useState();
    const [totalUniqItem, settotalUniqItem] = useState();
    const [isButtonVisible, setIsButtonVisible]=useState(false);
    const [isButtonVisible1, setIsButtonVisible1]=useState(false);
    const [tplPartner,settplPartner]=useState([]);
    const [selectedPartner,setSelectedPartner]=useState([]);
    const [showPrice,setShowPrice]=useState(false);
    const [selectedIds,setSelectedIds]=useState([]);
    const [newdata,setnewdata]=useState([]);
    const [expand,setexpand]=useState(false);
    const [Data,setData]=useState();
    const [updateData,setUpdateData]=useState([]);
    const [isPriceFetched,setIsPriceFetched]=useState(false);

    const toggleExpanded=()=>{
      setexpand(!expand)
    }

    useEffect(() => {
      //setiteminfo(idSelected.completeData.itemdetails.filter(item => idSelected.ids.includes(item.itemId)))
      setcurrentData(id.OrderData)
      // setiteminfo(idSelected.completeData.itemdetails.filter(item =>item.acceptFlag==='Y'))
     }, [id.OrderData])
     console.log("data", currentData)
     console.log("id",id)

     useEffect(() => {
      //setiteminfo(idSelected.completeData.itemdetails.filter(item => idSelected.ids.includes(item.itemId)))
      setiteminfo(id.itemdata)
      // setiteminfo(idSelected.completeData.itemdetails.filter(item =>item.acceptFlag==='Y'))
     }, [id.itemdata])


    useEffect(() => {
      //  setitemselected(id?.itemdata?.itemdetails?.filter(item =>(item.picklistFlag==='Y' && item.acceptFlag==='Y')))   
      setitemselected(id?.itemdata?.itemdetails?.filter(item => id.ids.includes(item.itemId)))  
       setitemdetails(itemselected)
     }, [iteminfo])
     console.log("data3", itemselected)

     useEffect(() => {
      setSelectedIds(id.ids)   
    }, [id.ids])
    console.log("ids", selectedIds)

    //  const fetchPriceAndUpdateData=async()=>{
    //   try{
    //     setShowPrice(true);
    //   setIsButtonVisible1(true) 
    //   const itemIds=itemselected.map(item=>item.itemId)
    //   console.log("itemid",itemIds)
    //   const response=await fetch(`http://localhost:5050/api/customerOrders/service/getItemPrice?itemId[]=${itemIds}`)
    //   const pricesData=await response.json();
    //   console.log("response",pricesData)
    //   const updatedData=itemselected.map(item=>({
    //     ...item,
    //     price:pricesData.find(price=>price.itemId==item.itemId)?.price
    //   }))    
    //   let sum=0;
    //   for(let i=0;i<updatedData.length;i++){
    //     sum=sum+Number(updatedData[i].price);
    //   }
    //   setPrice(sum)
    //   let totalqty=0;

    //   for(let i=0;i<updatedData.length;i++){
    //     totalqty=totalqty+Number(updatedData[i].COQty);
    //   }
    //   settotalUniqItem(updatedData.length)
    //   settotalQty(totalqty)
    
    //   setitemselected(updatedData);
    //   console.log("updated",updatedData)
    //   const gstPercentage=18;
    //   const gstAmount=(price*gstPercentage)/100
    //   const finalAmount=price+gstAmount
    //   setgst(gstAmount)
    //   setfinalprice(finalAmount)
    //   // setitemdetails(JSON.Stringify(`itemdetails:${itemselected}`))
    //   // setitemdetails(JSON.Stringify(itemselected))
    // }
    // catch(error){
    //   console.error('Failed to fetch prices',error)
    // }
    // // setIsPriceFetched(true);
    //  }
    //  console.log("QTY",totalQty)
    //  console.log("priceGlobal",finalprice)
    //  console.log("handleGen",response)
    //  console.log("total qty2",finalprice)

    //  const handleGeneratePrice=()=>{
    //   setShowPrice(true);
    //   fetchPriceAndUpdateData();
    //   setIsButtonVisible1(true)

    //  }


    const fetchPriceAndUpdateData = () => {
      setShowPrice(true)
      setIsPriceFetched(true)
      const itemIds = itemselected.map((item) => item.itemId);
      console.log("itemIds", itemIds);
      axios.get('http://localhost:5050/api/customerOrders/service/getItemPrice?itemId[]', {
        params: {
          itemId: itemIds
        }
      }).then((response) => {
        setIsButtonVisible1(true);
        const pricesData = response.data;
        console.log("response", pricesData);
        const updatedData = itemselected.map((item) => ({
          ...item,
          price: pricesData.find((price) => price.itemId === item.itemId)?.price || 0
        }));
        let sum = updatedData.reduce((acc, item) => acc + Number(item.price), 0);
        // let totalqty = updatedData.reduce((acc, item) => acc + parseInt(item.CoQty,10), 0);
        let total=0;
          for(let i=0;i<updatedData.length;i++){
        total=total+Number(updatedData[i].COQty);
      }
        const gstPercentage = 18;
        const gstAmount = (sum * gstPercentage) / 100;
        const finalAmount = sum + gstAmount;
        setPrice(sum);
        settotalQty(total);
        settotalUniqItem(updatedData.length);
        setitemselected(updatedData);
        setgst(gstAmount);
        setfinalprice(finalAmount);
      }).catch((error) => {
        console.error('Failed to fetch prices', error.response.data);
      });
    };
    console.log("totalUniqueItems",totalUniqItem);
    console.log("totalQty",totalQty);
    console.log("gst",gst);
    console.log("final Price",finalprice);

    // useEffect(() => {
    //   fetchPriceAndUpdateData();
    // }, []); // Run once on component mount
    // console.log("QTY", totalQty);
    // console.log("priceGlobal", finalprice);
    // console.log("GST", gst);
    // useEffect(() => {
    //   fetchPriceAndUpdateData();
    // }, []); // Run once on component mount
    // console.log("QTY", totalQty);
    // console.log("priceGlobal", finalprice);
  
   
    useEffect(()=>{
      fetch('http://localhost:5050/api/customerOrders/service/getTPLPartners')
      .then(response =>response.json())
      .then(data => settplPartner(data))
      .catch(error => console.error('Error fetching tpl partner:',error))
     },[]);
     console.log("tpl",tplPartner)

    const handleSelectionChange=(event)=>{
      setSelectedPartner(event.target.value);
      const newData = iteminfo?.itemdetails?.map((item) => {
        if((selectedIds)?.includes(item.itemId)){
          return {...item,tplPartner:event.target.value}
        } else {
          return {...item}
        }
       })
       console.log("before",iteminfo)
       setiteminfo(newData)
      console.log("after",iteminfo)
      console.log("update",newData)
      setIsButtonVisible(true);
      
     };


 
    const handleGenerateInvoice=(res)=>{
      // const gstPercentage=18;
      // const gstAmount=(price*gstPercentage)/100
      // const finalAmount=price+gstAmount
      // setgst(gstAmount)
      // setfinalprice(finalAmount)
      // console.log("priceGlobal",finalprice)
      // console.log("handleGen",response)
      const pathCompute='/COGenerateEWay'
      navigate(pathCompute,{ state: {id: {
      gst:gst,
      price:price,
      total:finalprice.toFixed(2),
      totaldata:currentData,
      itemSelected:iteminfo,
      ids:selectedIds,
      response:res   
    }}});
     }
    
     function generateInvoice(e) {
      e.preventDefault();
      axios({
          method: 'post',
          url: "http://localhost:5050/api/customerOrders/service/createInvoice",
          data: {
            "uniqueId": "string",
            "invoiceId": "string",
            "invoiceDate": "string",
            "invoiceType": "string",
            "currency": "string",
            "invoiceTotalAmount": finalprice.toFixed(2),
            "invoiceDueAmount": finalprice.toFixed(2),
            "nettedAmt": 0,
            "invoiceStatus": "string",
            "poNumber": currentData.coNumber,
            "invoiceOnHoldFlag": "string",
            "invoicePaymentStatus": "string",
            "invoiceDueDate": "string",
            "totalItemQty": totalQty,
            "totalUniqueItems": totalUniqItem,
            "attachments": "string",
            "deliveryAddress": currentData.shippingAddress,
            "senderAddress": "string",
            "created_datetime": "string",
            "customerId": "string",
            "itemDetails":"",
            "invoicedItems":JSON.stringify(itemdetails)
          }
          // data: itemselected
      })
          .then(function (response) {
              console.log("response.data", response.data);
              setresponse(response.data)
              handleGenerateInvoice(response.data);             
          })
          .catch(function (error) {
              console.log('error', error.response.data.message);
          });
  }
  console.log("item ",itemdetails)
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
                    <p>Customer Order</p>
                </div>
                <div class='PurchaseOrderMain-notification'>
         <a href='/AlertCO' className='CreateInvBtn1'>CO Alert &nbsp; {<FaBell/>}</a>
         </div>   
            </div>
    
        {/* <div class='PurchaseOrderMain-description'>
            <div class='PurchaseOrderMain-description-content'>
                 <div class='PurchaseOrderMain-component-Home'>
                     {<FaHome className='PurchaseOrderMain-Ricons-Home'/>}
                 </div> 
                 <div class='Back-button'>
                     {<FaArrowLeft className='PurchaseOrderMain-Ricons-Back' />}
                     <a href='/CustomerOrderSummary' class='PurchaseOrderMain-Back-a' style={{textDecoration:'none',color:'black'}}>Back</a>
                 </div>
                     
                
                 <div class='PurchaseOrderMain-component-heading'>
                     <p>Customer Orders</p>
                 </div>
    
                 <div class='PurchaseOrderMain-notification'>
                <div class='PurchaseOrderMain-notification-alerts'>
                     <a class='PurchaseOrderMain-notification-a' >CO Alerts</a>
                     {<FaBell className='PurchaseOrderMain-Ricons'/>}
                </div>
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

         <div class="item-co">
            <label class='item-fields-co'>Order Status: </label>
            <input className='COTextInput' value={id?.OrderData?.orderStatus}></input>
          </div>
         <div class='Po-summary'>
                        <p>CO Summary</p>
                        {/* {<div className='downarrow'><FaAngleDoubleDown className='OrderSummary-Ricons-Uparraow'/></div>} */}
                        {<FaAngleDoubleDown onClick={toggleExpanded} className='OrderSummary-Ricons-Uparraow' />}
           </div>             
{expand && (<div>
<div class='PO-wrapper'>
         <div class='left-wrapper'>
         <div class="item">
            <label class='item-fields'>Order Id: </label>
            <input className='RetailerReturnTextInput' value={currentData?.coNumber}></input>
          </div>
          <div class="item">
            <label class='item-fields'>Ordered Date: </label>
            <input className='RetailerReturnTextInput' value={currentData?.orderCreationDate}></input>
          </div> 
          <div class="item">
            <label class='item-fields'>Gift wrap: </label>
            <input className='RetailerReturnTextInput' value={currentData?.giftWrap}></input>
          </div>
          <div class="item">
            <label class='item-fields'>Gift Message: </label>
            <input className='RetailerReturnTextInput' value={currentData?.giftMessage}></input>
          </div>    
         </div>
 
         <div class='mid-wrapper'>       
             <div class="item">
            <label class='item-fields'>Customer Name: </label>
            <input className='RetailerReturnTextInput' value={currentData?.customerName}></input>
          </div>
          <div class="item">
            <label class='item-fields'>Customer Phone No.: </label>
            <input className='RetailerReturnTextInput' value={currentData?.customerMobNum}></input>
          </div>
          <div class="item">
            <label class='item-fields'>Delivery Type: </label>
            <input className='RetailerReturnTextInput' value={currentData?.deliveryType}></input>
          </div>             
         </div>
 
         <div class='right-wrapper'>           
             <div class="item">
            <label class='item-fields'>Order Status: </label>
            <input className='RetailerReturnTextInput' value={currentData?.orderStatus}></input>
          </div>
          <div class="item">
            <label class='item-fields'>Expected Delivery Date: </label>
            <input className='RetailerReturnTextInput' value={currentData?.expectedDelDate}></input>
          </div>
          <div class="item">
            <label class='item-fields'>Shipping Address: </label>
            <input className='RetailerReturnTextInput' value={currentData?.shippingAddress}></input>
          </div>
             
         </div>
     </div>

     <div class='Item-Details'>
                    <p>Item Details</p>
                    {/* {<FaArrowAltCircleUp className='OrderSummary-Ricons-Uparraow' />} */}
     </div>
     

     {currentData ? ( 
  <div className="outer-wrapper">
 <div className="table-wrapper">
   <table className="table">

     <thead>
       <tr>
       {/* <th></th> */}
         <th>Item Id</th>
         <th>Item Description</th>
         <th>Order Qty</th>
         <th>Fulfillment Id</th>
         <th>EWay bill</th>
         <th>AWB No</th>
         <th>TPL</th>
         <th>Dispatch Location</th>
         <th>Shipment Status</th>
       </tr>
     </thead>

     <tbody>
     {id?.itemdata?.itemdetails?.map((items, index) => (

         <tr>

          
          {/* <td>{((items.picklistFlag==='Y') && (items.acceptFlag==='Y'))?(<input type='checkbox' checked disabled/>):(<input type="checkbox"  value={items.itemId} onClick={handleIdCheckboxChange}/>)} </td> */}
           <td>{items.itemId}</td>
           <td>{items.itemDescription}</td>
           <td>{items.COQty}</td>
           <td>{items.FullfillmentId}</td>
           <td>{items.ewayNo}</td>
           <td >{items.awbNo}</td>
           <td >{items.tplPartner}</td>
           <td >{items.dispatchLocation}</td>
           <td>{items.shipmentStatus}</td>
           
         </tr>

       ))}

     </tbody>
   </table>

   <br />
  </div>
  </div>
 
) : (
 
  <div style={{
 
    border: "1px solid black",
    padding: "1em",
    margin: "1em",
    backgroundColor: "black",
    color: 'white',
    textAlign: 'center'
 
  }}>No data found</div>
 
)}
</div>
)}
                        
      

         <div class='Po-summary'>
                        <p>Logistic Details</p>
         </div>

         <div className="TplDispatch">
         Select Tpl Partner: 
         <div className="tpl">
         <select id="tplpartnerdropdown" value={selectedPartner} onChange={handleSelectionChange}>
            <option value="">TPL Partner</option>
            {tplPartner.map(partner =>(
              <option key={partner.partnerName} value={partner.partnerName}>{partner.partnerName}</option>
            ))}
            </select>  
         </div>

             <div className="dispatch">
          Dispatch Location: {itemselected[0]?.dispatchLocation}
         </div>    
           
         </div>

         {/* <div >
          Dispatch Location: {itemselected?.dispatchLocation}
         </div> */}

         
         {currentData ? ( 
   <div className="outer-wrapper">
 <div className="table-wrapper">
   <table className="table">

     <thead>
       <tr>
        
         <th>Item Id</th>
         <th>Item Description</th>
         <th>Order Qty</th>
         {/* <th>Fulfillment Id</th>
         <th>EWay bill</th>
         <th>AWB No</th> */}
         {/* <th>TPL</th>
         <th>Dispatch Location</th> */}
         {showPrice && (<th>Price</th>)}
         {showPrice && (<th>Total Price</th>)}
       </tr>
     </thead>

     <tbody>
     {itemselected?.map((items, index) => (
         <tr>
          {/* <td><input type='checkbox' ></input></td> */}
           <td>{items.itemId}</td>
           <td>{items.itemDescription}</td>
           <td>{items.COQty}</td>
           {/* <td>{items.fulfillmentId}</td>
           <td>{items.ewayBill}</td>
           <td >{items.awb}</td> */}
           {/* <td >{items.tpl}</td> */}
           {/* <td ><select value={selectedPartner} onChange={handleSelectionChange}>
            <option value="">Select TPL Partner</option>
            {tplPartner.map(partner =>(
              <option key={partner.partnerId} value={partner.partnerId}>{partner.partnerName}</option>
            ))}
            </select></td>      
           <td >{items.dispatchLocation}</td> */}
           {showPrice && (<td>{items.price}</td>)}
           {/* {isNaN(individualData?.invoiceqty * individualData?.price)?"-":individualData?.invoiceqty * individualData?.price}  */}
          {/* {showPrice && (<td>{items.COQty*items.price}</td>)}            */}
          {showPrice && (<td>{isNaN(items.COQty*items.price)?"-":items.COQty*items.price}</td>)}
         </tr>

       ))}

     </tbody>
   </table>
   

   <br />
  </div>
   </div>
 ): <div></div> }

<div className='co-accept-reject-btn'>
{/* {isButtonVisible && (<button className='ItemListing-Edit-btn' onClick={handleGeneratePrice}>Generate Price</button>)} */}
{isButtonVisible && (<button className='ItemListing-Edit-btn' onClick={fetchPriceAndUpdateData} disabled={isPriceFetched}>Generate Price</button>)}
{isButtonVisible1 && (<button className='ItemListing-Edit-btn' onClick={generateInvoice}>Create Invoice</button>)}
</div>


</div>
  
  )
} 
 export default COGenerateInvoice;