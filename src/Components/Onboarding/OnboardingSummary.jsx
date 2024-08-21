import React, { useState, useEffect } from 'react'
import '../../style/OnboardingDoc.css'
import { FaArrowLeft, FaPaperclip } from "react-icons/fa";
import OnboardingNav from '../Navbar/OnboardingNav';
import { Step, ProgressBar } from "react-step-progress-bar"
import "react-step-progress-bar/styles.css";
import '../../style/Stepper.css'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export let registrationIdOnboarding=''

const OnboardingSummary = ({ prevStep, nextStep, handleChange, values }) => {
    const Previous = e => {
        e.preventDefault();
        prevStep();
    }
    // const onboarding_msg = localStorage.getItem('onboarding_msg');
let navigate=useNavigate();
    const [currentData, setcurrentData] = useState(null);

    useEffect(() => {
        const itemdata = async () => {
            await axios
                .post("http://localhost:1010/api/login/service/viewOnboardingDetails?registrationId=" + reg_id + "")
                .then((res) => {
                    setcurrentData(res.data)
                    console.log(res.data['onboarding_status'])
                    if (res.data['onboarding_status'] == "COMPLETED") {
                        window.location = "/Dashboard";
                    }
                }).catch((err) => {
                    console.log(err);
                })
        }

        itemdata()
    }, [])
console.log("curr",currentData)
    const reg_id = localStorage.getItem('reg_id');
    console.log("reg",reg_id)
    const [Data, setData] = useState({
        "company_name": values.RegisteredCompanyName,
        "company_pan_no": values.CompanyPanNumber,
        "company_contact_no": values.CompanyContactNumber,
        "alternate_contact_no": values.AlternateContactNumber,
        "gstin": values.GSTIN,
        "tin": values.TIN,
        "registered_addr": values.CompanyRegisteredAddress,
        "correspondance_addr": values.CorrespondenceAddress,
        "company_email": values.CompanyEmail,
        "alternate_email": values.AlternateEmail,
        "spoc_name": values.SpocName,
        "spoc_title": values.SpocTitle,
        "spoc_contact": values.SpocContactNumber,
        "spoc_email": values.SpocEmailID,
        "license_doc": values.BusinessLicensingDoc,
        "insurance_doc": values.InsuranceDoc,
        "regulatory_doc": values.RegulatoryComplianceInformationDoc,
        "litigation_doc": values.LitigationRecordsDoc,
        "credit_info_doc": values.CreditHistory,
        "nda_doc": values.NdaDoc,
        "sustainability_doc": values.SustainableSourcingReportsDoc,
        "business_licensing_doc": values.BusinessLicensingDoc,
        "cancelled_cheque_doc": values.CancelledChequeDoc,
        "registration_certificate": values.RegistrationCertificate,
        "pan_copy": values.PanCardCopy,
        "address_proof": values.AdrressProof,
        "passbook_copy": values.PassbookCopy,
        "ifscCode": values.BankIFCScode,
        "accountNo": values.BankAccountNumber,
        "bankName": values.BankName,
        "account_holder_name": values.AccountHolderName,
        "city": values.BankCity,
        "state": values.BankState,
        "paymentMode": values.PaymentMode,
        "branchName": values.BankBranchName,
        "onboarding_status": " ",
        "onboarding_msg": " ",
        "regsitration_id": reg_id,
        "regsitration_pwd": " "

    });

console.log("data",Data)

    function submitdata(e) {
        e.preventDefault();

        axios({
            method: 'post',
            url: 'http://localhost:1010/api/login/service/submitOnboardingDetails',
            // headers: {Authorization: `Bearer ${bearerToken}`},
            data: Data,
        })
            .then(function (response) {
                //  console.log("response", JSON.stringify(response.data))
                console.log("response", response.data);
                if (response.data) {
                    registrationIdOnboarding=reg_id
                    localStorage.setItem("reg_id", reg_id);
                   navigate("/OnboardingSuccess")
                } else {
                    const Continue = e => {
                        e.preventDefault();
                        nextStep();
                    }
                    //  document.getElementById("error").textContent += "Invalid Credentials or You already change the password.";
                }
            })
            .catch(function (error) {
                console.log('error', error);
            });


    }

    return (
        <div class='OnboardingMain-container'>
            <OnboardingNav />
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
            </ProgressBar>
            <br />

            <div class='OnboardingSubmission-form-box'>
                <h3>Profile Summary</h3>

                <h2>Basic Organization Info</h2>
                 <div className='OnboardingRow'><p>Registered Company Name : </p><span class="spanClass">{values.RegisteredCompanyName}</span></div>
                 <div className='OnboardingRow'><p>Company Pan Number :</p> <span class="spanClass">{values?.CompanyPanNumber}</span></div>
                 <div className='OnboardingRow'><p>Registered Address : </p><span class="spanClass">{values?.CompanyRegisteredAddress}</span></div>
                 <div className='OnboardingRow'><p>Correspondence Address : </p><span class="spanClass">{values?.CorrespondenceAddress}</span></div>
                 <div className='OnboardingRow'><p>Company Phone Number : </p><span class="spanClass">{values?.CompanyContactNumber}</span></div>
                 <div className='OnboardingRow'><p>Alternate Phone Number : </p><span class="spanClass">{values?.AlternateContactNumber}</span></div>
                 <div className='OnboardingRow'><p>GST : </p><span class="spanClass">{values?.GSTIN}</span></div>
                 <div className='OnboardingRow'><p>TIN : </p><span class="spanClass">{values?.TIN}</span></div>

                <hr></hr>

                <h2>Spoc Details</h2>
                <div className='OnboardingRow'><p>Spoc Name : </p><span class="spanClass">{values?.SpocName}</span></div>
                <div className='OnboardingRow'><p>Spoc Title : </p><span class="spanClass">{values?.SpocTitle}</span></div>
                <div className='OnboardingRow'><p>Spoc Contact : </p><span class="spanClass">{values?.SpocContactNumber}</span></div>
                <div className='OnboardingRow'><p>Spoc Email : </p><span class="spanClass">{values?.SpocEmailID}</span></div>
                <hr></hr>
                <h2>Bank Details</h2>
                <div className='OnboardingRow'><p>Bank Name : </p><span class="spanClass">{values?.BankName}</span></div>
                <div className='OnboardingRow'><p>Account Holder Name :</p><span class="spanClass">{values?.AccountHolderName}</span></div>
                <div className='OnboardingRow'><p>Account Number. : </p><span class="spanClass">{values?.BankAccountNumber}</span></div>
                <div className='OnboardingRow'><p>IFSC Code : </p><span class="spanClass">{values?.BankIFCScode}</span></div>
                <div className='OnboardingRow'><p>City  : </p><span class="spanClass">{values?.BankCity}</span></div>
                <div className='OnboardingRow'><p>State :</p> <span class="spanClass">{values?.BankState}</span></div>
                <hr></hr>
                <h2>Attached Documents</h2>
                <div className='OnboardingRow'><p>Comapny Registration Certificate :</p> <span class="spanClass">{values?.RegistrationCertificate}</span></div>
                <div className='OnboardingRow'><p>License agreement Doc : </p><span class="spanClass">{values?.BusinessLicensingDoc}</span></div>
                <div className='OnboardingRow'><p>Copy of Pan Card :</p> <span class="spanClass">{values?.PanCardCopy}</span></div>
                <div className='OnboardingRow'><p>Copy Of Address Proof : </p><span class="spanClass">{values?.AdrressProof}</span></div>
               <div className='OnboardingRow'><p>Copy of Cancelled Cheque :</p> <span class="spanClass">{values?.CancelledChequeDoc}</span></div> 
                <div className='OnboardingRow'><p>Copy of Passbook :</p> <span class="spanClass">{values?.PassbookCopy}</span></div>
                <div className='OnboardingRow'><p>Copy of Financial Records/Credit History :</p> <span class="spanClass">{values?.CreditHistory}</span></div>
                <div className='OnboardingRow'><p>Copy of NDAs signed : </p><span class="spanClass">{values?.NdaDoc}</span></div>
                <div className='OnboardingRow'><p>Copy of Litigation Records:</p><span class="spanClass">{values?.LitigationRecordsDoc}</span></div>
                <div className='OnboardingRow'><p>Copy of Regulatory Doc  : </p><span class="spanClass">{values?.RegulatoryComplianceInformationDoc}</span></div>
                <div className='OnboardingRow'><p>Copy of Insurance Doc : </p><span class="spanClass">{values?.InsuranceDoc}</span></div>
                <hr></hr>



                <div class="bottom-btn">
                    <button class='back-btn' onClick={Previous}>Back</button>
                    <button class='back-btn' onClick={submitdata}>Submit</button>
                </div>

            </div>
            {/* <div class='OBDoc-backBtn-container'>
                <a href='/OnboardingMain' className='OBOBDoc-backBtn' onClick={Previous}> <i>{<FaArrowLeft/>}</i>  Back </a>
            </div>
            <div className='OBDoc-Title'>
                <label>Summary</label>
            </div>
            <br/>
            <div className='OBDoc-DocUpload-box'>
                <div className='OBDoc-DocUpload-Table-container'>
                    <table className='OBDoc-DocUpload-Table'>
                        <tbody>
                             <tr>
                                <td class="DocTableCol1">License Agreement</td>
                                <td>{values.LicenseAgreementDoc} </td>
                                <td class="DocTableCol3"><input type='file' name='LicenseAgreementDoc'  onChange={handleChange('LicenseAgreementDoc')} /></td>
                            </tr>
                          <tr>
                                <td class="DocTableCol1">Insurance</td>
                                <td>{values.InsuranceDoc} </td>
                                <td class="DocTableCol3"> <input type='file' name='InsuranceDoc' onChange={handleChange('InsuranceDoc')} /></td>
                            </tr>
                            <tr id='RowGap'>
                                 <td> </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td class="DocTableCol1">Regulatory compliance information</td>
                                <td>{values.RegulatoryComplianceInformationDoc} </td>
                                <td class="DocTableCol3"> <input type='file' name='RegulatoryComplianceInformationDoc' onChange={handleChange('RegulatoryComplianceInformationDoc')} defaultValue={values.RegulatoryComplianceInformationDoc}/></td>
                            </tr>
                            <tr>
                                <td class="DocTableCol1">Litigation Records</td>
                                <td>{values.LitigationRecordsDoc} </td>
                                <td class="DocTableCol3"> <input type='file' name='LitigationRecordsDoc' onChange={handleChange('LitigationRecordsDoc')} defaultValue={values.LitigationRecordsDoc}/></td>
                            </tr>
                            <tr>
                                <td class="DocTableCol1">Financial records/credit history</td>
                                <td>{values.FinancialRecordsDoc} </td>
                                <td class="DocTableCol3"> <input type='file' name='FinancialRecordsDoc' onChange={handleChange('FinancialRecordsDoc')} defaultValue={values.FinancialRecordsDoc}/></td>
                            </tr>
                            <tr>
                                <td class="DocTableCol1">Company ownership documentation</td>
                                <td>{values.CompanyOwnershipDoc} </td>
                                <td class="DocTableCol3"> <input type='file' name='CompanyOwnershipDoc' onChange={handleChange('CompanyOwnershipDoc')} defaultValue={values.CompanyOwnershipDoc}/></td>
                            </tr>
                            <tr>
                                <td class="DocTableCol1">Non disclosure agreements (NDA)</td>
                                <td>{values.NdaDoc} </td>
                                <td class="DocTableCol3"> <input type='file' name='NdaDoc' onChange={handleChange('NdaDoc')} defaultValue={values.NdaDoc}/></td>
                            </tr>
                            <tr>
                                <td class="DocTableCol1">Supplier Diversity Certifications</td>
                                <td>{values.SupplierDiversityCertificationsDoc} </td>
                                <td class="DocTableCol3"> <input type='file' name='SupplierDiversityCertificationsDoc' onChange={handleChange('SupplierDiversityCertificationsDoc')} defaultValue={values.SupplierDiversityCertificationsDoc}/></td>
                            </tr>
                            <tr>
                                <td class="DocTableCol1">Sustainable sourcing reports</td>
                                <td>{values.SustainableSourcingReportsDoc} </td>
                                <td class="DocTableCol3"> <input type='file' name='SustainableSourcingReportsDoc' onChange={handleChange('SustainableSourcingReportsDoc')} defaultValue={values.SustainableSourcingReportsDoc}/></td>
                            </tr>
                            <tr>
                                <td class="DocTableCol1">Security Certifications</td>
                                <td>{values.SecurityCertificationsDoc} </td>
                                <td class="DocTableCol3"> <input type='file' name='SecurityCertificationsDoc' onChange={handleChange('SecurityCertificationsDoc')} defaultValue={values.SecurityCertificationsDoc}/></td>
                            </tr>
                            <tr>
                                <td class="DocTableCol1">Business Licensing</td>
                                <td>{values.BusinessLicensingDoc} </td>
                                <td class="DocTableCol3"> <input type='file' name='BusinessLicensingDoc' onChange={handleChange('BusinessLicensingDoc')} defaultValue={values.BusinessLicensingDoc}/></td>
                            </tr>
                            <tr>
                                <td class="DocTableCol1">Cancelled Cheque</td>
                                <td>{values.CancelledChequeDoc} </td>
                                <td class="DocTableCol3"> <input type='file' name='CancelledChequeDoc' onChange={handleChange('CancelledChequeDoc')} defaultValue={values.CancelledChequeDoc}/></td>
                            </tr>
                            <tr>
                                <td class="DocTableCol1">Tax information, Forms & Identification Numbers</td>
                                <td>{values.TaxFormsIdentificationDoc} </td>
                                <td class="DocTableCol3"> <input type='file' name='TaxFormsIdentificationDoc' onChange={handleChange('TaxFormsIdentificationDoc')} defaultValue={values.TaxFormsIdentificationDoc}/></td>
                            </tr>
                            <tr>
                                <td class="DocTableCol1">Subcontractors, Outsourced Functions</td>
                                <td>{values.SubcontractorsDoc} </td>
                                <td class="DocTableCol3"> <input type='file' name='SubcontractorsDoc' onChange={handleChange('SubcontractorsDoc')} defaultValue={values.SubcontractorsDoc}/></td>
                            </tr> 
                            <tr id='RowGap'>
                                <td>Bank Details :</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td class="DocTableCol1">Account Number</td>
                                <td>{values.BankAccountNumber}</td>
                                <td class="DocTableCol3"> </td>
                            </tr>
                            <tr>
                                <td class="DocTableCol1">IFSC Code</td>
                                <td>{values.BankIFCScode}</td>
                                <td class="DocTableCol3"> </td>
                            </tr>
                            <tr>
                                <td class="DocTableCol1">Branch</td>
                                <td>{values.BankBranchName}</td>
                                <td class="DocTableCol3"> </td>
                            </tr>
                            <tr>
                                <td class="DocTableCol1">State</td>
                                <td>{values.BankState}</td>
                                <td class="DocTableCol3"> </td>
                            </tr>
                        </tbody>
                    </table>
                </div><br/>
            </div> */}
            <br />

        </div>
    )
};

export default OnboardingSummary;