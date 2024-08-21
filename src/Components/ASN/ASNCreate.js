import React, { useState,useEffect ,Component,useRef} from 'react'
import HomeNav from "../Navbar/HomeNav";
import HomeButton from "../Buttons/HomeButton";
import FullLengthSearchbar from "../Searchbars/FullLengthSearchbar";
import ASN_Alert_button from "../Buttons/ASN_Alert_button";
import "../../style/ASNCreate.css";
import { MdUploadFile } from "react-icons/md";
import { FaBell, FaArrowLeft } from "react-icons/fa";
import { RiFileDownloadLine } from "react-icons/ri";
import { IoIosAddCircle } from "react-icons/io";
import SortButton from "../Buttons/SortButton";
import FilterButton from "../Buttons/FilterButton";
import axios from 'axios';
import { useNavigate} from "react-router-dom";
import $ from 'jquery';
// import { useParams,Navigate } from 'react-router-dom';
// import AsnContext from '../../AsnContext';
import { GiKite } from "react-icons/gi";





const ListOfPO = [
  {
    itemId: "i-12002431-1991",
    items: "HP Pavillion Laptop",
    PONumber: "PO-R-BAN-12341-41",
    POQty: 20,
    DeliveredQty: 5,
    remainingQty: "0",
    shippedQty: 5,
    containerizedQty: 0,
  },
  {
    itemId: "i-12002431-1992",
    items: "HP Pavillion Victus",
    PONumber: "PO-R-BAN-12341-42",
    POQty: 300,
    DeliveredQty: 20,
    remainingQty: "180",
    shippedQty: 100,
    containerizedQty: 0,
  },
  {
    itemId: "i-12002431-1993",
    items: "HP Pavillion spider",
    PONumber: "PO-R-BAN-12341-43",
    POQty: 100,
    DeliveredQty: 20,
    remainingQty: "30",
    shippedQty: 50,
    containerizedQty: 0,
  },
];

