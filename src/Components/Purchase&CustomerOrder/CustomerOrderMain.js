import React, { useState,useEffect } from 'react'
import logo from '../../images/KPMG-logo.jpg'
import '../../style/PurchaseOrderMain.css'
import {FaUserAlt,FaInfoCircle, FaBell, FaSearch, FaDownload, FaFilter, FaSort, FaEye} from "react-icons/fa";
import { FaHome} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import HomeButton from '../Buttons/HomeButton';
import SortButton from '../Buttons/SortButton';
import axios from 'axios';
import HomeNav from '../Navbar/HomeNav'
import OrderSummary from './OrderSummary';
import {Button} from '@mui/material';
const cors = require('cors');



const CustomerOrderMain=()=>{

    let navigate = useNavigate();
    const [currentData, setcurrentData] = useState(null);
    const [isButtonVisible1,setIsButtonVisible1]=useState(false)
    const [isButtonVisible2,setIsButtonVisible2]=useState(false)
    const [selectedcoNumber,setcoNumber]=useState();
    const [itemdetails,setitemdetails]=useState(null);
    const [newitemdetails,setnewitemdetails]=useState([]);
    const [isChecked,setIsChecked]=useState(false)
    useEffect(() => {
        const itemdata = async () => {
                 await axios
        .get("http://localhost:5050/api/customerOrders/service/getCOListingData")
        .then((res) => {
            setcurrentData(res.data)
           console.log(currentData)
        }).catch((err) => {
           console.log(err);
    })
        }
        itemdata()
     },[])
console.log("current",currentData)

// useEffect(() => {
//   const itemdata = async () => {
//     await axios
//       .get(`http://localhost:5050/api/customerOrders/service/getCODetails?coId=${selectedcoNumber}`)
//       .then((res) => {
//         setnewitemdetails(res.data)
//         console.log("onpage", res.data)
//         console.log("Response",(JSON.parse(res.data.itemDetails)))
//       }).catch((err) => {
//         console.log(err);
//       })
//   }
//   itemdata()
// }, [])
// console.log("item",newitemdetails)

// const navigatebasedonStatus=(coNumber)=>{
//   const selectedItem=currentData.find(item=>item.coNumber===coNumber);

//       if(selectedItem.orderStatus==='Partially Processed'){
//         console.log("Yes")
//    return '/COGeneratePicklist'
//       }
//       else {
//         console.log("No")
//    return '/CustomerOrderSummary'
//       }
// }

    function tdclick(event){
      const pathCompute='/CustomerOrderSummary'
       const id=event.target.value;
       // let pathCompute
      //  const order=currentData.find(item=>item.coNumber===event.target.value)
      //  if(order){
      //   if(order.orderStatus==='Partially Processed'){
      //     console.log('Yes')
      //    pathCompute='/COGeneratePicklist'
      //   }
      //   else{
      //     console.log('No')
      //     pathCompute='/CustomerOrderSummary'
      //   }
      //  }
        // alert(id);
        navigate(pathCompute,{ state: {id: id}});
    };

    const handleIdCheckboxChange1 = (coNumber) => {
      setIsChecked(prev=>!prev)
     setcoNumber(coNumber);
     console.log("item 1",itemdetails)
      const selectedItem=currentData.find(item=>item.coNumber===coNumber);

      if(selectedItem.orderStatus==='In-progress'){
        setIsButtonVisible1(true);
      }
      else if(selectedItem.orderStatus==='Submitted'){
        setIsButtonVisible2(true);
      }
         axios
      .get(`http://localhost:5050/api/customerOrders/service/getCODetails?coId=${coNumber}`)
      .then((res) => {
        setnewitemdetails(res.data)
       // console.log("onpage", res.data)
        console.log("Response",(JSON.parse(res.data.itemDetails)))
        setitemdetails((JSON.parse(res.data.itemDetails)));
        
      }).catch((err) => {
        console.log(err);
      })    
     // setitemdetails(JSON.parse(newitemdetails?.itemDetails));
};


// useEffect(() => {
//   if (newitemdetails) {
//     setitemdetails(JSON.parse(newitemdetails?.itemDetails));
//   } else {
//     setitemdetails(null); // Or any default value you want
//   }
// }, [newitemdetails])
console.log("itemdetails1", itemdetails);

const submitCO = () => {
  axios({
    method:'get',
    url:`http://localhost:5050/api/customerOrders/service/updateCOStatus?coId=${selectedcoNumber}&coStatus=${'Submitted'}`,
}).then(response=>{
//   setresponseData(response.data)
  // navigate('/CustomerOrderMain')
  console.log("response:"+JSON.stringify(response.data))}).catch(error=>{
    console.log("Error: "+error)
})

};

// const dispatchCO = () => {
//   axios({
//     method:'get',
//     url:`http://localhost:5050/api/customerOrders/service/updateCOStatus?coId=${selectedcoNumber}&coStatus=${'Partially Processed'}`,
// }).then(response=>{
//   // setresponseData(response.data)
//   navigate('/CustomerOrderMain')
//   console.log("response:"+JSON.stringify(response.data))}).catch(error=>{
//     console.log("Error: "+error)
// })
// };

// const details={"itemdetails":newitemdetails}
// console.log("data to db",details)  

const areAllItemsFullyProcessed=(itemdetails)=>{
  // return itemdetails.every(item=> item.acceptFlag==='Y' && item.picklistFlag==='Y')
  const allAcceptedItems=itemdetails.filter(item =>(item.acceptFlag==='Y'))
        return allAcceptedItems.every(item=> item.picklistFlag==='Y')
}

 const updateOrderStatus=(currentData)=>{
     if(!currentData) return;

     const isFullyProcessed=areAllItemsFullyProcessed(itemdetails?.itemdetails);
     const newOrderStatus=isFullyProcessed?'Fully Processed':'Partially Processed';
     const url=`http://localhost:5050/api/customerOrders/service/updateCOStatus?coId=${selectedcoNumber}&coStatus=${newOrderStatus}`
     console.log("URL",url)
     axios({
         method:'get',
         url:url,
     }).then(response=>{
       // setresponseData(response.data)
       window.location = "/CustomerOrderMain";
       console.log("response:"+JSON.stringify(response.data))}).catch(error=>{
         console.log("Error: "+error.response.data)
     })   
 }

 const handleSort=(sortParameter)=>{
    
  let sortedData=[...currentData]
  if(sortParameter==="orderCreationDate"){
    sortedData.sort((a,b)=>new Date(a.orderCreationDate)-new Date(b.orderCreationDate));
  }
  else if(sortParameter==="expectedDelDate"){
    sortedData.sort((a,b)=>new Date(a.expectedDelDate)-new Date(b.expectedDelDate));
  }
  setcurrentData(sortedData)
  console.log("Sort",sortedData)
}
const sortOptions=[
  {value:'orderedDate', label:'orderedDate'},{value:'expected delivery date', label:'expected delivery date'}
  // ,{value:'asnStatus',label:'asnStatus'}
];

const filterOptions=[
  {value:'asnCreationDate', label:'asnCreationDate'},{value:'asnStatus',label:'asnStatus'},{value:'asnId',label:'asnId'}
]


return (
 
    <div class='PurchaseOrderMain-container'>
        <div>
            <HomeNav/>
        </div>
 
    {/* <div class='PurchaseOrderMain-description'>
        <div class='PurchaseOrderMain-description-content'>
             <div class='PurchaseOrderMain-component-Home'>
                 {<FaHome className='PurchaseOrderMain-Ricons-Home'/>}
             </div>
             <div class='PurchaseOrderMain-component-heading'>
                 <p>Customer Orders</p>
            </div>
            <div class='PurchaseOrderMain-notification'>
                <div class='PurchaseOrderMain-notification-alerts'>
                     <a href='/AlertCO' class='PurchaseOrderMain-notification-a' >CO Alerts</a>
                     {<FaBell className='PurchaseOrderMain-Ricons'/>}
                </div>
             </div>      
        </div> */}
     {/* <div class='PurchaseOrderMain-searchbar'>
        <div class='PurchaseOrderMain-searchbar-container'>
                <input class="PurchaseOrderMain-input" placeholder="Search here"/>
                {<FaSearch className='PurchaseOrderMain-Ricons-search'/>}
        </div>
    </div> */}
        {/* <div class='PurchaseOrderMain-Operations'>
                <div class='PurchaseOrderMain-Download'>
                    <a class='PurchaseOrderMain-Operations-content-a'>Download</a>
                    {<FaDownload className='PurchaseOrderMain-Ricons-down'/>}
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
     <div class='Invoices-heading'>
                <HomeButton/>
                <div className='InvoiceTitle'>
                    <p>Customer Order</p>
                </div>
                <div class='PurchaseOrderMain-notification'>
         <a href='/AlertCO' className='CreateInvBtn1'>CO Alert &nbsp; {<FaBell/>}</a>
         </div>   
            </div>
            <SortButton options={sortOptions} onSort={handleSort}/>
 
{/* <div className="outer-wrapper"> */}
{currentData ? (
 
  // <div className="table-New-wrapper">
  <div className="table-New-wrapper pomain-tablewrapper">
    {/* <table className="table"> */}
    <table className="table POmain">
      <thead>
        <tr>
          <th></th>
          <th>Customer Order</th>
          <th>Customer mobile</th>
          <th>Ordered date</th>
          <th>Expected delivery date</th>
          <th>Order status</th>
          <th>View</th>
        </tr>
      </thead>
 
      <tbody>
        {currentData.map((individualExcelData, index) => (
 
          <tr>
            {/* {currentData?.map((item,index)=>{
item.orderStatus==='Submitted'
            })} */}
            {/* <td><input type="checkbox" checked={selectedcoNumber===individualExcelData.coNumber}  onChange={()=>handleIdCheckboxChange1(individualExcelData.coNumber)}/></td> */}
            <td>{(individualExcelData?.orderStatus==='Fully Processed' || individualExcelData?.orderStatus==='Fully Processed')?(<input type='checkbox' class='Picklisted' checked disabled/>):(<input type="checkbox" checked={isChecked}  onChange={()=>handleIdCheckboxChange1(individualExcelData.coNumber)}/>)}</td>
            <td>{individualExcelData.coNumber}</td>
            <td>{individualExcelData.customerMobNum}</td>
            <td>{individualExcelData.orderCreationDate}</td>
            <td>{individualExcelData.expectedDelDate}</td>
            <td>{individualExcelData.orderStatus}</td>
            <td >{<Button value={individualExcelData.coNumber} onClick={tdclick}><FaEye className='PurchaseOrderMain-Ricons'></FaEye></Button> }</td>
          </tr>
 
        ))}
 
      </tbody>
    </table>
 
    <br />
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

{isButtonVisible1 && (<button className='ItemListing-Edit-btn' onClick={submitCO}>Submit</button>)}
{isButtonVisible2 && (<button className='ItemListing-Edit-btn' onClick={updateOrderStatus}>Dispatch</button>)}
    </div>
       
      )
}
export default CustomerOrderMain