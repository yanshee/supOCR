import React, { useState } from "react";
import "../../style/Registration.css";
import logo from '../../images/KPMGLogo.jpg'
// import image from "../../images/Login-Logo.png";
import image from "../../images/SupplierImage.png";
import { FaEnvelope, FaUserAlt, FaPhone, FaMobileAlt } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import $, { data } from 'jquery';
 
const Registration=()=>
{
  let navigate = useNavigate();
  const pathCompute = `/ChangePassword`
 
    const [supplierName, setsupplierName] = useState()
    const [password, setpassword] = useState()
    const [valid,setValid]=useState(true)
    const [email,setEmail]=useState()
    const [showEmailError,setShowEmailError]=useState(false)

    const [Data,setData]=useState({
        "supplierId": '',
        "supplierName": '',
        "emailId": '',
        "phoneNum": '',
    });

  //  function validateEmail 
    function getRegisterd(e)
    {
        e.preventDefault();
      const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if(emailRegex.test(data.emailId)){
        setValid(false);
        setShowEmailError(true);
      return;
      }
      else{
        setValid(false);
        setShowEmailError(true);
      }
      $("#overlay").fadeIn('slow');
      console.log(Data);
        // e.preventDefault();
        axios({
            method: 'post',
            url: "http://localhost:1010/api/login/service/register",
            data:Data,
        })
        .then(function (response) {
          $("#overlay").fadeOut('slow');
              console.log("response", JSON.stringify(response.data))
            console.log("response", response.data);
            if (response.data) {
               localStorage.setItem("reg_id", response.data);
               window.location = "/RegistrationID";

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
        const inputEmail=value;
        setEmail(inputEmail)
        const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setValid(emailRegex.test(inputEmail))
        if(!emailRegex.test(inputEmail) && event.target.name==='emailId'){
          setShowEmailError(true)
        }
        else{
          setShowEmailError(false)
        }
        setData((prevData)=>({
            ...prevData,
            [name]:value,
        }));
    };

    const handleEmailBlurr=(event)=>{
      if(event.target.name==='emailId'){
        setShowEmailError(!valid)
      }
    }

    const isFormValid=()=>{
      return Object.values(Data).every((value)=>value.trim()!=="");
    }
    return (
        <div class="reg-container">
          <div class="login-logo-box">
            <img src={image} alt="KPMG_logo" />
          </div>
          
          <div class="reg-form-box">
            <form class="reg-form">
            <div class='KPMG-logo-box'>
                <img class="KPMG_Img" src={logo} alt='KPMG_logo'/>
            </div>
              <h3>Please Sign Up</h3>
              
<div class="Registrationdetails">
              <div class="reg-inputfields">
                {<FaUserAlt className="Ricons" />}
                <input type="text" name="supplierId" placeholder="Supplier ID" onChange={handleChange} />
                <br />
              </div>
    
              <div class="reg-inputfields">
                {<FaUserAlt className="Ricons" />}
                <input type="text" name="supplierName" placeholder="Supplier Name" onChange={handleChange} />
                <br />
              </div>
    {showEmailError && <span style={{color:'red'}}>*Invalid Email</span>}
              <div class="reg-inputfields">
                {<FaEnvelope className="Ricons" />}
                <input type="email" name="emailId"  placeholder="Email ID" onChange={handleChange} style={{borderColor:valid?'initial':'red'}} onBlur={handleEmailBlurr}/>
                <br />
              </div>
    
              {/* <div class="reg-inputfields">
                {<FaPhone className="Ricons" />}
                <input type="text" name="landlineNum"  placeholder="Landline Number" onChange={handleChange}  />
                <br />
              </div> */}
    {/* {!valid && <span style={{color:'red',marginTop:'2px'}}>*Invalid email address</span>} */}
              <div class="reg-inputfields">
                {<FaMobileAlt className="Ricons" />}
                <input type="text" name="phoneNum" onChange={handleChange}  placeholder="Phone Number" />
                <br />
              </div>
    
              <div class="reg-checkboxdiv">
                <input type="checkbox" class="reg-chkbox" />
    
                <label >
                  I agree to the{" "}
                  <a href="./Registration" class="smallLinks">
                    terms and conditions
                  </a>
                </label>
                <br />
              </div>
              </div>
              <button class="login-btn"  onClick={getRegisterd} disabled={!isFormValid()}>
                Next{" "}
              </button>
    
              <div class="reg-links">
                Already have an account ?{" "}
                <a href="/subsLogin" class="smallLinks">
                  Click here
                </a>
                <br />
              </div>
            </form>
          </div>
        </div>
      );
};

export default Registration;