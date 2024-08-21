import React, { Component,useState,useEffect } from 'react'
import HomeNav from '../Navbar/HomeNav'
import FullLengthSearchbar from '../Searchbars/FullLengthSearchbar'
import FilterButton from '../Buttons/FilterButton'
import SortButton from '../Buttons/SortButton'
import '../../style/AlertMain.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
const cors = require('cors');

const AlertInvoices=()=>
{
    let navigate = useNavigate();
    // const pathCompute = `/CostChangeConfirm`

    // const [open, setOpen] = useState(false);
    const [data, setData] = useState([])

    useEffect(() => {
        const itemdata = async () => {
            await axios
                .get("http://localhost:8080/api/alerts/service/getAllAlertsForModule", {
                    params: {
                        moduleName:'INVOICES'
                    },
                })

                .then((res) => {
                    setData(res.data)
                    console.log("Data", res.data)
                }).catch((err) => {
                    console.log(err);
                })
        }

        itemdata()

    }, [])

    const btnStyle = 
    {
      backgroundColor: "white",
      color: "#00338E",
      fontWeight: "700",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      border: "#00338E solid 1px"
    };
    const handleSelectChange = (event) => {
      const selectedValue = event.target.value;
      navigate(selectedValue)
  };

    return (
        <div>
            {<HomeNav/>}
            <div className="button-container">
                <a className="button" href='/AlertASN'> ASN Alerts</a>
                <select className="button" onChange={handleSelectChange}>
                        <option value="">Orders Alert</option>
                        <option value="/AlertPO">Purchase Order</option>
                        <option value="/AlertCO">Customer Order </option>
                    </select>
                {/* <a className="button" href='/AlertReturns'> Return Alerts</a> */}
                <select className="button" onChange={handleSelectChange}>
                        <option value="">Returns Alert</option>
                        <option value="/AlertRR">Retailer Return</option>
                        <option value="/AlertCR">Customer Return </option>
                    </select>
                <a className="button" href='/AlertInvoices' style={btnStyle} disabled> Invoices Alerts</a>
                <a className="button" href='/AlertItemListing'> Item Listing Alerts</a>
                <a className="button" href='/AlertCC'> Cost Change Alerts</a>
            </div>
            {<FullLengthSearchbar/>}
            {<FilterButton/>}
            {<SortButton/>}
            {data ? (
 <div className="table-New-wrapper">
   <table className="table">

     <thead>
       <tr>

         <th>Alert Id</th>
         <th>Alert Message</th>
         <th>Creation date</th>
       </tr>
     </thead>

     <tbody>
       {data.map((individualExcelData, index) => (

         <tr>
           <td>{individualExcelData.alertId}</td>
           <td>{individualExcelData.alertMsg}</td>
           <td>{individualExcelData.alertDate}</td>
          
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
    )
  
}

export default AlertInvoices