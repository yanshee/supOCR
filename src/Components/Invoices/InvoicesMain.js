import React, { useState,useEffect, useRef} from 'react'
import HomeNav from '../Navbar/HomeNav'
import FullLengthSearchbar from '../Searchbars/FullLengthSearchbar'
import HomeButton from '../Buttons/HomeButton'
import FilterButton from '../Buttons/FilterButton'
import ExportButton from '../Buttons/ExportButton'
import {FaBell, FaCloudDownloadAlt, FaDownload, FaPlusCircle,FaEye} from "react-icons/fa";
import '../../style/InvoicesMain.css'
import SortButton from '../Buttons/SortButton'
import { Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const cors = require('cors');

const InvoicesMain=()=>{

 
    let navigate = useNavigate();
    const [currentData, setcurrentData] = useState(null);

    useEffect(() => {
        const itemdata = async () => {
                 await axios
        .get("http://localhost:4040/api/invoice/service/invoice/getAllInvoiceData")
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
        const pathCompute='/invoiceSummary'
       const id=event.target.value;
        // alert(id);
        navigate(pathCompute,{ state: {id: id}});
    };

    function exporttable()
    {
      alert('hi');
     
    }

    const tableRef = useRef(null);

    return (
        <div>
            <HomeNav/>
            <div class='Invoices-heading'>
                <HomeButton/>
                <div className='InvoiceTitle'>
                    <p>Invoices</p>
                </div>
                <div class='PurchaseOrderMain-notification'>
                {/* <div className='CreateInvBtn'>
                     <a class='PurchaseOrderMain-notification-a' onClick={() => navigate("/AlertInvoices")}>Invoice Alerts</a>
                     {<FaBell className='PurchaseOrderMain-Ricons'/>}
                </div> */}
                <a href='/AlertInvoices' className='CreateInvBtn1'>Invoice Alert &nbsp; {<FaBell/>}</a>
             </div>   
            </div>
            {/* <FullLengthSearchbar/> */}
            <a href='/CreateInvoices' className='CreateInvBtn'>Create New Invoice &nbsp; {<FaPlusCircle/>}</a>
            {/* <ExportButton/>
            <FilterButton/>
            <SortButton/> */}
            <br/>
            {/* <div className='TableContainer'>
                <table className='InvoiceTable'> */}
                <div className="table-New-wrapper pomain-tablewrapper">
    <table className="table POmain">
                    <thead>
                        <th>Invoice #</th>
                        <th>Invoice Date</th>
                        <th>Type</th>
                        <th>Currency</th>
                        <th>Amount</th>
                        <th>Due</th>
                        <th>Invoice Status</th>
                        <th>On Hold</th>
                        <th>Payment Status</th>
                        <th>Due Date</th>
                        {/* <th>Payment Remainder</th> */}
                        <th>View Summary</th>
                    </thead>
                    <tbody>

                    {currentData?.map((individualExcelData, index) => ( 
                        <tr>
                            <td>{individualExcelData?.invoiceId}</td>
                            <td>{individualExcelData?.invoiceDate}</td>
                            <td>{individualExcelData?.invoiceType}</td>
                            <td>{individualExcelData?.currency}</td>
                            <td>{individualExcelData?.invoiceTotalAmount}</td>
                            <td>{individualExcelData?.invoiceDueAmount}</td>
                            <td>{individualExcelData?.invoiceStatus}</td>
                            <td>{individualExcelData?.invoiceOnHoldFlag}</td>
                            <td>{individualExcelData?.invoicePaymentStatus}</td>
                            <td>{individualExcelData?.invoiceDueDate}</td>
                            {/* <td> <button>Send Reminder &nbsp; {<FaBell/>}</button> </td> */}
                            <td >{<Button value={individualExcelData.invoiceId} onClick={tdclick}><FaEye className='PurchaseOrderMain-Ricons'></FaEye></Button> }</td>
                        </tr>

))}
                       
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default InvoicesMain