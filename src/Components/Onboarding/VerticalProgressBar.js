import React, { useState } from 'react'
import '../../style/OnboardingBankDetails.css'
import OnboardingNav from '../Navbar/OnboardingNav';
import { MdOutlineFileUpload } from "react-icons/md";
import {FaAngleDown} from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { Step, ProgressBar } from "react-step-progress-bar"
import "react-step-progress-bar/styles.css";
import '../../style/Stepper.css'

const verticalProgressBar=()=>
{
   
    return (
        <div class='OnboardingMain-container'>
            <OnboardingNav/>
            <ProgressBar percent={0} filledBackground="#00338E" className="Onboarding-ProgressBar">
                <Step transition="scale">
                {({ accomplished }) => (
                    <div className={`indexedStep ${accomplished ? "accomplished" : null}`} >
                     Organization Details
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
                        Other Information
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
                {/* onChange={handleChange('RegisteredCompanyName')} defaultValue={values.RegisteredCompanyName} */}
            </ProgressBar>
            <div class="onboard-form-box">
            <form class="onboard-form">
            <h3>Basic Organization Information</h3>
                  <p>Tell us about your company to get yourself onboarded to the Supplier Portal</p>
                        <div class="information-input">
                            <div class="information-field">
                            <label for="companyName" class="inputlabel">Registered Company Name</label>
                            <input type="text" id="companyName" name="companyName" class="Inputfield" placeholder="Enter registered Company name here" 
                            />
                            </div>
                            <div class="information-field">
                                <label for="companypan" class="inputlabel">Company Pan Number</label>
                                <input type="text" id="companypan" name="companypan" class="Inputfield" placeholder="Enter company PAN number here"
                               />
                            </div>
                           <button type="button" class="doc-upload-btn">Registration Certificate<i class="upicon"> {<MdOutlineFileUpload />} </i></button>
                        </div>

                        <div class="information-input">
                            <div class="information-field">
                            <label for="companyName" class="inputlabel">GSTIN</label>
                            <input type="text" id="companyName" name="companyName" class="Inputfield" placeholder="Enter Company GSTIN here" 
                            />
                            </div>
                            <div class="information-field">
                                <label for="companypan" class="inputlabel">Organization TIN Number</label>
                                <input type="text" id="companypan" name="companypan" class="Inputfield" placeholder="Enter Company TIN here"
                                />
                            </div>
                           <button type="button" class="doc-upload-btn">Pan Card Copy<i class="upicon"> {<MdOutlineFileUpload />} </i></button>
                        </div>

                        <div class="information-input">
                            <div class="information-field">
                            <label for="companyName" class="inputlabel">Phone Number</label>
                            <input type="text" id="companyName" name="companyName" class="Inputfield"
                            />
                            </div>
                            <div class="information-field">
                                <label for="companypan" class="inputlabel">Alternate Phone Number</label>
                                <input type="text" id="companypan" name="companypan" class="Inputfield" placeholder="Enter alternate number here"
                                />
                            </div>
                           <button type="button" class="doc-upload-btn">Address Proof<i class="upicon"> {<MdOutlineFileUpload />} </i></button>
                        </div>

                        <div class="information-input">
                            <div class="information-field">
                            <label for="companyName" class="inputlabel">Company Email ID</label>
                            <input type="text" id="companyName" name="companyName" class="Inputfield" 
                            />
                            </div>
                            <div class="information-field">
                                <label for="companypan" class="inputlabel">Alternate Email ID</label>
                                <input type="text" id="companypan" name="companypan" class="Inputfield" placeholder="Enter alternate emailId here"
                                />
                            </div>
                        </div>

                        <div class="information-input">
                            <div class="information-field">
                            <label for="companyName" class="inputlabel">Company Registered Address</label>
                            <input type="text" id="companyName" name="companyName" class="addressfield" placeholder="Enter Company registered address here"
                            />
                            </div>
                            <div class="information-field">
                                <label for="companypan" class="inputlabel">Company Correspondence Address</label>
                                <input type="text" id="companypan" name="companypan" class="addressfield" placeholder="Enter Company correspondence address here"
                                />
                            </div> 
                        </div>
                        <h3>SPOC Details</h3>

                        <div class="information-input">
                            <div class="information-field">
                            <label for="companyName" class="inputlabel">SPOC Name</label>
                            <input type="text" id="companyName" name="companyName" class="Inputfield" placeholder="Enter the SPOC name here" 
                            />
                            </div>
                            <div class="information-field">
                                <label for="companypan" class="inputlabel">SPOC Title</label>
                                <input type="text" id="companypan" name="companypan" class="Inputfield" placeholder="Enter the SPOC title here" 
                                />
                            </div>
                           
                        </div>
                        <div class="information-input">
                            <div class="information-field">
                            <label for="companyName" class="inputlabel">SPOC Email ID</label>
                            <input type="text" id="companyName" name="companyName" class="Inputfield" placeholder="Enter the spoc EmailId here" 
                            />
                            </div>
                            <div class="information-field">
                                <label for="companypan" class="inputlabel">SPOC Phone Number</label>
                                <input type="text" id="companypan" name="companypan" class="Inputfield" placeholder="Enter the SPOC contact number here"
                                />
                            </div>
                           
                        </div>

                        <button class='next-btn' >Next</button>
                    </form>
                    </div>
        </div>
    )
};

export default verticalProgressBar;