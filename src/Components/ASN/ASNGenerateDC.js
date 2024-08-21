import React, { useEffect, useState } from "react";
import HomeNav from "../Navbar/HomeNav";
// import { FaUserAlt, FaUserCheck, FaBuilding, FaUserEdit } from "react-icons/fa";
import { FaBell} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../style/UserMgmtMain.css";
import FullLengthSearchbar from "../Searchbars/FullLengthSearchbar";
import ASN_Alert_button from "../Buttons/ASN_Alert_button";
import axios from 'axios';
import HomeButton from "../Buttons/HomeButton";
import FilterButton from "../Buttons/FilterButton";
import ExportButton from "../Buttons/ExportButton";
import DownloadAsnButton from "../Buttons/DownloadAsnButton";
import "../../style/ASNView_detail.css";
// import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
// import { Link } from 'react-router-dom';
import { useParams, Navigate } from "react-router-dom";
// import ExportOnly from "../Buttons/ExportOnly";
import { RiArrowUpDoubleFill } from "react-icons/ri";
import { IoIosCloudDownload } from "react-icons/io";
import { RiArrowDownDoubleLine } from "react-icons/ri";
import $ from 'jquery';
import "../../style/ASNGenerateDC.css";

function ASNGenerateDC({id}) {
  const { asn } = useParams(); // Get the ASN number from URL params
  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    navigate(-1);
  };


  console.log("id",id)
  const [containerDetailsOpen, setContainerDetailsOpen] = useState(true);
  const [containerDetailsOpen1, setContainerDetailsOpen1] = useState(false);
  const [mode, setMode] = useState("");
  const [dcNo, setdcNo] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [noContainers, setnoContainers] = useState("");
  const [consignmentCost, setconsignmentCost] = useState("");
  const [deliveryAddress, setdeliveryAddress] = useState("");
  const [senderAddress, setsenderAddress] = useState("");
  const [transCompanyName, setTransCompanyName] = useState("");
  const [driverName, setDriveName] = useState("");
  const [containerWeight, setContainerWeight] = useState("");
  const [driverLicense, setDriveLicense] = useState("");
  const [permitLivel, setPermitLevel] = useState("");
  const [vehicleEngine, setVehicleEngine] = useState("");
  const [chassisNumber, setChassisNumber] = useState("");
  const [containerNumber,setContainerNumber]=useState("");
  const [shippedQty,setShippedQty]=useState("");
  const [isValid, setValid] = useState(false);
  
  // const [currentData,setcurrentData]=useState([]);

  const buttonStyles = {
    backgroundColor: isValid ? "#00338E": "rgb(169, 176, 175)",
  };

  const validate = () => {
    return (
      mode.length > 0 &&
      vehicleNumber.length > 0 &&
      transCompanyName.length > 0 &&
      driverName.length > 0 &&
      containerWeight.length > 0 &&
      driverLicense.length > 0 &&
      permitLivel.length > 0 &&
      vehicleEngine.length > 0 &&
      chassisNumber.length > 0 
    );
  };

  useEffect(() => {
    setValid(validate());
  }, [
    mode,
    vehicleNumber,
    transCompanyName,
    driverName,
    noContainers,
    consignmentCost,
    senderAddress,
    deliveryAddress,
    containerWeight,
    driverLicense,
    permitLivel,
    vehicleEngine,
    chassisNumber,
  ]);

  let containerData = JSON.parse(localStorage.getItem("container"));
