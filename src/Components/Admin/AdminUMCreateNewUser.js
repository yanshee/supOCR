import React, { useState } from 'react'
import OnboardingNav from '../Navbar/OnboardingNav';
import '../../style/AdminMain.css'
import Sidebar from '../Navbar/Sidebar';
import { FaAngleDoubleRight,FaAngleDoubleLeft,FaAngleLeft,FaAngleRight } from "react-icons/fa";


const AdminUMCreateNewUser=()=>
{
    


    return (
        <div>
            <OnboardingNav/>
        <div class="main-container">
           <Sidebar></Sidebar>
            {/* <button class="create-user">
                <label class="create-user-label">Create New User <FaPlusCircle/></label>
            </button> */}
            <div class="admin-header" style={{display:'block',width:'30%',marginLeft:'6%'}}>
            <h2>Create New User</h2>
            <h4>ROLE: ADMIN</h4>
            </div>
            <div class="privileges-div">
            <div class="priviliges">
                <h4 style={{textAlign:'center',marginTop:'5%',marginBottom:'10%'}}>Privileges</h4>
            <input type="text" name="privilegename" class="privilege-input"  required />
            <input type="text" name="privilegename" class="privilege-input" required />
            <input type="text" name="privilegename" class="privilege-input" required />
            <input type="text" name="privilegename" class="privilege-input" required />
            <input type="text" name="privilegename" class="privilege-input" required />
            </div>
            <div class="transfer" style={{display:'flex',flexDirection:'column',height:'30vh',justifyContent:'space-evenly',marginTop:'5%'}}>
            <button type="button" style={{width:'60px'}}><FaAngleRight /></button>
            <button type="button"><FaAngleDoubleRight /></button>
            <button type="button"><FaAngleLeft /></button>
            <button type="button"><FaAngleDoubleLeft /></button></div>
            <div class="assigned-priviliges">
                <h4 style={{textAlign:'center',marginTop:'5%',marginBottom:'10%'}}>Assigned Privileges</h4>
            <input type="text" name="privilegename" class="privilege-input" required />
            <input type="text" name="privilegename" class="privilege-input" required />
            <input type="text" name="privilegename" class="privilege-input" required />
            <input type="text" name="privilegename" class="privilege-input" required />
            <input type="text" name="privilegename" class="privilege-input" required />
            </div>
            </div>
           
            <button class='new-submit-btn' >Submit</button>
        </div>
        </div>
    )
};

export default AdminUMCreateNewUser;