import React, { useState, useEffect } from 'react';
import HomeNav from '../Navbar/HomeNav';
// import { FaUserAlt, FaUserCheck, FaBuilding, FaUserEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import '../../style/UserMgmtMain.css';
import FullLengthSearchbar from '../Searchbars/FullLengthSearchbar';
import ASN_Alert_button from '../Buttons/ASN_Alert_button';
import { FaBell, FaAngle, FaAngleDoubleDown, FaCloudDownloadAlt, FaDownload, FaPlusCircle } from "react-icons/fa";
import HomeButton from '../Buttons/HomeButton';
import FilterButton from '../Buttons/FilterButton';
import ExportButton from '../Buttons/ExportButton';
import SortButton from '../Buttons/SortButton';
import DownloadAsnButton from '../Buttons/DownloadAsnButton';
import "../../style/ASNView_detail.css";
// import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ExportOnly from '../Buttons/ExportOnly';
import { RiArrowUpDoubleFill } from "react-icons/ri";
import { IoIosCloudDownload } from "react-icons/io";
import { RiArrowDownDoubleLine } from "react-icons/ri";


// const container1 = [
//   {

//     creationDate: '12-April-2023',
//     containerId: "C4545-124-965",
//     totalItems: 3,
//     totalShippingQty:120,
//     shippingDate: '1-April-2023',
//     eta:'26-April-2023',
//     location:"MG-Road Bangalore"
//   },
// ]

// const container2 = [
//   {
//     itemId: 'i-78809121-2544',
//     item: 'Hp Laptop Victus',
//     po: 'PO-R-MUM-3101290427',
//     poQty: 20,
//     deliveryQty:20,
//     shippingQty: 200,
//     remainingQty:280
//   },
//   {
//     itemId: 'i-78809121-2544',
//     item: 'Hp Laptop Victus',
//     po: 'PO-R-MUM-3101290427',
//     poQty: 20,
//     deliveryQty:20,
//     shippingQty: 200,
//     remainingQty:280
//   },
//   {
//     itemId: 'i-78809121-2544',
//     item: 'Hp Laptop Victus',
//     po: 'PO-R-MUM-3101290427',
//     poQty: 20,
//     deliveryQty:20,
//     shippingQty: 200,
//     remainingQty:280
//   },
// ]


