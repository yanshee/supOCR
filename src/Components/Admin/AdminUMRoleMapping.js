import React, { useState} from 'react'
import {Navigate } from 'react-router-dom'
import OnboardingNav from '../Navbar/OnboardingNav';
import '../../style/AdminMain.css'
import { FaPlusCircle,FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
// import SideNav from '../Navbar/SideNav';
import Sidebar from '../Navbar/Sidebar';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

const AdminUMRoleMapping=()=>
{
    const [isRevertConfirmModalOpen, setIsRevertConfirmModalOpen] = useState(false);
    let navigate=useNavigate();

  const eyeClick=()=>{
    console.log("done")
    navigate('/AdminUMViewDetails')
  }
  const openRevertConfirmModal = () => setIsRevertConfirmModalOpen(true);
  const closeRevertConfirmModal = () => setIsRevertConfirmModalOpen(false);
  
    return (
        <div>
            <OnboardingNav/>
        <div class="main-container" >
        <Sidebar></Sidebar>
        {/* <div class="upper-div"> */}
        <h2 style={{textAlign:'center'}}>Roles & Privileges Mapping</h2>
            {/* <button class="create-user" onClick={openModal}>
                <label class="create-user-label">Create New Temp User <FaPlusCircle/></label>
            </button>
        </div> */}
        
            
    <div className="Admin-table-wrapper">
   <table className="admin-table">

     <thead>
       <tr>

         <th>Serial No.</th>
         <th>Username</th>
         <th>Privileges</th>
       </tr>
     </thead>

     <tbody>

         <tr>
           <td>121</td>
           <td>121</td>
           <td><div class="summary-icon" style={{width:'30%'}}><MdDelete style={{color:"red",width:'30px',height:'25px'}} onClick={openRevertConfirmModal}/><FaEye style={{color:"#00338E",width:'30px',height:'20px'}} onClick={eyeClick()}/></div></td>
         </tr>

     </tbody>
   </table>

   <br />
 </div>

 <Modal
                isOpen={isRevertConfirmModalOpen}
                onRequestClose={closeRevertConfirmModal}
                contentLabel="Revert Confirmation"
                ariaHideApp={false}
                className="Modal"
                overlayClassName="Overlay"
            >
                <h2>Confirmation</h2>
                <p style={{paddingBottom:'5px'}}>Are you sure you want to revert this profile?</p>
                <div className="form-actions">
                    <button type="button" onClick={closeRevertConfirmModal}>Cancel</button>
                    <button type="button">Proceed</button>
                </div>
            </Modal>
       </div>
            
        </div>
    )
};

export default AdminUMRoleMapping;