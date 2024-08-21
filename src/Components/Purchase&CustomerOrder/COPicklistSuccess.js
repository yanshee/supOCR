import React,{useState,useEffect,Component} from 'react'
import '../../style/CostChangeConfirm.css'
import HomeNav from '../Navbar/HomeNav'
import HomeButton from '../Buttons/HomeButton'
import CostChangeAlertButton from '../Buttons/CostChangeAlertButton'
import { FaFileDownload, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
// import TickMark from '../../images/TickMark.png'
import axios from 'axios';
const cors = require('cors');

function COPicklistSuccess({id})
{

    const [currentData, setcurrentData] = useState(null);
    const [iteminfo, setiteminfo] = useState([]);
    const [itemdetails, setitemdetails] = useState([]);
    const [selectedIds,setSelectedIds]=useState([]);

    const navigate = useNavigate();
    console.log("d",id)

    function saveItemDetails() {
      const itemdata = async () => {
        await axios
            .get(`http://localhost:5050/api/customerOrders/service/saveIntermediateCO?itemDetails=${JSON.stringify(id.itemdata)}&coId=${id.OrderData.coNumber}`)
            .then((res) => {
            //   alert("Success")
            // //   console.log("onpage",res.data)

            const pathCompute='/COGenerateInvoice'
        // console.log("ddd",id)
         navigate(pathCompute,{ state: {id: id}});
            }).catch((err) => {
            //   
            alert("unsuccessful")
            })
        }
        itemdata()
      }

      useEffect(() => {
        setcurrentData(id.OrderData)
       }, [id.OrderData])
       console.log("OrderStatus", currentData)

       useEffect(() => {
        setSelectedIds(id.ids)
       }, [id.ids])
    //    console.log("OrderStatus", currentData)


    //   const continueButton = () => {
    //     //  console.log("fil",details)
    //     const pathCompute='/COGenerateInvoice'
    //     console.log("ddd",id)
    //      navigate(pathCompute,{ state: {id: id}});
        
    //  }

    return (
        <div>
            <HomeNav/>
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
                {/* <div class='PurchaseOrderMain-notification'>
         <a href='/AlertCO' className='CreateInvBtn1'>CO Alert &nbsp; {<FaBell/>}</a>
         </div>    */}
            </div>

            {/* <div class='Back-button'>
                     {<FaArrowLeft className='PurchaseOrderMain-Ricons-Back' />}
                     <a href='/CustomerOrderSummary' class='PurchaseOrderMain-Back-a' style={{textDecoration:'none'}}>Back</a>
                 </div>
                     
                
                 <div class='PurchaseOrderMain-component-heading'>
                     <p>Customer Orders</p>
                 </div> */}
            <br/>
            <div className='CC-ConfirmContainer'>
                <div className='CC-ConfirmBox'>
                    <br/><br/>
                    {/* <div className='CC-TickMark'>
                        <img src={TickMark} className='CC-TickMarkImage'></img>
                    </div> */}
                    <br/><br/>
                    <text>Picklist has been generated successfully.</text>
                </div>
            </div>
            <br/>
            <button className='ItemListing-Edit-btn' onClick={saveItemDetails}>Save & Continue</button>
            
        </div>
    )
}

export default COPicklistSuccess