function ASNView_detail(id) {

  const { asn } = useParams(); // Get the ASN number from URL params
  const navigate = useNavigate();
  const handleBackButtonClick = () => { navigate(-1) }

  const [containerDetailsOpen, setContainerDetailsOpen] = useState(true);
  const [containerDetailsOpen1, setContainerDetailsOpen1] = useState(false);
  const [containerDetailsOpen2, setContainerDetailsOpen2] = useState(false);
  const [containerDetailsOpen3, setContainerDetailsOpen3] = useState(false);
  const [currentData, setcurrentData] = useState(null);
  const [containerData, setcontainerData] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [filteredData, setFilterData] = useState(null);
  const [filtercrieteria,setFiltercrieteria]=useState('');
 

  const toggleContainerDetails = () => {
    setContainerDetailsOpen(!containerDetailsOpen);
  };
  const toggleContainerDetails1 = () => {
    setContainerDetailsOpen1(!containerDetailsOpen1);
  };
  const toggleContainerDetails2 = () => {
    setContainerDetailsOpen2(!containerDetailsOpen2);
  };
  const toggleContainerDetails3 = () => {
    setContainerDetailsOpen3(!containerDetailsOpen3);
  };
  useEffect(() => {
    if (currentData) {
      console.log("If")
      setcontainerData(JSON.parse(currentData?.containerDetails));
    } else {
      console.log("else")
      setcontainerData(null); // Or any default value you want
    }
  }, [currentData])



  useEffect(() => {
    const itemdata = async () => {
      await axios
        .get(`http://localhost:4040/api/asn/service/getAllASNDetails?asnId=${id.id}`)
        .then((res) => {
          setcurrentData(res.data)
          console.log(currentData);
        }).catch((err) => {
          console.log(err);
        })
    }
    itemdata()
  }, [])
  console.log("Current Data", currentData)


  

  //  useEffect(() => { 
  //   if (containerData) {
  //     setcontainerData(JSON.parse(containerData?.containerDetails));
  //   } else {
  //     setcontainerData(null); // Or any default value you want
  //   }
  //  },[currentData])
  console.log("container1", containerData)
  console.log("id", id)
  console.log("filteredData", filteredData)

  const handleViewDetails = (containerNumber) => {
    setSelectedIndex(containerNumber)
    setFilterData(containerData.containerDetails.filter(item => {
      return item.container_number === containerNumber
    }))
  }
  return (
    <div>

      <HomeNav />
      <div className='Invoices-heading'>
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
        <div className='InvoiceTitle'>
          <p>View ASN</p>

        </div>
        <div class='PurchaseOrderMain-notification'>
         <a href='/AlertASN' className='CreateInvBtn1'>ASN Alert &nbsp; {<FaBell/>}</a>
         </div>   
      </div>
      
      {/* <FullLengthSearchbar />
      <ExportOnly />
      <DownloadAsnButton /> */}
      {/* <button className='back_button' onClick={handleBackButtonClick} >
        <FaArrowLeft style={{ fontSize: "10px", marginRight: "5px", outline: "none", border: "none" }} />Back</button> */}
      <div className='asn_ribbon' >
        <span style={{ marginLeft: "49.8%" }}>{id?.id}</span>
        {/* <span style={{ marginLeft: "47%" }}>Container Details</span> */}
        {containerDetailsOpen ? (
          <RiArrowUpDoubleFill style={{ float: "right", fontSize: "20px", cursor: "pointer" }}
            onClick={toggleContainerDetails} />
        ) : (
          <RiArrowDownDoubleLine style={{ float: "right", fontSize: "20px", cursor: "pointer" }}
            onClick={toggleContainerDetails} />
        )}

      </div>
      {containerDetailsOpen && (
        <div className='asn_detail_container'>
          <div className='asn_detail'>

            <span>Creation Date</span>
            <p>{currentData?.asnCreationDate}</p>
            <span>Consignment Status</span>
            <p>{currentData?.asnStatus}</p>
            <span>Container Quantity</span>
            <p>{currentData?.containerCount}</p>

          </div>
          <div className='asn_detail'>
            <span>Shipped Qty</span>
            <p>{currentData?.shippedQty}</p>
            <span>Shipping Date</span>
            {/* <p>{currentData?.shippingDate}</p> */}
            <p>2024/05/14</p>
            <span>ETA</span>
            <p>25-April-2023</p>
            <span>E-Way Bill Number</span>
            <p>{currentData?.ewayNo}<i><IoIosCloudDownload /></i></p>

          </div>
          <div className='asn_detail'>
            <span>AWB Number</span>
            <p>{currentData?.awbNo}<i><IoIosCloudDownload /></i></p>
            <span>Delivery Challan No</span>
            <p>{currentData?.deliveryNoteNo}<i><IoIosCloudDownload /></i></p>
            <span>Driver Name</span>
            <p>{currentData?.driverName}</p>
            <span>Vehicle Number</span>
            <p>{currentData?.vehicleNo}</p>
          </div>


        </div>
      )}

      <div className='asn_ribbon'>
        <span style={{ marginLeft: "47%" }}>Container Details</span>
        {/* {<FaAngleDoubleDown onClick={toggleContainerDetails1} className='OrderSummary-Ricons-Uparraow'/>} */}
        <RiArrowUpDoubleFill style={{ float: "right", fontSize: "20px", cursor: "pointer" }}
          onClick={toggleContainerDetails1} />
      </div>
      {containerDetailsOpen1 && (<div class="div1">
        <div>
          {containerData?.containerDetails?.map((row, index) => (
            <div className='asn_ribbon' style={{ backgroundColor: "white", color: "black", marginBottom: "50px" }}>
              <span style={{ marginLeft: "47%" }}>{row.container_number}</span>
              {/* <RiArrowUpDoubleFill style={{ float: "right", fontSize: "20px", cursor: "pointer" }}
          onClick={toggleContainerDetails2} />
          {containerDetailsOpen2 && (<div class="div2"> */}
              <div className="outer-wrapper">
                <div className="table-wrapper">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Creation Date</th>
                        <th>Container Id #</th>
                        <th> Total Itmes</th>
                        <th>Total Shipping Qty #</th>
                        <th>Shipping Date</th>
                        <th>ETA</th>
                        <th>Location</th>
                        <th>View</th>
                      </tr>
                    </thead>
                    <tbody>

                      <tr>
                        <td>{row.container_creation_date}</td>
                        <td>{row.container_number}</td>
                        <td>{row.total_Uniq_items}</td>
                        <td>{row.total_shipping_qty}</td>
                        <td><p>2024/05/14</p></td>
                        <td><p>2024/05/19</p></td>
                        <td><p>Pune</p></td>
                        {/* <td value="hello" onClick={(event) => {
                              setSelectedIndex(row.container_number)
                              setFilterData(containerData.containerDetails.filter(item => {
                                return item.container_number === selectedIndex
                              }))
                            }} >{<button>View details</button>}</td> */}

                        <td><button onClick={() => handleViewDetails(row.container_number)}>View details</button></td>
                      </tr>

                    </tbody>
                  </table>
                </div>
              </div>
              {/* </div>)} */}
              {row.container_number == selectedIndex ?
                <div className="outer-wrapper">
                  <div className="table-wrapper">
                    <table className="table">
                      <thead>
                        <tr>

                          <th>Item ID</th>
                          <th> Items</th>
                          <th> PO #</th>
                          <th> PO Qty</th>
                          <th> Delivered Qty</th>
                          <th>Shipping Qty</th>
                          <th>Remaining Qty</th>
                          <th>Container Id</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData[0]?.shipment_info?.map((row, index) => (
                          <tr>
                            <td>{row.itemId}</td>
                            <td>{row.itemName}</td>
                            <td>{row.poNum}</td>
                            <td>{row.orderedQty}</td>
                            <td>{row.deliveredQty}</td>
                            <td>{row.shippedQty}</td>
                           
                            <td>{row.orderedQty - row.deliveredQty - row.shippedQty}</td>
                            <td>{selectedIndex}</td>

                          </tr>
                        ))}
                      </tbody>

                    </table>
                  </div>
                </div>
                : null}
              
            </div>
          ))}
        </div>
      </div>)}
      

    </div>
  )
}

export default ASNView_detail

