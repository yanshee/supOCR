import React, { useState } from 'react'
import '../../style/OnboardingMain.css'
import { MdOutlineFileUpload } from "react-icons/md";
import OnboardingNav from '../Navbar/OnboardingNav';
import { Step, ProgressBar } from "react-step-progress-bar"
import "react-step-progress-bar/styles.css";
import '../../style/Stepper.css'
import { MdUploadFile } from "react-icons/md";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const OnboardingMain=({ nextStep, handleChange, values })=>
{
    const Continue = e => {
        e.preventDefault();
        nextStep();
    }
    

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
                            <input type="text" id="companyName" name="companyName" class="Inputfield" placeholder="Enter registered Company Name here" 
                            onChange={handleChange('RegisteredCompanyName')} defaultValue={values.RegisteredCompanyName}/>
                            </div>
                            <div class="information-field">
                                <label for="companypan" class="inputlabel">Company PAN Number</label>
                                <input type="text" id="companypan" name="companypan" class="Inputfield" placeholder="Enter Company PAN Number here"
                                onChange={handleChange('CompanyPanNumber')} defaultValue={values.CompanyPanNumber}/>
                            </div>
                            <div class="information-field-new">
                                <label for="companypan" class="inputlabel">Company Registration Certificate</label>
                               <div class="file-upload-new"><input type="file" id="uploadReg" hidden onChange={handleChange('RegistrationCertificate')} defaultValue={values.RegistrationCertificate}/>
<label for="uploadReg" class="btnLabel" style={{display:'flex',alignItems:"center",justifyContent:"space-between"}}><CloudUploadIcon />Choose file</label><span>
                                {(values.RegistrationCertificate).split('\\').pop()}</span></div> 
                                {/* <input type='file' name='InsuranceDoc' class="doc-upload-btn" hidden onChange={handleChange('RegistrationCertificate')} defaultValue={values.InsuranceDoc}/>
                                <MdUploadFile style={{ paddingRight: "5px", marginBlock: "-2px" }} onClick={()=>(handleChange('RegistrationCertificate'),console.log("CLicked"))}/> */}
             
                            </div>
                            
                           
                            
                           {/* <button type="button" class="doc-upload-btn">Registration Certificate<i class="upicon" onChange={handleChange('RegistrationCertificate')}> {<MdOutlineFileUpload />} </i></button> */}
                        </div>

                        <div class="information-input">
                            <div class="information-field">
                            <label for="companyName" class="inputlabel">GSTIN</label>
                            <input type="text" id="companyName" name="companyName" class="Inputfield" placeholder="Enter Company GSTIN here" 
                            onChange={handleChange('GSTIN')} defaultValue={values.GSTIN}/>
                            </div>
                            <div class="information-field">
                                <label for="companypan" class="inputlabel">Organization TIN Number</label>
                                <input type="text" id="companypan" name="companypan" class="Inputfield" placeholder="Enter Company TIN here"
                                onChange={handleChange('TIN')} defaultValue={values.TIN}/>
                            </div>
                            <div class="information-field-new">
                                <label for="companypan" class="inputlabel">PAN Card Copy</label>
                                <div class="file-upload-new"><input type="file" id="uploadPan" hidden onChange={handleChange('PanCardCopy')} defaultValue={values.PanCardCopy}/>
<label for="uploadPan" class="btnLabel" style={{display:'flex',alignItems:"center",justifyContent:"space-between"}}><CloudUploadIcon />Choose file</label><span>
                                {(values.PanCardCopy).split('\\').pop()}</span></div>
                                {/* <input type='file' name='PanCardCopy' class="doc-upload-btn" onChange={handleChange('PanCardCopy')} defaultValue={values.InsuranceDoc}/>
                            </div> */}
                           {/* <button type="button" class="doc-upload-btn">Pan Card Copy<i class="upicon" onChange={handleChange('PanCardCopy')}> {<MdOutlineFileUpload />} </i></button> */}
                        </div>
                      </div> 
                        <div class="information-input">
                            <div class="information-field">
                            <label for="companyName" class="inputlabel">Phone Number</label>
                            <input type="text" id="companyName" name="companyName" class="Inputfield" placeholder="Enter Company Contact Number here"
                            onChange={handleChange('CompanyContactNumber')} defaultValue={values.CompanyContactNumber}/>
                            </div>
                            <div class="information-field">
                                <label for="companypan" class="inputlabel">Alternate Phone Number</label>
                                <input type="text" id="companypan" name="companypan" class="Inputfield" placeholder="Enter Alternate Number here"
                                onChange={handleChange('AlternateContactNumber')} defaultValue={values.AlternateContactNumber}/>
                            </div>
                            <div class="information-field-new">
                                <label for="companypan" class="inputlabel">Address Proof</label>
                                <div class="file-upload-new" ><input type="file" class="doc-upload-btn" id="uploadAddress" hidden onChange={handleChange('AdrressProof')} defaultValue={values.AdrressProof}/>
<label for="uploadAddress" class="btnLabel" style={{display:'flex',alignItems:"center",justifyContent:"space-between"}}><CloudUploadIcon/>Choose file</label><span>
                                {(values.AdrressProof).split('\\').pop()}</span></div>
                                {/* <input type='file' name='AdrressProof' class="doc-upload-btn" onChange={handleChange('AdrressProof')} defaultValue={values.InsuranceDoc}/> */}
                            
                           {/* <button type="button" class="doc-upload-btn">Address Proof<i class="upicon" onChange={handleChange('AdrressProof')}> {<MdOutlineFileUpload />} </i></button> */}
                        </div>
                        </div>
                        <div class="information-input">
                            <div class="information-field">
                            <label for="companyName" class="inputlabel">Company Email ID</label>
                            <input type="text" id="companyName" name="companyName" class="Inputfield" placeholder="Enter Company Email Id here"
                            onChange={handleChange('CompanyEmail')} defaultValue={values.CompanyEmail}/>
                            </div>
                            <div class="information-field">
                                <label for="companypan" class="inputlabel">Alternate Email ID</label>
                                <input type="text" id="companypan" name="companypan" class="Inputfield" placeholder="Enter Alternate Email Id here"
                                onChange={handleChange('AlternateEmail')} defaultValue={values.AlternateEmail}/>
                            </div>
                        </div>

                        <div class="information-input">
                            <div class="information-field">
                            <label for="companyName" class="inputlabel">Company Registered Address</label>
                            <input type="text" id="companyName" name="companyName" class="addressfield" placeholder="Enter Company Registered Address here"
                            onChange={handleChange('CompanyRegisteredAddress')} defaultValue={values.CompanyRegisteredAddress}/>
                            </div>
                            <div class="information-field">
                                <label for="companypan" class="inputlabel">Company Correspondence Address</label>
                                <input type="text" id="companypan" name="companypan" class="addressfield" placeholder="Enter Company Correspondence Address here"
                                onChange={handleChange('CorrespondenceAddress')} defaultValue={values.CorrespondenceAddress}/>
                            </div> 
                        </div>
                        <h3>SPOC Details</h3>

                        <div class="information-input">
                            <div class="information-field">
                            <label for="companyName" class="inputlabel">SPOC Name</label>
                            <input type="text" id="companyName" name="companyName" class="Inputfield" placeholder="Enter the SPOC Name here" 
                            onChange={handleChange('SpocName')} defaultValue={values.SpocName} />
                            </div>
                            <div class="information-field">
                                <label for="companypan" class="inputlabel">SPOC Title</label>
                                <input type="text" id="companypan" name="companypan" class="Inputfield" placeholder="Enter the SPOC Title here" 
                                onChange={handleChange('SpocTitle')} defaultValue={values.SpocTitle}/>
                            </div>
                           
                        </div>
                        <div class="information-input">
                            <div class="information-field">
                            <label for="companyName" class="inputlabel">SPOC Email ID</label>
                            <input type="text" id="companyName" name="companyName" class="Inputfield" placeholder="Enter the Spoc Email Id here" 
                            onChange={handleChange('SpocEmailID')} defaultValue={values.SpocEmailID}/>
                            </div>
                            <div class="information-field">
                                <label for="companypan" class="inputlabel">SPOC Phone Number</label>
                                <input type="text" id="companypan" name="companypan" class="Inputfield" placeholder="Enter the SPOC Contact Number here"
                                onChange={handleChange('SpocContactNumber')} defaultValue={values.SpocContactNumber} />
                            </div>
                           
                        </div>

                        <button class='next-btn' onClick={Continue}>Next</button>
                    </form>
        </div>
        </div>
    )
};

export default OnboardingMain;