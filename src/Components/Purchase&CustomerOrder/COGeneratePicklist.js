import React,{useState,useEffect} from 'react'
import logo from '../../images/KPMG-logo.jpg'
import '../../style/OrderSummary.css'
import '../../style/Return.css'
import HomeNav from '../Navbar/HomeNav'
import {FaUserAlt,FaInfoCircle, FaBell, FaEye,FaSearch, FaFilter, FaSort, FaFileExport, FaArrowAltCircleUp, FaArrowCircleDown, FaArrowCircleUp} from "react-icons/fa";
import { FaHome,FaArrowAltCircleLeft,FaAngleDoubleDown,FaArrowLeft} from "react-icons/fa";
import { useNavigate} from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HomeButton from '../Buttons/HomeButton'
import Modal from '@mui/material/Modal';
import axios from 'axios';
import $ from 'jquery';
const cors = require('cors');


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 250,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function COGeneratePicklist({idSelected}) {
    let navigate = useNavigate();
    const [currentData, setcurrentData] = useState(null);
    const [iteminfo, setiteminfo] = useState([]);
    const [itemdetails, setitemdetails] = useState([]);
    const [isButtonVisible, setIsButtonVisible]=useState(false);
     const [selectedIds, setSelectedIds] = useState([]);
     const [itemdet, setitemdet] = useState([]);
    // const [open, setOpen] = useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);
    const [expand,setexpand]=useState(true)

    const toggleExpanded=()=>{
      setexpand(!expand)
    }

      console.log("Onload", idSelected)

    // useEffect(() => {
    // //  setiteminfo(idSelected.completeData.itemdetails.filter(item => idSelected.ids.includes(item.itemId)))
    // setiteminfo(idSelected.completeData.itemdetails.filter(item =>(item.picklistFlag==='' && item.acceptFlag==='Y')))
    // }, [idSelected.completeData])
    // console.log("data", iteminfo)
    
    useEffect(() => {
      setitemdet(idSelected.completeData.itemdetails.filter(item =>(item.picklistFlag==='' && item.acceptFlag==='Y')))
     }, [idSelected.completeData])
     console.log("data2", itemdetails)

    useEffect(() => {
       const newData = idSelected.completeData.itemdetails.map((item) => {
        if(selectedIds?.includes(item.itemId)){
          return {...item,picklistFlag:"Y"}
        } else {
          return {...item}
        }
       })

       console.log("New Data1",newData)
      setitemdetails(newData)
    },[selectedIds])
 
    console.log("NNN",itemdetails)
    useEffect(() => {
      setcurrentData(idSelected.OrderData)
     }, [idSelected.OrderData])
     console.log("OrderStatus", currentData)


  //   const handleIdCheckboxChange = (e) => {
  //     const pathCompute='/COGenerateInvoice'
  //     setSelectedIds((prevSelectedId) => {
  //      if (prevSelectedId.includes(e.target.value)) {
  //        return prevSelectedId.filter((selectedIds) => selectedIds !== e.target.value);
  //      } else {
  //        return [...prevSelectedId, e.target.value];
  //      }        
  //    }); 
  //    setIsButtonVisible(true)      
  //  };

  // const handleIdCheckboxChange = (e) => {
  //   const newdata = iteminfo.map((item) =>{
  //     if(item.itemId === e.target.value){
  //         return item.acceptFlag === 'N' ? {...item,acceptFlag:'Y'}:{...item,acceptFlag:'N'} 
  //     } else {
  //       return item.acceptFlag === 'N' ? {...item,acceptFlag:'Y'}:{...item,acceptFlag:'N'}
  //     }})
  // setitemdetails(newdata);
  // }
  // console.log("N", itemdetails)

     const handleIdCheckboxChange = (e) => {
           setSelectedIds((prevSelectedId) => {
         if (prevSelectedId.includes(e.target.value)) {
           return prevSelectedId.filter((selectedIds) => selectedIds !== e.target.value);
         } else {
           return [...prevSelectedId, e.target.value];
         }        
       }); 
       setIsButtonVisible(true)       
     };
     console.log("ids",selectedIds)
    
     const details={"itemdetails":itemdetails}
   const proceedButton = () => {
    //  console.log("fil",details)
    
    const pathCompute='/COPicklistSuccess'
    navigate(pathCompute,{ state: {id: {
      // completeData:idSelected.itemdetails,
      ids:selectedIds,
      itemdata:details,
      //  orderData:currentData
       OrderData:currentData
      // itemDetails:selectedItem
    }}});   
 }
 

 function saveItemDetails() {
  $("#overlay").fadeIn('slow');
  const itemdata = async () => {
    await axios
        .get(`http://localhost:5050/api/customerOrders/service/saveIntermediateCO?itemDetails=${JSON.stringify(details)}&coId=${idSelected?.OrderData?.coNumber}`)
        .then((res) => {
          console.log("detail",details)
          $("#overlay").fadeOut('slow');
        //   console.log("onpage",res.data)
        // return axios.get(`http://localhost:5050/api/customerOrders/service/updateCOStatus?coId=${idSelected?.OrderData?.coNumber}&coStatus=${'In-progress'}`)
        // }).then(response=>{
        //   console.log("status",response.data)
        //  const newData=(currentData,currentData.orderStatus='in-progress')
        //  setcurrentData(prevData=>({...prevData,orderStatus:'In-progress'}))
          
        })
        .catch((err) => {  
        alert("unsuccessful")
        })
    }
  // return axios.get(`http://localhost:5050/api/customerOrders/service/updateCOStatus?coId=${idSelected?.completeData?.coNumber}&coStatus=${"In-progress"}`)
      
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
                        <p>Order Acceptance</p>
         </div>
         <div class="item-co">
            <label class='item-fields-co'>Order Status: </label>
            <input className='COTextInput' value={idSelected?.OrderData.orderStatus}></input>
          </div>
         
<div className='CO-piclist-wrapper'>
<label class='item-fields-accepted-info'>Accepted Item Info: </label>
<div class='Item-Details'>
                    <p>Item Details</p>
                    {<FaAngleDoubleDown onClick={toggleExpanded} className='OrderSummary-Ricons-Uparraow' />}
     </div>
</div>
     
     {expand && (<div>
  <div className="outer-wrapper">
 <div className="table-wrapper">
   <table className="table">

     <thead>
       <tr>
        <th></th>
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
     {/* {iteminfo.map((items, index) => ( */}
     {itemdet.map((items, index) => (
         <tr>
          <td><input type="checkbox"  value={items.itemId} onClick={handleIdCheckboxChange}/></td>
           <td>{items.itemId}</td>
           <td>{items.itemDescription}</td>
           <td>{items.orderQty}</td>
           <td>{items.fulfillmentId}</td>
           <td>{items.ewayBill}</td>
           <td >{items.awb}</td>
           <td >{items.tpl}</td>
           <td >{items.dispatchLocation}</td>
           <td>{items.shipmentStatus}</td>
           
         </tr>

       ))}

     </tbody>
   </table>

   <br />
  </div>
  </div>
 </div>)}

 
  
 

  {isButtonVisible && (<div className="co-accept-reject-btn">
  <button className='ItemListing-Edit-btn' onClick={saveItemDetails}>Save</button>
<button className='ItemListing-Edit-btn' onClick={proceedButton}>Create Picklist</button>
</div>
)}

{/* {isButtonVisible && (<button className='ItemListing-Edit-btn' onClick={handleOpen}>Generate Picklist</button>)}
<Modal open ={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Picklist has been generated successfully
          </Typography>
          <div class='confirm-button-div'>
          <Button class='Confirmation-button' onClick={proceedButton}>Continue</Button>
          </div>
          
        </Box>
      </Modal> */}
</div>
  
  )
} 
 export default COGeneratePicklist;

