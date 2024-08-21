
import React,{useState,useEffect} from 'react'
import logo from '../../images/KPMG-logo.jpg'
import '../../style/OrderSummary.css'
import '../../style/Return.css'
import HomeNav from '../Navbar/HomeNav'
import HomeButton from '../Buttons/HomeButton'
import {FaUserAlt,FaInfoCircle, FaBell, FaEye,FaSearch, FaFilter, FaSort, FaFileExport, FaArrowAltCircleUp, FaArrowCircleDown, FaArrowCircleUp} from "react-icons/fa";
import { FaHome,FaArrowLeft,FaAngleDoubleDown,FaCalendarAlt,FaClock} from "react-icons/fa";
import { useNavigate} from "react-router-dom";
import DatePicker from 'react-datepicker'
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css"

const cors = require('cors');

function ASNViewSummary ({id}) {
    let navigate = useNavigate();
    const [currentData, setcurrentData] = useState(null);
    const [itemdetails, setitemdetails] = useState(null);
     const [itemdata,setitemdata]=useState([]);
    // const [isButtonVisible, setIsButtonVisible]=useState(false);
    const [awbNo,setawbNo]=useState();
    const [responseData, setresponseData] = useState(null);
    const [selectedIds,setSelectedIds]=useState([]);
    const [iteminfo,setiteminfo]=useState([]);
    const [expand,setexpand]=useState(true);
    const [expandinvoice,setexpandinvoice]=useState(true);
    const [expandeway,setexpandeway]=useState(true)
    const [showPicker,setShowPicker]=useState(false);
    const [showEndPicker,setShowEndPicker]=useState(false);
    const [selectedDate,setSelectedDate]=useState(new Date());
    const [selectedTime,setSelectedTime]=useState(new Date());

    console.log("id",id)
    const toggleExpanded=()=>{
      setexpand(!expand)
    }

    const toggleExpandedInvoice=()=>{
      setexpandinvoice(!expandinvoice)
    }

    const toggleEwayExpand=()=>{
        setexpandeway(!expandeway)
    }

     useEffect(() => {
      setcurrentData(id?.completeData?.completeData)
     }, [])
     console.log("curr", currentData?.asnId)

     function saveConatinerASN() {
        const itemdata = async () => {
          await axios
              // .post(`http://localhost:5050/api/customerOrders/service/saveIntermediateCO?itemDetails=${currentData.asnId}&coId=${currentData.asnStatus}`)
              .post("http://localhost:4040/api/asn/service/saveASN?",currentData,{
                params:{
                  asnId:currentData?.asnId,
                  asnStatus:"Submitted"
                }
              })
              .then((res) => {
              //  alert("ASN has been saved successfully") 
              navigate('/ASNMain')
              }).catch((err) => {
              console.log("err",err.response.data)  
              alert("unsuccessful")
              })
          }
          itemdata()
        }
        function dispatchASN() {
          const itemdata = async () => {
            await axios
                // .post(`http://localhost:5050/api/customerOrders/service/saveIntermediateCO?itemDetails=${currentData.asnId}&coId=${currentData.asnStatus}`)
                .post("http://localhost:4040/api/asn/service/saveASN?",currentData,{
                  params:{
                    asnId:currentData?.asnId,
                    asnStatus:"Ready to pickup"
                  }
                })
                .then((res) => {
              //   alert("ASN has been saved successfully") 
              navigate('/ASNMain')
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
                    <p>{id?.completeData?.asnId}</p>
                </div>
                <div class='PurchaseOrderMain-notification'>
         <a href='/AlertASN' className='CreateInvBtn1'>ASN Alert &nbsp; {<FaBell/>}</a>
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

        
         <div class='Po-summary'>
                        <p>Summary</p>
                        {<FaAngleDoubleDown onClick={toggleExpanded} className='OrderSummary-Ricons-Uparraow' />}
         </div>
         {expand && (<div>
{/* <div class='PO-wrapper'>
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
     </div> */}

     <div class='Item-Details'>
                    <p>Item Details</p>
                    {/* {<FaArrowAltCircleUp className='OrderSummary-Ricons-Uparraow' />} */}
     </div>
     

     {/* {currentData ? ( 
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
     {iteminfo?.map((items, index) => (

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
 
)} */}

                               

         {/* <div class='Po-summary'>
                        <p>Logistic Details</p>
         </div> */}
         <div class='Po-summary'>
                        <p>Delivery Note</p>
                        {<FaAngleDoubleDown onClick={toggleExpandedInvoice} className='OrderSummary-Ricons-Uparraow' />}
         </div>
         {expandinvoice && (<div>
            <div class="asn_detail_container">
          <div className="asn_detail">
              <span>Mode Of Transport</span>
              <p>
                <input
                  type="text"
                  value={currentData?.modeOfTransport}
                />
              </p>
              <span>Vehicle #</span>
              <p>
                <input
                  type="text"
                  value={currentData?.vehicleNo}
                />
              </p>
              <span>Transport Company</span>
              <p>
                <input
                  type="text"
                  value={currentData?.transportCompName
                  }
                />
              </p>
              <span>No. Of Containers</span>
              {/* <p className="summarydetail">##</p> */}
              <p>
                <input
                  type="text"
                  value={currentData?.containerCount}
                />
              </p>
              <span>Delivery Address:</span>
              {/* <p className="summarydetail">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
                tempora, omnis fugiat aut error ipsam.
              </p> */}
              <p>
                <input
                  type="text"
                  value={currentData?.delAddr}
                />
              </p>
            </div>
            <div className="asn_detail">
              <span>Driver Name</span>
              <p>
                <input
                  type="text"
                  value={currentData?.driverName}
                />
              </p>
              <span>Container weight (Consolidated)</span>
              <p>
                <input
                  type="text"
                  value={currentData?.consignmentWeight}
                />
              </p>
              <span>Driver License #</span>
              <p>
                <input
                  type="text"
                  value={currentData?.driverLicenseNo}
                />
              </p>
              <span>Consignment Cost (INR)</span>
              {/* <p className="summarydetail">## </p> */}
              <p>
                <input
                  type="text"
                  value={currentData?.consignmentCost}
                />
              </p>
              <span>Sender Address</span>
              {/* <p className="summarydetail">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Tempora non omnis similique laboriosam excepturi totam aliquam
                dolorum natus soluta iusto.
              </p> */}
              <p>
                <input
                  type="text"
                  value={currentData?.shippingAddr}
                />
              </p>
            </div>
            <div className="asn_detail">
              <span>Permit Level #</span>
              <p>
                <input
                  type="text"
                  value={currentData?.permitLevel}
                />
              </p>
              <span> Vehicle Engine No.</span>
              <p>
                <input
                  type="text"
                  value={currentData?.vehicleEngNo}
                />
              </p>
              <span>Chassis Number #</span>
              <p>
                <input
                  type="text"
                  value={currentData?.vehicleChassiesNo}
                />
              </p>
            </div>
         </div>
     </div>)}

     <div class='Po-summary'>
                        <p>EWay</p>
                        {<FaAngleDoubleDown onClick={toggleEwayExpand} className='OrderSummary-Ricons-Uparraow' />}
         </div>
         {expandeway && (<div>
         <div class="PO-wrapper">
         <div class="left-wrapper">
          <div class="item">
            <label class='item-fields'>EWay Bill: </label>
            <input className='RetailerReturnTextInput' value={currentData?.ewayNo}></input>
          </div>
        </div>
        <div class="mid-wrapper">
        <div class="item"></div>
        </div>

        <div class="right-wrapper">
        <div class="item"></div>
        </div>
         </div>
     </div>)}
    

<div class='Po-summary'>
                        <p>AWB</p>
                        {<FaAngleDoubleDown onClick={toggleEwayExpand} className='OrderSummary-Ricons-Uparraow' />}
         </div>
         {expandeway && (<div>
         <div class="PO-wrapper">
         <div class="left-wrapper">
          <div class="item">
            <label class='item-fields'>Total Cost(INR): </label>
            <input className='RetailerReturnTextInput' value={currentData?.consignmentCost}></input>
          </div>

          <div class="item-date">
            <label class='item-fields-date'>Preferred Pickup Date: </label>
            <input className='RetailerReturnTextInput-date' type="text" value={currentData?.preferredDelDate}></input>
          </div>

          <div class="item-date">
            <label class='item-fields-date'>Preferred Pickup Time:</label>
            <input className='RetailerReturnTextInput-date' type="text" value={currentData?.preferredDelTime}></input>
            {/* <DatePicker selected={selectedTime} onChange={TimeChange}  showTimeSelect showTimeSelectOnly timeIntervals={1} timeFormat="hh:mm:ss" customInput={<FaClock/>}/> */}
          </div>
        </div>

        <div class="mid-wrapper">
        <div class="item">
            <label class='item-fields'>AWB No:</label>
            <input className='RetailerReturnTextInput' value={currentData?.awbNo}></input>
          </div>
        </div>

        <div class="right-wrapper">
        <div class="item"></div>
        </div>
         </div>
     </div>)}

     </div>
)}
<br></br>
<div className="co-accept-reject-btn">
            <button className='CC-ConfirmBtn-submitdispatch' onClick={dispatchASN}>Submit & Dispatch</button>
            <button className='CC-ConfirmBtn-view' onClick={saveConatinerASN}>Submit</button>
        </div>

    
   

</div>
  
  )
} 

 export default ASNViewSummary;



















  