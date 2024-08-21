import React from 'react'
import '../../style/ChangePasswordConf.css'
import logo from '../../images/KPMGLogo.jpg'
// import image from '../../images/Login-Logo.png'
import image from '../../images/SupplierImage.png'
import { useNavigate } from 'react-router-dom';

function ChangePassword() 
{
    let navigate = useNavigate();
  return (
        <div class='cp-container'>
            <div class='cp-logo-box'>
                <img src={image} alt='KPMG_logo'/>
            </div>
            {/* <div class='cp-form-box'>
                <form class='cp-form'>
                    <div class='cp-msg'>
                        Password has been reset Successfully.
                    </div>
                    <br/><br/><br/>
                    <div>
                        <button class='cp-btn' onClick={()=>navigate(`/subsLogin`)} >Continue</button>
                    </div>
                </form>
            </div> */}
            <div class='reg-form-box'>
                    <form class='reg-form'>
                    <div class='KPMG-logo-box'>
                <img class="KPMG_Img" src={logo} alt='KPMG_logo'/>
            </div>
                        <div class='regID-msg'>
                        <h4 style={{marginLeft:"47px"}}>Thank you for sign-up!</h4>
                        <p >Password has been reset successfully.</p>
                        <button onClick={()=>navigate(`/subsLogin`)} class='regID-btn'>Continue</button>
                        
                           
                        </div>
                    </form>
                </div>
        </div>
  )
}

export default ChangePassword


