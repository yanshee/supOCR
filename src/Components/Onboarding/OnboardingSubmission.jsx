import React, { useState,useEffect } from 'react'
import '../../style/OnboardingSubmission.css'
import OnboardingNav from '../Navbar/OnboardingNav';
import { Step, ProgressBar } from "react-step-progress-bar"
import "react-step-progress-bar/styles.css";
import '../../style/Stepper.css'
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

const OnboardingSubmission=( { prevStep, nextStep, handleChange, values } )=>
{
    const Previous = e => 
    {
        e.preventDefault();
        prevStep();
    }

    const Continue = e => 
    {
        e.preventDefault();
        nextStep();
    }

    const reg_id = localStorage.getItem('reg_id');
    const onboarding_msg = localStorage.getItem('onboarding_msg');

    const [currentData, setcurrentData] = useState(null);

    useEffect(() => {
        const itemdata = async () => {
                 await axios
        .post("http://localhost:1010/api/login/service/viewOnboardingDetails?registrationId="+reg_id+"")
        .then((res) => {
            setcurrentData(res.data)
           console.log(res.data['onboarding_status'])
           if ( res.data['onboarding_status'] =="COMPLETED") {
            window.location = "/Dashboard";
          } 
        }).catch((err) => {
           console.log(err);
    })
        }

        itemdata()
     },[])
   
    return (
        <div class='OnboardingMain-container'>
            <OnboardingNav/>
            <ProgressBar percent={100} filledBackground="#00338E" className="Onboarding-ProgressBar">
                <Step transition="scale">
                {({ accomplished }) => (
                    <div className={`indexedStep ${accomplished ? "accomplished" : null}`} >
                        Business Information
                    </div>
                )} 
                </Step>
                <Step transition="scale">
                {({ accomplished }) => (
                    <div className={`indexedStep ${accomplished ? "accomplished" : null}`} >
                        Document Upload
                    </div>
                )} 
                </Step>
                <Step transition="scale">
                {({ accomplished }) => (
                    <div className={`indexedStep ${accomplished ? "accomplished" : null}`} >
                        Bank Details
                    </div>
                )} 
                </Step>
                <Step transition="scale">
                {({ accomplished }) => (
                    <div className={`indexedStep ${accomplished ? "accomplished" : null}`} >
                        Summary
                    </div>
                )} 
                </Step>
                <Step transition="scale">
                {({ accomplished }) => (
                    <div className={`indexedStep ${accomplished ? "accomplished" : null}`} >
                        Pending Verification
                    </div>
                )} 
                </Step>
            </ProgressBar>
            <div class='OBDoc-backBtn-container'>
                <a href='/onboarding' className='OBOBDoc-backBtn'> <i>{<FaArrowLeft/>}</i>  Back </a>
            </div>
            <div className='OnboardingSub-Title'>
                
                {
                !currentData?.onboarding_msg? (<p>Thank you for your Submission . Verification will commence soon. <a href='/SubsLogin'>Login</a> to check the progress</p>)
               : <b>Verification Message - <input class="onboarding_message" type="text" value={currentData?.onboarding_msg} disabled></input></b>}
                <br/>
                
            </div>
           
            <div class='OnboardingSubmission-form-box'>
          
               <h2>Bank Details</h2>
                <p>Bank Name : {currentData?.bankName}</p>
                <p>Account No. : {currentData?.accountNo}</p>
                <p>IFSC Code : {currentData?.ifscCode}</p>
                <p>City  : {currentData?.city}</p>
                <p>State : {currentData?.state}</p>

                <h2>Basic Info</h2>
                <p>Onboarding Status : {currentData?.onboarding_status}</p>
                <p>Registration Id : {currentData?.regsitration_id}</p>
                <p>Company Name : {currentData?.company_name}</p>
                <p>Company Contact No : {currentData?.company_contact_no}</p>
                <p>GST : {currentData?.gstin}</p>

                <p>TIN : {currentData?.tin}</p>
                <p>Currency : {currentData?.currency}</p>
                <p>Registered Address : {currentData?.registered_addr}</p>
                <p>Correspondance Address : {currentData?.correspondance_addr}</p>

                <h2>Spoc Details</h2>
                <p>Spoc Name : {currentData?.spoc_name}</p>
                <p>Spoc Title : {currentData?.spoc_title}</p>
                <p>Spoc Contact : {currentData?.spoc_contact}</p>
                <p>Spoc Email : {currentData?.spoc_email}</p>
             
            </div>
        </div>
    )
};

export default OnboardingSubmission;