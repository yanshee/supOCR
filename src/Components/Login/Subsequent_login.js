import React, { useState } from 'react'
import '../../style/Login.css'
// import logo from '../../images/KPMG-logo.jpg'
import logo from '../../images/KPMGLogo.jpg'
// import image from '../../images/Login-Logo.png'
import image from '../../images/SupplierImage.png'
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import $ from 'jquery';
 
 
const SubsLogin=()=>
{
    let navigate = useNavigate();
   
 
    const [Data,setData]=useState({
        "supplierId": '',
        "pwd":''
       
       
    });
   
    function getLoggedin(e)
    {
        $("#overlay").fadeIn('slow');
       console.log(Data);
        e.preventDefault();
        axios({
            method: 'POST',
            url: 'http://localhost:1010/api/login/service/regularLogin?supplierId='+Data['supplierId']+'&pwd='+Data['pwd'],
            data:Data,
        })
        .then(function (response) {
            $("#overlay").fadeOut('slow');
            console.log("response", response.data);
            if ( response.data =="ONBOARDING-INCOMPLETE") {
                // window.location = "/continueregistration";
                window.location = "/Registration";
           
             } else {
               //  block of code to be executed if the condition is false
               window.location = "/Dashboard";
             }
           })
           .catch(function (error) {
             console.log('error', error);
           });
    }
 
    const handleChange=(event)=>{
        const{name,value}=event.target;
        setData((prevData)=>({
            ...prevData,
            [name]:value,
       
        }));
    };
 
    const handleSubmit=(event)=>{
        event.preventDefault();
      };
   
  console.log(Data);
   
    return (
            <div class='login-container'>
                <div class='login-logo-box'>
                    <img src={image} alt='KPMG_logo'/>
                </div>
                <div class='login-form-box'>
                    <form class ='login-form'>
                    <div class='KPMG-logo-box'>
                <img class="KPMG_Img" src={logo} alt='KPMG_logo'/>
            </div>
                        {/* <h3>Welcome Back !!!</h3> */}
                       <h3>Login to your account</h3>
                       <div class="form-inputfields">
                        <div class='login-inputfields'>

                            {<FaEnvelope className='Ricons'/>}
                            <input type='text' class="Login-input" name="supplierId" value={Data.supplierName} onChange={handleChange} placeholder='Enter Supplier ID' required/><br/>
                        </div>
                       
                        <div class='login-inputfields'>
                            {<FaLock className='Ricons'/>}
                            <input type='password' class="Login-input" name="pwd" value={Data.password} onChange={handleChange} placeholder='Enter Password' required/><br/>
                        </div>
                        <a class="ForgotPassword" href='./ForgotPassword' id='login-forgotpass'>Forgot Password ?</a><br/>
                        </div>
                        
                       
                        <button class='login-btn' onClick={getLoggedin}>Login</button>
                       
                        <div class='login-links'>
                        Don't have an account ? <a href='./Registration' class='login-smallLinks'>Register yourself</a><br/>
                         Existing User ? <a href='/continueregistration' class='login-smallLinks'>Continue Registration</a>
                        </div>
                    </form>
                </div>
            </div>
    )
};
 
export default SubsLogin;