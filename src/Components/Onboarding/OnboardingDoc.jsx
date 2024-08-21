import React, { useState } from 'react'
import '../../style/OnboardingDoc.css'
import { FaArrowLeft, FaPaperclip } from "react-icons/fa";
import OnboardingNav from '../Navbar/OnboardingNav';
import { MdOutlineFileUpload,MdOutlineFileDownload } from "react-icons/md";
import { Step, ProgressBar } from "react-step-progress-bar"
import "react-step-progress-bar/styles.css";
import '../../style/Stepper.css'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const OnboardingDoc=({ prevStep, nextStep, handleChange, values})=>
{
    const Continue = e => {
        e.preventDefault();
        nextStep();
      }
    
      const Previous = e => {
        e.preventDefault();
        prevStep();
      }

       const[imageName,setImageName]=useState();

      const handleDownload=()=>{
        const link=document.createElement('a');
        link.href='/downloads/PricingTemplate.xlsx';
        link.download='LitigationRecordTemplate.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // const splitImagePath=(String)=>{
    //     const fullPath=event.target.value;
    //     const name=fullPath.split('\\').pop();
    //     setImageName(name);
    //     return imageName
    // }

    return (
        <div class='OnboardingMain-container'>
           <OnboardingNav/>
            <ProgressBar percent={70} filledBackground="#00338E" className="Onboarding-ProgressBar">
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
            <br></br>
            <div class="onboard-form-box">
            <form class="onboard-form">
                <div class="misdetails">
            <h3>Miscellaneous Information</h3>
                  
                        <div class="information-input">
                        
                            <label for="companyName" class="doclabelnew">Litigation Records <i class="upicon" style={{color:'red'}} 
                            onClick={handleDownload}> {<MdOutlineFileDownload />} </i></label>
                            <div class="information-field-new">
                                    <div class="file-upload-new2" ><input type="file" class="doc-upload-btn" id="LitigationRecordsDoc" hidden onChange={handleChange('LitigationRecordsDoc')} defaultValue={values.LitigationRecordsDoc}/>
<label for="LitigationRecordsDoc" class="btn3Label" style={{display:'flex',alignItems:"center",justifyContent:"space-between"}}><CloudUploadIcon/>Choose file</label><span>
                                {(values.CreditHistory).split('\\').pop()}</span></div>
                                </div>
                            {/* <div class="information-field-new">
                            <div class="file-upload-new" ><input type="file" class="doc-upload-btn" id="LitigationRecordsDoc" hidden 
                            onChange={handleChange('LitigationRecordsDoc')} defaultValue={values.LitigationRecordsDoc}/>
                            <label for="LitigationRecordsDoc" class="btn3Label" style={{display:'flex',alignItems:"center",
                            justifyContent:"space-between"}}><CloudUploadIcon/>Choose file</label><span >
                                {(values.LitigationRecordsDoc).split('\\').pop()}</span></div>
                           
                        </div> */}
                        </div>

                        <div class="information-input">
                            <label for="companyName" class="doclabelnew">Non Disclosure Agreement Documents(NDAs) <i class="upicon" style={{color:'red'}}> {<MdOutlineFileDownload />} </i></label>
                            <div class="information-field-new">
                                    <div class="file-upload-new2" ><input type="file" class="doc-upload-btn" id="NdaDoc" hidden onChange={handleChange('NdaDoc')} defaultValue={values.NdaDoc}/>
                                    <label for="NdaDoc" class="btn3Label" style={{display:'flex',alignItems:"center",justifyContent:"space-between"}}><CloudUploadIcon/>Choose file</label><span>
                                {(values.NdaDoc).split('\\').pop()}</span></div>
                            {/* <input type='file' class="doc-btn" name='NdaDoc' onChange={handleChange('NdaDoc')} defaultValue={values.NdaDoc}></input> */}
                        </div>
</div>
                        <div class="information-input">
                            
                            <label for="companyName" class="doclabelnew">Regulatory Compliance Document<i class="upicon" style={{color:'red'}}> {<MdOutlineFileDownload />} </i></label>
                            <div class="information-field-new">
                                    <div class="file-upload-new2"><input type="file" class="doc-upload-btn" id="RegulatoryComplianceInformationDoc" hidden onChange={handleChange('RegulatoryComplianceInformationDoc')} defaultValue={values.RegulatoryComplianceInformationDoc}/>
<label for="RegulatoryComplianceInformationDoc" class="btn3Label" style={{display:'flex',alignItems:"center",justifyContent:"space-between"}}><CloudUploadIcon/>Choose file</label><span>
                                {(values.RegulatoryComplianceInformationDoc).split('\\').pop()}</span></div>
                            {/* <input type='file' class="doc-btn" name='RegulatoryComplianceInformationDoc' onChange={handleChange('RegulatoryComplianceInformationDoc')} defaultValue={values.RegulatoryComplianceInformationDoc}></input> */}
                        </div>
</div>
                        <div class="information-input">
                            
                            <label for="companyName" class="doclabelnew">Insurance Documents<i class="upicon" style={{color:'red'}}> {<MdOutlineFileDownload />} </i></label>
                            <div class="information-field-new">
                                    <div class="file-upload-new2" ><input type="file" class="doc-upload-btn" id="InsuranceDoc" hidden onChange={handleChange('InsuranceDoc')} defaultValue={values.InsuranceDoc}/>
<label for="InsuranceDoc" class="btn3Label" style={{display:'flex',alignItems:"center",justifyContent:"space-between"}}><CloudUploadIcon/>Choose file</label><span>
                                {(values.InsuranceDoc).split('\\').pop()}</span></div>
                            {/* <input type='file' class="doc-btn" name='InsuranceDoc' onChange={handleChange('InsuranceDoc')} defaultValue={values.InsuranceDoc}></input> */}   
                        </div>
</div>
                        <div class="information-input">
                           
                            <label for="companyName" class="doclabelnew">Business Licensing Documents <i class="upicon" style={{color:'red'}}> {<MdOutlineFileDownload />} </i></label>
                            <div class="information-field-new">
                                    <div class="file-upload-new2" ><input type="file" class="doc-upload-btn" id="BusinessLicensingDoc" hidden onChange={handleChange('BusinessLicensingDoc')} defaultValue={values.BusinessLicensingDoc}/>
<label for="BusinessLicensingDoc" class="btn3Label" style={{display:'flex',alignItems:"center",justifyContent:"space-between"}}><CloudUploadIcon/>Choose file</label><span>
                                {(values.BusinessLicensingDoc).split('\\').pop()}</span></div>
                            {/* <input type='file' class="doc-btn" name='BusinessLicensingDoc' onChange={handleChange('BusinessLicensingDoc')} defaultValue={values.BusinessLicensingDoc}></input> */}    
                        </div>
</div>

                        <div class="information-input">
                            
                            <label for="companyName" class="doclabelnew">Sustainable Sourcing Reports<i class="upicon" style={{color:'red'}}> {<MdOutlineFileDownload />} </i></label>
                            <div class="information-field-new">
                                    <div class="file-upload-new2" ><input type="file" class="doc-upload-btn" id="SustainableSourcingReportsDoc" hidden onChange={handleChange('SustainableSourcingReportsDoc')} defaultValue={values.SustainableSourcingReportsDoc}/>
<label for="SustainableSourcingReportsDoc" class="btn3Label" style={{display:'flex',alignItems:"center",justifyContent:"space-between"}}><CloudUploadIcon/>Choose file</label><span>
                                {(values.SustainableSourcingReportsDoc).split('\\').pop()}</span></div>
                            {/* <input type='file' class="doc-btn" name='SustainableSourcingReportsDoc' onChange={handleChange('SustainableSourcingReportsDoc')} defaultValue={values.SustainableSourcingReportsDoc}></input> */}
                        </div>
</div>

                        <div class="bottom-btn">
                            <button class='back-btn' onClick={Previous}>Back</button>
                            <button class='back-btn' onClick={Continue}>Next</button>
                        </div>
                        </div>
                    </form>
                  </div>
            {/* <form className='OBDoc-DocUpload-box'>
                <div className='OBDoc-DocUpload-Table-container'>
                    <table className='OBDoc-DocUpload-Table'>
                        <tbody>
                            <tr>
                                <td class="DocTableCol1">License Agreement</td>
                                <td>Select File : </td>
                                <td class="DocTableCol3"> <input type='file' name='LicenseAgreementDoc' onChange={handleChange('LicenseAgreementDoc')} /></td>
                            </tr>
                            <tr>
                                <td class="DocTableCol1">Insurance</td>
                                <td>Select File : </td>
                                <td class="DocTableCol3"> <input type='file' name='InsuranceDoc' onChange={handleChange('InsuranceDoc')} defaultValue={values.InsuranceDoc}/></td>
                            </tr>
                            <tr id='RowGap'>
                                <td>Other Documents :</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td class="DocTableCol1">Regulatory compliance information</td>
                                <td>Select File : </td>
                                <td class="DocTableCol3"> <input type='file' name='RegulatoryComplianceInformationDoc' onChange={handleChange('RegulatoryComplianceInformationDoc')} defaultValue={values.RegulatoryComplianceInformationDoc}/></td>
                            </tr>
                            <tr>
                                <td class="DocTableCol1">Litigation Records</td>
                                <td>Select File : </td>
                                <td class="DocTableCol3"> <input type='file' name='LitigationRecordsDoc' onChange={handleChange('LitigationRecordsDoc')} defaultValue={values.LitigationRecordsDoc}/></td>
                            </tr>
                            <tr>
                                <td class="DocTableCol1">Financial records/credit history</td>
                                <td>Select File : </td>
                                <td class="DocTableCol3"> <input type='file' name='FinancialRecordsDoc' onChange={handleChange('FinancialRecordsDoc')} defaultValue={values.FinancialRecordsDoc}/></td>
                            </tr>
                            <tr>
                                <td class="DocTableCol1">Company ownership documentation</td>
                                <td>Select File : </td>
                                <td class="DocTableCol3"> <input type='file' name='CompanyOwnershipDoc' onChange={handleChange('CompanyOwnershipDoc')} defaultValue={values.CompanyOwnershipDoc}/></td>
                            </tr>
                            <tr>
                                <td class="DocTableCol1">Non disclosure agreements (NDA)</td>
                                <td>Select File : </td>
                                <td class="DocTableCol3"> <input type='file' name='NdaDoc' onChange={handleChange('NdaDoc')} defaultValue={values.NdaDoc}/></td>
                            </tr>
                            <tr>
                                <td class="DocTableCol1">Supplier Diversity Certifications</td>
                                <td>Select File : </td>
                                <td class="DocTableCol3"> <input type='file' name='SupplierDiversityCertificationsDoc' onChange={handleChange('SupplierDiversityCertificationsDoc')} defaultValue={values.SupplierDiversityCertificationsDoc}/></td>
                            </tr>
                            <tr>
                                <td class="DocTableCol1">Sustainable sourcing reports</td>
                                <td>Select File : </td>
                                <td class="DocTableCol3"> <input type='file' name='SustainableSourcingReportsDoc' onChange={handleChange('SustainableSourcingReportsDoc')} defaultValue={values.SustainableSourcingReportsDoc}/></td>
                            </tr>
                            <tr>
                                <td class="DocTableCol1">Security Certifications</td>
                                <td>Select File : </td>
                                <td class="DocTableCol3"> <input type='file' name='SecurityCertificationsDoc' onChange={handleChange('SecurityCertificationsDoc')} defaultValue={values.SecurityCertificationsDoc}/></td>
                            </tr>
                            <tr>
                                <td class="DocTableCol1">Business Licensing</td>
                                <td>Select File : </td>
                                <td class="DocTableCol3"> <input type='file' name='BusinessLicensingDoc' onChange={handleChange('BusinessLicensingDoc')} defaultValue={values.BusinessLicensingDoc}/></td>
                            </tr>
                            <tr>
                                <td class="DocTableCol1">Cancelled Cheque</td>
                                <td>Select File : </td>
                                <td class="DocTableCol3"> <input type='file' name='CancelledChequeDoc' onChange={handleChange('CancelledChequeDoc')} defaultValue={values.CancelledChequeDoc}/></td>
                            </tr>
                            <tr>
                                <td class="DocTableCol1">Tax information, Forms & Identification Numbers</td>
                                <td>Select File : </td>
                                <td class="DocTableCol3"> <input type='file' name='TaxFormsIdentificationDoc' onChange={handleChange('TaxFormsIdentificationDoc')} defaultValue={values.TaxFormsIdentificationDoc}/></td>
                            </tr>
                            <tr>
                                <td class="DocTableCol1">Subcontractors, Outsourced Functions</td>
                                <td>Select File : </td>
                                <td class="DocTableCol3"> <input type='file' name='SubcontractorsDoc' onChange={handleChange('SubcontractorsDoc')} defaultValue={values.SubcontractorsDoc}/></td>
                            </tr>
                        </tbody>
                    </table>
                </div><br/>
                <div>
                    <input type='checkbox'className='OBDoc-DocUpload-checkbox'/> <label>I confirm and that the uploaded information is true to the best of my knowledge.</label>
                </div>
            </form> */}
            
        </div>
    )   
};

export default OnboardingDoc;