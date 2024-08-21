import React, { useState } from 'react'
import OnboardingNav from '../Navbar/OnboardingNav';
import '../../style/AdminMain.css'
import { MdAdd } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
// import SideNav from '../Navbar/SideNav';
import Sidebar from '../Navbar/Sidebar';
import Modal from 'react-modal';

const AdminMain=()=>
{
   
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


    return (
        <div>
            <OnboardingNav/>
        <div class="main-container" >
        <Sidebar></Sidebar>
        <div class="upper-div">
        <h2>Temporary Login</h2>
            <button class="create-user" onClick={openModal}>
                <label class="create-user-label">Create New Temp User <FaPlusCircle/></label>
            </button>
        </div>
        
            
    <div className="Admin-table-wrapper">
   <table className="admin-table">

     <thead>
       <tr>

         <th>Serial No</th>
         <th>Organization</th>
         <th>Phone No</th>
         <th>Email Id</th>
         <th>Status</th>
         <th>Action</th>
       </tr>
     </thead>

     <tbody>

         <tr>
           <td>121</td>
           <td>121</td>
           <td>121</td>
           <td>121</td>
           <td>121</td>
           <td>121</td>
         </tr>

     </tbody>
   </table>

   <br />
 </div>
 <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Create New Temporary Login"
                ariaHideApp={false}
                className="Modal"
                overlayClassName="Overlay"
            >
                <h2>Create New Temporary Login</h2>
                <form>
                    <div className="form-group">
                        <label style={{width:'30%'}}>Supplier Name:</label>
                        <input type="text" name="supplierName" required />
                    </div>
                  
                    <div className="form-group">
                        <label style={{width:'30%'}}>Supplier Email ID:</label>
                        <input type="email" name="supplierEmail" required />
                    </div>
                    <div className="form-group">
                        <label style={{width:'30%'}}>Supplier Phone Number:</label>
                        <input type="tel" name="supplierPhone" required />
                    </div>
                    <div className="form-actions">
                        <button type="button" onClick={closeModal}>Cancel</button>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </Modal>

       </div>
            
        </div>
    )
};

export default AdminMain;