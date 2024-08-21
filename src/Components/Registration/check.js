import React, { useState } from "react";
import "../../style/Registration.css";
import image from "../../images/Login-Logo.png";
import { FaEnvelope, FaUserAlt, FaPhone, FaMobileAlt } from "react-icons/fa";
import axios from "axios";
import { get } from "react-hook-form";
import { useNavigate } from "react-router-dom";


function RegistrationNew(){
    let navigate = useNavigate();
    const [supplierName,setsupplierName] = useState()
    const [email,setemail] = useState()
    const [landline,setlandline] = useState()
    const [mobile,setmobile] = useState()

    
   function register(){
    axios({ 
        method: 'post',
        url: "http://localhost:8080/api/auth/signup",
        // headers: {
        //     Authorization: `Bearer ${bearerToken}`,
        // },
        // data: { "supplierName":"Monika",
        // "email":"monika@gmail.com",
        // "landline":"234561",
        // "mobile":"2345161789"}
        data:Data,
    })
        .then(function (response) {
           // alert("response", JSON.stringify(response.data))
            const result=  axios.post( `http://localhost:8080/api/auth/sendMail/${Data.supplierName}`)
            //alert("result",result)
            // const pathCompute = `/RegistrationID`
            // navigate(pathCompute);
        })
        .catch(function (error) {
            console.log("error", error)
              alert("Invalid Credentials")
        })

         const pathCompute = `/RegistrationID`
            navigate(pathCompute);
   }
   
   

 const [Data,setData]=useState({
        "supplierName": '',
        "email": '',
        "landline":'',
        "mobile":'',
        "role": ['',"user"]
      });

function emailValidation(){
    axios({
        method: 'post',
        url: `http://localhost:8080/api/auth/sendMail/${Data.supplierName}`,

    })
        .then(function (response) {
            console.log("response", JSON.stringify(response.data))
             alert("Success") 
            
        })
        .catch(function (error) {
            console.log("error", error)
              alert("Failed to send")
        })
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
        <div class="reg-container">
          <div class="reg-logo-box">
            <img src={image} alt="KPMG_logo" />
          </div>
          
          <div class="reg-form-box">
            <form class="reg-form">
              <h3>New Registration</h3>
    
              <div class='reg-inputfields'>
                            {<FaUserAlt className='Ricons'/>}
                            <input type='text' name="supplierName" value={Data.supplierName} onChange={handleChange} placeholder='Supplier Name' required/><br/>
                        </div>

                        <div class='reg-inputfields'>
                            {<FaEnvelope className='Ricons'/>}
                            <input type='email' name="email"  required="true" value={Data.email} onChange={handleChange} placeholder='Email ID'/><br/>
                        </div>
                        
                        <div class='reg-inputfields'>
                            {<FaPhone className='Ricons'/>}
                            <input type='text' name="landline"  required="true" value={Data.landline} onChange={handleChange} placeholder='Landline Number'/><br/>
                        </div>

                        <div class='reg-inputfields'>
                            {<FaMobileAlt className='Ricons'/>}
                            <input type='text' name="mobile"  required="true" value={Data.mobile} onChange={handleChange} placeholder='Phone Number'/><br/>
                        </div>

                        <div>
                            <input type='checkbox' class='reg-chkbox'/>
                            <lable>I agree to the <a href='./Registration' class='smallLinks'>terms and conditions</a>
                            </lable>
                            <br/>
                        </div>
                    
                        <button class='reg-btn' onClick={register}>  Next </button>

                        <div class='reg-links'>
                            Already have an account ? <a href='/' class='smallLinks'>Click here</a><br/>
                        </div>
                        
                    </form>
                </div>
            </div>
      );
    }
    export default RegistrationNew;