console.log("containerData",containerData)
  const [currentData,setcurrentData]=useState({
    "uniqueId": "string",
    "asnId": "string",
    "asnCreationDate": "string",
    "shippingDate": "string",
    "deliveryNoteNo": "string",
    "asnStatus": "string",
    "poNum": "string",
    "containerDetails": "string",
    "containerCount":  "string",
    "containerId": "string",
    "shippedQty": "string",
    "estimatedDelDate": "string",
    "ewayNo": "string",
    "awbNo": "string",
    "driverName": "string",
    "vehicleNo": "string",
    "modeOfTransport": "string",
    "transportCompName": "string",
    "consignmentWeight": "string",
    "driverLicenseNo":"string",
    "shippingAddr": "string",
    "delAddr": "string",
    "consignmentCost": "string",
    "permitLevel": "string",
    "vehicleEngNo":"string",
    "vehicleChassiesNo": "string",
    "retailerStore": "string",
    "supplierSite": "string",
    "preferredDelDate": "string",
    "preferredDelTime": "string"
  });

  useEffect(()=>{
    setcurrentData(prevData=>({
      ...prevData,
      asnId:id?.asnNo,
      asnCreationDate:id?.Date,
      poNum:id?.poNum,
      containerDetails:JSON.stringify(containerData),
    containerCount: containerData.containerDetails.length,
    containerId:containerNumber,
    shippedQty:shippedQty,
    driverName: driverName,
    vehicleNo: vehicleNumber,
    modeOfTransport: mode,
    transportCompName: transCompanyName,
    consignmentWeight: containerWeight,
    driverLicenseNo:driverLicense,
    shippingAddr: id?.reatilerAddress,
    delAddr: id?.senderAddress,
    consignmentCost: consignmentCost,
    permitLevel: permitLivel,
    vehicleEngNo:vehicleEngine,
    vehicleChassiesNo: chassisNumber,
    retailerStore:id?.reatilerAddress,
    supplierSite:id?.senderAddress
  }))

  },[mode,vehicleNumber,noContainers,driverName,transCompanyName,containerWeight,driverLicense,
  senderAddress,deliveryAddress,consignmentCost,permitLivel,vehicleEngine,chassisNumber])

  const toggleContainerDetails = () => {
    setContainerDetailsOpen(!containerDetailsOpen);
  };
  const toggleContainerDetails1 = () => {
    setContainerDetailsOpen1(!containerDetailsOpen1);
  };

  
  
  useEffect(()=>{
    let shipped=0;
    let conatinerList='';
      for(let i=0;i<containerData?.containerDetails.length;i++){
        shipped=shipped+Number(containerData?.containerDetails[i].total_shipping_qty);
        conatinerList=conatinerList+containerData?.containerDetails[i].container_number;
        if(i!==containerData?.containerDetails.length-1){
          conatinerList=conatinerList+', ';
        }
      }
      setShippedQty(shipped)
    setContainerNumber(conatinerList)
  },[currentData])
  console.log("ShippedQty",shippedQty)
  console.log("ContainerNumber",containerNumber)
   console.log("currentData",currentData)
  const fetchUpdateData = () => {
    axios({
      method:'get',
      url:"http://localhost:4040/api/asn/service/generateDC"
  }).then(response=>{
    // console.log("EwayNo ",response.data)
    setcurrentData({...currentData,deliveryNoteNo:response.data})
    performRedirect({...currentData,deliveryNoteNo:response.data});
     }).catch(error=>{
      console.log("error",error.response.data)
     })
    //  const pathCompute='/ASNGenerateEway'
    //    navigate(pathCompute,{ state: {id: {
    //   completeData:currentData}}})   
  }

  const performRedirect=(Data)=>{
    const pathCompute='/ASNGenerateEway'
    navigate(pathCompute,{ state: {id: {
   completeData:Data}}})
  }

  function saveConatinerASN() {
    $("#overlay").fadeIn('slow');
    const itemdata = async () => {
      await axios
          // .post(`http://localhost:5050/api/customerOrders/service/saveIntermediateCO?itemDetails=${currentData.asnId}&coId=${currentData.asnStatus}`)
          .post("http://localhost:4040/api/asn/service/saveASN?",currentData,{
            params:{
              asnId:id?.asnNo,
              asnStatus:"In-Progress"
            }
          })
          .then((res) => {
            $("#overlay").fadeOut('slow');
          }).catch((err) => {
          //   
          alert("unsuccessful")
          })
      }
      itemdata()
    }
    const handleCancelASN = () => {
      localStorage.setItem("cancelledAsnId",id?.asnNo);
      localStorage.removeItem("container");
      navigate("/CancelAsn");
     
    };
  
  return (
    <>
      <HomeNav />
      <div class='Invoices-heading'>
                <HomeButton/>
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
                    <p>{id?.completeData?.asnId}</p>
                </div>
                <div class='PurchaseOrderMain-notification'>
         <a href='/AlertASN' className='CreateInvBtn1'>ASN Alert &nbsp; {<FaBell/>}</a>
         </div>   
            </div>
      {/* <ASN_Alert_button /> */}
      <div className="asn_number">
        <h2>{id?.asnNo}</h2>
        {/* <p>
          <ExportButton />
        </p> */}
      </div>
      {/* <button className="back_button_dc" onClick={handleBackButtonClick}>
        <FaArrowLeft
          style={{
            fontSize: "10px",
            marginRight: "5px",
            outline: "none",
            border: "none",
          }}
        />
        Back
      </button> */}

      <div className="dc_content">
        {/* Summary details */}
        <div className="asn_ribbon">
          <span style={{ marginLeft: "49%" }}>Summary</span>
          {containerDetailsOpen1 ? (
            <RiArrowUpDoubleFill
              style={{ float: "right", fontSize: "20px", cursor: "pointer" }}
              onClick={toggleContainerDetails1}
            />
          ) : (
            <RiArrowDownDoubleLine
              style={{ float: "right", fontSize: "20px", cursor: "pointer" }}
              onClick={toggleContainerDetails1}
            />
          )}
        </div>

        {containerDetailsOpen1 && <p className="noSummary">No Summary </p>}

        {/* Delivery Note toggle */}
        <div className="asn_ribbon">
          <span style={{ marginLeft: "48%" }}>Delivery Note</span>

          {containerDetailsOpen ? (
            <RiArrowUpDoubleFill
              style={{ float: "right", fontSize: "20px", cursor: "pointer" }}
              onClick={toggleContainerDetails}
            />
          ) : (
            <RiArrowDownDoubleLine
              style={{ float: "right", fontSize: "20px", cursor: "pointer" }}
              onClick={toggleContainerDetails}
            />
          )}
        </div>

        {/* Form Detail  */}

        {containerDetailsOpen && (
          <div className="asn_detail_container">
            <div className="asn_detail">
              <span>Mode Of Transport</span>
              <p>
                <input
                  type="text"
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                />
              </p>
              <span>Vehicle #</span>
              <p>
                <input
                  type="text"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                />
              </p>
              <span>Transport Company</span>
              <p>
                <input
                  type="text"
                  value={transCompanyName}
                  onChange={(e) => setTransCompanyName(e.target.value)}
                />
              </p>
              <span>No. Of Containers</span>
              {/* <p className="summarydetail">##</p> */}
              <p>
                <input
                  type="text"
                  value={containerData?.containerDetails?.length}
                  // onChange={(e) => setnoContainers(e.target.value)}
                />
              </p>
              <span>Delivery Address:</span>
              {/* <p className="summarydetail">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
                tempora, omnis fugiat aut error ipsam.
              </p> */}
              <p>
                <input
                  type="text"
                  value={id?.senderAddress}
                  // onChange={(e) => setdeliveryAddress(e.target.value)}
                />
              </p>
            </div>
            <div className="asn_detail">
              <span>Driver Name</span>
              <p>
                <input
                  type="text"
                  value={driverName}
                  onChange={(e) => setDriveName(e.target.value)}
                />
              </p>
              <span>Container weight (Consolidated)</span>
              <p>
                <input
                  type="text"
                  value={containerWeight}
                  onChange={(e) => setContainerWeight(e.target.value)}
                />
              </p>
              <span>Driver License #</span>
              <p>
                <input
                  type="text"
                  value={driverLicense}
                  onChange={(e) => setDriveLicense(e.target.value)}
                />
              </p>
              <span>Consignment Cost (INR)</span>
              {/* <p className="summarydetail">## </p> */}
              <p>
                <input
                  type="text"
                  value={consignmentCost}
                  onChange={(e) => setconsignmentCost(e.target.value)}
                />
              </p>
              <span>Sender Address</span>
              {/* <p className="summarydetail">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Tempora non omnis similique laboriosam excepturi totam aliquam
                dolorum natus soluta iusto.
              </p> */}
              <p>
                <input
                  type="text"
                  value={id?.reatilerAddress}
                  // onChange={(e) => setsenderAddress(e.target.value)}
                />
              </p>
            </div>
            <div className="asn_detail">
              <span>Permit Level #</span>
              <p>
                <input
                  type="text"
                  value={permitLivel}
                  onChange={(e) => setPermitLevel(e.target.value)}
                />
              </p>
              <span> Vehicle Engine No.</span>
              <p>
                <input
                  type="text"
                  value={vehicleEngine}
                  onChange={(e) => setVehicleEngine(e.target.value)}
                />
              </p>
              <span>Chassis Number #</span>
              <p>
                <input
                  type="text"
                  value={chassisNumber}
                  onChange={(e) => setChassisNumber(e.target.value)}
                />
              </p>
            </div>
          </div>
        )}

        {/* Footer button -- 1. Save Draft , 2.Cancel ASN, 3. Generate DC */}
        <div className="footerBtn">
          <div>
            <button className="btn1" onClick={saveConatinerASN}>Save Draft</button>
          </div>
          <div>
            <button className="btn2" onClick={handleCancelASN}>Cancel ASN</button>
          </div>
          <div>
            
            <button
            onClick={fetchUpdateData} className="btn3" type="button" disabled={!isValid}
style={buttonStyles}
            >
              Generate DC
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ASNGenerateDC;
