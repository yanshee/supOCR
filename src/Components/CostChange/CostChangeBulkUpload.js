import React, { useState,useEffect ,Component,useRef} from 'react'
import '../../style/CostChange.css'
import * as XLSX from "xlsx";
import HomeNav from '../Navbar/HomeNav'
import CostChangeAlertButton from '../Buttons/CostChangeAlertButton'
import Searchbar from '../Searchbars/FullLengthSearchbar'
import { FaFileDownload, FaFileUpload, FaArrowLeft,FaBell} from "react-icons/fa";
import FilterButton from '../Buttons/FilterButton'
import SortButton from '../Buttons/SortButton'
import HomeButton from '../Buttons/HomeButton';
import { useNavigate } from "react-router-dom";
import { MdOutlineFileUpload,MdOutlineFileDownload } from "react-icons/md";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
// import { DownloadTableExcel } from 'react-export-table-to-excel';
const cors = require('cors');
// import {useHistory} from "react-router-dom";




const CostChangeBulkUpload=()=>
{

  let navigate = useNavigate();
    const[typeError,setTypeError]=useState(null);
    const[excelFile,setExcelFile]=useState(null);
    const [currentData, setcurrentData] = useState(null);
    const [isButtonVisible, setIsButtonVisible]=useState(false);
    const onChange = (e) => {
        const [file] = e.target.files;
        const reader = new FileReader();
    
        reader.onload = (evt) => {
          const bstr = evt.target.result;
          const wb = XLSX.read(bstr, { type: "binary" });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
          console.log(data);
        };
        reader.readAsBinaryString(file);
      };
    
    
    const handleFile=(e)=>{
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
    const handleFileUpload = (event) => {
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
            setIsButtonVisible(true);
           
          })
          .catch((error) => {
            // handle errors
            console.log(error);
          });
      };


      const [selectedIds, setSelectedIds] = useState([]);
      const handleIdCheckboxChange = (e) => {
         const pathCompute='/CostChangeItemEdit'
         setSelectedIds((prevSelectedId) => {
          if (prevSelectedId.includes(e.target.value)) {
            return prevSelectedId.filter((selectedIds) => selectedIds !== e.target.value);
          } else {
            return [...prevSelectedId, e.target.value];
          }
        });       
      };

      const tableRef = useRef(null);
        const handleDownload=()=>{
        const link=document.createElement('a');
        link.href='/downloads/PricingTemplate.xlsx';
        link.download='Template2.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
   
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
    console.log("current",currentData)
    
    const sortOptions=[
      {value:'price', label:'price'}
    ];
  
    
    return (
        <div>
           <HomeNav/>
            {/*  <div className='ItemListing-title'>
                <text>Cost Change</text>
            </div>
            <a href='/CostChange' className='backBtn'> <i>{<FaArrowLeft />}</i>  Back </a>
            <div class="ItemListing-UploadDownloadBtn">
                <div class="upload-btn-wrapper">
                    <input type="file" onChange={handleFile}  name="" /> 
                    <div className='file'>
                    <button class="Uploadbtn" onClick={handleFileUpload}>Upload file <i class="fa"> {<FaFileUpload/>} </i></button>  
                    <label className="fileformat">(formats: pdf, xlxs, .jpg)</label>
                    </div>
                    
                </div>
                <button class="CostChange-DownloadTemplateButton" onClick={handleDownload}>
                Download Template
                </button>     
            </div> */}
             <div class="main-container">
              <div class='Invoices-heading'>
               
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
                <div className='InvoiceTitle'>
                    <p>Cost Change</p>
                </div>
                <div class='PurchaseOrderMain-notification'>
         <a href='/AlertASN' className='CreateInvBtn1'>Cost Alert &nbsp; {<FaBell/>}</a>
         </div>   
            </div>
            <div class="ItemListing-UploadDownloadBtn">
                <div class="upload-btn-wrapper">
                    <input type="file" onChange={handleFile}  name="" /> 
                    <div className='file'>
                    <button class="Uploadbtn" onClick={handleFileUpload}>Upload file <i class="fa" style={{marginLeft:"2px"}}> {<CloudUploadIcon/>} </i></button>  
                    <label className="fileformat" style={{marginTop:"6px",height:"20px"}}>(formats: pdf, xlxs, .jpg)</label>
                    </div>
                    
                </div>
                <button class="CostChange-DownloadTemplateButton" onClick={handleDownload}>
                Download Template <i class="fa"><MdOutlineFileDownload /></i>
                </button>     
            </div> 
            <SortButton options={sortOptions} onSort={handleSort}/>
            <br></br>
 {currentData ? (
 
<div className="table-New-wrapper pomain-tablewrapper">
 <table className="table POmain" ref={tableRef}>


     <thead>
       <tr>
        <th>Item ID</th>
        <th>ItemName</th>
        <th>Item Category</th>
        <th>Price</th>
        <th>New Price</th>
        <th>Status</th>
       </tr>
     </thead>

     <tbody>
       {currentData.map((individualExcelData) => (

         <tr>
           <td>{individualExcelData.itemId}</td>
           <td>{individualExcelData.itemName}</td>
           <td>{individualExcelData.category}</td>
           <td>{individualExcelData.price}</td>
           <td>{individualExcelData.newSubmittedPrice}</td>
           <td style={{color:individualExcelData.status==='Approved'?'green':'black',fontWeight:'500'}}>{individualExcelData.status}</td>
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
        {/* <button className='ItemListing-Edit-btn' onClick={() => navigate("/CostChangeBulkUploadConfirm")}>Proceed</button>   */}

      {isButtonVisible && (<button className='next-btn' onClick={() => navigate("/CostChangeBulkUploadConfirm")}>Proceed</button>)}
  
                    </div></div>
            
    )
}

export default CostChangeBulkUpload