import React, { useState } from 'react'
import '../../style/OnboardingBankDetails.css'
import OnboardingNav from '../Navbar/OnboardingNav';
import { MdOutlineFileUpload } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { Step, ProgressBar } from "react-step-progress-bar"
import "react-step-progress-bar/styles.css";
import '../../style/Stepper.css'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const OnboardingBankDetails = ({ prevStep, nextStep, handleChange, values }) => {
    const Continue = e => {
        e.preventDefault();
        nextStep();
    }

    const Previous = e => {
        e.preventDefault();
        prevStep();
    }


    const options = ['Cheque', 'RTGS', 'IMPS', 'NEFT Transfer']
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState([]);



    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOptions((prevSelected) => prevSelected.includes(option)
            ? prevSelected.filter((item) => item !== option) : [...prevSelected, option]);
    }

    const isSelected = (option) => selectedOptions.includes(option)

    return (
        <div>
            <div class='OnboardingMain-container'>
                <OnboardingNav />
                <ProgressBar percent={35} filledBackground="#00338E" className="Onboarding-ProgressBar">
                    <Step transition="scale">
                        {({ accomplished }) => (
                            <div className={`indexedStep ${accomplished ? "accomplished" : null}`} >
                                Organization Information
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
                </ProgressBar>
                <div class="onboard-form-box">
                    <form class="onboard-form">
                        <div class="bankdetails">
                            <h3>Bank Details</h3>
                            <p>Add your bank details to get yourself onboarded to the Supplier Portal</p>
                            <div class="information-input">
                                <div class="information-field">
                                    <label for="companyName" class="inputlabel">Bank Name</label>
                                    <input type="text" id="companyName" name="companyName" class="Inputfield" placeholder="Enter Bank Name here"
                                        onChange={handleChange('BankName')} defaultValue={values.BankName} />
                                </div>

                                <div class="information-field-new">
                                <label for="companypan" class="inputlabel">Attach Cancelled Cheque</label>
                                        {/* <input type='file' class="upload-btn" name='CancelledChequeDoc' onChange={handleChange('CancelledChequeDoc')} defaultValue={values.CancelledChequeDoc}></input> */}
                                        <div class="file-upload-new" ><input type="file" class="doc-upload-btn" id="CancelledChequeDoc" hidden onChange={handleChange('CancelledChequeDoc')} defaultValue={values.CancelledChequeDoc} />
<label for="CancelledChequeDoc" class="btn2Label" style={{display:'flex',alignItems:"center",justifyContent:"space-between"}}><CloudUploadIcon/>Choose file</label><span >
                                {(values.CancelledChequeDoc).split('\\').pop()}</span></div>
                                </div>
                            </div>

                            <div class="information-input">
                                <div class="information-field">
                                    <label for="companyName" class="inputlabel">Bank Account Number</label>
                                    <input type="text" id="companyName" name="companyName" class="Inputfield" placeholder="Enter Bank Account Number here"
                                        onChange={handleChange('BankAccountNumber')} defaultValue={values.BankAccountNumber} />
                                </div>
                                <div class="information-field-new">
                                    <label for="companypan" class="inputlabel">Attach Copy of Passbook</label>
                                    <div class="file-upload-new" ><input type="file" class="doc-upload-btn" id="PassbookCopy" hidden onChange={handleChange('PassbookCopy')} defaultValue={values.PassbookCopy}/>
<label for="PassbookCopy" class="btn2Label" style={{display:'flex',alignItems:"center",justifyContent:"space-between"}}><CloudUploadIcon/>Choose file</label><span>
                                {(values.PassbookCopy).split('\\').pop()}</span></div>
                                </div>
                                {/* <button type="button" class="doc-upload-btn">Attach Copy of Passbook<i class="upicon" onChange={handleChange('PassbookCopy')}> {<MdOutlineFileUpload />} </i></button>
                    <input type='file' class="doc-btn" name='PassbookCopy' onChange={handleChange('PassbookCopy')} defaultValue={values.PassbookCopy}></input> */}

                            </div>

                            <div class="information-input">
                                <div class="information-field">
                                    <label for="companyName" class="inputlabel">IFSC Code</label>
                                    <input type="text" id="companyName" name="companyName" class="Inputfield" placeholder="Enter IFSC Code here"
                                        onChange={handleChange('BankIFCScode')} defaultValue={values.BankIFCScode} />
                                </div>
                                <div class="information-field-new">
                                    <label for="companypan" class="inputlabel">Attach Credit history</label>
                                    <div class="file-upload-new" ><input type="file" class="doc-upload-btn" id="CreditHistory" hidden onChange={handleChange('CreditHistory')} defaultValue={values.CreditHistory}/>
<label for="CreditHistory" class="btn2Label" style={{display:'flex',alignItems:"center",justifyContent:"space-between"}}><CloudUploadIcon/>Choose file</label><span>
                                {(values.CreditHistory).split('\\').pop()}</span></div>
                                </div>
                                {/* <button type="button" class="doc-upload-btn">Attach Credit history<i class="upicon" onChange={handleChange('CreditHistory')}> {<MdOutlineFileUpload />} </i></button>
                    <input type='file' class="doc-btn" name='CreditHistory' onChange={handleChange('CreditHistory')} defaultValue={values.CreditHistory}></input> */}

                            </div>

                            <div class="information-input">
                                <div class="information-field">
                                    <label for="companyName" class="inputlabel">Bank Account Holder Name</label>
                                    <input type="text" id="companyName" name="companyName" class="Inputfield" placeholder="Enter Account Holder Name here"
                                        onChange={handleChange('AccountHolderName')} defaultValue={values.AccountHolderName} />
                                </div>
                                <div class="information-field">
                                    <label for="companypan" class="inputlabel">Branch Name</label>
                                    <input type="text" id="companypan" name="companypan" class="Inputfield" placeholder="Enter Bank Branch Name here"
                                        onChange={handleChange('BankBranchName')} defaultValue={values.BankBranchName} />
                                </div>
                            </div>

                            <div class="information-input">
                                <div class="information-field">
                                    <label for="companyName" class="inputlabel">City</label>
                                    <input type="text" id="companyName" name="companyName" class="Inputfield" placeholder="Enter City Name here"
                                        onChange={handleChange('BankCity')} defaultValue={values.BankCity} />
                                </div>
                                <div class="information-field">
                                    <label for="companypan" class="inputlabel">State</label>
                                    <input type="text" id="companypan" name="companypan" class="Inputfield" placeholder="Enter State Name here"
                                        onChange={handleChange('BankState')} defaultValue={values.BankState} />
                                </div>
                            </div>

                            <div class="information-input">
                                <div class="information-field">
                                    <label for="companyName" class="inputlabel">Payment Mode</label>
                                    <div class="dropdown-field">
                                        <div class={selectedOptions.length > 0?"dropdown-toggleActive":"dropdown-toggle"}>
                                            {selectedOptions.length > 0 ? selectedOptions.join(', ') : 'Select your preferred Mode of payment'}
                                            <FaAngleDown onClick={toggleDropdown} className="dropdown-toggle" />

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
                                <button class='back-btn' onClick={Previous}>Back</button>
                                <button class='back-btn' onClick={Continue}>Next</button>
                            </div>
                        </div>
                    </form>
                </div>
                {/* <div class='OBBD-backBtn-container'>
                <a href='/OnboardingDoc' className='OBOBDoc-backBtn' onClick={Previous}> <i>{<FaArrowLeft/>}</i>  Back </a>
            </div><br/>
            <div className='OBBD-Title'>
                <label>Bank Details</label>
            </div>
            <form className='OBBD-form-box'>
                <div className='OBBD-form-left-pane'>
                    <div class='OBBD-form-items-row'>
                        <label>IFSC Code</label> <br/>
                        <input name='BankIFCScode' onChange={handleChange('BankIFCScode')} defaultValue={values.BankIFCScode}/>
                    </div>
                    <div class='OBBD-form-items-row'>
                        <label>City</label><br/>
                        <input name='BankCity' onChange={handleChange('BankCity')} defaultValue={values.BankCity}/>
                    </div>
                    <div class='OBBD-form-items-row'>
                        <label>State</label><br/>
                        <input name='BankState' onChange={handleChange('BankState')} defaultValue={values.BankState}/>
                    </div>
                    <div class='OBBD-form-items-row'>
                        <label>Branch Name</label><br/>
                        <input name='BankBranchName' onChange={handleChange('BankBranchName')} defaultValue={values.BankBranchName}/>
                    </div>
                </div>

                <div className='OBBD-form-right-pane'>
                    <div class='OBBD-form-items-row'>
                        <label>Account Number</label> <br/>
                        <input name='BankAccountNumber' onChange={handleChange('BankAccountNumber')} defaultValue={values.BankAccountNumber}/>
                    </div>
                    <div class='OBBD-form-items-row'>
                        <label>Bank Name</label><br/>
                        <input name='BankName' onChange={handleChange('BankName')} defaultValue={values.BankName}/>
                    </div>
                    <div class='OBBD-form-items-row'>
                        <label>Payment Mode</label><br/>
                        <select className='OBBD-form-select' name='PaymentMode' onChange={handleChange('PaymentMode')} defaultValue={values.PaymentMode}>
                            <option value=''>--Select--</option>
                            <option value='RTGS'>RTGS</option>
                            <option value='NEFT'>NEFT</option>
                            <option value='IMPS'>IMPS</option>
                        </select>
                    </div>
                </div>
            </form>
            <br/>
            <button className='OB-next-btn' onClick={Continue}>Next</button> */}
            </div>
        </div>
    )
};

export default OnboardingBankDetails;