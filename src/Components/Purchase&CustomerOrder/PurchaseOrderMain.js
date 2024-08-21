import React, { useState, useEffect } from 'react'
import logo from '../../images/KPMG-logo.jpg'
import '../../style/PurchaseOrderMain.css'
import { FaUserAlt, FaInfoCircle, FaBell, FaSearch, FaDownload, FaFilter, FaSort, FaEye } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import HomeNav from '../Navbar/HomeNav'
import OrderSummary from './OrderSummary';
import HomeButton from '../Buttons/HomeButton';
import SortButton from '../Buttons/SortButton';
import { Button } from '@mui/material';
const cors = require('cors');
 
 
 
const PurchaseOrderMain = () => {
 
    let navigate = useNavigate();
    const [currentData, setcurrentData] = useState(null);
 
    useEffect(() => {
        const itemdata = async () => {
            await axios
                .get("http://localhost:5050/api/purchaseOrders/service/getPOListingData")
                .then((res) => {
                    setcurrentData(res.data)
                    console.log(currentData)
                }).catch((err) => {
                    console.log(err);
                })
        }
 
        itemdata()
    }, [])
 
 
    function tdclick(event) {
        const pathCompute = '/OrderSummary'
        const id = event.target.value;
        // alert(id);
        navigate(pathCompute, { state: { id: id } });
    };
    //     function ExporttoExcel(){
    //         const [data, setData] = React.useState([])
 
    //   React.useEffect(() => {
    //     const fetchData = () =>{
    //      axios.get('http://localhost:8080/purchaseorder/export/excel').then(r => setData(r.data) )
    //     }
    //     fetchData()
    //   }, [])
    //   }
 
    const handleSort=(sortParameter)=>{
    let sortedData=[...currentData]
  if(sortParameter==="creationDate"){
    sortedData.sort((a,b)=>new Date(a.creationDate)-new Date(b.creationDate));
  }
//   else if(sortParameter==="expectedDelDate"){
//     sortedData.sort((a,b)=>new Date(a.expectedDelDate)-new Date(b.expectedDelDate));
//   }
  setcurrentData(sortedData)
  console.log("Sort",sortedData)
    }
 
const sortOptions=[
  {value:'creationDate', label:'creationDate'}
  // ,{value:'asnStatus',label:'asnStatus'}
];
 
const filterOptions=[
  {value:'asnCreationDate', label:'asnCreationDate'},{value:'asnStatus',label:'asnStatus'},{value:'asnId',label:'asnId'}
]
 
    return (
 
        <div class='PurchaseOrderMain-container'>
            <div>
                <HomeNav />
            </div>
            <div class="main-container">
            <div class='Invoices-heading'>
               
                <div className='InvoiceTitle'>
                    <p>Purchase Order</p>
                </div>
               
            </div>
            {/* <SortButton options={sortOptions} onSort={handleSort}/> */}
 
            {/* <div class='PurchaseOrderMain-description'>
 
                <div class='PurchaseOrderMain-description-content'>
 
                    <div class='PurchaseOrderMain-component-Home'>
 
                        {<FaHome className='PurchaseOrderMain-Ricons-Home' />}
 
                    </div>
 
                    <div class='PurchaseOrderMain-component-heading'>
 
                        <p>Purchase Orders</p>
 
                    </div>
 
                    <div class='PurchaseOrderMain-notification'>
 
                        <div class='PurchaseOrderMain-notification-alerts'>
 
                            <a class='PurchaseOrderMain-notification-a' onClick={() => navigate("/AlertPO")}>Order Alerts</a>
 
                            {<FaBell className='PurchaseOrderMain-Ricons' />}
 
                        </div>
 
                    </div>
 
                </div> */}
                {/* <div class='PurchaseOrderMain-searchbar'>
        <div class='PurchaseOrderMain-searchbar-container'>
                <input class="PurchaseOrderMain-input" placeholder="Search here"/>
                {<FaSearch className='PurchaseOrderMain-Ricons-search'/>}
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
                        {<FaDownload className='PurchaseOrderMain-Ricons-down' />}
                    </div>
                    <div class='PurchaseOrderMain-FilterBy'>
                        <a class='PurchaseOrderMain-Operations-content-a'>FilterBy</a>
                        {<FaFilter className='PurchaseOrderMain-Ricons-fil' />}
                    </div>
                    <div class='PurchaseOrderMain-SortBy'>
                        <a class='PurchaseOrderMain-Operations-content-a'>SortBy</a>
                        {<FaSort className='PurchaseOrderMain-Ricons-sort' />}
                    </div>
                </div>
            </div> */}
 
                {/* <div className="outer-wrapper"> */}
                {/* {currentData ? (
 
                <div className="table-New-wrapper">
                    <table className="table">
 
                        <thead>
                            <tr>
 
                                <th>Purchase Order</th>
                                <th>Location</th>
                                <th>Creation date</th>
                                <th>PO qty</th>
                                <th>Total items</th>
                                <th>View</th>
                            </tr>
                        </thead>
 
                        <tbody>
                            {currentData.map((individualExcelData, index) => (
 
                                <tr>
                                    <td>{individualExcelData.poNumber}</td>
                                    <td>{individualExcelData.location}</td>
                                    <td>{individualExcelData.creationDate}</td>
                                    <td>{individualExcelData.totalItemQty}</td>
                                    <td>{individualExcelData.totalUniqItms}</td>
                                    <td >{<Button value={individualExcelData.poNumber} onClick={tdclick}><FaEye className='PurchaseOrderMain-Ricons'></FaEye></Button>}</td>
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
        </div>
         </div> */}
                {/* <div class='PurchaseOrderMain-Operations'> */}
 
                    {/* <div class=''> */}
 
                        {/* <DownloadTableExcel
    filename="users table"
    sheet="users"
    currentTableRef={tableRef.current}
>
 
   <button> Export excel </button>
 
</DownloadTableExcel> */}
 
 
 
                    {/* </div> */}
 
                    {/* <div class='PurchaseOrderMain-FilterBy'>
 
    <a class='PurchaseOrderMain-Operations-content-a'>FilterBy</a>
 
    {<FaFilter className='PurchaseOrderMain-Ricons-fil'/>}
 
</div>
 
<div class='PurchaseOrderMain-SortBy'>
 
    <a class='PurchaseOrderMain-Operations-content-a'>SortBy</a>
 
    {<FaSort className='PurchaseOrderMain-Ricons-sort'/>}
 
</div> */}
 
 
 
 
            {currentData ? (
 
 
 
<div className="table-New-wrapper pomain-tablewrapper">
{/* <div class="table-buttons">
    <div class="search">
        <input type='text' placeholder='Search here'></input>
    </div>
    <div class="table-buttons">
        <button>Download</button>
        <button>Filter</button>
        <button>Sort</button>
    </div>
 
</div> */}
<table className="table POmain">

                        <thead>
                            <tr>
                                <th>Purchase Order</th>
                                <th>Location</th>
                                <th>Creation date</th>
                                <th>PO qty</th>
                                <th>Total items</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
 
                            {currentData.map((individualExcelData, index) => (
 
 
 
                                <tr>
 
                                    <td>{individualExcelData.poNumber}</td>
 
                                    <td>{individualExcelData.location}</td>
 
                                    <td>{individualExcelData.creationDate}</td>
 
                                    <td>{individualExcelData.totalItemQty}</td>
 
                                    <td>{individualExcelData.totalUniqItms}</td>
 
 
                                    <td >{<Button value={individualExcelData.poNumber} onClick={tdclick}><FaEye className='PurchaseOrderMain-Ricons'></FaEye></Button>}</td>
 
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
 
        </div>
 
         </div>
 
 
 
    )
 
}
 
export default PurchaseOrderMain