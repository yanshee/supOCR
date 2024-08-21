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
import $ from 'jquery';
const cors = require('cors');

function COGenerateAwb({id}) {
    let navigate = useNavigate();
    const [currentData, setcurrentData] = useState(null);
    const [itemdetails, setitemdetails] = useState(null);
    const [isButtonVisible, setIsButtonVisible]=useState(false);
    const [invoiceNo, setInvoiceNo]=useState(false);
    const [eWayNo,setEwayNo]=useState(false);
    const [itemdata,setitemdata]=useState([]);
    const [responseData,setresponseData]=useState(false);
    const [selectedIds,setSelectedIds]=useState([]);
    const [iteminfo,setiteminfo]=useState([])
    const [expand,setexpand]=useState(false);
    const [expandinvoice,setexpandinvoice]=useState(false);
    const [expandeway,setexpandeway]=useState(true);

    const toggleExpanded=()=>{
      setexpand(!expand)
    }
    const toggleExpandedInvoice=()=>{
      setexpandinvoice(!expandinvoice)
    }
    const toggleExpandedEway=()=>{
      setexpandeway(!expandeway)
    }

    console.log("id",id)

    useEffect(() => {
      setInvoiceNo(id.invoiceNo)
      // fetchUpdateData()
     }, [id.invoiceNo])
     console.log("invoiceNo", invoiceNo)
   

    useEffect(() => {
      setcurrentData(id.totaldata)
     }, [id.totaldata])
     console.log("data", currentData)

     useEffect(() => {
      setSelectedIds(id.ids)
     }, [id.ids])
     
     useEffect(() => {
      //setiteminfo(idSelected.completeData.itemdetails.filter(item => idSelected.ids.includes(item.itemId)))
      setiteminfo(id.itemSelected)
      // setiteminfo(idSelected.completeData.itemdetails.filter(item =>item.acceptFlag==='Y'))
     }, [id.itemSelected])
     console.log("iteminfo",iteminfo)
     


    // const fetchUpdateData = () => {
    //   axios({
    //     method:'get',
    //     url:`http://localhost:5050/api/customerOrders/service/generateAWB?invoiceList=${id?.invoiceNo}`,
    // }).then(response=>{
    //   setresponseData(response.data)
    //   return axios.get(`http://localhost:5050/api/customerOrders/service/updateCOStatus?coId=${id?.totaldata?.coNumber}&coStatus=${'Partially Processed'}`)
    //   console.log("EwayNo ",response.data)
    //   console.log("response:"+JSON.stringify(response.data))}).catch(error=>{
    //     console.log("Error: "+error)
    // })
    
    // };

    const fetchUpdateData = () => {
      axios({
        method:'get',
        url:`http://localhost:5050/api/customerOrders/service/generateAWB?invoiceList=${id?.invoiceNo}`,
    }).then(response=>{
      console.log("AWB",response.data)
      const newData = iteminfo?.map((item) => {
        if((selectedIds)?.includes(item.itemId)){
          return {...item,awbNo:response?.data}
        } else {
          return {...item}
        }
       })
       console.log("New",newData)
       setitemdata(newData)
       console.log("upda",itemdata)
       const pathCompute='/COAwbGenerationSuccess'
       navigate(pathCompute,{ state: {id: {
       awbNo:response.data,
       ewayNo:id.ewayNo,
       totaldata:currentData,
       invoiceNo:invoiceNo ,
        itemSelected:newData,
        ids:selectedIds,
        gst:id?.gst,
        price:id?.price,
        total:id?.total
     }}})
    })
      
    };
  
    // console.log("no",responseData)
    
            
    //     const generateAwbButton=() =>{ 
    //        //fetchUpdateData();
    //       const pathCompute='/COAwbGenerationSuccess'
    //       navigate(pathCompute,{ state: {id: {
    //       totaldata:currentData,
    //       response:responseData
          
          
    //     }}})
    //   } 

    const details={"itemdetails":id.itemSelected}
     console.log("data to db",details)


function saveItemDetails() {
  $("#overlay").fadeIn('slow');
    const itemdata = async () => {
      await axios
          .get(`http://localhost:5050/api/customerOrders/service/saveIntermediateCO?coId=${currentData.coNumber}&itemDetails=${JSON.stringify(details)}`)
          .then((res) => {
            $("#overlay").fadeOut('slow');
          //   console.log("onpage",res.data)
          }).catch((err) => {
          //   
          alert("unsuccessful")
          })
    }
      itemdata()
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
            </div>
            <div class='PurchaseOrderMain-searchbar'>
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
            <input className='COTextInput' value={id?.totaldata?.orderStatus}></input>
          </div>
         <div class='Po-summary'>
                        <p>CO Summary</p>
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
     {iteminfo?.map((items, index) => (

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
                        <p>Invoice Details</p>
                        {<FaAngleDoubleDown  onClick={toggleExpandedInvoice} className='OrderSummary-Ricons-Uparraow' />}
         </div>
         {expandinvoice && (<div>
         <div class="PO-wrapper">
         <div class="left-wrapper">
          <div class="item">
            <label class='item-fields'>Invoice 1#: </label>
            <input className='RetailerReturnTextInput' value={invoiceNo}></input>
          </div>
        </div>

        <div class="mid-wrapper">
          <div class="item">
            <label class='item-fields'>Invoice SubTotal:</label>
            <input className='RetailerReturnTextInput' value={id?.price}></input>
          </div>

          <div class="item">
            <label class='item-fields'>Tax:</label>
            <input className='RetailerReturnTextInput' value={id?.gst}></input>
          </div>

          <div class="item">
            <label class='item-fields'>Total:</label>
            <input className='RetailerReturnTextInput' value={id?.total}></input>
          </div>       
        </div>

        <div class="right-wrapper">
        {id?.total>50000 ?( <div class="item">
          <label class='item-fields'>EWay Required: </label>
            <input className='RetailerReturnTextInput' value="Yes"></input>
            {/* <p>Yes</p> */}
          </div>):(<div><input className='RetailerReturnTextInput' value="No"></input></div>)
} 
        
        </div>
         </div>
     </div>)}

         <div class='Po-summary'>
                        <p>EWay Bill</p>
                        {<FaAngleDoubleDown onClick={toggleExpandedEway} className='OrderSummary-Ricons-Uparraow' />}
         </div>
     
     
{expandeway && (<div>
         <div class="PO-wrapper">
         <div class="left-wrapper-eway">
          <div class="item-eway">
            <label class='item-fields'>EWay #: </label>
            <input className='RetailerReturnTextInput' value={id?.ewayNo}></input>
          </div>
   <br />
  </div>
  </div>
  </div>)}
 
<div className='co-accept-reject-btn'>
<button className='ItemListing-Edit-btn' onClick={saveItemDetails}>Save</button>
<button className='ItemListing-Edit-btn' onClick={fetchUpdateData}>Generate Awb</button>
</div>
 

</div>
  
  )
} 
 export default COGenerateAwb;