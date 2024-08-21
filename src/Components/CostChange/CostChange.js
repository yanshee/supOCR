import React, { useState,useEffect ,Component} from 'react'
import '../../style/CostChange.css'
import '../../style/ItemListingMain.css'
import '../../style/UploadFile.css'
import HomeNav from '../Navbar/HomeNav'
import CostChangeAlertButton from '../Buttons/CostChangeAlertButton'
import Searchbar from '../Searchbars/FullLengthSearchbar'
import { FaFileDownload, FaFileUpload,FaBell,FaEye,FaHome} from "react-icons/fa";
import FilterButton from '../Buttons/FilterButton'
import SortButton from '../Buttons/SortButton'
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import HomeButton from '../Buttons/HomeButton'
import axios from 'axios';
const cors = require('cors');
const CostChange=()=>
{
    let navigate = useNavigate();
    const [currentData, setcurrentData] = useState(null);
    const[typeError,setTypeError]=useState(null);
    const[excelFile,setExcelFile]=useState(null);
    const [ccData,setccData]=useState([]);
    
    useEffect(() => 
    {
        const itemdata = async () => {
                 await axios
        .get("http://localhost:7070/api/listingpricing/service/pricing/getAllPricingData")
        .then((res) => {
            setcurrentData(res.data)
           console.log(currentData)
        }).catch((err) => {
           console.log(err);
    })
        }
        itemdata() 
    },[])

    const handleFile=(e)=>
    {
      let fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv'];
      let selectedFile = e.target.files[0];
      if(selectedFile){
        if(selectedFile&&fileTypes.includes(selectedFile.type)){
            setTypeError(null);
            setExcelFile(e.target.files[0])
        }
        else{
          setTypeError('Please select only excel file types');
          setExcelFile(null);
        }
      }
      else{
        console.log('Please select your file');
      }
    }
  const handleFileUpload = (event) => 
  {
      // create a new FormData object and append the file to it
      const formData = new FormData();
      formData.append("inpFile", excelFile);
      // make a POST request to the File Upload API with the FormData object and Rapid API headers
      axios
        .post("http://localhost:7070/api/listingpricing/service/pricing/uploadPricingData", formData, {
          headers: {
            "Content-Type": "multipart/form-data",

          },
        })
        .then((response) => {
          // handle the response
          console.log("HI",response.data);
          setcurrentData(response.data)
        })
        .catch((error) => {
          // handle errors
          console.log(error);
        });
  };

    //  const [selectedIds, setSelectedIds] = useState([]);
    //  const handleIdCheckboxChange = (e) => {
    //     const pathCompute='/CostChangeItemEdit'
    //     setSelectedIds((prevSelectedId) => {
    //      if (prevSelectedId.includes(e.target.value)) {
    //        return prevSelectedId.filter((selectedIds) => selectedIds !== e.target.value);
    //      } else {
    //        return [...prevSelectedId, e.target.value];
    //      }
    //    });       
    //  };
    //  const proceedButton = () => {
    //     const pathCompute='/CostChangeItemEdit'
    //     navigate(pathCompute,{ state: {idSelected: selectedIds}});
    //  }
    //  console.log("new data",selectedIds)

    function tdclick(event){
      const pathCompute='/CostChangeItemEdit'
     const id=[event.target.value];
      navigate(pathCompute,{ state: {idSelected: id}});
  };

  const handleSort=(sortParameter)=>{
    let sortedData=[...currentData]
    if(sortParameter==="price"){
      sortedData.sort((a,b)=>{
      const priceA=parseFloat(a.price.replace("Rs","").trim());
      console.log("PriceA",priceA)
      const priceB=parseFloat(b.price.replace("Rs","").trim());
      console.log("PriceB",priceB)
      return priceA-priceB;
    });
    }
    setcurrentData(sortedData)
    console.log("Sort",sortedData)
  }
  console.log("ccData",ccData)
  console.log("current",currentData)
  
  const sortOptions=[
    {value:'price', label:'price'}
  ];

  const filterOptions=[
    {value:'asnCreationDate', label:'asnCreationDate'},{value:'asnStatus',label:'asnStatus'},{value:'asnId',label:'asnId'}
  ]

    return(
        <div>
            <HomeNav/>
            {/* <div class='PurchaseOrderMain-description-content'>
             <div class='PurchaseOrderMain-component-Home'>
                 {<FaHome className='PurchaseOrderMain-Ricons-Home'/>}
             </div>
             <div class='PurchaseOrderMain-component-heading'>
                 <p>Cost Change</p>
            </div>
            <div class='PurchaseOrderMain-notification'>
                <div class='PurchaseOrderMain-notification-alerts'>
                     <a class='PurchaseOrderMain-notification-a' onClick={() => navigate("/AlertCC")}>cost change Alerts</a>
                     {<FaBell className='PurchaseOrderMain-Ricons'/>}
                </div>
             </div>      
        </div> */}
            {/* <div class="ItemListing-searchbar">
                <Searchbar/>
            </div> */}
            <div class="main-container">
            <div class='Invoices-heading'>
                {/* <HomeButton/> */}
                <div className='InvoiceTitle'>
                    <p>Cost Change</p>
                </div>
                <div class='PurchaseOrderMain-notification'>
         <a href='/AlertCC' className='CreateInvBtn1'>Cost Alert &nbsp; {<FaBell/>}</a>
         </div>   
            </div>

            <div class="ItemListing-UploadDownloadBtn">
                {/* <div class="upload-btn-wrapper">
                    <button class="Uploadbtn" onClick={handleFileUpload}>Upload a file <i class="fa"> {<FaFileUpload/>} </i></button>
                    <input type="file" onChange={handleFile}  name="" /> <text>(formats: pdf, xlxs, .jpg)</text>
                </div>
                <button class="ItemListing-DownloadTemplateButton">
                    {<FaFileDownload class="ItemListing-DownloadTemplateButton-icon"/>} <div>Download Template</div>
                </button> */}
                <button className='ItemListing-Edit-btn' onClick={() => navigate("/CostChangeBulkUpload")}>Bulk Upload <i class="fa"> {<FaFileUpload/>} </i></button>
            </div>
            <SortButton options={sortOptions} onSort={handleSort}/>
            {currentData ? (
            
            // <div className="table-New-wrapper">
            //   <table className="table">
<div className="table-New-wrapper pomain-tablewrapper">
    <table className="table POmain">
                <thead>
                  <tr>

                  {/* <th>Select</th> */}
                    <th>Item ID</th>
                    <th>ItemName</th>
                    <th>Item Category</th>
                    <th>Price</th>
                    <th>New Price</th>
                    <th>Status</th>
                    <th>View</th>
                  </tr>
                </thead>

                <tbody>
                {currentData.map((individualExcelData, index) => (

                    <tr>
                        {/* <td><input type='checkbox'  disabled={individualExcelData.status==='Submitted'}value={individualExcelData.itemId} onClick={handleIdCheckboxChange}></input></td> */}
                      <td>{individualExcelData.itemId}</td>
                      <td>{individualExcelData.itemName}</td>
                      <td>{individualExcelData.category}</td>
                      <td>{individualExcelData.price}</td>
                      <td>{individualExcelData.newSubmittedPrice}</td>
                      <td style={{color:individualExcelData.status==='Approved'?'green':'black',fontWeight:'500'}}>{individualExcelData.status}</td>
                      <td >{<Button value={individualExcelData.itemId} onClick={tdclick}><FaEye className='PurchaseOrderMain-Ricons'></FaEye></Button> }</td>
                    </tr>

                  ))}

                </tbody>
              </table>

              <br />
            </div>

            ) : (

            <div style={{

              border: "1px solid black",
              padding: "1em",
              margin: "1em",
              backgroundColor: "black",
              color: 'white',
              textAlign: 'center'

            }}>No data found</div>

            )}
            
            {/* <button className='ItemListing-Edit-btn' onClick={proceedButton}>Proceed</button> */}
          </div>
          </div>
    )
}

export default CostChange