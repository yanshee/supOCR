import React,{useState,useEffect} from 'react'
import logo from '../../images/KPMG-logo.jpg'
import '../../style/OrderSummary.css'
import '../../style/Return.css'
import HomeNav from '../Navbar/HomeNav'

import {FaBell,FaArrowLeft} from "react-icons/fa";
import { FaHome,FaArrowAltCircleLeft} from "react-icons/fa";
import { useNavigate} from "react-router-dom";
import axios from 'axios';
const cors = require('cors');

function CancelAsn({id}) {
    let navigate = useNavigate();
   
    const performNavigaton = () => {
        const pathCompute = '/ASNMain'
        navigate(pathCompute)
      }
    
  
     let asnId = localStorage.getItem("cancelledAsnId")
    console.log(localStorage.getItem("cancelledAsnId"))
    // console.log("asnId",asnId)


return (
    <div>
            <HomeNav/>
            {/* <div className='CC-title'>
                <a onClick={() => navigate(-1)} className='backBtn-ItemCost' style={{textDecoration:'none',color:'black'}}> <i>{<FaArrowLeft/>}</i>  Back </a>
                <text>Item Listing</text>
               
            </div> */}
            <div class='Invoices-heading'>
               
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
        </div> 
            <br/>
            {/* <div class="AWB">
            <p></p>
            </div> */}
            
            <div className='CC-ConfirmContainer'>
                <div className='CC-ConfirmBox'>
                    <br/><br/>
                    {/* <div className='CC-TickMark'>
                        <img src={TickMark} className='CC-TickMarkImage'></img>
                    </div> */}
                    <br/><br/>
                    <text>#{asnId} creation has been cancelled</text>
                </div>
            </div>
            <br/>
        <div className="co-accept-reject-btn">
           
            <button className='CC-ConfirmBtn-view' onClick={performNavigaton}>Continue</button></div>    
           
           

        </div>



  
  )
} 
 export default CancelAsn;