import React, { useState } from 'react'
import OnboardingNav from '../Navbar/OnboardingNav';
import '../../style/AdminMain.css'
import { MdAdd } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import Sidebar from '../Navbar/Sidebar';
import Modal from 'react-modal';

const AdminApprovals=()=>
{
    const [isRevertConfirmModalOpen, setIsRevertConfirmModalOpen] = useState(false);
    const [isRevertInfoModalOpen, setIsRevertInfoModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const openRevertConfirmModal = () => setIsRevertConfirmModalOpen(true);
    const closeRevertConfirmModal = () => setIsRevertConfirmModalOpen(false);

    const openRevertInfoModal = () => {
        setIsRevertConfirmModalOpen(false);
        setIsRevertInfoModalOpen(true);
    };
    const closeRevertInfoModal = () => setIsRevertInfoModalOpen(false);

    const openSuccessModal = () => {
        setIsRevertInfoModalOpen(false);
        setIsSuccessModalOpen(true);
    };
    const closeSuccessModal = () => setIsSuccessModalOpen(false);


    return (
        <div>
            <OnboardingNav/>
        <div class="main-container">
           <Sidebar></Sidebar>
            {/* <button class="create-user">
                <label class="create-user-label">Create New User <FaPlusCircle/></label>
            </button> */}
            
            <h2 style={{marginLeft:'5%',marginTop:'2%'}}>APPROVALS</h2>
            <div class="summary-onboard">
            
                <div class="left-summary"></div>
                <div class="right-summary-main">
                    <div class="right-summary">
                    
                    </div>
                    <div class="bottom-new-btn">
                    <button class='reject-revert-btn'>Reject</button>
                    <button class='reject-revert-btn' onClick={openRevertConfirmModal}>Revert</button>
                    <button class='reject-revert-btn'>Accept</button>
                    </div>
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
                    <button type="button" onClick={openRevertInfoModal}>Proceed</button>
                </div>
            </Modal>

            <Modal
                isOpen={isRevertInfoModalOpen}
                onRequestClose={closeRevertInfoModal}
                contentLabel="Revert Profile"
                ariaHideApp={false}
                className="Modal"
                overlayClassName="Overlay"
            >
                <h2>Revert Profile</h2>
                <form>
                    <div className="form-group">
                        <label style={{width:'30%'}}>Reason Code:</label>
                        <select name="reasonCode" required>
                            <option value="">Select reason</option>
                            <option value="reason1">Reason 1</option>
                            <option value="reason2">Reason 2</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label style={{width:'30%'}}>Comments:</label>
                        <textarea style={{width:'62%',height:'10%'}}name="comments" required></textarea>
                    </div>
                    <div className="form-actions">
                        <button type="button" onClick={closeRevertInfoModal}>Cancel</button>
                        <button type="button" onClick={openSuccessModal}>Revert</button>
                    </div>
                </form>
            </Modal>

            <Modal
                isOpen={isSuccessModalOpen}
                onRequestClose={closeSuccessModal}
                contentLabel="Success"
                ariaHideApp={false}
                className="Modal"
                overlayClassName="Overlay"
            >
                <h2>Information</h2>
                <p>The profile has been successfully reverted.</p>
                <div className="form-actions">
                    <button type="button" onClick={closeSuccessModal}>OK</button>
                </div>
            </Modal>

        </div>
        
        </div>
        </div>
    )
};

export default AdminApprovals;