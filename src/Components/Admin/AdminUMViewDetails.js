import React, { useState } from 'react'
import OnboardingNav from '../Navbar/OnboardingNav';
import '../../style/AdminMain.css'
import Sidebar from '../Navbar/Sidebar';
import { FaAngleDoubleRight,FaAngleDoubleLeft,FaAngleLeft,FaAngleRight } from "react-icons/fa";


const AdminUMViewDetails=()=>
{
    


    return (
        <div>
            <OnboardingNav/>
        <div class="main-container">
           <Sidebar></Sidebar>
            
            <div class="admin-header" style={{display:'block'}}>
            <h2 style={{textAlign:'center'}}>User Management</h2>
            <div class="roles" style={{display:'flex', flexDirection:'row',width:'30vw',justifyContent:'space-between',marginLeft:'35%'}}>
            <h4>ROLE: ADMIN</h4>
            <h4>Username: ADMIN</h4>
            </div>
            <div class="view-priviliges-details">
                <h4 style={{textAlign:'center',paddingTop:'10px'}}>Assigned Privileges</h4>
                <div class="assigned-privileges-field">
                    <div class="first-row">
                        <input type="text"></input>
                        <input type="text"></input>
                        <input type="text"></input>
                    </div>

                    <div class="first-row">
                        <input type="text"></input>
                        <input type="text"></input>
                        <input type="text"></input>
                    </div>

                    <div class="first-row">
                        <input type="text"></input>
                        <input type="text"></input>
                        
                    </div>
                    <div class="first-row">
                        <input type="text"></input>
                        <input type="text"></input>
                        
                    </div>
                </div>
            </div>
            </div>
            
        </div>
        </div>
    )
};

export default AdminUMViewDetails;