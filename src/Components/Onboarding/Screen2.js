
import React, { useState } from 'react'
import logo from '../../images/KPMGLogo.jpg'
import image from '../../images/SupplierImage.png'
import { MdOutlineFileUpload } from "react-icons/md";
import {FaAngleDown} from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import $ from 'jquery';
 
const Screen2=()=>
{
    let navigate = useNavigate();
    const pathCompute = `/ChangePassword`
    
    const options=['cheque','RTGS','IMPS','NEFT Transfer']
    const[isOpen,setIsOpen]=useState(false)
    const[selectedOptions,setSelectedOptions]=useState([]);

    
   
    const toggleDropdown=()=>{
        setIsOpen(!isOpen);
    };

    const handleOptionClick=(option)=>{
        setSelectedOptions((prevSelected)=>prevSelected.includes(option)
        ?prevSelected.filter((item)=>item!==option):[...prevSelected,option]);
    }

     const isSelected=(option)=>selectedOptions.includes(option)
    
    return (
        <div class='login-container'>
        <div class='onboarding-box-bank'>
        
        </div>
        <div class='onboarding-form-box-bank'>
            <div class="onboarding-form-bank">
            <h3>Bank Account Details</h3>
          <p>Add your bank account details to get onboarded to Supplier Portal</p>
    
            <form>
                <div class="information-input">
                    <div class="information-field">
                    <label for="companyName" class="inputlabel">Bank Name</label>
                    <input type="text" id="companyName" name="companyName" class="Inputfield" placeholder="Enter Bank Name here" />
                    </div>
                   <button type="button" class="doc-upload-btn">Attach Cancelled Cheque<i class="upicon"> {<MdOutlineFileUpload />} </i></button>
                </div>

                <div class="information-input">
                    <div class="information-field">
                    <label for="companyName" class="inputlabel">Bank Account Number</label>
                    <input type="text" id="companyName" name="companyName" class="Inputfield" placeholder="Enter Bank Account Number here" />
                    </div>
                    
                   <button type="button" class="doc-upload-btn">Attach Copy of Passbook<i class="upicon"> {<MdOutlineFileUpload />} </i></button>
                </div>

                <div class="information-input">
                    <div class="information-field">
                    <label for="companyName" class="inputlabel">IFSC Code</label>
                    <input type="text" id="companyName" name="companyName" class="Inputfield" placeholder="Enter IFSC Code here" />
                    </div>
                    
                   <button type="button" class="doc-upload-btn">Attach Financial records/Credit history<i class="upicon"> {<MdOutlineFileUpload />} </i></button>
                </div>

                <div class="information-input">
                    <div class="information-field">
                    <label for="companyName" class="inputlabel">Bank Account Holder Name</label>
                    <input type="text" id="companyName" name="companyName" class="Inputfield" placeholder="Enter Account Holder Name here" />
                    </div>
                    <div class="information-field">
                        <label for="companypan" class="inputlabel">Branch Name</label>
                        <input type="text" id="companypan" name="companypan" class="Inputfield" placeholder="Enter Bank Branch Name here"/>
                    </div>
                </div>

                <div class="information-input">
                    <div class="information-field">
                    <label for="companyName" class="inputlabel">City</label>
                    <input type="text" id="companyName" name="companyName" class="Inputfield" placeholder="Enter City Name here"/>
                    </div>
                    <div class="information-field">
                        <label for="companypan" class="inputlabel">State</label>
                        <input type="text" id="companypan" name="companypan" class="Inputfield" placeholder="Enter State Name here"/>
                    </div> 
                </div>
                
                <div class="information-input">
                    <div class="information-field">
                    <label for="companyName" class="inputlabel">Payment Mode</label>
                    <div class="dropdown-field">
                    <div class="dropdown-toggle">
                    {selectedOptions.length>0?selectedOptions.join(','):'Select your preferred Mode of payment'}
                    <FaAngleDown onClick={toggleDropdown} className="dropdown-toggle"/>
                    
                    </div>
                    {isOpen && (
                                    <ul className="dropdown-menu">
                                        {options.map((option) => (
                                            <li key={option} className="dropdown-item">
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected(option)}
                                                        onChange={() => handleOptionClick(option)}
                                                    />
                                                    {option}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
      )}

                    </div>
                </div>
</div>
                        <div class="bottom-btn">
                            <button class='back-btn' >Back</button>
                            <button class='back-btn' >Next</button>
                        </div>
                
            </form>
          
        </div>
         </div>
    </div>
    )
};
 
export default Screen2;