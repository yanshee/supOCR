
import React, { useState } from 'react'
import '../../style/OnboardingExtra.css'
import logo from '../../images/KPMGLogo.jpg'
// import image from '../../images/Login-Logo.png'
import image from '../../images/SupplierImage.png'
import { MdOutlineFileUpload,MdOutlineFileDownload } from "react-icons/md";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import $ from 'jquery';
 
const Screen3=()=>
{
    let navigate = useNavigate();
    const pathCompute = `/ChangePassword`
    
    
   
    return (
            <div class='login-container'>
                <div class='onboarding-box'>
                
                </div>
                <div class='onboarding-form-box'>
                    <div class="onboarding-form">
                    <h3>Miscellaneous Information</h3>
                  <p></p>
                    <form>
                        <div class="information-input">
                            
                            <label for="companyName" class="doclabel">Litigation Records <i class="upicon" style={{color:'red'}}> {<MdOutlineFileDownload />} </i></label>
                            
                            
                           <button type="button" class="doc-btn">Attach duly filled copy of litigation record<i class="upicon"> {<MdOutlineFileUpload />} </i></button>
                        </div>

                        <div class="information-input">
                            
                            <label for="companyName" class="doclabel">Non Disclosing Agreement Documents(NDAs) <i class="upicon" style={{color:'red'}}> {<MdOutlineFileDownload />} </i></label>
                            
                            
                           <button type="button" class="doc-btn">Attach duly filled copy of NDA documents<i class="upicon"> {<MdOutlineFileUpload />} </i></button>
                        </div>

                        <div class="information-input">
                            
                            <label for="companyName" class="doclabel">Regulatory compliance Document<i class="upicon" style={{color:'red'}}> {<MdOutlineFileDownload />} </i></label>
                           
                            
                           <button type="button" class="doc-btn">Attach regulatory compliance certificate<i class="upicon"> {<MdOutlineFileUpload />} </i></button>
                        </div>

                        <div class="information-input">
                            
                            <label for="companyName" class="doclabel">Insurance Documents<i class="upicon" style={{color:'red'}}> {<MdOutlineFileDownload />} </i></label>
                           
                            
                            <button type="button" class="doc-btn">Attach insurance documents<i class="upicon"> {<MdOutlineFileUpload />} </i></button>
                        </div>

                        <div class="information-input">
                           
                            <label for="companyName" class="doclabel">Sustainable Sourcing Reports <i class="upicon" style={{color:'red'}}> {<MdOutlineFileDownload />} </i></label>
                            
                            
                            <button type="button" class="doc-btn">Attach sustainable sourcing reports<i class="upicon"> {<MdOutlineFileUpload />} </i></button>
                        </div>


                        <div class="information-input">
                            
                            <label for="companyName" class="doclabel">Sustainable Sourcing Reports<i class="upicon" style={{color:'red'}}> {<MdOutlineFileDownload />} </i></label>
                           
                            
                            <button type="button" class="doc-btn">Attach sustainable sourcing reports<i class="upicon"> {<MdOutlineFileUpload />} </i></button>
                        </div>


                        <button class='next-btn' >Next</button>
                    </form>
                  
                </div>
                 </div>
            </div>
    )
};
 
export default Screen3;