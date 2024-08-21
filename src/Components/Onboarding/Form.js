import React, { useState } from 'react';
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import BankDetails from './BankDetails';
import OtherInformation from './OtherInformation';
import Summary from './Summary';
import VerticalProgressBar from './VerticalProgressBar';
import './Form.css';

const Form = () => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        RegisteredCompanyName : '',
        CompanyContactNumber : '',
        GSTIN : '',
        TIN : '',
        Currency : '',
        CompanyRegisteredAddress : '',
        CorrespondenceAddress : '',
        SpocName : '',
        SpocTitle : '',
        SpocContactNumber : '',
        SpocEmailID : '',
        LicenseAgreementDoc : '',
        InsuranceDoc : '',
        RegulatoryComplianceInformationDoc : '',
        LitigationRecordsDoc : '',
        FinancialRecordsDoc : '',
        CompanyOwnershipDoc : '',
        NdaDoc : '',
        SupplierDiversityCertificationsDoc : '',
        SustainableSourcingReportsDoc : '',
        SecurityCertificationsDoc : '',
        BusinessLicensingDoc : '',
        CancelledChequeDoc : '',
        TaxFormsIdentificationDoc : '',
        SubcontractorsDoc : '',
        BankIFCScode : '',
        BankCity : '',
        BankState : '',
        BankBranchName : '',
        BankAccountNumber : '',
        BankName : '',
        PaymentMode : ''
    });

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const renderStep = () => {
        switch (step) {
            case 0:
                return <Screen1 formData={formData} setFormData={setFormData} />;
            case 1:
                return <Screen2 formData={formData} setFormData={setFormData} />;
            // case 2:
            //     return <OtherInformation formData={formData} setFormData={setFormData} />;
            // case 3:
            //     return <Summary formData={formData} />;
            // default:
            //     return <OrganizationDetails formData={formData} setFormData={setFormData} />;
        }
    };

    return (
        <div className="form-container">
            <VerticalProgressBar step={step} />
            <div className="form-content">
                {renderStep()}
                <div className="buttons">
                    {step > 0 && <button onClick={prevStep}>Previous</button>}
                    {step < 3 && <button onClick={nextStep}>Next</button>}
                </div>
            </div>
        </div>
    );
};

export default Form;
