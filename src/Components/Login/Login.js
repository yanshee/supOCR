
import React, { useState } from 'react'
import '../../style/Login.css'
import logo from '../../images/KPMGLogo.jpg'
// import image from '../../images/Login-Logo.png'
import image from '../../images/SupplierImage.png'
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import $ from 'jquery';
 
const Login=()=>
{
    let navigate = useNavigate();
    const pathCompute = `/ChangePassword`
    const [supplierid, setsupplierid] = useState()
    const [password, setpassword] = useState()
 
    const [Data,setData]=useState({
        "supplierid": '',
        "temppwd": ''
    });
   
    function getLoggedin(e)
    {
        e.preventDefault();
        $("#overlay").fadeIn('slow');
 
        axios({
            method: 'post',
            url: 'http://localhost:1010/api/login/service/doFirstLogin',
           // headers: {Authorization: `Bearer ${bearerToken}`},
            data: Data,
          })
            .then(function (response) {
                $("#overlay").fadeOut('slow');
             //  console.log("response", JSON.stringify(response.data))
             console.log("response", response.data.message);
             if ( response.data.message =="SUCCESS") {
                localStorage.setItem("sup_id", Data["supplierid"]);
                window.location = "/Setpassword";
              } else {
                document.getElementById("error").textContent += "Invalid Credentials or You already change the password.";
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
 
                        <h3>Welcome to Supplier Portal </h3>
 
                         <span id="error"></span>
                         <div class="form-inputfields">
                        <div class='login-inputfields'>
                            {<FaEnvelope className='Ricons'/>}
                            <input type='text' class="Login-input" name="supplierid" value={Data.supplierName} onChange={handleChange} placeholder='Enter Temporary ID' required/><br/>
                        </div>
                       
                       
                        <div class='login-inputfields'>
                            {<FaLock className='Ricons'/>}
                            <input type='password' class="Login-input" name="temppwd" value={Data.password} onChange={handleChange} placeholder='Temp Password' required/><br/>
                        </div>
                        </div>
 
           
                       
                        <button class='login-btn' onClick={getLoggedin}>Login</button>
                       
                        {/* <div class='login-links'>
                            New User ? <a href='./Registration' class='login-smallLinks'>Click here</a><br/>
                           
                        </div> */}
                    </form>
                </div>
            </div>
    )
};
 
export default Login;