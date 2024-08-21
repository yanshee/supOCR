import React, { useState,useEffect} from 'react'
import '../../style/CostChangeAlertButton.css'
import { FaBell,FaUserAlt} from "react-icons/fa";
import '../../style/ProfileDropdown.css'
import userImage from '../../images/UserProfile.jpg'

function ProfileDropdown(){

    
        const [open, setOpen] = useState(false);
    
        const toggleDropdown = () => {
          setOpen(!open);
        };
      

    // function closeOpenDropdowns(e) {
    //     let openDropdownEls = document.querySelectorAll("details.dropdown[open]");
    
    //     if (openDropdownEls.length > 0) {
    //         // If we're clicking anywhere but the summary element, close dropdowns
    //         if (e.target.parentElement.nodeName.toUpperCase() !== "SUMMARY") {
    //             openDropdownEls.forEach((dropdown) => {
    //                 dropdown.removeAttribute("open");
    //             });
    //         }
    //     }
    // }
    
    // document.addEventListener("click", closeOpenDropdowns);
    
  return (
    
       
          <div className="dropdown">
            <img className="userProfileImg" src={userImage} alt='UserProfile'/>
            {open && (
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <p>Jane Doe</p>
                  <p>jane@example.com</p>
                </div>
                <ul>
                  <li>Account</li>
                  <li>Settings</li>
                  <li>Help</li>
                  <li>Logout</li>
                </ul>
              </div>
            )}
          </div>
        
      
    
  )
}

export default ProfileDropdown


// <div class="dropdown-container">
	// 			<details class="dropdown right">
	// 				<summary class="avatar">
    //                 {<FaUserAlt className="Ricons" />}
	// 				</summary>
	// 				<ul>
	// 					<li>
	// 						<p>
	// 							<span class="block bold">Jane Doe</span>
	// 							<span class="block italic">jane@example.com</span>
	// 						</p>
	// 					</li>
	// 					<li>
	// 						<a href="#">
	// 							<span class="material-symbols-outlined"><FaUser></FaUser></span> Account
	// 						</a>
	// 					</li>
	// 					<li>
	// 						<a href="#">
	// 							<span class="material-symbols-outlined">settings</span> Settings
	// 						</a>
	// 					</li>
	// 					<li>
	// 						<a href="#">
	// 							<span class="material-symbols-outlined">help</span> Help
	// 						</a>
	// 					</li>
	// 					<li class="divider"></li>
	// 					<li>
	// 						<a href="#">
	// 							<span class="material-symbols-outlined">logout</span> Logout
	// 						</a>
	// 					</li>
	// 				</ul>
	// 			</details>
	// 		</div>