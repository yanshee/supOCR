import React, { useState } from 'react'
import '../../style/Login.css'
// import image from '../../images/Login-Logo.png'
import image from '../../images/SupplierImage.png'
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from 'axios';
import logo from '../../images/KPMGLogo.jpg'
import { useNavigate } from "react-router-dom";
import $ from 'jquery';
 
const Setpassword=()=>
{
    let navigate = useNavigate();
    const pathCompute = `/ChangePassword`
    const [supplierName, setsupplierName] = useState()
    const [password, setpassword] = useState()
   // const id = "1234"
   const id = localStorage.getItem('sup_id');
 
    const [Data,setData]=useState({
        "supplierId": id,
        "passcode": ''
    });
 
   
    function setpasswordfun(e)
    {
        $("#overlay").fadeIn('slow');
       console.log(Data);
        e.preventDefault();
        axios({
            method: 'post',
            url: "http://localhost:1010/api/login/service/doMandatoryPwdReset",
            data:Data,
        })
        .then(function (response) {
            $("#overlay").fadeOut('slow');
              console.log("response", JSON.stringify(response.data))
            console.log("response", response.data);
            if ( response.data =="SUCCESS") {
               window.location = "/SubsLogin";
             } else {
               //  block of code to be executed if the condition is false
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
   
   
    return (
            <div class='login-container'>
                <div class='login-logo-box'>
                    <img src={image} alt='KPMG_logo'/>
                </div>
                {/* <div class='login-form-box'>
                    <form class ='login-form'> */}
                    <div class='login-form-box'>
                    <form class ='login-form'>
                    <div class='KPMG-logo-box'>
                <img class="KPMG_Img" src={logo} alt='KPMG_logo'/>
            </div>
                        <h3>Welcome!  {id} </h3>
                            <div class="form-inputfields">
                        <div class='login-inputfields'>
                            {<FaLock className='Ricons'/>}
                            <input type='password' class="Login-input" onChange={handleChange} name="passcode" placeholder='Enter New Password' required/><br/>
                        </div>
                        <div class='login-inputfields'>
                            {<FaLock className='Ricons'/>}
                            <input type='password' class="Login-input" name="temp_password2"  placeholder='Confirm Password' required/><br/>
                        </div>
 </div>
           
                       
                        <button class='login-btn' onClick={setpasswordfun}>Submit</button>
                       
                       
                    </form>
                </div>
            </div>
    )
};
 
export default Setpassword;