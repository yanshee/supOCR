import React, { useState,useEffect} from 'react';
import HomeNav from '../Navbar/HomeNav';
import '../../style/UserMgmtMain.css';
import FullLengthSearchbar from '../Searchbars/FullLengthSearchbar';
import ASN_Alert_button from '../Buttons/ASN_Alert_button';
import { FaBell, FaCloudDownloadAlt, FaDownload, FaPlusCircle ,FaEye} from "react-icons/fa";
import HomeButton from '../Buttons/HomeButton';
import FilterButton from '../Buttons/FilterButton';
import ExportButton from '../Buttons/ExportButton';
import SortButton from '../Buttons/SortButton';
import "../../style/ASNMain.css";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
const cors = require('cors');
// const asnData = [
//   {
//     asn: 'ASN1240',
//     creationDate: '12-April-2023',
//     shippingDate: '1-April-2023',
//     delivery: 'D-12001349',
//     status: 'Delivered'
//   }, {
//     asn: 'ASN12401',
//     creationDate: '12-April-2023',
//     shippingDate: '1-April-2023',
//     delivery: 'D-12001349',
//     status: 'Delivered'
//   }, {
//     asn: 'ASN1242',
//     creationDate: '12-April-2023',
//     shippingDate: '1-April-2023',
//     delivery: 'D-12001349',
//     status: 'Delivered'
//   },
  
// ];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  height: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ASNMain() {
  let navigate=useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [asnData,setAsnData]=useState([]);
  const [open, setOpen] = useState(false);
  const [currentInfo,setcurrentInfo]=useState([]);
  const [asnNo,setasnNo]=useState();
  const[information,setInformation]=useState();
  const[asnDetail,setAsnDetail]=useState();
  const itemsPerPage = 11;

  const totalPages = Math.ceil(asnData.length / itemsPerPage);

  const handleClose = () => setOpen(false);
  const handleOpen=()=> setOpen(true)

    function tdclick(event) {
        const pathCompute = '/ASNView_details'
        const id = event.target.value;
        // alert(id);
        navigate(pathCompute, { state: { id: id } });
    };
  useEffect(() => {
    const itemdata = async () => {
        await axios
            .get("http://localhost:4040/api/asn/service/getAllASNListingData")
            .then((res) => {
                setAsnData(res.data)
                console.log("Asn Data",asnData)
            }).catch((err) => {
                console.log(err.response.data);
            })
    }

    itemdata()
}, [])


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleBack = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = asnData.slice(startIndex, endIndex);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedItems(asnData.map(item => item.asn));
    } else {
      setSelectedItems([]);
    }
  };


  const handleSelectOne = (asn) => {
    if (selectedItems.includes(asn)) {
      setSelectedItems(selectedItems.filter(item => item !== asn));
    } else {
      setSelectedItems([...selectedItems, asn]);
    }
  };

  const handleSort=(sortParameter)=>{
    
    let sortedData=[...asnData]
    if(sortParameter==="asnCreationDate"){
      sortedData.sort((a,b)=>new Date(a.asnCreationDate)-new Date(b.asnCreationDate));
    }
    setAsnData(sortedData)
    console.log("Sort",sortedData)
  }

  console.log("asnData",asnData)
  const sortOptions=[
    {value:'asnCreationDate', label:'asnCreationDate'}
    // ,{value:'asnStatus',label:'asnStatus'}
  ];

  const filterOptions=[
    {value:'asnCreationDate', label:'asnCreationDate'},{value:'asnStatus',label:'asnStatus'},{value:'asnId',label:'asnId'}
  ]

  // const handleFilter=(filterValue)=>{
  //   if(typeof filterValue==='String'){
  //     const lowerCasedFilter=filterValue.toLowerCase();
  //   const filtered=asnData.filter(item=>item.name.toLowerCase().includes(lowerCasedFilter)) 
  //   setAsnData(filtered) 
  //   }else{
  //     console.log("not filetring")
  //   }
  // }

  // useEffect(() => {
  //   const itemdata = async () => {
  //     await axios
  //       .get(`http://localhost:4040/api/asn/service/getAllASNDetails?asnId=${asnNo}`)
  //       .then((res) => {
  //         setcurrentInfo(res.data)
  //         console.log("Info",asnNo);
  //       }).catch((err) => {
  //         console.log(err.response.data);
  //       })
  //   }
  //   itemdata()
  // }, [asnNo])

  // const getDetails = () => {
  //   axios({
  //     method:'get',
  //     url:`http://localhost:4040/api/asn/service/getAllASNDetails?asnId=${asnNo}`,
  // }).then(response=>{
  //   setcurrentInfo(response.data)
  //         console.log("Info",asnNo);
  // }).catch((err) => {
  //   console.log(err.response.data);
  // })
  
  // };

  // function dispatchASN(event) {
  //   const itemdata = async () => {
  //     const asnId = event.target.value;
  //     setasnNo(asnId);
  //     console.log("asnNo2",asnId)
  //     await axios
         
  //         .post("http://localhost:4040/api/asn/service/saveASN?",currentInfo,{
  //           params:{
  //             asnId:asnId,
  //             asnStatus:"Ready to pickup"
  //           }
  //         })
  //         .then((res) => {
  //           window.location = "/ASNMain";
  //         }).catch((err) => {
  //         //   
  //         alert("unsuccessful")
  //         })
  //     }
  //     itemdata()
  //   }

