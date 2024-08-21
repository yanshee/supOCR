// import React,{useState} from 'react'
// import logo from '../../images/KPMG-logo.jpg'
// import '../../style/ItemDetails.css'
// import {FaUserAlt,FaInfoCircle,FaHome, FaBell, FaArrowAltCircleLeft,FaSort,FaFilter,FaDownload} from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { get } from "react-hook-form";
// const cors = require('cors');

// function ItemDetails() {
//     let navigate = useNavigate();
//     const [currentData, setcurrentData] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             const response = await fetch("http://localhost:8080/purchaseorder/display/items")
//             const newData = await response.json()
//             setcurrentData(newData)
//         };

//         fetchData();
//     }, [])

//     if (currentData) {
//         console.log(currentData)
//     }
//     else{
//         alert("Something went wrong!!")
//     }
    

//   return (
//     <div class='Item-details'>
//     <div class='HomeNav-container'>
//         <div class='HomeNav-topline'>
//             <div class='HomeNav-heading'>
//                 <p>Supplier Portal</p>
//             </div>
//             <div class='HomeNav-logo-box'>
//                 <img src={logo} alt='KPMG_logo' class='HomeNav-logo'/>
//             </div>
//             <div class='HomeNav-component'>
//                 <div class='HomeNav-component-content'>
//                     <div class='HomeNav-component-Logout'>
//                         {<FaUserAlt className='HomeNav-Ricons'/>}
//                         <a class='HomeNav-component-a'>User</a>
//                     </div>
//                     <div class='HomeNav-component-About'>
//                         {<FaInfoCircle className='HomeNav-Ricons'/>}
//                         <a class='HomeNav-component-a'>About</a>
//                     </div>
//                 </div>
//             </div>
//         </div>
        
//         <div class='HomeNav-menu'>
//             <div class='HomeNav-menu-content'>
//                 <li> 
//                     <a href="#" class='HomeNav-menu-content-dropdown-a'>Dashboard</a>
//                 </li>
//                 <li>
//                     <select class='HomeNav-menu-content-dropdown'>
//                         <option selected><a href="#" class='HomeNav-menu-content-dropdown-a'>Purchase Order</a></option>
//                         <option><a href="#" class='HomeNav-menu-content-dropdown-a'>Retailer Returns</a></option>
//                         <option><a href="#" class='HomeNav-menu-content-dropdown-a'>ASN</a></option>
//                     </select>
//                 </li>
//                 <li>
//                     <select class='HomeNav-menu-content-dropdown'>
//                         <option selected><a href="#" class='HomeNav-menu-content-dropdown-a'>Item Listing</a></option>
//                         <option><a href="#" class='HomeNav-menu-content-dropdown-a'>Cost Change</a></option>
//                     </select>
//                 </li>
//                 <li>
//                     <select class='HomeNav-menu-content-dropdown'>
//                         <option selected><a href="#" class='HomeNav-menu-content-dropdown-a'>Customer Orders</a></option>
//                         <option><a href="#" class='HomeNav-menu-content-dropdown-a'>Customer Returns</a></option>
//                     </select>
//                 </li>
//                 <li>
//                     <a href="#" class='HomeNav-menu-content-dropdown-a'>Invoices</a>
//                 </li>
//                 <li>
//                     <a href="#" class='HomeNav-menu-content-dropdown-a'>Deals</a>
//                 </li>
//                 <li>
//                     <a href="#" class='HomeNav-menu-content-dropdown-a'>Analytics</a>
//                 </li>
//             </div>
//         </div>   
//     </div>
//     <div class='PurchaseOrderMain-description'>
//         <div class='PurchaseOrderMain-description-content'>
//              <div class='PurchaseOrderMain-component-Home'>
//                  {<FaHome className='PurchaseOrderMain-Ricons-Home'/>}
//              </div> 
//              <div class='Back-button'>
//                  {<FaArrowAltCircleLeft className='PurchaseOrderMain-Ricons-Back' onClick={()=>navigate(`/PurchaseOrderMain`)}/>}
//                  <a class='PurchaseOrderMain-Back-a'>Back</a>
//              </div>
//              <div class='PurchaseOrderMain-component-heading'>
//                  <p>Purchase Orders</p>
//             </div>
//             <div class='PurchaseOrderMain-notification'>
//                 <div class='PurchaseOrderMain-notification-alerts'>
//                      <a class='PurchaseOrderMain-notification-a'>Order Alerts</a>
//                      {<FaBell className='PurchaseOrderMain-Ricons'/>}
//                 </div>
//              </div>       
//         </div>

//         <div class='PurchaseOrderMain-Operations'>
//                 <div class='PurchaseOrderMain-Download'>
//                     <a class='PurchaseOrderMain-Operations-content-a'>Download</a>
//                     {<FaDownload className='PurchaseOrderMain-Ricons-down'/>}
//                 </div>
//                 <div class='PurchaseOrderMain-FilterBy'>
//                     <a class='PurchaseOrderMain-Operations-content-a'>FilterBy</a>
//                     {<FaFilter className='PurchaseOrderMain-Ricons-fil'/>}
//                 </div>
//                 <div class='PurchaseOrderMain-SortBy'>
//                     <a class='PurchaseOrderMain-Operations-content-a'>SortBy</a>
//                     {<FaSort className='PurchaseOrderMain-Ricons-sort'/>}
//                 </div>
//             </div>
//      </div>

//      <div class='item-description'>
//          <div class='item' >
//             <p name="supplierName" value={Data.supplierName} onChange={handleChange} placeholder='Supplier Name'>Item ID  :</p>
//             <p></p>
//         </div>
//         <div class='item' >
//             <p>Item Name  :</p>
//             <p></p>
//         </div>
//         <div class='item' >
//             <p>Specification  :</p>
//             <p></p>
//         </div>
//         <div class='item' >
//             <p>Processor Name  :</p>
//             <p></p>
//         </div>
//         <div class='item' >
//             <p>Order Qty.  :</p>
//             <p></p>
//         </div>
//         <div class='item' >
//             <p>Item Barcode  :</p>
//             <p></p>
//         </div>

            
//      </div>
//     </div>  
    
//   )
// }

// export default ItemDetails