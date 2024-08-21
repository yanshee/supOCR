import React, { useState,useEffect, useRef} from 'react'
import HomeNav from '../Navbar/HomeNav'
import {FaArrowLeft, FaCross, FaSearch, FaTrash,FaBell,FaAngleDown, FaArrowDown} from "react-icons/fa";
import '../../style/CreateInvoices.css'
import UploadButton from '../Buttons/UploadFile'
import HomeButton from '../Buttons/HomeButton';
import InvoiceAlertButton from '../Buttons/InvoiceAlertButton'
import axios from 'axios';
import * as XLSX from 'xlsx/xlsx';
import { VscDiffAdded } from "react-icons/vsc";
import { FaRegSquareMinus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";


const CreateInvoices=()=>{
 
 
  let navigate = useNavigate();
  const [currentData, setcurrentData] = useState(null);
  const [selectedPOs, setselectedPOs] = useState([]);
  const [storeData,setstoreData]=useState([]);
  // const [currentPO, setcurrentPO] = useState([]);
  // const [selectedPO,setselectedPO]=useState([]);
  const [currentPO, setCurrentPO] = useState([]);
   const [selectedPO,setSelectedPO]=useState([]);
  useEffect(() => {
      const itemdata = async () => {
               await axios
      .get("http://localhost:5050/api/purchaseOrders/service/getPOListingData")
      .then((res) => {
        setcurrentData(res.data)
       
      }).catch((err) => {
         console.log(err);
  })
      }
      itemdata()
   },[])

   console.log("hi", currentData)

   useEffect(() => {
    const itemdata = async () => {
             await axios
    .get("http://localhost:4040/api/invoice/service/invoice/getStoreDetails")
    .then((res) => {
      setstoreData(res.data)
     
    }).catch((err) => {
       console.log(err);
})
    }
 
    itemdata()
 },[])

  // function tdclick(event){
  //     const pathCompute='/InvoiceDetails'
  //    const id=event.target.value;
  //     // alert(id);
  //     navigate(pathCompute,{ state: {id: id}});
  // };

  // const handlePOCheckboxChange = (e) => {
  //   setselectedPOs((prevSelectedBrands) => {
  //     if (prevSelectedBrands.includes(e.target.value)) {
  //       return prevSelectedBrands.filter((selectedPO) => selectedPO !== e.target.value);
        
  //     } else {
  //       return [...prevSelectedBrands, e.target.value];
  //     }
  //   });
  // };

  function tdclick(event){
    const pathCompute='/InvoiceDetails'
   const id=selectedPO;
    // alert(id);
    // navigate(pathCompute,{ state: {id: selectedPOs}});
    navigate(pathCompute,{ state: {id: {
      poid:id,
      store:storeData,
    }}})
};
  console.log(selectedPOs);

  // const handleInputChange=(e)=>{
  //   setcurrentPO(e.target.value);
  // }

  // const handleAddPO=()=>{
  //   if(currentPO && !selectedPO.includes(currentPO)){
  //     setselectedPO([...selectedPO,currentPO]);
  //     setcurrentPO('')
  //   }
  // };

  const handleInputChange = (e) => {
    setCurrentPO(e.target.value);
  };
 
  const handlePOCheckboxChange = (selectedPOToRemove) => {
    setSelectedPO(prevSelectedPOs => prevSelectedPOs.filter(selectedPO => selectedPO !== selectedPOToRemove));
  };
  const handleAddPO = () => {
    if (currentPO && !selectedPO.includes(currentPO)) {
      setSelectedPO(prevSelectedPOs => [...prevSelectedPOs, currentPO]);
      setCurrentPO('');
    }
  };
console.log("current",currentPO)
console.log("select",selectedPO)
  // useEffect(()=>{
  //   fetch('http://localhost:4040/api/invoice/service/invoice/getStoreDetails')
  //   .then(response =>response.json())
  //   .then(data => setstoreDetails(data))
  //   .catch(error => console.error('Error fetching tpl partner:',error))
  //  },[]);
  //  console.log("tpl",tplPartner)
 
  // const handleFileUpload = (event) => {
  //   let fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv'];
  //   let selectedFile = event.target.files[0];
  //   if(selectedFile){
  //     if(selectedFile&&fileTypes.includes(selectedFile.type)){
  //         setTypeError(null);
  //         setExcelFile(event.target.files[0])
  //     }       
  //     else{
  //       setTypeError('Please select only excel file types');
  //       setExcelFile(null);
  //     }
  //   }
  //   else{
  //     console.log('Please select your file');
  //   }
  //   // create a new FormData object and append the file to it
  //   const formData = new FormData();
  //   formData.append("inpFile", excelFile);
  //   // make a POST request to the File Upload API with the FormData object and Rapid API headers
  //   axios
  //     .post("http://localhost:7070/api/listingpricing/service/listing/uploadListingData", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",

  //       },
  //     })
  //     .then((response) => {
  //       // handle the response
  //       console.log("HI",response.data);
  //       setcurrentData(response.data)
  //     })
  //     .catch((error) => {
  //       // handle errors
  //       console.log(error);
  //     });
  // };
  
  const tableRef = useRef(null);

  return (
    <div>
        <HomeNav/>
        {/* <div className='title'>
        <div class='Back-button'>
                     {<FaArrowLeft className='PurchaseOrderMain-Ricons-Back'/>}
                  
                     
                 </div>
              <text>Create Invoices</text>
              <div class='PurchaseOrderMain-notification'>
         <a href='/AlertInvoices' className='CreateInvBtn1'>Invoice Alert &nbsp; {<FaBell/>}</a>
         </div>  
        </div>
        
        <br/>
        
        {<UploadButton/>}
        <br/><br/> */}
<div class='Invoices-heading'>
        <HomeButton />
        <button onClick={() => navigate(-1)} class='back_button_dc'><FaArrowLeft
          style={{
            fontSize: "10px",
            marginRight: "5px",
            outline: "none",
            border: "none",
          }}
        />
          Back
        </button>
        <div className="InvoiceTitle">
          <p>Create ASN</p>
        </div>
        <div class='PurchaseOrderMain-notification'>
          <a href='/AlertASN' className='CreateInvBtn1'>ASN Alert &nbsp; {<FaBell />}</a>
        </div>
      </div>
        {/* <text className='ORtext'> OR </text>
        <br/> */}

        <div className='StoreSelector'>
          <div>
            <p>Retailer Store</p>
<select className='RetailerStoreInput'>
              <option> Select Store </option>
              {storeData?.map((sttoreData, index) => (
                 <option>{sttoreData}</option>
              ))}
             
            </select>
          </div>
          
          <div>
            <p>Purchase Order(s):</p>
            <div className='POInput'>
            <input placeholder='Enter P.O Number' value={currentPO} onChange={handleInputChange}></input>
<i onClick={handleAddPO}><VscDiffAdded /></i>

              {/* <i>{<FaArrowDown/>}</i> */}
            </div>
          </div>              
        </div>

        <div className='SelectedPO'>
          <div>
            <p>Selected PO(s):</p>
            <form className='form-container'>
              <div className='TableWrapper'>
              <fieldset>
              <ul>
        
              {selectedPO.map((individualPO, index) => (
<li key={index} onClick={() => handlePOCheckboxChange(individualPO)}>
<FaRegSquareMinus />
                   {individualPO}
</li>
              ))}
                     
              </ul>
              </fieldset>
             </div>

             {<a value="" class="nextBtn" onClick={tdclick}>Populate Items</a> } 
            </form>
            
          </div>
        </div>
    </div>
)

}

export default CreateInvoices