
import React from 'react'
import image from '../../images/Login-Logo.png'
import { useNavigate } from 'react-router-dom';

function SiteAddCnfrm(){
    let naviagte=useNavigate();
    return(
        <div class='cp-container'>
        <div class='cp-logo-box'>
        <img src={image} alt='KPMG_logo'/>
        </div>
        <div class='cp-form-box'>
            <form class='cp-form'>
                <div class='cp-msg'>
                    Supplier Site has been added Successfully.
                </div>
                <br/><br/><br/>
                <div>
                    <button class='cp-btn' onClick={naviagte=('/UMViewSites')}>Continue</button>
                </div>
            </form>
        </div>
    </div>
    )
}
export default SiteAddCnfrm