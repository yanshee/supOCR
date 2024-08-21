import React,{useState} from 'react'
import '../../style/ChangePassword.css'
// import image from '../../images/Login-Logo.png'
import image from '../../images/SupplierImage.png'
import {FaLock} from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ChangePassword(props)  
{
    let navigate = useNavigate();
    const pathCompute = `/ChangePasswordConf`
    const [password,setPassword] = useState()
    const [newpassword,setnewPassword] = useState()

    
    function resetPassword(){
        axios({
            method:'put',
            url:`http://localhost:8080/updatePassword/${props.name}`,
            data:{
                "password": password,
                "newpassword": newpassword
            },
        })
        .then(function(response){
            if(password===newpassword){
                navigate(pathCompute);
            }
            else{
                alert("Passwords doesn't match")
            }
            window.location.href='/ChangePasswordConf'
        })
        .catch(function(error){
            console.log("error",error)
        })
    }
    const [Data,setData]=useState({
        "password":'',
        "newpassword":''
    });

    const handleChangePass=(event)=>{
        setPassword(event.target.value)
    };

    
    const handleChangenew=(event)=>{
        setnewPassword(event.target.value)
    };

    const handleSubmit=(event)=>{
        event.preventDefault();
      };
    
  console.log(Data);
    
  return (
        <div class='cp-container'>
            <div class='cp-logo-box'>
                <img src={image} alt='KPMG_logo'/>
            </div>
            <div class='cp-form-box'>
                <form class='cp-form'>
                    
                    <h3>Supplier Portal</h3>

                    <div class='cp-links'>
                        {/* Please enter the new password */}
                        {props.name}
                    </div><br/>
                    
                    <div class='cp-inputfields'>
                        {<FaLock className='Ricons'/>}
                        <input type='password' name="password" value={password} onChange={handleChangePass} placeholder='Enter New Passsword'/>
                    </div>

                    <div class='cp-inputfields'>
                        {<FaLock className='Ricons'/>}
                        <input type='password' name="newpassword" value={newpassword} onChange={handleChangenew} placeholder='Re-enter New Passsword'/>
                    </div>

                    <button class='cp-btn' oClick={resetPassword}>Submit</button>

                </form>
            </div>
        </div>
  )
}

export default ChangePassword