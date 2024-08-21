import './style/App.css'
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Login from './Components/Login/Login';
import Setpassword from './Components/Login/Set_password';
import SubsLogin from './Components/Login/Subsequent_login';
import Registration from './Components/Registration/Registration';
import RegistrationID from './Components/Registration/RegistrationID';
import ForgetPassword from './Components/ForgotPassword/ForgotPassword';
import ChangePassword from './Components/ForgotPassword/ChangePassword';
import ChangePasswordConf from './Components/ForgotPassword/ChangePasswordConf';
import ContinueRegistration from './Components/Registration/ContinueRegistration';
import Onboarding from './Components/Onboarding/Onboarding';
import OnboardingSubmission from './Components/Onboarding/OnboardingSubmission';
import UmTempLogin from './Components/UserManagement/UmtempLogin';
import HomeNav from './Components/Navbar/HomeNav';
import OnboardingNav from './Components/Navbar/OnboardingNav';
import SideNav from './Components/Navbar/SideNav';
import Sidebar from './Components/Navbar/Sidebar';
import Screen1 from './Components/Onboarding/Screen1';
import Screen2 from './Components/Onboarding/Screen2';
import Screen3 from './Components/Onboarding/Screen3';
// import Dashboard from './Components/Dashboard/Dashboard';
import UserMgmtMain from './Components/UserManagement/UserMgmtMain';
import UMViewSites from './Components/UserManagement/UMViewSites';
import UMViewUser from './Components/UserManagement/UMViewUser';
import UMupdateuser from './Components/UserManagement/UMupdateuser';
import UMRemoveUser from './Components/UserManagement/UMRemoveUser'
import UMCreateUser from './Components/UserManagement/UMCreateUser';
import UMAddSites from './Components/UserManagement/UmAddsite';
import UMupdatesite from './Components/UserManagement/UmUpdateSite';
import UMupdatesitenew from './Components/UserManagement/UmUpdateSitenew';
// import UserMgmtMain from './Components/UserManagement/UserMgmtMain';

import PurchaseOrderMain from './Components/Purchase&CustomerOrder/PurchaseOrderMain';
import ItemDetails from './Components/Purchase&CustomerOrder/ItemDetails';
import OrderSummary from './Components/Purchase&CustomerOrder/OrderSummary';

import OrderSummaryNew from './Components/Purchase&CustomerOrder/OrderSummaryNew';
// import SiteAddCnfrm from './Components/UserManagement/SiteAddCnfrm';
 import SiteRemoveCnfrm from './Components/UserManagement/SiteRemoveCnfrm';
 import SiteUpdateCnfrm from './Components/UserManagement/SiteUpdateCnfrm';
 import ErrorPage from './Components/ErrorPage/ErrorPage';
 // import ViewSupplierSite from './Components/UserMgmt/ViewSupplierSite';
// import ViewSupplierSite2 from './Components/UserMgmt/ViewSupplierSite2';
 import Dashboard from './Components/Navbar/Dashboard';
