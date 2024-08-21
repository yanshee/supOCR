import React, { useState,useEffect ,Component} from 'react'
import '../../style/ItemListingMain.css'
import '../../style/PurchaseOrderMain.css'
import HomeNav from '../Navbar/HomeNav'
//import Searchbar from '../Searchbars/FullLengthSearchbar'
import UploadButton from '../Buttons/UploadFile'
import HomeButton from '../Buttons/HomeButton'
import SortButton from '../Buttons/SortButton'
import { FaFileDownload,FaFileUpload,FaEye,FaBell,FaHome } from "react-icons/fa";
// import FilterButton from '../Buttons/FilterButton'
// import SortButton from '../Buttons/SortButton'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Button } from '@mui/material';
const cors = require('cors');


const ItemListingMain=()=>{

    let navigate = useNavigate();
    const [currentData, setcurrentData] = useState(null);
    const[typeError,setTypeError]=useState(null);
    const[excelFile,setExcelFile]=useState(null);

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
          .post("http://localhost:7070/api/listingpricing/service/listing/uploadListingData", formData, {
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

    useEffect(() => {
        const itemdata = async () => {
                 await axios
        .get("http://localhost:7070/api/listingpricing/service/listing/getAllListingData")
        .then((res) => {
            setcurrentData(res.data)
           console.log(currentData)
        }).catch((err) => {
           console.log(err);
    })
        }
        itemdata() 
     },[])

    //  const [selectedIds, setSelectedIds] = useState([]);
    //  const handleIdCheckboxChange = (e) => {
    //     setSelectedIds((prevSelectedId) => {
    //      if (prevSelectedId.includes(e.target.value)) {
    //        return prevSelectedId.filter((selectedIds) => selectedIds !== e.target.value);        
    //      } else {
    //        return [...prevSelectedId, e.target.value];
    //      }
    //    }); 
    //    const pathCompute='/ItemListingItemEditPage'
    //    navigate(pathCompute,{ state: {idSelected: selectedIds}});      
    //  };
    //  const proceedButton = () => {
    //     // const pathCompute='/ItemListingItemEditPage'
    //     // navigate(pathCompute,{ state: {idSelected: selectedIds}});
    //     const pathCompute='/ItemListingItemEditPage'
    //     if(currentData!=null){
    //     navigate(pathCompute,{ state: {id: currentData!= null ? currentData.itemId : 0}});
    //  }

    function tdclick(event){
      const pathCompute='/ItemListingItemEditPage'
     const id=[event.target.value];
      // alert(id);
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
  
  console.log("current",currentData)
  
  const sortOptions=[
    {value:'price', label:'price'}
  ];

  //    function tdclick(event){
  //     const pathCompute='/ItemListingItemEditPage'
  //     if(currentData!=null){
  //     navigate(pathCompute,{ state: {id: currentData!= null ? currentData.itemId : 0}});
  // }};

    //  console.log("new data",selectedIds)

    return (
        <div>
            <HomeNav/>
            {/* <div className='ItemListing-title'>
                <text>Item Listing</text>
            </div> */}
            {/* <div class="ItemListing-searchbar">
                <Searchbar/>
            </div> */}
            {/* <div class='PurchaseOrderMain-description-content'>
             <div class='PurchaseOrderMain-component-Home'>
                 {<FaHome className='PurchaseOrderMain-Ricons-Home'/>}
             </div>
             <div class='PurchaseOrderMain-component-heading'>
                 <p>Item Listing</p>
            </div> */}
            {/* <div class='PurchaseOrderMain-notification'>
                <div class='.CreateInvBtn '>
                     <a class='PurchaseOrderMain-notification-a' onClick={() => navigate("/AlertItemListing")}>Item Listing Alerts</a>
                     {<FaBell className='PurchaseOrderMain-Ricons'/>}
                </div>
             </div>       */}
              {/* <a href='/AlertInvoices' className='CreateInvBtn'>Invoice Alert &nbsp; {<FaBell/>}</a>
        </div> */}
        <div class="main-container">
        <div class='Invoices-heading'>
                {/* <HomeButton/> */}
                <div className='InvoiceTitle'>
                    <p>Item Listing</p>
                </div>
                <div class='PurchaseOrderMain-notification'>
         <a href='/AlertInvoices' className='CreateInvBtn1'>Listing Alert &nbsp; {<FaBell/>}</a>
         </div>   
            </div>

           <div class="ItemListing-UploadDownloadBtn">
                <button className='ItemListing-Edit-btn' onClick={() => navigate("/ItemListingBulkUpload")}>Bulk Upload <i class="fa"> {<FaFileUpload/>} </i></button>
            </div>
            <SortButton options={sortOptions} onSort={handleSort}/>
            {currentData ? (
 
//  <div className="table-New-wrapper">
//    <table className="table">
<div className="table-New-wrapper pomain-tablewrapper">
    <table className="table POmain">
     <thead>
       <tr>

       {/* <th>Select</th> */}
        <th>Item ID</th>
        <th>Item Name</th>
        <th>SKU</th>
        <th>Price</th>
        <th>Status</th>
        <th>View</th>
       </tr>
     </thead>

     <tbody>
     {currentData.map((individualExcelData, index) => (

         <tr>
            {/* <td><input type='checkbox' value={individualExcelData.itemId} onClick={handleIdCheckboxChange}></input></td> */}
           <td>{individualExcelData.itemId} </td>
           <td>{individualExcelData.itemName}</td>
           <td>{individualExcelData.sku}</td>
           <td>{individualExcelData.price}</td>
           <td style={{color:individualExcelData.status==='Active'?'green':'red',fontWeight:'500'}}>{individualExcelData.status}</td>
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
            
            {/* <button className='ItemListing-Edit-btn' onClick={proceedButton}>Edit</button> */}
        </div>
        </div>
    )
}

export default ItemListingMain