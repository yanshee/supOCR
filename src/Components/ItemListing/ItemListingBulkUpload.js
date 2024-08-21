import React, { useState,useEffect ,Component} from 'react'
import '../../style/ItemListingMain.css'
import '../../style/CostChange.css'
import HomeNav from '../Navbar/HomeNav'
import HomeButton from '../Buttons/HomeButton';
import SortButton from '../Buttons/SortButton';
//import Searchbar from '../Searchbars/FullLengthSearchbar'
import UploadButton from '../Buttons/UploadFile'
import { FaFileDownload,FaFileUpload,FaBell , FaArrowLeft} from "react-icons/fa";
// import FilterButton from '../Buttons/FilterButton'
// import SortButton from '../Buttons/SortButton'
import { useNavigate } from "react-router-dom";
import { MdOutlineFileUpload,MdOutlineFileDownload } from "react-icons/md";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import * as XLSX from 'xlsx/xlsx';
import { Button } from '@mui/material';
const cors = require('cors');


const ItemListingBulkUpload=()=>{

    let navigate = useNavigate();
    const [currentData, setcurrentData] = useState(null);
    const[typeError,setTypeError]=useState(null);
    const[excelFile,setExcelFile]=useState(null);
    const [isButtonVisible, setIsButtonVisible]=useState(false);

    const handleFile=(e)=>{
        let fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv'];
        let selectedFile = e.target.files[0];
        // if(selectedFile){
        //   validateExcelFile(selectedFile);
        // }
        // else{
        //   console.log('no file selected')
        // }
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
          .post("http://localhost:7070/api/listingpricing/service/listing/uploadListingData", formData, {
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
      // const validateExcelFile=(file)=>{
      //   const reader=new FileReader();

      //   reader.onload=(e)=>{
      //     const data=e.target.result;
      //     const workbook=XLSX.read(data,{type:'binary'});

      //     if(workbook.sheets['sheet1']){
      //       const worksheet=workbook.Sheets['sheet1'];

      //       if(worksheet['ITEM_ID'] && worksheet['ITEM_NAME'] && worksheet['ITEM_DESCRIPTION'] && worksheet['SKU'] && worksheet['PRICE'] && worksheet['STATUS'] && worksheet['CATEGORY'] && worksheet['IMAGE_URL']){
      //         console.log("File Status",'Excel File is valid');
      //       }
      //       else{
      //         console.log("File Status",'Required columns are missing');
      //       }
      //     }
      //     else{
      //       console.log("File Status",'Sheet1 not found');
      //     }
      //   }
      //   reader.readAsBinaryString(file);
      // }

    const handleDownload=()=>{
        const link=document.createElement('a');
        link.href='/downloads/ListingTemplate.xlsx';
        link.download='Template1.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

     const [selectedIds, setSelectedIds] = useState([]);
     const handleIdCheckboxChange = (e) => {
        const pathCompute='/ItemListingItemEditPage'
        setSelectedIds((prevSelectedId) => {
         if (prevSelectedId.includes(e.target.value)) {
           return prevSelectedId.filter((selectedIds) => selectedIds !== e.target.value);
         } else {
           return [...prevSelectedId, e.target.value];
         }
       });       
     };
     const proceedButton = () => {
        const pathCompute='/ItemListingItemEditPage'
        navigate(pathCompute,{ state: {idSelected: selectedIds}});
     }

     console.log("new data",selectedIds)

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
            {/* <div className='ItemListing-title'>
                <text>Item Listing</text>
            </div>
            {<FaArrowLeft className='PurchaseOrderMain-Ricons-Back'/>}
                     <a href='/ItemListingMain' class='PurchaseOrderMain-Back-a' style={{textDecoration:'none'}}>Back</a>
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
                {/* <HomeButton/> */}
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
                    <p>Item Listing</p>
                </div>
                <div class='PurchaseOrderMain-notification'>
         <a href='/AlertASN' className='CreateInvBtn1'>Listing Alert &nbsp; {<FaBell/>}</a>
         </div>   
            </div>
            <div class="ItemListing-UploadDownloadBtn">
                <div class="upload-btn-wrapper">
                    <input type="file" style={{marginLeft:"1%"}} onChange={handleFile}  name="" /> 
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
 <table className="table POmain">

     <thead>
       <tr>

        <th>Item ID</th>
        <th>ItemName</th>
        <th>Item Category</th>
        <th>Price</th>
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
           <td style={{color:individualExcelData.status==='Active'?'green':'red',fontWeight:'500'}}>{individualExcelData.status}</td>
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

            
{isButtonVisible && (<button className='next-btn' onClick={() => navigate("/ItemListingBulkUploadConfirm")}>Proceed</button>)}
        </div>
        </div>
    )
}

export default ItemListingBulkUpload