import React from 'react'
import HomeNav from '../Navbar/HomeNav'
import HomeButton from '../Buttons/HomeButton'
import {FaUserAlt, FaUserCheck, FaBuilding, FaUserEdit} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import '../../style/UserMgmtMain.css'

function UserMgmtMain()
{
    let navigate = useNavigate();
    
    return(
        <div>
            <div>
                <HomeNav/>
            </div>
            <div class='usermgmt-heading'>
                <HomeButton/>
                <div class='usermgmt'>
                    <p>User Management</p>
                </div>
            </div>
    
            <div class='tiles'>
                <div class='tiles-row1'>
                    <div class='Edit-user-tile'>
                        <div class="tile-contents">
                            {<FaUserEdit className='tiles-Ricons'/>}
                            <a href='UMViewUser' class='tiles-component-a'>View/Edit User</a>
                        </div>
                    </div>
                    <div class='Create-user-tile'>
                        <div class="tile-contents">
                            {<FaUserCheck className='tiles-Ricons'/>}
                            <a href='UMCreateUser' class='tiles-component-a'>Create User</a>
                        </div>
                    </div>
                </div>
                <div class='tiles-row2'>
                    <div class='Remove-user-tile'>
                        <div class="tile-contents">
                            {<FaUserAlt className='tiles-Ricons'/>}
                            <a href='UMViewUser' class='tiles-component-a'>Delete User</a>
                        </div>    
                    </div>
                    <div class='Supplier-site-tile' onClick={()=>navigate(`/UMViewSites`)}>
                        <div class="tile-contents">
                            {<FaBuilding className='tiles-Ricons'/>}
                            <a href='' class='tiles-component-a'>Supplier Site</a>
                        </div>    
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default UserMgmtMain