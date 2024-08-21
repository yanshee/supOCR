import React, { Component } from 'react'
import '../../style/CostChangeConfirm.css'
import HomeNav from '../Navbar/HomeNav'
import HomeButton from '../Buttons/HomeButton'
import CostChangeAlertButton from '../Buttons/CostChangeAlertButton'
import { FaFileDownload, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
// import TickMark from '../../images/TickMark.png'

function CostChangeBulkUploadConfirm()
{
    const navigate = useNavigate();
    return (
        <div>
            <HomeNav/>
            <div class="main-container">
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
        <div className='InvoiceTitle'>
                    <p>cost Change</p>
                </div>
        </div>
            <div className='CC-ConfirmContainer'>
                <div className='CC-ConfirmBox'>
                    <br/><br/>
                    {/* <div className='CC-TickMark'>
                        <img src={TickMark} className='CC-TickMarkImage'></img>
                    </div> */}
                    <br/><br/>
                    <text>Inventory has been loaded successfully.</text>
                </div>
            </div>
            <br/>
            <button className='next-btn' onClick={() => navigate("/CostChange")}>Continue</button>
        </div>
        </div>
    )
}

export default CostChangeBulkUploadConfirm