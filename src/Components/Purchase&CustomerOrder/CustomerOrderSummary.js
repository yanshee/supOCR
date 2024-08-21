import React,{useState,useEffect} from 'react'
import logo from '../../images/KPMG-logo.jpg'
import '../../style/OrderSummary.css'
import HomeNav from '../Navbar/HomeNav'
import {FaUserAlt,FaInfoCircle, FaBell, FaEye,FaSearch, FaFilter, FaSort, FaFileExport, FaArrowAltCircleUp, FaArrowCircleDown, FaArrowCircleUp} from "react-icons/fa";
import { FaHome,FaArrowAltCircleLeft,FaAngleDoubleDown,FaArrowLeft} from "react-icons/fa";
import { useNavigate} from "react-router-dom";
import HomeButton from '../Buttons/HomeButton';
import axios from 'axios';
const cors = require('cors');

function CustomerOrderSummary({id}) {
    let navigate = useNavigate();
    const [currentData, setcurrentData] = useState(null);
    const [itemdetails, setitemdetails] = useState([]);
   const [newitemdetails, setnewitemdetails] = useState([]);
    const [isButtonVisible, setIsButtonVisible]=useState(false);
    const [isNext, setIsNext]=useState(false);
    const [filterdData, setFilterData] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    // const [selectedItem, setSelectedItem] = useState(null);
    const [expand,setexpand]=useState(true)
    // const [status,setStatus]=useState();

    const toggleExpanded=()=>{
      setexpand(!expand)
    }

    useEffect(() => {
      const itemdata = async () => {
        await axios
          .get(`http://localhost:5050/api/customerOrders/service/getCODetails?coId=${id}`)
          .then((res) => {
            setcurrentData(res.data)
            console.log("onpage", res.data)
            console.log("Response",(JSON.parse(res.data.itemDetails)))
          }).catch((err) => {
            console.log(err);
          })
      }
      itemdata()
    }, [])
    console.log("Hi there", currentData)

    useEffect(() => {
      if (currentData) {
        setitemdetails(JSON.parse(currentData.itemDetails));

      } else {
        setitemdetails(null); // Or any default value you want
      }
    }, [currentData,])
    console.log("data    ", itemdetails)
    // console.log("index", selectedIds)

    // useEffect(() => {
    //   //  setiteminfo(idSelected.completeData.itemdetails.filter(item => idSelected.ids.includes(item.itemId)))
    //   setnewitemdetails(itemdetails?.itemdetails?.filter(item =>(item.picklistFlag==='N')))
    //   }, [itemdetails])
    //   console.log("datanew", newitemdetails)

      useEffect(() => {
        if(currentData?.orderStatus==='Pending' ){
          setnewitemdetails(itemdetails?.itemdetails)
          setIsButtonVisible(true)
        }
      else if(currentData?.orderStatus==='Partially Processed'){
        setnewitemdetails(itemdetails?.itemdetails?.filter(item =>(item.acceptFlag==='Y' && (item.picklistFlag==='' || item.picklistFlag==='Y') )))
        setIsButtonVisible(false)
        setIsNext(true);
      }
      else if(currentData?.orderStatus==='Submitted' || currentData?.orderStatus==='Rejected' ){
        setnewitemdetails(itemdetails?.itemdetails)
      }
    else if(currentData?.orderStatus==='Fully Processed'){
      setnewitemdetails(itemdetails?.itemdetails)
    }}, [itemdetails])
        // console.log("dataapp", newitemdetails)

//       const renderCheckbox=(item)=>{
//      if(item.picklistFlag==='Y' && item.acceptFlag==='Y'){
//   return <input type='checkbox' disabled checked/>
// }
// else{
//   return <input type='checkbox' onClick={handleIdCheckboxChange}/>
// }
//       }

    //  const handleIdCheckboxChange = (e) => {
    //     const pathCompute='/COGeneratePicklist'
    //     setSelectedIds((prevSelectedId) => {
    //      if (prevSelectedId.includes(e.target.value)) {
    //        return prevSelectedId.filter((selectedIds) => selectedIds !== e.target.value);
    //      } else {
    //        return [...prevSelectedId, e.target.value];
    //      }        
    //    }); 
    //    setIsButtonVisible(true)       
    //  };
    //  console.log("d", filterdData)

    //   const handleIdCheckboxChange = (e) => {
    //     // const pathCompute='/COGeneratePicklist'
    //     setitemdetails((prevData) => {
         
    //        const newItemDetails=[...prevData]
    //        newItemDetails[e].isSelected=!newItemDetails[e].isSelected
    //        return newItemDetails;
    //      }        
    //     )
    //    setIsButtonVisible(true)       
    //  };
    //  console.log("d", filterdData)

  //   const handleIdCheckboxChange = (itemId) => {
  //     // const pathCompute='/COGeneratePicklist'
  //     setitemdetails(prevData=>{
  //       const newItemDetails=prevData.itemdetails.map(item=>{
  //         if(item.itemId==itemId){
  //           return {...item,picklistFlag:'Y'}
  //         }
  //         else{
  //           return {...item,picklistFlag:'N'}
  //         }
  //       })
  //       setIsButtonVisible(true) 
  //       return newItemDetails
  //     })      
  //  };

//   const handleIdCheckboxChange = (itemId) => {
//     // const pathCompute='/COGeneratePicklist'
//     alert("ItemID",itemId)
//     setitemdetails(prevData=>{
//       const newItemDetails=prevData.itemdetails.map((item)=>
//         // if(item.itemId==itemId){
//         //   return {...item,picklistFlag:'Y'}
//         // }
//     // return item;
//     item.itemId==itemId ? { ...item,picklistFlag:'Y' } : item
//       )
//       setIsButtonVisible(true) 
//        return {...prevData,item:newItemDetails}
//   })      
//  };

//  const handleIdCheckboxChange = (e) => {
//   setitemdetails((prevData)=>{
//   const newitemdetails = prevData.itemdetails.map((item) =>{
//       if(item.itemId === e.target.value){
//            return item.picklistFlag === 'N' ? {...item,picklistFlag:'Y'}:{...item,picklistFlag:'N'}
//           // return {...item,picklistFlag:item.picklistFlag==='N'?'Y':'N'}
//       }
//       return item;  
//   })
//   setIsButtonVisible(true);
//   setitemdetails(newitemdetails);
// })
// }

const handleIdCheckboxChange = (e) => {
  const newstatus=currentData?.orderStatus==='Pending'?'In-Progress':currentData?.orderStatus
  const newdata = itemdetails.itemdetails.map((item) =>{
    if(item.itemId === e.target.value){
      return {...item,acceptFlag:'Y'}
  } else {
    return item;
  }
})
console.log("Status",newstatus)
setIsButtonVisible(true);
setitemdetails({
  "itemdetails":newdata
});
const details={"itemdetails":newdata}
console.log("datatodb",details)
// setcurrentData({...currentData,itemDetails:JSON.stringify(itemdetails)})
console.log("REs",newdata)
console.log("ItemDataInside",itemdetails)
setcurrentData({...currentData,itemDetails:JSON.stringify(details),orderStatus:newstatus})
console.log("New",currentData)
}
console.log("ItemDataOutside",itemdetails)

const proceedButton=()=>{
    // console.log("api response",response.data)
    const pathCompute='/COGeneratePicklist'
    navigate(pathCompute,{ state: {idSelected: {
      completeData:itemdetails,
       ids:selectedIds,
       OrderData:currentData
      // itemDetails:selectedItem
    }}}); 
  
}
//   const proceedButton = () => {
//     // console.log("fil",newItemDetails)
//     const pathCompute='/COGeneratePicklist'
//     navigate(pathCompute,{ state: {idSelected: {
//       completeData:itemdetails,
//        ids:selectedIds,
//        OrderData:currentData
//       // itemDetails:selectedItem
//     }}});    
//  }
//  const updateSelectedItems = (field, value) => {
//   setitemdetails(prevProducts =>{
//      const newItemDetails= prevProducts.map(product =>{
//      if(product.isSelected){
//           return { ...product, [field]: value } 
//      }
//      return product;
//     });
//     return newItemDetails;
//   });
// };
// const handleUpdateclick=()=>{
//   updateSelectedItems('isActive',false)
// }

const rejectCO = () => {
  axios({
    method:'get',
    url:`http://localhost:5050/api/customerOrders/service/updateCOStatus?coId=${currentData?.coNumber}&coStatus=${'Rejected'}`,
}).then(response=>{
  // setresponseData(response.data)
  navigate('/CustomerOrderMain')
  console.log("response:"+JSON.stringify(response.data))}).catch(error=>{
    console.log("Error: "+error)
})

};

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
                     {<FaArrowLeft className='PurchaseOrderMain-Ricons-Back'/>}
                     <a href='/CustomerOrderMain' class='PurchaseOrderMain-Back-a' style={{textDecoration:'none',color:'black'}}>Back</a>
                     
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
                        <p>C.O. Summary</p>
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
                    {<FaAngleDoubleDown onClick={toggleExpanded} className='OrderSummary-Ricons-Uparraow' />}
     </div>
     

     {currentData ? ( 
  <div className="outer-wrapper">
 <div className="table-wrapper">
   <table className="table">

     <thead>
       <tr>
       <th></th>
         <th>Item Id</th>
         <th>Item Description</th>
         <th>Order Qty</th>
         {/* <th>Fulfillment Id</th> */}
         <th>EWay bill</th>
         <th>AWB No</th>
         <th>TPL</th>
         <th>Dispatch Location</th>
         {/* <th>Shipment Status</th> */}
       </tr>
     </thead>

     <tbody>
     {newitemdetails?.map((items, index) => (

         <tr>

          {/* <td><input type="checkbox"  value={items.itemId} onClick={handleIdCheckboxChange}/>{((items.picklistFlag==='Y') && (items.acceptFlag==='Y'))?(<div>Yes</div>):(<div>No</div>)} </td> */}
          <td>{((items.picklistFlag==='Y') && (items.acceptFlag==='Y') && currentData?.orderStatus!=='In-Progress' )?(<input type='checkbox' class='Picklisted' checked disabled/>):(<input type="checkbox"  value={items.itemId} onClick={handleIdCheckboxChange}/>)} </td>
           <td>{items.itemId}</td>
           <td>{items.itemDescription}</td>
           <td>{items.COQty}</td>
           {/* <td>{items.FullfillmentId}</td> */}
           <td>{items.ewayNo}</td>
           <td >{items.awbNo}</td>
           <td >{items.tplPartner}</td>
           <td >{items.dispatchLocation}</td>
           {/* <td>{items.shipmentStatus}</td> */}
           
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
 </div>)}

<div className='co-accept-reject-btn'>
{isButtonVisible && (<button className='ItemListing-Edit-btn' onClick={proceedButton}>Accept</button>)}
{isButtonVisible && (<button className='ItemListing-Edit-btn' onClick={rejectCO}>Reject</button>)}
</div>

{isNext && (<button className='ItemListing-Edit-btn' onClick={proceedButton}>Next</button>)}


</div>
  
  )
} 
 export default CustomerOrderSummary;