// import UMCreateUser from './Components/UserMgmt/UMCreateUser';
// import UMRemoveUser from './Components/UserMgmt/UMRemoveUser';
// import UMViewUser from './Components/UserMgmt/UMViewUser';
import ItemListingMain from './Components/ItemListing/ItemListingMain';
import ItemListingBulkUpload from './Components/ItemListing/ItemListingBulkUpload';
import ItemListingBulkUploadConfirm from './Components/ItemListing/ItemListingBulkUploadConfirm';
import ItemListingconfirm from './Components/ItemListing/ItemListingConfirm';
import ItemListingItemEditPage from './Components/ItemListing/ItemListingItemEditPage';
import ItemListingEditNew from './Components/ItemListing/ItemListingEditNew';
import ItemListingConfirm from './Components/ItemListing/ItemListingConfirm';
import CostChange from './Components/CostChange/CostChange';
import CostChangeNew from './Components/CostChange/CostChangeNew';
import CostChangeConfirm from './Components/CostChange/CostChangeConfirm';
import CostChangeBulkUploadConfirm from './Components/CostChange/CostChangeBulkUploadConfirm';
import CostChangeBulkUpload from './Components/CostChange/CostChangeBulkUpload';
import CostChangeItemEdit from './Components/CostChange/CostChangeItemEdit';
import AlertASN from './Components/Alerts/AlertASN';
import AlertCC from './Components/Alerts/AlertCC';
import AlertCR from './Components/Alerts/AlertCR';
import AlertRR from './Components/Alerts/AlertRR';
import AlertPO from './Components/Alerts/AlertPO';
import AlertCO from './Components/Alerts/AlertCO';
import AlertInvoices from './Components/Alerts/AlertInvoices';
import AlertItemListing from './Components/Alerts/AlertItemListing';
import CustomerOrderMain from './Components/Purchase&CustomerOrder/CustomerOrderMain';
import CustomerOrderSummary from './Components/Purchase&CustomerOrder/CustomerOrderSummary';
import CustomerOrderSummaryNew from './Components/Purchase&CustomerOrder/CustomerOrderSummaryNew';
import RetailerReturnItemListing from './Components/RetailerReturn/RetailerReturnItemListing';
import RetailerReturnDetails from './Components/RetailerReturn/RetailerReturnDetails';
import RetailerReturnDetailsNew from './Components/RetailerReturn/RetailerReturnDetailsNew';
import CustomerReturnItemListing from './Components/CustomerReturn/CustomerReturnItemListing';
import CustomerReturnDetails from './Components/CustomerReturn/CustomerReturnDetails';
import CustomerReturnDetailsNew from './Components/CustomerReturn/CustomerReturnDetailsNew';
import RetailerReturnRaiseConcern from './Components/RetailerReturn/RetailerReturnRaiseConcern';
import RetailerReturnProcessReturnConfirm from './Components/RetailerReturn/RetailerReturnProcessReturnConfirm';
import RaiseConcernNew from './Components/RetailerReturn/RaiseConcernNew';
import CRRaiseConcernNew from './Components/CustomerReturn/CRRaiseConcernNew';
import CustomerReturnRaiseConcern from './Components/CustomerReturn/CustomerReturnRaiseConcern';
import CRProcessReturnConfirm from './Components/CustomerReturn/CRProcessReturnConfirm';
import COGeneratePicklist from './Components/Purchase&CustomerOrder/COGeneratePicklist';
import COGenerateInvoice from './Components/Purchase&CustomerOrder/COGenerateInvoice';
import COGenerateEWay from './Components/Purchase&CustomerOrder/COGenerateEWay';
import COGenerateAwb from './Components/Purchase&CustomerOrder/COGenerateAwb';
import COPicklistSuccess from './Components/Purchase&CustomerOrder/COPicklistSuccess';
import COGeneratePicklistNew from './Components/Purchase&CustomerOrder/COGeneratePicklistNew';
import GeneratePicklistNew2 from './Components/Purchase&CustomerOrder/GeneratePicklistNew2';
import COGenerateInvoiceNew from './Components/Purchase&CustomerOrder/COGenerateInvoiceNew';
import GenerateEwayNew from './Components/Purchase&CustomerOrder/GenerateEwayNew';
import GenerateAwbNew from './Components/Purchase&CustomerOrder/GenerateAwbNew';
import GenerateAwbNew2 from './Components/Purchase&CustomerOrder/GenerateAwbNew2';
import COView from './Components/Purchase&CustomerOrder/COView';
import COViewNew from './Components/Purchase&CustomerOrder/COViewNew';
import ASNCreate from './Components/ASN/ASNCreate';
import ASNCreateNew from './Components/ASN/ASNCreateNew';
import ASNMain from './Components/ASN/ASNMain';
import ASNGenerateDC from './Components/ASN/ASNGenerateDC';
import ASNView_details from './Components/ASN/ASNView_details';
import ASNViewDetailsNew from './Components/ASN/ASNViewDetailsNew';
import ASNEwayNew from './Components/ASN/ASNEwayNew';
import ASNGenerateEWay from './Components/ASN/ASNGenerateEway';
import ASNGenerateAwb from './Components/ASN/ASNGenerateAwb';
import ASNDcNew from './Components/ASN/ASNDcNew';
import CancelAsn from './Components/ASN/CancelAsn';
import AwbGenerationSuccess from './Components/ASN/AwbGenerationSuccess';
import ASNViewSummary from './Components/ASN/ASNViewSummary';
import ViewSummaryNew from './Components/ASN/ViewSummaryNew';
import ASNAwbNew from './Components/ASN/ASNAwbNew';
import UMUpdateUserNew from './Components/UserManagement/UMUpdateUserNew';
import InvoicesMain from './Components/Invoices/InvoicesMain';
import InvoiceSummarynew from './Components/Invoices/InvoiceSummarynew';
import InvoiceDetails2 from './Components/Invoices/InvoiceDetails2';
import InvoiceDetails2new from './Components/Invoices/InvoiceDetails2new';
import CreateInvoices from './Components/Invoices/CreateInvoices';
import CreateInvoicesNew from './Components/Invoices/CreateInvoicesnew';
import InvoiceCreationSuccess from './Components/Invoices/InvoiceCreationSuccess';
import InvoiceCreationSuccessNew from './Components/Invoices/InvoiceCreationSuccessNew';
//import InvoiceDetails from './Components/Invoices/InvoiceDetails';
import InvoiceItemDetails from './Components/Invoices/InvoiceItemDetails';
import InvoiceSummaryCompletion from './Components/Invoices/InvoiceSummaryCompletion';
import InvoiceSummaryCompletionNew from './Components/Invoices/InvoiceSummaryCompletionNew';
import verticalProgressBar from './Components/Onboarding/VerticalProgressBar';
import OnboardingSuccess from './Components/Onboarding/OnboardingSuccess';
import AdminMain from './Components/Admin/AdminMain';
import AdminApprovals from './Components/Admin/AdminApprovals';
import AdminUMCreateNewUser from './Components/Admin/AdminUMCreateNewUser';
import AdminUMRoleMapping from './Components/Admin/AdminUMRoleMapping';
import AdminUMResetPassword from './Components/Admin/AdminUMResetPassword';
import AdminUMViewDetails from './Components/Admin/AdminUMViewDetails';

