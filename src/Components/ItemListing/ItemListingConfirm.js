import React, { Component } from 'react'
import '../../style/CostChangeConfirm.css'
import HomeNav from '../Navbar/HomeNav'
import HomeButton from '../Buttons/HomeButton'
import CostChangeAlertButton from '../Buttons/CostChangeAlertButton'
import { FaFileDownload, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
// import TickMark from '../../images/TickMark.png'

function ItemListingConfirm()
{
    const navigate = useNavigate();
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
                    <p>Item Listing</p>
                </div>
        </div>
            {/* <div className='CC-title'>
                <a href='/ItemListingItemEditPage' className='backBtn-ItemCost' style={{textDecoration:'none'}}> <i>{<FaArrowLeft/>}</i>  Back </a>
                <text>Item Listing</text>
            </div> */}
            <br/>
            <div className='CC-ConfirmContainer'>
                <div className='CC-ConfirmBox'>
                    <br/><br/>
                    {/* <div className='CC-TickMark'>
                        <img src={TickMark} className='CC-TickMarkImage'></img>
                    </div> */}
                    <br/><br/>
                    <text>Item Status has been changed successfully.</text>
                </div>
            </div>
            <br/>
            <button className='CC-ConfirmBtn' onClick={() => navigate("/ItemListingMain")} >Continue</button>
        </div>
    )
}

export default ItemListingConfirm