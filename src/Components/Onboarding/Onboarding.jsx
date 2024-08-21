import React, { Component} from 'react'
import OnboardingMain from './OnboardingMain'
import OnboardingDoc from './OnboardingDoc'
import OnboardingBankDetails from './OnboardingBankDetails'
import OnboardingSummary from './OnboardingSummary'
import OnboardingSubmission from './OnboardingSubmission'

export default class Onboarding extends Component
{
    state = {
        step:1,
        RegisteredCompanyName : '',
        CompanyPanNumber:'',
        CompanyContactNumber : '',
        AlternateContactNumber:'',
        GSTIN : '',
        TIN : '',
        CompanyRegisteredAddress : '',
        CorrespondenceAddress : '',
        CompanyEmail:'',
        AlternateEmail:'',
        SpocName : '',
        SpocTitle : '',
        SpocContactNumber : '',
        SpocEmailID : '',
        InsuranceDoc : '',
        RegulatoryComplianceInformationDoc : '',
        LitigationRecordsDoc : '',
        NdaDoc : '',
        SustainableSourcingReportsDoc : '',
        BusinessLicensingDoc : '',
        CancelledChequeDoc : '',
        PassbookCopy : '',
        CreditHistory : '',
        RegistrationCertificate:'',
        PanCardCopy:'',
        AdrressProof:'',
        BankIFCScode : '',
        BankCity : '',
        BankState : '',
        BankBranchName : '',
        BankAccountNumber : '',
        BankName : '',
        AccountHolderName:'',
        PaymentMode : ''
    }
    
    // go back to previous step
    prevStep = () => 
    {
        const { step } = this.state;
        this.setState({ step: step - 1 });
    }

    // proceed to the next step
    nextStep = () => 
    {
        const { step } = this.state;
        this.setState({ step: step + 1 });
    }

    // Handle fields change
    handleChange = (input) => e => 
    {
        this.setState({ [input]: e.target.value });
    }
    
     // Handle fields change
     
    //  handleFileChange = (input) => e => 
    //  {
      
    //      this.setState({ [input]: e.target.value });
    //      const fullPath=e.target.value;
    //        const name=fullPath.split('\\').pop();
    //        setValues((prevValues)=>({...prevValues,[input]: e.target.value }))
    //  }
 
    render() 
    {

        const { step } = this.state;
        const 
        {
            RegisteredCompanyName,CompanyPanNumber, CompanyContactNumber,AlternateContactNumber, GSTIN, TIN ,
            CompanyRegisteredAddress, CorrespondenceAddress ,CompanyEmail,AlternateEmail,
            SpocName ,SpocTitle ,SpocContactNumber ,SpocEmailID ,InsuranceDoc,RegulatoryComplianceInformationDoc,
            LitigationRecordsDoc,NdaDoc,SustainableSourcingReportsDoc,BusinessLicensingDoc,CancelledChequeDoc,
            PassbookCopy,CreditHistory,RegistrationCertificate,PanCardCopy,AdrressProof,BankIFCScode ,BankCity ,
            BankState ,BankBranchName ,BankAccountNumber ,BankName,AccountHolderName, PaymentMode
        } = this.state;
        
        const values = 
        {
            RegisteredCompanyName,CompanyPanNumber, CompanyContactNumber,AlternateContactNumber, GSTIN, TIN ,
            CompanyRegisteredAddress, CorrespondenceAddress,CompanyEmail,AlternateEmail,SpocName ,SpocTitle ,
            SpocContactNumber ,SpocEmailID,InsuranceDoc ,RegulatoryComplianceInformationDoc ,LitigationRecordsDoc 
            ,NdaDoc ,SustainableSourcingReportsDoc,BusinessLicensingDoc ,CancelledChequeDoc ,PassbookCopy,CreditHistory
            ,RegistrationCertificate,PanCardCopy,AdrressProof,BankIFCScode ,BankCity ,BankState ,BankBranchName ,
            BankAccountNumber ,BankName,AccountHolderName, PaymentMode 
        }
        
        console.log(values);
        
        // console.log
        // (
          
        //     // "The Registered Company Name is ",values.RegisteredCompanyName,
        //     // "The Company Conrtact Name is ",values.CompanyContactNumber, 
        //     // "The GSTIN is ",values.GSTIN, 
        //     // "The TIN is ",values.TIN ,
        //     // "The Currency is ",values.Currency, 
        //     // "The Reg Address is ",values.CompanyRegisteredAddress, 
        //     // "The Corr Address is ",values.CorrespondenceAddress ,
        //     // "The Spoc name is ",values.SpocName ,
        //     // "The Spoc Title is ",values.SpocTitle ,
        //     // "The Spoc Contact Nummber is ",values.SpocContactNumber ,
        //     // "The Spoc email is ",values.SpocEmailID
        //     "The File is ",values.LicenseAgreementDoc


        // );

        switch(step) 
        {
          case 1: 
            return (
              <OnboardingMain 
                nextStep={ this.nextStep }
                handleChange={ this.handleChange }
                values={ values }
              />
            )
          case 2: 
            return (
              <OnboardingBankDetails 
              
                prevStep={ this.prevStep }
                nextStep={ this.nextStep }
                handleChange={ this.handleChange }
                values={ values }
              />
            )
          case 3: 
              return (
                <OnboardingDoc  
                  prevStep={ this.prevStep }
                  handleChange={ this.handleChange }
                  nextStep={ this.nextStep }
                  values={ values }
                />
              )
            case 4: 
              return (
                <OnboardingSummary
                prevStep={ this.prevStep }
                handleChange={ this.handleChange }
                values={ values }
                />
              )
            // case 5: 
            //   return (
            //     <OnboardingSubmission
            //         prevStep={ this.prevStep }
            //         nextStep={this.nextStep}
            //         handleChange={ this.handleChange }
            //         values={ values }
            //     />
            //   )
          default: 
              // do nothing
        }
    }

}