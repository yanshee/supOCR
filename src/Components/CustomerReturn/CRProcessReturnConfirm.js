import React, { Component } from 'react'
import '../../style/CostChangeConfirm.css'
import HomeNav from '../Navbar/HomeNav'
import CostChangeAlertButton from '../Buttons/CostChangeAlertButton'
import { FaFileDownload, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
// import TickMark from '../../images/TickMark.png'

function CRProcessReturnConfirm()
{
    const navigate = useNavigate();
    return (
        <div>
            <HomeNav/>
            <div className='CC-title'>
                <a href='/RetailerReturnItemListing' className='backBtn-ItemCost'> <i>{<FaArrowLeft/>}</i>  Back </a>
                <text>Customer Return</text>
                {/* {<CostChangeAlertButton/>} */}
            </div>
            <br/>
            <div className='CC-ConfirmContainer'>
                <div className='CC-ConfirmBox'>
                    <br/><br/>
                    {/* <div className='CC-TickMark'>
                        <img src={TickMark} className='CC-TickMarkImage'></img>
                    </div> */}
                    <br/><br/>
                    <text>Return has been processed successfully.</text>
                </div>
            </div>
            <br/>
            <button className='CC-ConfirmBtn' onClick={() => navigate("/CustomerReturnItemListing")} >Continue</button>
        </div>
    )
}

export default CRProcessReturnConfirm