
import React, { useState } from 'react'
import '../../style/OnboardingExtra.css'
import logo from '../../images/KPMGLogo.jpg'
// import image from '../../images/Login-Logo.png'
import image from '../../images/SupplierImage.png'
import { MdOutlineFileUpload } from "react-icons/md";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import $ from 'jquery';
 
const Screen1=()=>
{
    let navigate = useNavigate();
    const pathCompute = `/ChangePassword`
    
    
   
    return (
            <div class='login-container'>
                <div class='onboarding-box'>
                
                </div>
                <div class='onboarding-form-box'>
                    <div class="onboarding-form">
                    <h3>Basic Organization Information</h3>
                  <p>Tell us about your company to get yourself onboarded to the Supplier Portal</p>
            
                    <form>
                        <div class="information-input">
                            <div class="information-field">
                            <label for="companyName" class="inputlabel">Registered Company Name</label>
                            <input type="text" id="companyName" name="companyName" class="Inputfield" placeholder="Enter registered Company name here" />
                            </div>
                            <div class="information-field">
                                <label for="companypan" class="inputlabel">Company Pan Number</label>
                                <input type="text" id="companypan" name="companypan" class="Inputfield" placeholder="Enter company pan number here"/>
                            </div>
                           <button type="button" class="doc-upload-btn">Attach Company Registration Certificate<i class="upicon"> {<MdOutlineFileUpload />} </i></button>
                        </div>

                        <div class="information-input">
                            <div class="information-field">
                            <label for="companyName" class="inputlabel">GSTIN</label>
                            <input type="text" id="companyName" name="companyName" class="Inputfield" placeholder="Enter Company gstin here" />
                            </div>
                            <div class="information-field">
                                <label for="companypan" class="inputlabel">Organization TIN Number</label>
                                <input type="text" id="companypan" name="companypan" class="Inputfield" placeholder="Enter Company tin here"/>
                            </div>
                           <button type="button" class="doc-upload-btn">Attach Pan Card Copy<i class="upicon"> {<MdOutlineFileUpload />} </i></button>
                        </div>

                        <div class="information-input">
                            <div class="information-field">
                            <label for="companyName" class="inputlabel">Phone Number</label>
                            <input type="text" id="companyName" name="companyName" class="Inputfield"/>
                            </div>
                            <div class="information-field">
                                <label for="companypan" class="inputlabel">Alternate Phone Number</label>
                                <input type="text" id="companypan" name="companypan" class="Inputfield" placeholder="Enter alternate number here"/>
                            </div>
                           <button type="button" class="doc-upload-btn">Attach Address Proof<i class="upicon"> {<MdOutlineFileUpload />} </i></button>
                        </div>

                        <div class="information-input">
                            <div class="information-field">
                            <label for="companyName" class="inputlabel">Company Email ID</label>
                            <input type="text" id="companyName" name="companyName" class="Inputfield" />
                            </div>
                            <div class="information-field">
                                <label for="companypan" class="inputlabel">Alternate Email ID</label>
                                <input type="text" id="companypan" name="companypan" class="Inputfield" placeholder="Enter alternate emailId here"/>
                            </div>
                        </div>

                        <div class="information-input">
                            <div class="information-field">
                            <label for="companyName" class="inputlabel">Company Registered Address</label>
                            <input type="text" id="companyName" name="companyName" class="addressfield" placeholder="Enter Company registered address here"/>
                            </div>
                            <div class="information-field">
                                <label for="companypan" class="inputlabel">Company Correspondence Address</label>
                                <input type="text" id="companypan" name="companypan" class="addressfield" placeholder="Enter Company correspondence address here"/>
                            </div> 
                        </div>
                        <h3>SPOC Details</h3>

                        <div class="information-input">
                            <div class="information-field">
                            <label for="companyName" class="inputlabel">SPOC Name</label>
                            <input type="text" id="companyName" name="companyName" class="Inputfield" placeholder="Enter the SPOC name here"  />
                            </div>
                            <div class="information-field">
                                <label for="companypan" class="inputlabel">SPOC Title</label>
                                <input type="text" id="companypan" name="companypan" class="Inputfield" placeholder="Enter the SPOC title here" />
                            </div>
                           
                        </div>
                        <div class="information-input">
                            <div class="information-field">
                            <label for="companyName" class="inputlabel">SPOC Email ID</label>
                            <input type="text" id="companyName" name="companyName" class="Inputfield" placeholder="Enter the spoc EmailId here" />
                            </div>
                            <div class="information-field">
                                <label for="companypan" class="inputlabel">SPOC Phone Number</label>
                                <input type="text" id="companypan" name="companypan" class="Inputfield" placeholder="Enter the SPOC contact number here" />
                            </div>
                           
                        </div>

                        <button class='next-btn' >Next</button>
                    </form>
                  
                </div>
                 </div>
            </div>
    )
};
 
export default Screen1;