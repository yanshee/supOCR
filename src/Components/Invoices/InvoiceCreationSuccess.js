import React,{useState,useEffect,Component} from 'react'
import '../../style/CostChangeConfirm.css'
import HomeNav from '../Navbar/HomeNav'
import CostChangeAlertButton from '../Buttons/CostChangeAlertButton'
import { FaFileDownload, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
// import TickMark from '../../images/TickMark.png'
import axios from 'axios';
const cors = require('cors');

function InvoiceCreationSuccess({id})
{

    let navigate=useNavigate();
    const [currentData, setcurrentData] = useState(null);
    const [iteminfo, setiteminfo] = useState([]);
    const [itemdetails, setitemdetails] = useState([]);
    const [selectedIds,setSelectedIds]=useState([]);

    // const navigate = useNavigate();
    console.log("d",id)



    //   useEffect(() => {
    //     setcurrentData(id.OrderData)
    //    }, [id.OrderData])
    //    console.log("OrderStatus", currentData)

    //    useEffect(() => {
    //     setSelectedIds(id.ids)
    //    }, [id.ids])
    //    console.log("OrderStatus", currentData)


      const continueButton = () => {
        //  console.log("fil",details)
        const pathCompute='/InvoiceSummaryCompletion'
        // navigate(pathCompute,{ state: {id: {
        //   InvNo:response.data,
        //   ItemDetails:poData,
        //   CompleteData:Data
        // }}}); 
        // console.log("ddd",id)
         navigate(pathCompute,{ state: {id: id}}); 
     }

    return (
        <div>
            <HomeNav/>
            <div className='CC-title'>
            {/* {<FaArrowLeft className='PurchaseOrderMain-Ricons-Back' />} */}
                <a href='/CustomerOrderSummary' className='backBtn-ItemCost' style={{textDecoration:'none',color:'black'}}> <i>{<FaArrowLeft/>}</i>  Back </a>
                <text>Invoices</text>
                {/* {<CostChangeAlertButton/>} */}
            </div>

            {/* <div class='Back-button'>
                     {<FaArrowLeft className='PurchaseOrderMain-Ricons-Back' />}
                     <a href='/CustomerOrderSummary' class='PurchaseOrderMain-Back-a' style={{textDecoration:'none'}}>Back</a>
                 </div>
                     
                
                 <div class='PurchaseOrderMain-component-heading'>
                     <p>Customer Orders</p>
                 </div> */}
            <br/>
            <div class="AWB">
            <p>{id?.InvNo} has been successfully generated</p>
            </div>
            <div className='CC-ConfirmContainer'>
                <div className='CC-ConfirmBox'>
                    <br/><br/>
                    {/* <div className='CC-TickMark'>
                        <img src={TickMark} className='CC-TickMarkImage'></img>
                    </div> */}
                    <br/><br/>
                    <text>Invoice has been Generated successfully.</text>
                </div>
            </div>
            <br/>
            <button className='ItemListing-Edit-btn' onClick={continueButton}>Continue</button>
            
        </div>
    )
}

export default InvoiceCreationSuccess;
