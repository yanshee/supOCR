import React, { useState,useEffect} from 'react'
import '../../style/RegistrationID.css'
import logo from '../../images/KPMGLogo.jpg'
// import image from '../../images/Login-Logo.png'
import image from '../../images/SupplierImage.png'
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { registrationIdOnboarding } from './OnboardingSummary';
 
const OnboardingSuccess=()=>
{
    console.log("Registrationid",registrationIdOnboarding)
    let navigate=useNavigate();
   const [currentData,setcurrentData]=useState([]);
    
   useEffect(() => {
        const itemdata = async () => {
                 await axios
        .post("http://localhost:1010/api/login/service/viewOnboardingDetails?registrationId="+registrationIdOnboarding+"")
        .then((res) => {
            setcurrentData(res.data)
           console.log( "status",res.data['onboarding_status'])
           if ( res.data['onboarding_status'] =="COMPLETED") {
            window.location = "/Dashboard";
          } 
        }).catch((err) => {
           console.log(err);
    })
        }

        itemdata()
     },[])
   console.log("onboarding msg",currentData.onboarding_status)
    
    function redirect(e)
    {
        e.preventDefault();

        if (localStorage.getItem("reg_id") === null) {
            window.location = "/continueregistration";
          }
          else
          {
            window.location = "/onboarding";
          }
        
    }

   
   
    
    
        return ( 
            <div class='regID-container'>
                <div class='regID-logo-box'>
                    <img src={image} alt='KPMG_logo'/>
                </div>
                <div class='reg-form-box'>
                    <form class='reg-form'>
                    <div class='KPMG-logo-box'>
                <img class="KPMG_Img" src={logo} alt='KPMG_logo'/>
            </div>
            <div class='regID-msg'>
                {/* <h4 style={{marginLeft:"17px"}}>Thank you for submitting your details!</h4> */}
                           <p>Thank you for submitting your details!</p>
                           <p>Your Onboarding Status is: <b>{currentData.onboarding_status}</b></p>
                            {/* <button onClick={()=>navigate("/continueregistration")} class='regID-btn'>Continue</button> */}
                            <button onClick={()=>navigate("/Dashboard")} class='regID-btn'>Continue</button>
                        </div>

                    </form>
                </div>
            </div>
        )
};

export default OnboardingSuccess;