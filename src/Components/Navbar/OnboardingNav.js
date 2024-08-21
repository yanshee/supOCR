import React, { useState,useEffect} from 'react'
import logo from '../../images/KPMG-logo.jpg'
import '../../style/ProfileDropdown.css'
import userImage from '../../images/UserProfile.png'
// import ProfileDropdown from '../Buttons/ProfileDropdown';
import '../../style/OnboardingNav.css'
import { IoSettings} from "react-icons/io5";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { RiLogoutCircleRLine } from "react-icons/ri";
import {FaPowerOff,FaInfoCircle,FaBell,FaUserAlt} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function OnboardingNav() {
    let navigate = useNavigate();

    const performNavigation=()=>{
        navigate('/SubsLogin')
    }

    const [open, setOpen] = useState(false);
    
        const toggleDropdown = () => {
          setOpen(!open);
        };
      
  return (
    <div class='OnboardingNav-container'>
        <div class='OnboardingNav-topline'>
        <div class='OnboardingNav-logo-box'>
                <img src={logo} alt='KPMG_logo' class='OnboardingNav-logo'/>
            </div>
            <div class='OnboardingNav-heading'>
                <p>Supplier Portal</p>
            </div>
            
            <div class='OnboardingNav-component'>
                <div class='OnboardingNav-component-content'>
                    
                    {/* <div class='OnboardingNav-component-About'>
                        {<FaInfoCircle className='OnboardingNav-Ricons'/>}
                        <a class='OnboardingNav-component-a'>About</a>
                    </div> */}
                    <div class='OnboardingNav-component-Logout' >

                    <div className="dropdown">
                        
                    <div class="Image-div">
                        <FaBell className="BellImg"/>
                        </div>
                        
                        <div class="notification-div">
                        <img className="userProfileImg" src={userImage} alt='UserProfile' onClick={toggleDropdown}/>
                        </div>
           
            {open && (
              <div className="dropdown-menu-profile">
                <div className="dropdown-header">
                  <p>Jane Doe</p>
                  <p>jane@example.com</p>
                </div>
                <ul>
                  <li><div class="limenu"><FaUserAlt className="liImg"></FaUserAlt>Account</div></li>
                  <li><div class="limenu"><IoSettings className="liImg"/>Settings</div></li>
                  <li><div class="limenu"><IoMdHelpCircleOutline className="liImg"/>Help</div></li>
                  <hr></hr>
                  <li><div class="limenu" onClick={()=>navigate(`/SubsLogin`)}><RiLogoutCircleRLine className="liImg"/>Logout</div></li>
                </ul>
              </div>
            )}
          </div>
        
                        {/* {<FaPowerOff className='OnboardingNav-Ricons'/>}
                        <a class='OnboardingNav-component-a'>Logout</a>
                        <ProfileDropdown></ProfileDropdown> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OnboardingNav