import React, { useState } from 'react'
import '../../style/Login.css'
import image from '../../images/Login-Logo.png'
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import $ from 'jquery';
 
 
 
const UmTempLogin=()=>
{ let navigate = useNavigate();
    const [userId, setuserId] = useState()
    const [temppassword, settemppassword] = useState()
 
    const [Data,setData]=useState({
        "userId": '',
        "temppassword":'',
        "newpasscode":''
     
    });
   
   
   
    function logincheck(e)
    {
        $("#overlay").fadeIn('slow');
       console.log(Data);
        e.preventDefault();
        axios({
            method: 'POST',
            url: 'http://localhost:2020/api/usermgmt/service/user/login?userId='+Data['userId']+'&password='+Data['temppassword'],
            data:Data,
        })
        .then(function (response) {
            $("#overlay").fadeOut('slow');
            console.log("res", response);
            if ( response.data['redirectFlag'] =="RESETPWD") {
             //  window.location = "/UMMain";
           //  alert('temp password');
             document.getElementById("msg").innerHTML = "Please set your new password";
             document.getElementById("error").innerHTML = "";
       
             document.getElementById( 'logincheck_block' ).style.display = 'none';
             document.getElementById( 'temp_password_block' ).style.display = 'block';
             // window.location = "/passwordchanged";
             } else  if ( response.data['redirectFlag'] =="LOGIN") {
                document.getElementById("error").innerHTML = "";
                document.getElementById("msg").innerHTML = "Login Success!";
                if ( response.data['isAdminFlag'] =="Y") {
               
                window.location = "/UMMain";
                 }
                 else {
                    window.location = "/dashboard";
                  }
             
               
             }
             else
             {
                document.getElementById("error").innerHTML = "Login Failed!";
             }
 
           })
           .catch(function (error) {
             console.log('error', error);
           });
    }
    function setpasswordfun(e)
    {
        $("#overlay").fadeIn('slow');
       console.log(Data);
        e.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:2020/api/usermgmt/service/user/resetPwd?userId='+Data['userId']+'&newPassword='+Data['newpasscode'],
            data:Data,
        })
        .then(function (response) {
            $("#overlay").fadeOut('slow');
            if ( response.data="SUCCESS") {
           
         
             document.getElementById("msg").innerHTML = "Paasword Successfully Updated!";
              window.location = "/Umlogin";
             } else {
               //  block of code to be executed if the condition is false
               //alert('otp not verified');
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
    <div class='fp-container'>
        <div class='fp-logo-box'>
            <img src={image} alt='KPMG_logo'/>
        </div>
        <div class='fp-form-box'>
            <form class='fp-form'>
                <h3>User Management - Supplier Portal</h3>
                 <span id="msg"></span>
                 <span id="error"></span>
            <div id='logincheck_block'>
                        <div class='login-inputfields'>
                            {<FaEnvelope className='Ricons'/>}
                            <input type='text' class="Login-input" name="userId" value={Data.userId} onChange={handleChange} placeholder='Enter UM ID' required/><br/>
                        </div>
 
                         <div class='login-inputfields'>
                            {<FaLock className='Ricons'/>}
                            <input type='password' class="Login-input" name="temppassword" value={Data.temppassword} onChange={handleChange} placeholder='Password' required/><br/>
                </div>
               
                <button id="submit_logincheck" onClick={logincheck} class='login-btn' >Submit</button>
            </div>
 
           
           
            <div id="temp_password_block">
                <div class='login-inputfields'>
                                {<FaLock className='Ricons'/>}
                                <input type='password' class="Login-input" onChange={handleChange} name="newpasscode" placeholder='Enter New Password' required/><br/>
                            </div>
                            <div class='login-inputfields'>
                                {<FaLock className='Ricons'/>}
                                <input type='password' class="Login-input" name="temp_password2"  placeholder='Confirm Password' required/><br/>
                            </div>
                <button class='login-btn' onClick={setpasswordfun}>Submit</button>
            </div>
           
 
            </form>
        </div>
    </div>    
)
};
 
export default UmTempLogin;
 