function ASNCreate() {
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectPOItems, setSelectPOItems] = useState([]);
  const [itemselected, setitemselected] = useState(null);
  const [storeData, setstoreData] = useState([null]);
  const [siteData, setsiteData] = useState([null]);
  const [poitemsData, setpoitemsData] = useState([null]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedstore, setSelectedStore] = useState(null);
  const [selectedRetailer, setSelectedRetailer] = useState(null);
  const [newData, setNewData] = useState([]);
  const [containerData, setcontainerData] = useState();
  const [containercount, setcontainercount] = useState();
  const [itemtotalqty, setitemtotalqty] = useState({});
  const [asnno, setasnno] = useState();
  const[typeError,setTypeError]=useState(null);
    const[excelFile,setExcelFile]=useState(null);
    const [isButtonVisible,setIsButtonVisible]=useState();
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setSelectedIds(event.target.value)
  };

  const handleStoreChange = (event) => {
    setSelectedStore(event.target.value);
  };

  const handleRetailerChange = (event) => {
    setSelectedRetailer(event.target.value);
  };




  useEffect(() => {



    const itemdata = async () => {
      await axios
        .get("http://localhost:4040/api/asn/service/getStoresListASN")
        .then((res) => {
          setstoreData(res.data)

        }).catch((err) => {
          console.log(err);
        })
    }

    itemdata()
  }, [])

  useEffect(() => {
    const itemdata = async () => {
      await axios
        .get("http://localhost:4040/api/asn/service/getAllSupplierSites")
        .then((res) => {
          setsiteData(res.data)

          function random4Digit() {
            return shuffle("0123456789".split('')).join('').substring(0, 4);
          }

          function shuffle(o) {
            for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
          }
          setasnno(random4Digit());
          localStorage.removeItem("container");


        }).catch((err) => {
          console.log(err);
        })
    }

    itemdata()
  }, [])

  const handleButtonClick = () => {
    if (inputValue.length < 5) {
      alert("Input must be at least 5 characters long");
      return;
    }
    setList([...list, { ponum: inputValue }]);
    document.getElementById("pouplateButton").disabled = false;
    setInputValue("");
  };

  const handleRemoveItem = (e) => {
    const name = e.target.getAttribute("name")
    setList(l => l.filter(item => item.ponum !== name));

  };

  const handleCancelASN = () => {
    localStorage.setItem("cancelledAsnId",asnId);
    localStorage.removeItem("container");
    navigate("/CancelAsn");
   
  };



  const ulStyle = {
    maxHeight: "100px",
    overflowY: "auto",
  };
  const po_id = list.map(item => item.ponum).join(',');

  const handlePOSelectOne = (itemId) => {
    if (selectPOItems.includes(itemId)) {
      setSelectPOItems(selectPOItems.filter((item) => item !== itemId));
    } else {
      setSelectPOItems([...selectPOItems, itemId]);
    }
  };
  //console.log("ponum", po_id)
  function populate_items(e) {
    e.preventDefault();

    axios({
      method: 'post',
      url: 'http://localhost:4040/api/asn/service/getPoItems?poIdArray[]=' + po_id,
      // url: 'http://localhost:4040/api/asn/service/getPoItems?poIdArray[]=PO-R-MUM-3120,PO-R-MUM-3121'
    })
      .then(function (response) {
        //  console.log("populated items", response.data);
        if (response.data) {
          setpoitemsData(response.data);

        }
      })
      .catch(function (error) {
        console.log('error', error);
      });
  }

  const [currentData, setcurrentData] = useState({
    "uniqueId": "string",
    "asnId": "string",
    "asnCreationDate": "string",
    "shippingDate": "string",
    "deliveryNoteNo": "string",
    "asnStatus": "string",
    "poNum": "string",
    "containerDetails": "",
    "containerCount": "string",
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
    "driverLicenseNo": "string",
    "shippingAddr": "string",
    "delAddr": "string",
    "consignmentCost": "string",
    "permitLevel": "string",
    "vehicleEngNo": "string",
    "vehicleChassiesNo": "string",
    "retailerStore": "string",
    "supplierSite": "string",
    "preferredDelDate": "string",
    "preferredDelTime": "string"
  });

  useEffect(() => {
    setcurrentData(prevData => ({
      ...prevData,
      asnId: asnId,
      asnCreationDate: new Date().toLocaleString(),
      poNum: selectedIds,
      retailerStore: selectedRetailer,
      supplierSite: selectedstore
    }))
  }, [selectedIds, selectedRetailer, selectedstore])
  console.log("currentData", currentData)
  console.log("selectedstore", selectedstore)
  console.log("conatiner", containerData)

  const handleCheckboxChange = (event, checkboxItem) => {
    const isChecked = event.target.checked;


    if (isChecked) {
      // Add checkbox data to newData state
      document.getElementById(event.target.id + "-input").disabled = false;

      setNewData([...newData, checkboxItem]);

    } else {
      // Remove checkbox data from newData state
      document.getElementById(event.target.id + "-input").disabled = true;
      document.getElementById(event.target.id + "-input").value = "";
      setNewData(newData.filter(item => item !== checkboxItem));
    }
  };

  const shipinputchange = (e) => {
    // alert(e.target.name);
    var a = document.getElementById(e.target.name + "-remainingqty").innerHTML;
    // alert(a);
  };

  function createcontainer(e) {

    const handleAddKeyValue = (key, value) => {
      // Update the state with the new key-value pair
      setitemtotalqty(prevData => ({
        ...prevData,
        [key]: value
      }));
    };
    e.preventDefault();
    const invdata = newData.map((item) => {
      if (item.itemId) {


        // Check if the key exists in the state
        if (itemtotalqty.hasOwnProperty(item.itemId)) {
          // If the key exists, update its value by adding the new value
          setitemtotalqty(prevData => ({
            ...prevData,
            [item.itemId]: +prevData[item.itemId] + +document.getElementById(item.itemId + "-input").value
          }));
        } else {
          // If the key doesn't exist, add it to the state with the provided value
          setitemtotalqty(prevData => ({
            ...prevData,
            [item.itemId]: document.getElementById(item.itemId + "-input").value
          }));
        }

        if (document.getElementById(item.itemId + "-totalcontqty").value) {
          //  alert("if")
          return {
            ...item, 'containerizedQty': document.getElementById(item.itemId + "-input").value,
            'totalcontqty': +document.getElementById(item.itemId + "-input").value + +document.getElementById(item.itemId + "-totalcontqty").value,
            
          }
        }
        else {
          // alert("else")
          return {
            ...item, 'containerizedQty': document.getElementById(item.itemId + "-input").value,
            'totalcontqty': document.getElementById(item.itemId + "-input").value
          }
        }


      }
      else {
        return { ...item }
      }

    })

    setcontainerData(invdata);

    let containerData = JSON.parse(localStorage.getItem("container"));

    // Check if container1 already has data
    if (containerData) {
      // localstorage exist
      // alert("if");

      var jsonObject =
      {
        "container_creation_date": new Date().toLocaleString(),
        "asnno": asnno,
        "container_number": "CN-123-" + Math.floor(Math.random() * 900) + 1000,
        "total_Uniq_items": invdata.length,
        "local_container_id": "1",
        "total_shipping_qty": "30",
        "shipment_info": [
          ...invdata
        ]
      }

    }
    else {
      //alert("else");
      containerData = {
        containerDetails: []
      };

      var jsonObject =
      {
        "container_creation_date": new Date().toLocaleString(),
        "asnno": asnno,
        "container_number": "CN-123-" + Math.floor(Math.random() * 900) + 1000,
        "total_Uniq_items": invdata.length,
        "local_container_id": "1",
        "total_shipping_qty": "30",
        "shipment_info": [
          ...invdata
        ]
      }
    }
    // Add new data to container1
    containerData.containerDetails.push(jsonObject);
    // Store updated container1 data in local storage
    localStorage.setItem("container", JSON.stringify(containerData));
    document.getElementById("container_message").style.display = 'block';
    // alert(containerData.containerData.length)
    setcontainercount(containerData.containerDetails.length);
    document.getElementById("container_count").className = "container_count";
  }

  function closecontainer() {
    document.getElementById("container_message").style.display = 'none';
  }



  const filterByKey = (obj, keySubstring) => {
    return Object.entries(obj)
      .filter(([key, value]) => key.includes(keySubstring))
      .map(([key, value]) => value);
  };

  const asnId = "ASN" + asnno;
  console.log("newData", newData)
  console.log("itemtotalqty", itemtotalqty)

  const performNavigaton = () => {
    const pathCompute = '/ASNGenerateDC'
    navigate(pathCompute, {
      state: {
        id: {
          senderAddress: selectedstore,
          reatilerAddress: selectedRetailer,
          poNum: selectedIds,
          Date: new Date().toLocaleString(),
          asnNo: asnId
        }
      }
    })
  }

  function saveConatinerASN() {
    $("#overlay").fadeIn('slow');
    const itemdata = async () => {
      let containerData = JSON.parse(localStorage.getItem("container"));
      let containerJsonObject = JSON.parse(localStorage.getItem("container"))
      const dataCurrent = { ...currentData, containerDetails:JSON.stringify(containerJsonObject) }
      // const dataCurrent = { ...currentData, containerDetails: JSON.parse(localStorage.getItem("container")) }

      //  setcurrentData(prevData=>({...prevData,containerDetails:JSON.parse(localStorage.getItem("container"))}))
      // const updatedData={...currentData,containerDetails:containerData}
      //           setcurrentData(updatedData);
      
      console.log("currentDataIn", dataCurrent)
      console.log("containerDataIn", containerData?.containerDetails?.containerDetails)
      
      // setcurrentData(dataCurrent)
      await axios
        // .post(`http://localhost:5050/api/customerOrders/service/saveIntermediateCO?itemDetails=${currentData.asnId}&coId=${currentData.asnStatus}`)
        .post("http://localhost:4040/api/asn/service/saveASN?", dataCurrent, {
          params: {
            asnId: asnId,
            asnStatus: "In-Progress"
          }
        })
        .then((res) => {
          console.log("res", res.data)
          $("#overlay").fadeOut('slow');
        }).catch((err) => {
          console.log("error", err.res.data)
          alert("unsuccessful")
        })
    }
    itemdata()
  }

  const tableRef = useRef(null);
  const handleDownload=()=>{
  const link=document.createElement('a');
  link.href='/downloads/PricingTemplate.xlsx';
  link.download='Template2.xlsx';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

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
  handleFile(event);
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

  return (
    <div>
      <HomeNav />
      <div class='Invoices-heading'>
        {/* <HomeButton /> */}
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
      {/* <FullLengthSearchbar /> */}


      <div className="Container">
        <div className="file-input">
          <div style={{ width: "27%" }}>
          <button onClick={handleFileUpload}>
            <input type="file" id="upload" accept=".xlsx,.csv" hidden />
            
              <MdUploadFile
                style={{ paddingRight: "5px", marginBlock: "-2px" }}
              />
              Upload File
          
            </button>
            <span style={{ fontSize: ".7rem", paddingLeft: "10px" }}>
              (accepted formats: .xlsx, .csv)
            </span>
          </div>

          <div>
            {/* <input type="file" id="upload" hidden /> */}
            <button onClick={handleDownload}>
              <RiFileDownloadLine style={{ paddingRight: "5px", marginBlock: "-2px" }}/>
              Download Template
              </button>
            {/* {file && <span>Selected file: {file.name}</span>} */}
          </div>

          <div>
            <span style={{ marginTop: "100px" }}>Creation Date : </span>
            <input type="date" id="uploadDate" className="dateInput" />
          </div>
        </div>

        <div className="input-boxes">
          <div className="inputdiv1">
            <p>Retail Store:</p>
            <select onChange={handleRetailerChange}>
              <option value="data-1">Select Store</option>
              {storeData?.map((storeData, index) => (
                <option>{storeData?.storeName}</option>
              ))}
            </select>
          </div>
          <div className="inputdiv2">
            <p>Purchase Order:</p>
            <input
              type="text"
              placeholder="Add Purchase Order"
              value={inputValue}
              onChange={handleInputChange}
              maxLength={20}
              style={{ boxShadow: " 0 0 5px #523f3f" }}
            />
            <button onClick={handleButtonClick} className="purchaseBtn">
              <IoIosAddCircle style={{ paddingTop: "4px" }} />
            </button>

          </div>
          <div className="inputdiv3">
            <p>Supplier Site:</p>
            <select onChange={handleStoreChange}>
              <option value="data-1">Select Store</option>
              {siteData?.map((siteData, index) => (
                <option>{siteData?.siteName}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="selectedPO" style={{ fontWeight: 600 }}>
          <p>Selected P.O.:</p>
          <div class="selectedpo" >
            <ul class="po_ul" style={list.length > 3 ? ulStyle : null}>
              {list.map((item, index) => (
                <li class="po_li" key={index}> {item.ponum}
                  <span class="removepo" name={item.ponum} onClick={handleRemoveItem}>
                    x
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <a id="pouplateButton" className="selectedPOBtn" onClick={populate_items} disabled>
            Populate Items
          </a>
        </div>
      </div>

      <div className="asnCreateDetail">
        <div className="asnCreateDetailDiv1">
          <p className="asnText">List of Items from PO's</p>
        </div>
        <div className="asnCreateDetailDiv2 InvoiceTitle">
          <p>ASN#{asnno}</p>
        </div>
        <div className="asnCreateDetailDiv3">
          <FilterButton />
          <SortButton />
        </div>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>Item Id #</th>
              <th>Items</th>
              <th>PO #</th>
              <th>P.O. Qty</th>
              <th>Delivered Qty</th>
              <th>Remaining Qty</th>
              <th>Shipping Qty</th>
              <th>Shipped Qty</th>
              <th>Containerized Qty</th>

            </tr>
          </thead>
          <tbody>

            {poitemsData?.map((individualData, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox" id={individualData?.itemId}
                    value={individualData?.itemId}
                    onChange={(event) => handleCheckboxChange(event, individualData)}
                  />

                </td>
                <td>{individualData?.itemId}</td>
                <td>{individualData?.itemName}</td>
                <td>{individualData?.poNum}</td>
                <td>{individualData?.orderedQty}</td>
                <td>{individualData?.deliveredQty}</td>
                <td id={individualData?.itemId + '-remainingqty'}>{individualData?.orderedQty - individualData?.deliveredQty - individualData?.shippedQty - filterByKey(itemtotalqty, individualData?.itemId)}</td>
                <td>
                  <input disabled id={individualData?.itemId + '-input'}
                    type="text" maxLength={5}
                    onChange={(event) => shipinputchange(event, individualData)}
                    name={individualData?.itemId}
                    style={{
                      borderRadius: "5px",
                      boxShadow: "0 0 3px #523f3f",
                      border: "none",
                      outline: "none",
                      padding: "3px 5px",
                      width: "30%",
                    }}
                  />
                </td>
                <td>{individualData?.shippedQty}</td>
                <td> <input disabled id={individualData?.itemId + '-totalcontqty'}
                  type="text" maxLength={5}

                  value={filterByKey(itemtotalqty, individualData?.itemId)}
                  style={{
                    borderRadius: "5px",
                    boxShadow: "0 0 3px #523f3f",
                    border: "none",
                    outline: "none",
                    padding: "3px 5px",
                    width: "30%",
                  }}
                />
                </td>

              </tr>

            ))}
          </tbody>
        </table>
      </div>
      <div className="footerComment">
        <span>Additional Comments : </span>
        <textarea cols="30" rows="3"></textarea>
      </div>

      <div className="footerBtn1 subfooterBtn">
        <button onClick={createcontainer}> Add to Container  </button>
        <button onClick={saveConatinerASN}>Save Draft</button>
        <button onClick={performNavigaton}>Next</button>
      </div>
      <div className="footerBtn1 subfooterBtn2">

        <button id="container_count">Container Count: {containercount}</button>
        <div id="container_message" class="container_message">Container Created <span onClick={closecontainer}>X</span></div>
        <button onClick={handleCancelASN}>Cancel ASN</button>
      </div>
    </div>
  );
}

export default ASNCreate;