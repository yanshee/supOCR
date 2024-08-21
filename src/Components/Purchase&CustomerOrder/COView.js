import React,{useState,useEffect} from 'react'
import logo from '../../images/KPMG-logo.jpg'
import '../../style/OrderSummary.css'
import '../../style/CostChangeConfirm.css'
import HomeNav from '../Navbar/HomeNav'
import HomeButton from '../Buttons/HomeButton'
import {FaUserAlt,FaInfoCircle, FaBell, FaEye,FaSearch, FaFilter, FaSort, FaFileExport,FaArrowLeft, FaArrowAltCircleUp, FaArrowCircleDown, FaArrowCircleUp} from "react-icons/fa";
import { FaHome,FaArrowAltCircleLeft} from "react-icons/fa";
import { useNavigate} from "react-router-dom";
import axios from 'axios';
const cors = require('cors');

function COView({id}) {
    let navigate = useNavigate();
    const [currentData, setcurrentData] = useState(null);
    const [itemdetails, setitemdetails] = useState([]);
   const [newitemdetails, setnewitemdetails] = useState([]);
    const [isButtonVisible, setIsButtonVisible]=useState(false);
    const [filterdData, setFilterData] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    // const [selectedItem, setSelectedItem] = useState(null);

    // useEffect(() => {
    //   const itemdata = async () => {
    //     await axios
    //       .get(`http://localhost:5050/api/customerOrders/service/getCODetails?coId=${id}`)
    //       .then((res) => {
    //         setcurrentData(res.data)
    //         console.log("onpage", res.data)
    //         console.log("Response",(JSON.parse(res.data.itemDetails)))
    //       }).catch((err) => {
    //         console.log(err);
    //       })
    //   }
    //   itemdata()
    // }, [])
    console.log("Hi there", id)
    // console.log("EWay", id?.resp?.ewayNo)

    // useEffect(() => {
    //   if (currentData) {
    //     setitemdetails(JSON.parse(currentData.itemDetails));

    //   } else {
    //     setitemdetails(null); // Or any default value you want
    //   }
    // }, [currentData,])
    // console.log("data    ", itemdetails)
    // console.log("index", selectedIds)

    useEffect(() => {
      //  setiteminfo(idSelected.completeData.itemdetails.filter(item => idSelected.ids.includes(item.itemId)))
      setcurrentData(id?.resp?.totaldata)
      }, [id?.resp?.totaldata,currentData?.coNumber])
      console.log("datanew", currentData)

    //   useEffect(() => {
    //     //  setiteminfo(idSelected.completeData.itemdetails.filter(item => idSelected.ids.includes(item.itemId)))
    //     setitemdetails(currentData?.itemDetails)
    //     }, [currentData?.itemDetails])
        // console.log("item", itemdetails)

        useEffect(() => {
           setitemdetails(id?.resp?.itemSelected)
          }, [id?.resp?.itemSelected])
          console.log("data    ", itemdetails)

        //   useEffect(()=>{
        //     setnewitemdetails(id?.resp?.itemSelected.filter(item => id.ids.includes(item.itemId)))
        // }, [id?.resp?.itemSelected])
        //   console.log("iteminfo",id?.resp?.itemSelected)

        useEffect(()=>{
            setnewitemdetails(itemdetails?.filter(item=>id.resp.ids.includes(item.itemId)))
        },[itemdetails])
        console.log("iteminfo",newitemdetails)

        const submitCO = () => {
            axios({
              method:'get',
              url:`http://localhost:5050/api/customerOrders/service/updateCOStatus?coId=${currentData?.coNumber}&coStatus=${'Submitted'}`,
          }).then(response=>{
          //   setresponseData(response.data)
            navigate('/CustomerOrderMain')
            console.log("response:"+JSON.stringify(response.data))}).catch(error=>{
              console.log("Error: "+error)
          })         
          };

          

        const details={"itemdetails":itemdetails}
       console.log("data to db",details)  

       const areAllItemsFullyProcessed=(details)=>{
        // return details.every(item=> item.acceptFlag==='Y' && item.picklistFlag==='Y')
        const allAcceptedItems=details.filter(item =>(item.acceptFlag==='Y'))
        return allAcceptedItems.every(item=> item.picklistFlag==='Y')
    }
    
        const updateOrderStatus=(currentData)=>{
            if(!currentData) return;
    
            const isFullyProcessed=areAllItemsFullyProcessed(details?.itemdetails);
            const newOrderStatus=isFullyProcessed?'Fully Processed':'Partially Processed';
            const coNum=currentData.coNumber
            console.log("COnum",coNum)
            const url=`http://localhost:5050/api/customerOrders/service/updateCOStatus?coId=${id?.resp?.totaldata?.coNumber}&coStatus=${newOrderStatus}`
            console.log("URL",url)
            axios({
                method:'get',
                url:url,
            }).then(response=>{
              // setresponseData(response.data)
              navigate('/CustomerOrderMain')
              console.log("response:"+JSON.stringify(response.data))}).catch(error=>{
                console.log("Error: "+error.response.data)
            })
            
        }
      
          // const dispatchCO = () => {
          //     axios({
          //       method:'get',
          //       url:`http://localhost:5050/api/customerOrders/service/updateCOStatus?coId=${id?.totaldata?.coNumber}&coStatus=${'Partially Processed'}`,
          //   }).then(response=>{
          //     // setresponseData(response.data)
          //     navigate('/CustomerOrderMain')
          //     console.log("response:"+JSON.stringify(response.data))}).catch(error=>{
          //       console.log("Error: "+error)
          //   })
            
          //   };


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
                     {<FaArrowAltCircleLeft className='PurchaseOrderMain-Ricons-Back' />}
                     <a class='PurchaseOrderMain-Back-a'>Back</a>
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
         <div class='Po-summary'>
                        <p>C.O. Summary</p>
         </div>
         
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
             {/* <div class='item'>
             <p>Customer Name :{currentData?.customerName}</p>
             </div>
             <div class='item'>
             <p>Customer Phone No. :{currentData?.customerMobNum}</p>
             </div> 
             <div class='item'>
             <p>Delivery Type :{currentData?.deliveryType}</p>
             </div> */}
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
             {/* <div class='item'>
             <p>Order Status :{currentData?.orderStatus}</p>
             </div>
             <div class='item'>
             <p>expected Delivery Date :{currentData?.expectedDelDate}</p>
             </div> 
             <div class='item'>
             <p>shipping Address :{currentData?.shippingAddress}</p>
             </div>    */}
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
                    {<FaArrowAltCircleUp className='OrderSummary-Ricons-Uparraow' />}
     </div>
     

     {currentData ? ( 
  <div className="outer-wrapper">
 <div className="table-wrapper">
   <table className="table">

     <thead>
       <tr>
       
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
     {newitemdetails?.map((items, index) => (

         <tr>
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

<div class="PO-wrapper">
         <div class="left-wrapper">
          <div class="item">
            <label class='item-fields'>Selected Tpl: </label>
            <input className='RetailerReturnTextInput' value={newitemdetails[0]?.tplPartner}></input>
          </div>
          <div class="item">
            <label class='item-fields'>Dispatch Location: </label>
            <input className='RetailerReturnTextInput' value={newitemdetails[0]?.dispatchLocation}></input>
          </div>
          
        </div>

        <div class="mid-wrapper">
        <div class="item">
            <label class='item-fields'>Invoice No:</label>
            <input className='RetailerReturnTextInput' value={id?.resp?.invoiceNo}></input>
          </div>
          <div class="item">
            <label class='item-fields'>EWay No:</label>
            <input className='RetailerReturnTextInput' value={id?.resp?.ewayNo}></input>
          </div>
          <div class="item">
            <label class='item-fields'>Awb No:</label>
            <input className='RetailerReturnTextInput' value={id?.resp?.awbNo}></input>
          </div>
          
        </div>

        <div class="right-wrapper">
        <div class="item">
            <label class='item-fields'>Invoice SubTotal:</label>
            <input className='RetailerReturnTextInput' value={id?.resp?.price}></input>
          </div>

          <div class="item">
            <label class='item-fields'>Tax:</label>
            <input className='RetailerReturnTextInput' value={id?.resp?.gst}></input>
          </div>

          <div class="item">
            <label class='item-fields'>Total:</label>
            <input className='RetailerReturnTextInput' value={id?.resp?.total}></input>
          </div>       
        
        </div>
         </div>
     




         <div className='co-accept-reject-btn'>
<button className='CC-ConfirmBtn-view' onClick={submitCO}>Submit</button>
<button className='CC-ConfirmBtn-submitdispatch' onClick={updateOrderStatus}>Submit & Dispatch</button>
</div>



</div>
  
  )
} 
 export default COView;