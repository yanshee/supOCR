import React, { useState } from 'react'
import OnboardingNav from '../Navbar/OnboardingNav';
import '../../style/AdminMain.css'
import { FaPlusCircle,FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
// import SideNav from '../Navbar/SideNav';
import Sidebar from '../Navbar/Sidebar';


const AdminUMResetPassword=()=>
{

    return (
        <div>
            <OnboardingNav/>
        <div class="main-container" >
        <Sidebar></Sidebar>
        <h2 style={{textAlign:'center'}}>Reset Password</h2>
                   
         <div className="reset-box">
        <form>
        <label for="userRole">User Role</label>
        <select id="userRole">
        <option value="Select one of the options"></option>
        <option value="Admin User"></option>
        <option value="Finance User"></option>
        <option value="Abc"></option></select>

        <label for="userName">User Name</label>
        <select id="userName">
        <option value="Select one of the options"></option>
        <option value="Admin User"></option>
        <option value="Finance User"></option>
        <option value="Abc"></option></select>

        <label for="userEmail">User Email</label>
        <input type="text" id="userEmail" placeholder="Enter your Email"></input>
        </form>
            
        <button class='reset-password-btn'>Send Link</button>
   
        </div>

        

       </div>
            
        </div>
    )
};

export default AdminUMResetPassword;