const status="Ready to pickup"

const onASNClick=(event)=>{
setasnNo(event.target.value);
fetchInformation(event.target.value);
}
console.log("asnNo",asnNo)

const fetchInformation=(asnNo)=>{
  axios.get(`http://localhost:4040/api/asn/service/getAllASNDetails?asnId=${asnNo}`)
  .then(response=>{
    // const updatedInfo={...response.data,asnStatus:status}
    // setInformation(updatedInfo);
    dispatchASN(asnNo)
          // console.log("Info",asnNo);
  }).catch((err) => {
    console.log(err.response.data);
  })
}


const dispatchASN=(asnNo)=>{
  
  console.log("asnNo",asnNo)
  
     axios.post(`http://localhost:4040/api/asn/service/dispatchASN?asnId=${asnNo}`)
          .then((res) => {
            // alert("data successfully saved")
            window.location="/ASNMain"
            console.log("response",res)
          }).catch((err) => {
          console.log(err.response.data)   
          alert("unsuccessful")
          })
}
  return (
    <div>
       <div>
                <HomeNav />
            </div>
            <div class='Invoices-heading'>
                {/* <HomeButton/> */}
                <div className='InvoiceTitle'>
                    <p>ASN</p>
                </div>
                <div class='PurchaseOrderMain-notification'>
         <a href='/AlertASN' className='CreateInvBtn1'>ASN Alert &nbsp; {<FaBell/>}</a>
         </div>   
            </div>
      {/* <ASN_Alert_button /> */}
      {/* <FullLengthSearchbar /> */}
      <a href='/ASNCreate' className='CreateInvBtn'>Create New ASN &nbsp; {<FaPlusCircle />}</a>
      {/* <ExportButton />
      <SortButton /> */}
      <SortButton options={sortOptions} onSort={handleSort}/>
      {/* <FilterButton options={filterOptions} onSort={handleSort}/> */}

      {/* <div className="table-New-wrapper">
<table className="table"> */}
<div className="table-New-wrapper pomain-tablewrapper">
    <table className="table POmain">
          <thead>
            <tr>
              {/* <th>
                <input type="checkbox" onChange={handleSelectAll} />
              </th> */}
              <th>ASN #</th>
              <th>Creation Date</th>
              <th>Shipping Date</th>
              <th>Delivery #</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, index) => (
              <tr key={index}>
                {/* <td>
                  <input type="checkbox" checked={selectedItems.includes(row.asn)} onChange={() => handleSelectOne(row.asn)} />
                </td> */}
                {/* <td><Link to={`/asn/${row.asn}`}>{row.asn}</Link></td> */}
                <td>{row.asnId}</td>
                <td>{row.asnCreationDate}</td>
                <td>{row.shippingDate}</td>
                <td>{row.deliveryNoteNo}</td>
                <td>{row.asnStatus==='Submitted'?<div><button className='Ready-to-pickup' value={row.asnId} onClick={onASNClick}>Click to Dispatch</button></div>:<p>{row.asnStatus}</p>}</td>
                <td>{<Button value={row.asnId} onClick={tdclick}><FaEye className='PurchaseOrderMain-Ricons'></FaEye></Button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <div className="pagination">
          <button onClick={handleBack} disabled={currentPage === 1}>
            <FaArrowLeft style={{ marginBottom: "-2px", marginRight: "3px" }} />Back
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`pagination-item ${currentPage === page ? 'active' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Next <FaArrowRight style={{ marginBottom: "-2px", marginLeft: "3px" }} />
          </button>
        </div>
        <button className="dispatch-button">
            Dispatch Selected
        </button> */}
      </div>
    </div>
  )
}

export default ASNMain;