function App() 
{
  return (
    
    // <BrowserRouter>
    //   {/* <Routes> */}
    //     {/* <Route path='/' Component={Login}></Route>
    //     <Route path='/Registration' exact Component={RegistrationNew }></Route>
    //     <Route path='/RegistrationID' exact Component={RegistrationID }></Route>
    //     <Route path='/ForgotPassword' exact Component={ForgetPassword}></Route>
    //     <Route path='/ChangePassword' exact Component={ChangePasswordRedirect }></Route>
    //     <Route path='/ChangePasswordConf' exact Component={ChangePasswordConf }></Route>
    //     <Route path='/HomeNav' exact Component={HomeNav}></Route>
    //     <Route path='/OnboardingNav' exact Component={OnboardingNav}></Route> */}
    //     {/* <PurchaseOrderMain/> */}
    //     {/* <ItemDetails/> */}
    //     <OrderSummary/>
    //   {/* </Routes> */}
    // </BrowserRouter>
    <BrowserRouter>
      <Routes>
      <Route path='/verticalProgressBar' Component={verticalProgressBar}></Route>
        <Route path='/PurchaseOrderMain' Component={PurchaseOrderMain}></Route>
        {/* <Route path='/Registration' exact Component={RegistrationNew }></Route>
        <Route path='/RegistrationID' exact Component={RegistrationID }></Route>
        <Route path='/ForgotPassword' exact Component={ForgetPassword}></Route>
        <Route path='/ChangePassword' exact Component={ChangePasswordRedirect }></Route>
        <Route path='/ChangePasswordConf' exact Component={ChangePasswordConf }></Route> */}
        <Route path='/HomeNav' exact Component={HomeNav}></Route>
        <Route path='/OnboardingNav' exact Component={OnboardingNav}></Route>
        <Route path='/SideNav' exact Component={SideNav}></Route>
        <Route path='/Sidebar' exact Component={Sidebar}></Route>
        <Route path='/Screen1' exact Component={Screen1}></Route>
        <Route path='/Screen2' exact Component={Screen2}></Route>
        <Route path='/Screen3' exact Component={Screen3}></Route>
        <Route path='/OrderSummary' exact Component={OrderSummaryNew}></Route>
        <Route path='/ItemDetails' exact Component={ItemDetails}></Route>
        <Route path='/Dashboard' exact Component={Dashboard}></Route>
        <Route path='/OnboardingSuccess' exact Component={OnboardingSuccess}></Route>
        {/* <Route path='/UserMgmtMain' exact Component={UserMgmtMain}></Route>
        <Route path='/ViewSupplierSite' exact Component={ViewSupplierSite}></Route>
        <Route path='/ViewSupplierSite2' exact Component={ViewSupplierSite2}></Route>
        {/* <Route path='/UMCreateUser' exact Component={UMCreateUser}></Route>
        <Route path='/UMRemoveUser' exact Component={UMRemoveUser}></Route>
        <Route path='/UMViewUser' exact Component={UMViewUser}></Route> */}
         <Route path='/' Component={Login}></Route>
        <Route path='*' element={<ErrorPage/>}></Route>
        <Route path='/Setpassword' element={<Setpassword />}></Route>
        <Route path='/SubsLogin' element={<SubsLogin />}></Route>
        <Route path='/Registration' element={<Registration />}></Route>
        <Route path='/RegistrationID' element={<RegistrationID />}></Route>
        <Route path='/continueregistration' element={<ContinueRegistration />}></Route>
        <Route path='/OnboardingNav' element={<OnboardingNav/>}></Route>
        <Route path='/ForgotPassword' element={<ForgetPassword />}></Route>
        {/* <Route path='/ChangePassword' element={<ChangePassword />}></Route> */}
        <Route path='/passwordchanged' element={<ChangePasswordConf />}></Route>
        {/* <Route path='/SiteAddCnfrm' exact component={SiteAddCnfrm}></Route> */}
        <Route path='/SiteUpdateCnfrm' exact Component={SiteUpdateCnfrm}></Route> 
        <Route path='/SiteRemoveCnfrm' exact Component={SiteRemoveCnfrm}></Route>
        <Route path='/Onboarding' element={<Onboarding/>}></Route>
        <Route path='/OnboardingSubmission' element={<OnboardingSubmission/>}></Route>

        <Route path='/Umlogin' element={<UmTempLogin/>}></Route>
        <Route path='/UMMain' element={<UserMgmtMain/>}></Route>
        <Route path='/UMViewSites' element={<UMViewSites/>}></Route>
        <Route path='/UMViewUser' element={<UMViewUser/>}></Route>
        <Route path='/UMupdateuser' element={<UMUpdateUserNew/>}></Route>
        <Route path='/UserMgmtMain' exact Component={UserMgmtMain}></Route>
        <Route path='/UMRemoveUser' element={<UMRemoveUser/>}></Route>
        <Route path='/UMCreateUser' element={<UMCreateUser/>}></Route>
        <Route path='/Umaddsite' element={<UMAddSites/>}></Route> 
        <Route path='/UMupdatesite' element={<UMupdatesitenew/>}></Route> 
        <Route path='/ItemListingMain' exact Component={ItemListingMain}></Route>
        <Route path='/ItemListingBulkUpload' exact Component={ItemListingBulkUpload}></Route>
        <Route path='/ItemListingBulkUploadConfirm' exact Component={ItemListingBulkUploadConfirm}></Route>
        <Route path='/ItemListingItemEditPage' exact Component={ItemListingEditNew}></Route>
        <Route path='/ItemListingConfirm' exact Component={ItemListingConfirm}></Route>
        <Route path='/CostChange' exact Component={CostChange}></Route>
        <Route path='/CostChangeItemEdit' exact Component={CostChangeNew}></Route>
        <Route path='/CostChangeBulkUpload' exact Component={CostChangeBulkUpload}></Route>
        <Route path='/CostChangeBulkUploadconfirm' exact Component={CostChangeBulkUploadConfirm}></Route>
        <Route path='/CostChangeConfirm' exact Component={CostChangeConfirm}></Route>
        <Route path='/AlertASN' exact Component={AlertASN}></Route>
        <Route path='/AlertCC' exact Component={AlertCC}></Route>
        <Route path='/AlertCR' exact Component={AlertCR}></Route>
        <Route path='/AlertRR' exact Component={AlertRR}></Route>
        <Route path='/AlertPO' exact Component={AlertPO}></Route>
        <Route path='/AlertCO' exact Component={AlertCO}></Route>
        <Route path='/AlertItemListing' exact Component={AlertItemListing}></Route>
        <Route path='/AlertInvoices' exact Component={AlertInvoices}></Route>
        <Route path='/CustomerOrderMain' exact Component={CustomerOrderMain}></Route>
        <Route path='/CustomerOrderSummary' exact Component={CustomerOrderSummaryNew}></Route>
        <Route path='/RetailerReturnItemListing' exact Component={RetailerReturnItemListing}></Route>
        <Route path='/CustomerReturnItemListing' exact Component={CustomerReturnItemListing}></Route>
        <Route path='/RetailerReturnDetails' exact Component={RetailerReturnDetailsNew}></Route>
        <Route path='/CustomerReturnDetails' exact Component={CustomerReturnDetailsNew}></Route>
        {/* <Route path='/RetailerReturnRaiseConcern' exact Component={RetailerReturnRaiseConcern}></Route> */}
        <Route path='/RetailerReturnRaiseConcern' exact Component={RaiseConcernNew}></Route>
        <Route path='/RetailerReturnProcessReturnConfirm' exact Component={RetailerReturnProcessReturnConfirm}></Route>
        <Route path='/CRProcessReturnConfirm' exact Component={CRProcessReturnConfirm}></Route>
        <Route path='/CustomerReturnRaiseConcern' exact Component={CRRaiseConcernNew}></Route>
        <Route path='/COGeneratePicklist' exact Component={COGeneratePicklistNew}></Route>
        <Route path='/COGenerateInvoice' exact Component={GeneratePicklistNew2}></Route>
        <Route path='/COGenerateEWay' exact Component={GenerateEwayNew}></Route>
        <Route path='/COGenerateAwb' exact Component={GenerateAwbNew}></Route>
        <Route path='/COPicklistSuccess' exact Component={COGenerateInvoiceNew}></Route>
        <Route path='/COAwbGenerationSuccess' exact Component={GenerateAwbNew2}></Route>
        <Route path='/COView' exact Component={COViewNew}></Route>
        <Route path='/ASNMain' exact Component={ASNMain}></Route>
        <Route path='/ASNView_details' exact Component={ASNViewDetailsNew}></Route>
        <Route path='/ASNViewSummary' exact Component={ViewSummaryNew}></Route>
        <Route path='/ASNGenerateDC' exact Component={ASNCreateNew}></Route>
        <Route path='/ASNCreate' exact Component={ASNCreate}></Route>
        <Route path='/CancelAsn' exact Component={CancelAsn}></Route>
        <Route path='/ASNGenerateEway' exact Component={ASNDcNew}></Route>
        <Route path='/ASNGenerateAwb' exact Component={ASNEwayNew}></Route>
        <Route path='/AwbGenerationSuccess' exact Component={ASNAwbNew}></Route>
        <Route path='/InvoicesMain' element={<InvoicesMain/>}></Route>
        <Route path='/InvoiceSummary' exact Component={InvoiceSummarynew}></Route>
        <Route path='/InvoiceDetails2' exact Component={InvoiceDetails2new}></Route>
        <Route path='/InvoiceCreationSuccess' exact Component={InvoiceCreationSuccessNew}></Route>
        <Route path='/CreateInvoices' element={<CreateInvoices/>}></Route>
        <Route path='/InvoiceDetails' element={<CreateInvoicesNew/>}></Route>
        <Route path='/InvoiceItemDetails' element={<InvoiceItemDetails/>}></Route>
        <Route path='/InvoiceSummaryCompletion' element={<InvoiceSummaryCompletionNew/>}></Route>
        <Route path='/AdminMain' element={<AdminMain/>}></Route>
        {/* <Route path='/side' element={<Sidebar/>}></Route> */}
        <Route path='/AdminApprovals' element={<AdminApprovals/>}></Route>
        <Route path='/AdminUMCreateNewUser' element={<AdminUMCreateNewUser/>}></Route>
        <Route path='/AdminUMRoleMapping' element={<AdminUMRoleMapping/>}></Route>
        <Route path='/AdminUMResetPassword' element={<AdminUMResetPassword/>}></Route>
        <Route path='/AdminUMViewDetails' element={<AdminUMViewDetails/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

