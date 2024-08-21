import React, { useState,useEffect } from 'react'
import '../../style/PurchaseOrderMain.css'
import {FaBell, FaSearch, FaDownload, FaFilter,FaEye,FaSort} from "react-icons/fa";
import { FaHome} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import HomeNav from '../Navbar/HomeNav';
import axios from 'axios';
import { Button } from '@mui/material';
import HomeButton from '../Buttons/HomeButton';
const cors = require('cors');
 
const CustomerReturnItemListing=()=>{
    
    let navigate = useNavigate();
    const [currentData, setcurrentData] = useState(null);

    useEffect(() => {
        const itemdata = async () => {
                 await axios
        .get("http://localhost:6060/api/returns/service/cr/getCustomerReturnsList")
        .then((res) => {
            setcurrentData(res.data)
           console.log(currentData)
        }).catch((err) => {
           console.log(err);
    })
        }
  
        itemdata()
  
     },[])

     function tdclick(event){
        const pathCompute='/CustomerReturnDetails'
       const id=event.target.value;
        // alert(id);
        navigate(pathCompute,{ state: {idSelected: id}});
  
    };
   
    return (

    
 
    <div class='PurchaseOrderMain-container'>
        <div>
            <HomeNav/>
        </div>
        <div class='Invoices-heading'>
                <HomeButton/>
                <div className='InvoiceTitle'>
                    <p>Customer Return</p>
                </div>
                <div class='PurchaseOrderMain-notification'>
         <a href='/AlertCR' className='CreateInvBtn1'>CR Alert &nbsp; {<FaBell/>}</a>
         </div>   
            </div>
 
    {/* <div class='PurchaseOrderMain-description'>
        <div class='PurchaseOrderMain-description-content'>
             <div class='PurchaseOrderMain-component-Home'>
                 {<FaHome className='PurchaseOrderMain-Ricons-Home'/>}
             </div>
             <div class='PurchaseOrderMain-component-heading'>
                 <p>Customer Returns</p>
            </div>
            <div class='PurchaseOrderMain-notification'>
                <div class='PurchaseOrderMain-notification-alerts'>
                     <a class='PurchaseOrderMain-notification-a'>Return Alerts</a>
                     {<FaBell className='PurchaseOrderMain-Ricons'/>}
                </div>
             </div>      
        </div>
     <div class='PurchaseOrderMain-searchbar'>
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
 
     {currentData ? (
 
//  <div className="table-New-wrapper">
//    <table className="table">
<div className="table-New-wrapper pomain-tablewrapper">
    <table className="table POmain">
     <thead>
       <tr>

       {/* <th>Select</th> */}
        <th>Return ID</th>
        <th>Return Date</th>
        <th>Processed ?</th>
        <th>Raised Concern</th>
        <th>View</th>
       </tr>
     </thead>

     <tbody>
     {currentData.map((individualExcelData, index) => (

         <tr>
            {/* <td><input type='checkbox' value={individualExcelData.itemId} onClick={handleIdCheckboxChange}></input></td> */}
           <td>{individualExcelData.returnId} </td>
           <td>{individualExcelData.returnDate}</td>
           <td>{individualExcelData.processedStatusFlag =='Y' ? <b>Yes</b> : <p>No</p>}</td>
           <td>{individualExcelData.concernRaisedFlag =='Y' ? <b>Yes</b> : <p>No</p>}</td>
           <td >{<Button value={individualExcelData.returnId} onClick={tdclick}><FaEye className='PurchaseOrderMain-Ricons'></FaEye></Button> }</td>
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
            
            {/* <button className='ItemListing-Edit-btn' onClick={proceedButton}>Edit</button> */}
        </div>
    )
}
export default CustomerReturnItemListing