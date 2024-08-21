import React from 'react'
import logo from '../../images/KPMG-logo.jpg'
import '../../style/HomeNav.css'
import {FaUserAlt,FaInfoCircle,FaBars} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function HomeNav() {
    let navigate = useNavigate();

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        navigate(selectedValue)
    };

  return (
    <div class='HomeNav-container'>
        <div class='HomeNav-topline'>
            <div class='HomeNav-heading'>
                <p>Supplier Portal</p>
            </div>
            <div class='HomeNav-logo-box'>
                <img src={logo} alt='KPMG_logo' class='HomeNav-logo'/>
            </div>
            <div class='HomeNav-component'>
                <div class='HomeNav-component-content'>
                    <div class='HomeNav-component-Logout'>
                        {<FaUserAlt className='HomeNav-Ricons'/>}
                        <a href='/UMLogin' class='HomeNav-component-a'>Admin</a>
                    </div>
                    <div class='HomeNav-component-About'>
                        {<FaInfoCircle className='HomeNav-Ricons'/>}
                        <a class='HomeNav-component-a'>About</a>
                    </div>
                </div>
            </div>
        </div>
        
        <div class='HomeNav-menu'>
            <div class='HomeNav-menu-content'>
                <li> 
                    <a  class='HomeNav-menu-content-dropdown-a' onClick={()=>navigate(`/Dashboard`)}>Dashboard </a>
                </li>
                
                    <select class='HomeNav-menu-content-dropdown-a' onChange={handleSelectChange}>
                    <option value="">Orders</option>
                    <option value="/PurchaseOrderMain">Purchase Order</option>
                        <option value="/CustomerOrderMain">Customer Order </option>
                    </select>
                
                    <select class='HomeNav-menu-content-dropdown-a' onChange={handleSelectChange}>
                    <option value="">Returns</option>
                    <option value="/RetailerReturnItemListing">Retailer Return</option>
                        <option value="/CustomerReturnItemListing">Customer Return </option>
                    </select>
                
                
                    <select class='HomeNav-menu-content-dropdown-a' onChange={handleSelectChange}>
                    <option value="">Listing</option>
                    <option value="/ItemListingMain">Item Listing</option>
                        <option value="/CostChange">Cost Change</option>
                    </select>
                
                <li>
                    <a  class='HomeNav-menu-content-dropdown-a' onClick={()=>navigate(`/InvoicesMain`)}>Invoices</a>
                </li>
                <li>
                    <a  class='HomeNav-menu-content-dropdown-a' onClick={()=>navigate(`/AlertPO`)}>Alerts</a>
                </li>
                <li>
                    <a  class='HomeNav-menu-content-dropdown-a' onClick={()=>navigate(`/ASNMain`)}>ASN</a>
                </li>
            </div>
        </div>
    </div>
  )
}

export default HomeNav