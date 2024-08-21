import React, { useState, useEffect } from "react";
import logo from "../../images/KPMG-logo.jpg";
import "../../style/OrderSummary.css";
import '../../style/ItemListingItemEditPage.css'
import "../../style/Return.css";
import { FaUserAlt, FaInfoCircle, FaBell, FaSearch, FaFilter, FaSort, FaFileExport, FaEye, FaArrowAltCircleDown } from "react-icons/fa";
import { FaHome, FaArrowLeft, FaAngleDoubleDown } from "react-icons/fa";
import "../../style/PurchaseOrderMain.css";
import HomeNav from "../Navbar/HomeNav";
import { useNavigate } from "react-router-dom";
// import Popup from 'reactjs-popup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import HomeButton from "../Buttons/HomeButton";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import $ from 'jquery';
// import { Button } from "@mui/material";
const cors = require('cors');

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


function RetailerReturnDetails({ idSelected }) {
  let navigate = useNavigate();
  const pathCompute = '/RetailerReturnImageView'
  const [currentData, setcurrentData] = useState(null);
  const [itemdetails, setitemdetails] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedBox, setSelectedBox] = useState(null);
  const [open, setOpen] = useState(false);
  const [toggle, setToggle] = useState(false)
  const [filterdData, setFilterData] = useState(null)
  const [concernId, setConcernId] = useState(null);
  const [isChecked,setIsChecked]=useState(false)
  const [buttonvisible,setbuttonvisible]=useState(false);
  const [buttonvisible1,setbuttonvisible1]=useState(true);


  // console.log("djkncdcm", filterdData)



  useEffect(() => {
    const itemdata = async () => {
      await axios
        .get(`http://localhost:6060/api/returns/service/rr/getRetailerReturnsDetails?retailerReturnID=${idSelected}`)
        .then((res) => {
          setcurrentData(res.data)
          setConcernId(currentData?.returnId)
          console.log("onpage", res.data)
        }).catch((err) => {
          console.log(err);
        })
    }
    itemdata()
  }, [])
  console.log("Hi there", currentData)

  useEffect(() => {
    if (currentData) {
      setitemdetails(JSON.parse(currentData.itemDetails));
    } else {
      setitemdetails(null); // Or any default value you want
    }
  }, [currentData])
  console.log("data", itemdetails)
  console.log("po",itemdetails?.itemdetails[0].poList)

  function updateReturnStatus(e) {
    e.preventDefault();
    axios({
      method: 'post',
      url: `http://localhost:6060/api/returns/service/rr/processRetailerReturns`,
      data: currentData
    })
      .then(function (response) {
        console.log("response", response.data);
        if (response.data) {
          window.location.href = '/RetailerReturnProcessReturnconfirm'
        } else {
          alert('Unsuccessful');
        }
      })
      .catch(function (error) {
        console.log('error', error);
      });
  }

  // const handleClick = () => {
  //   setToggle(!toggle);
  // }
  // const handleOpen = () => setOpen(true);

  const handleOpen = (event) => {
    setOpen(true);
    const id = event.target.value
    alert("id", id)
  }


  //   function tdclick(event){
  //     // const pathCompute='/RetailerReturnDetails'
  //      setOpen(true);
  //    const id=event.target.value;
  //     alert("id",id);
  //     // navigate(pathCompute,{ state: {idSelected: id}});

  // };
  // function tdclick(event){
  //   const pathCompute='/RetailerReturnRaiseConcern'
  //  const id=event.target.value;
  //   // alert("id",id);
  //   console.log("id",id)
  //   navigate(pathCompute,{ state: {idSelected: id}});

  // };

  const handleClose = () => setOpen(false);


  // const handleIndexUpdate = (event) => {
  //   const id = event.target.value;
  //   setSelectedIndex(id);
  //   alert("index", id)
  // };

  // function handleChange(event) {
  //   // setChecked(e.target.checked);
  //   const id = event.target.value;
  //   alert(id);
  //   navigate(pathCompute, { state: { idSelected: id } })
  // }

  const imgGenerate = (length) => {
    return Array.from({ length });
  }

  const [img, setImg] = useState('');
  const showImg = (imgsrc) => {
    setImg(imgsrc)
    setOpen(true)
  }

  const [state, setState] = useState({
    serialNo: '',
    productName: '',
    concernMsg:'',
    images: '',
    img: ''
  });
  // You can update the state like this:
  const updateState = (newState) => {
    setState(prevState => ({ ...prevState, ...newState }));
  };

  const buttonClickModal = (serialNo, productName,concernMsg, images, img) => {
     updateState({ serialNo: serialNo, productName: productName,concernMsg:concernMsg, images: images, img: img });
     setOpen(true)
     }

  const [selectedIds, setSelectedIds] = useState([]);

  const handleIdCheckboxChange = (e) => {
    const isChecked=e.target.checked;
    const pathCompute = '/RetailerReturnRaiseConcern'
    setbuttonvisible(isChecked)
    setbuttonvisible1(!isChecked)
  //   if($(".raiseConcern").prop('checked') == true){
  //     alert("do something")
  // }
    captureRaiseConcern(itemdetails,selectedIndex,e,setcurrentData);
    setSelectedIds((prevSelectedId) => {
      if (prevSelectedId.includes(e.target.value)) {
        return prevSelectedId.filter((selectedIds) => selectedIds !== e.target.value);
      } else {
        return [...prevSelectedId, e.target.value];
      }
    });
  };
  // const proceedButton = () => {
  //   const pathCompute = '/RetailerReturnRaiseConcern'
  //   navigate(pathCompute, {
  //     state: {
  //       idSelected: {
  //         returnId: currentData?.returnId,
  //         selctedId: selectedIds,
  //         itemDetails: filterdData[0],
  //         completeData: itemdetails
  //       }
  //     }
  //   });
  // }

  function proceedButton() {
    const dataTosend={"itemdetails":(itemdetails?.itemdetails)}
    const itemdata = async () => {
     
      await axios
        .post(`http://localhost:6060/api/returns/service/rr/raiseConcernRetailerReturns?itemDetails=${JSON.stringify(dataTosend)}&returnId=${currentData.returnId}`)
        .then((res) => {
            const pathCompute='/RetailerReturnRaiseConcern'
          navigate(pathCompute,{ state: {idSelected: {
            returnId:currentData?.returnId,
            selctedId:selectedIds,
            itemDetails:filterdData[0],
            completeData:itemdetails,
          selectedindex:selectedIndex,
          }}});
          console.log("data to send",dataTosend)
        }).catch((err) => {
        //   
        alert("unsuccessful")
        })
    }
    itemdata()
  }
  console.log("new data", selectedIds)
  console.log("Return id", currentData?.returnId)

  const captureRaiseConcern = (itemdetails,selectedIndex, e,setcurrentData) => {
    const targetedItemIndex = itemdetails?.itemdetails?.findIndex(item => item.sku === selectedIndex)
    console.log("target sku not found",targetedItemIndex)
    
    if (targetedItemIndex===-1) {
      console.log("not found")
    return;
  }
      const targetedItem=itemdetails?.itemdetails[targetedItemIndex]
      console.log("target sku not found2",targetedItem)
      const targeteditemserialIndex=targetedItem.itemSerialInfo.findIndex(item=>item.serialNo===e.target.value)
      console.log("target sku not found3",targeteditemserialIndex)
      if (targeteditemserialIndex===-1) {
        console.log("serial not found")
      return;
    }
    const newFlag=targetedItem.itemSerialInfo[targeteditemserialIndex].raiseConcernFlag==='No'?'Yes':'No'
    console.log("flag",newFlag)
    itemdetails.itemdetails[targetedItemIndex].itemSerialInfo[targeteditemserialIndex].raiseConcernFlag=newFlag
    console.log("new",itemdetails.itemdetails[targetedItemIndex].itemSerialInfo[targeteditemserialIndex].raiseConcernFlag)

    setcurrentData(prevData=>({
      ...prevData,itemDetails:JSON.stringify(itemdetails)
    }))

  }


  return (
    <div class="PurchaseOrderMain-container1">
      <div>
        <HomeNav />
      </div>

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
                <p>Retailer Return</p>
                </div>
                <div class='PurchaseOrderMain-notification'>
         <a href='/AlertRR' className='CreateInvBtn1'>RR Alert &nbsp; {<FaBell/>}</a>
         </div>   
            </div>
      {/* <div class='Invoices-heading'>
                <HomeButton/>
                {<FaArrowLeft className='PurchaseOrderMain-Ricons-Back'/>}
                     <a href='/RetailerReturnItemListing' class='PurchaseOrderMain-Back-a' style={{textDecoration:'none'}}>Back</a>
                <div className='InvoiceTitle'>
                    <p>Retailer Return</p>
                </div>
                <div class='PurchaseOrderMain-notification'>
         <a href='/AlertRR' className='CreateInvBtn1'>RR Alert &nbsp; {<FaBell/>}</a>
         </div>   
            </div> */}
      
        {/* <div class="PurchaseOrderMain-searchbar">
          <div class="PurchaseOrderMain-searchbar-container">
            <input placeholder="Search here" />
            {<FaSearch className="PurchaseOrderMain-Ricons-search" />}
          </div>
        </div> */}
        {/* <div class="PurchaseOrderMain-Operations">
          <div class="PurchaseOrderMain-Download">
            <a class="PurchaseOrderMain-Operations-content-a">Export All</a>
            {<FaFileExport className="PurchaseOrderMain-Ricons-down" />}
          </div>
          <div class="PurchaseOrderMain-FilterBy">
            <a class="PurchaseOrderMain-Operations-content-a">FilterBy</a>
            {<FaFilter className="PurchaseOrderMain-Ricons-fil" />}
          </div>
          <div class="PurchaseOrderMain-SortBy">
            <a class="PurchaseOrderMain-Operations-content-a">SortBy</a>
            {<FaSort className="PurchaseOrderMain-Ricons-sort" />}
          </div>
        </div>*/}
      {/* </div>  */}
      <div class="Po-summary">
        <p>Returns Summary</p>
      </div>
      <div class="PO-wrapper">
        <div class="left-wrapper">
          <div class="item">
            <label class='item-fields'>Return Id: </label>
            <input className='RetailerReturnTextInput' value={currentData?.returnId}></input>
          </div>
          <div class="item">
            <label class='item-fields'>Return Date: </label>
            <input className='RetailerReturnTextInput' value={currentData?.returnDate}></input>
          </div>
          <div class="item">
            <label class='item-fields'>Order Date:</label>
            <input className='RetailerReturnTextInput' value={currentData?.orderedDate}></input>
          </div>
          <div class="item">
            <label class='item-fields'>Return Status:</label>
            <input className='RetailerReturnTextInput' value={
                  currentData?.processedStatusFlag =='Y' ? "Processed" : "Pending"
                }></input>
          </div>
        </div>

        <div class="mid-wrapper">
          <div class="item">
            <label class='item-fields-po'>PO's: </label>
            {/* <div class="item-scroll"> */}
            <input className='RetailerReturnTextInput-po' value={currentData?.poList}></input>
          </div>
          {/* </div> */}

          <div class="item">
            <label class='item-fields-asn'>ASN'S :</label>
            <input className='RetailerReturnTextInput-asn' value={currentData?.asnList}></input>
            <p></p>
          </div>
        </div>
        <div class="mid-wrapper">
          <div class="item">
            <label class='item-fields'>Total Items: </label>
            <input className='RetailerReturnTextInput' value={currentData?.totalUniqRetItems}></input>
          </div>
          <div class="item">
            <label class='item-fields'>Total Qty:</label>
            <input className='RetailerReturnTextInput' value={currentData?.totalReturnItems}></input>
          </div>
          <div class="item">
            <label class='item-fields'>Total Cost: </label>
            <input className='RetailerReturnTextInput' value={currentData?.totalCostReturns}></input>
          </div>
          <div class="item">
            <label class='item-fields'>Return Site: </label>
            <input className='RetailerReturnTextInput' value={currentData?.returnSite}></input>
          </div>
        </div>

        <div class="right-wrapper">
          <div class="item">
            <label class='item-fields'>Truck No: </label>
            <input className='RetailerReturnTextInput' value={currentData?.truckNo}></input>
          </div>
          <div class="item">
            <label class='item-fields'>Driver Name: </label>
            <input className='RetailerReturnTextInput' value={currentData?.driverName}></input>
          </div>
          <div class="item">
            <label class='item-fields'>Driver DL#: </label>
            <input className='RetailerReturnTextInput' value={currentData?.driverDLNo}></input>
          </div>
          <div class="item">
            <label class='item-fields'>Logistics: </label>
            <input className='RetailerReturnTextInput' value={currentData?.logisticsPartner}></input>
          </div>
        </div>
      </div>

      <div class="Item-Details">
        <p>Item Details</p>
        {/* {<FaArrowAltCircleUp className="OrderSummary-Ricons-Uparraow" />} */}
      </div>

      <div className="outer-wrapper">
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Item ID</th>
                <th>Item Desc</th>
                <th>Total Qty</th>
                <th>Return Qty</th>
                <th>QC Status</th>
                <th>QC Pass Qty</th>
                <th>P.O#</th>
                <th>ASN#</th>
                <th>Delivered Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

              {itemdetails?.itemdetails?.map((items, index) => (
                
                <tr>
                  <td>{items.sku}</td>
                  <td>{items.Items}</td>
                  <td>{items.TotalQty}</td>
                  <td>{items.ReturnQty}</td>
                  <td>{items.QCStatus}</td>
                  <td>{items.QCPassQty}</td>
                  <td>{items.po}</td>
                  <td>{items.asn}</td>
                  <td>{items.DeliveredDate}</td>
                  <td value="hello" onClick={(event) => {
                    setSelectedIndex(items.sku)
                    setToggle(!toggle);
                    // alert(selectedIndex)
                    setFilterData(itemdetails.itemdetails.filter(item => {
                      return item.sku === selectedIndex
                    }))
                  }} >{items.addToCredit}{<button>View details</button>}</td>
                  {/* // }} >{items.addToCredit}{<FaAngleDoubleDown className='OrderSummary-Ricons-Uparraow' />}</td> */}
                  {/* onClick={(event)=>handleClick(index)} */}
                 
                </tr>
              ))}
            </tbody>
          </table>
          <br />
        </div>
      </div>

      {selectedIndex ?
        <div className="outer-wrapper">
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Serial No.</th>
                  <th>Product Name</th>
                  <th>Product Category</th>
                  <th>Product Sub Category</th>
                  <th>Defective</th>
                  <th>QC</th>
                  <th>Return Code</th>
                  <th>PSS</th>
                  <th>Images</th>
                  <th>Raise Concern</th>
                  <th>View Images</th>
                </tr>
              </thead>

              <tbody>

                {
                  filterdData[0]?.itemSerialInfo?.map((items, index) => (

                    <tr>
                      <td>{items.serialNo}</td>
                      <td>{items.productName}</td>
                      <td>{items.productCategory}</td>
                      <td>{items.productSubcategory}</td>
                      <td>{items.defective}</td>
                      <td>{items.QC}</td>
                      <td>{items.returnCode}</td>
                      <td>{items.PSS}</td>
                      <td>{items.images}</td>
                      {/* <td><input type='checkbox' value={items.serialNo} onClick={(e)=>handleIdCheckboxChange(e)}></input></td> */}
                      <td>{((items.raiseConcernFlag==='Yes' && currentData.processedStatusFlag==='Y'))?(<input type='checkbox' class='raiseConcern' checked disabled/>):(<input type="checkbox" class='raiseConcern' value={items.serialNo} onClick={(e)=>handleIdCheckboxChange(e)}/>)} </td>
                      {/* <td>{<Button  onClick={()=>{showImg(items.imageLink1) }}><FaEye className='PurchaseOrderMain-Ricons'></FaEye></Button>}</td> */}
                      <td>{<Button onClick={() => { buttonClickModal(items.serialNo, items.productName,items.concernMsg, items.images, items.imageLink1) }}><FaEye className='PurchaseOrderMain-Ricons'></FaEye></Button>}</td>
                      <Modal
                        open={open}
                        onClose={handleClose}>
                        <Box sx={style}>
                          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <div className="item-description-heading">
                            <div className='item-details'>
                              <div>
                                <label class='item-fields-desc'>Item Serialno : </label>
                                {/* {items.serialNo} */}
                                {state.serialNo}
                              </div>
                              <div>
                                <label class='item-fields-desc'>Product Name : </label>
                                {/* {items.productName} */}
                                {state.productName}
                              </div>
                             
                              <div>
                                <label class='item-fields-desc'>No. of Images : </label>
                               
                                {state.images}
                              </div>
                              </div>
                              <div className='item-details-msg'>
                              <label class='item-fields-desc'>Concern Message:</label>
                                {/* {items.images} */}
                                {state.concernMsg} 
                              </div>
                              


                            </div>

                            {/* {<input className='RetailerReturnTextInput' value={items.serialNo}></input> } */}
                            {/* <div class='item-information'>
      {`Item Serial No: `+items.serialNo}
      </div> */}


                            <div class='image-div'>
                            {imgGenerate(state.images).map((_,index)=>(
<img className="images-broken" key={index} src={state.img} alt={`${index}`}/>))}
                            {/* <img className="images-broken" src={state.img}></img> */}
                              {/* <div class='images-broken'> */}
                              {/* {imgGenerate(items.images).map((_, index) => (
                                <img className="images-broken" key={index} src={img} alt={`${index}`} />))} */}
                              {/* <img className="images-broken" src={img} /> */}
                              {/* <img className="images-broken" src={img} />
                          <img className="images-broken" src={img} />
                          <img className="images-broken" src={img} /> */}
                              {/* <img className="images-broken" src={items.imageLink1} />
                          <img className="images-broken" src={items.imageLink2} />
                          <img className="images-broken" src={items.imageLink2} />
                          <img className="images-broken" src={items.imageLink2} /> */}
                            </div>
                            {/* </div> */}

                          </Typography>
                          <div class='close-button'>
                            <button onClick={handleClose}>Close</button>
                          </div>
                        </Box>
                      </Modal>
                      {/* <td><Popup trigger={<Button><FaEye className='PurchaseOrderMain-Ricons'></FaEye></Button>}position="right center">
<div>{items.imageLink1}</div></Popup></td> */}
                    </tr>
                  ))
                }
              </tbody>
            </table>

            <br />
          </div>
        </div>
        : null
      }
      {/* <div className ='Retailer-comment'>
      <input className="RetailerReturnTextInput-comment" value={currentData?.retailerComments}/> 
    </div> */}
      <label class='item-fields-retailer-comment'>Retailer Comments </label>
      <div class="Retailer-comment">
        <input className='RetailerReturnTextInput' value={currentData?.retailerComments}></input>
      </div>

      <div className="process-return">
        {/* <button className="process-return-button" onClick={() => navigate("/RetailerReturnRaiseConcern")}>Raise Concern</button> */}
        {/* <button className="process-return-button" value={currentData?.returnId} onClick={tdclick}>Raise Concern</button>  */}
        {buttonvisible && (<button className="process-return-button" onClick={proceedButton}>Raise Concern</button>)}
        {buttonvisible1 && (<button className="process-return-button" onClick={updateReturnStatus} disabled={(currentData?.raiseConcernFlag==='Y'|| (currentData?.processedStatusFlag==='Y'))}>Process Return</button>)}
        {/* {buttonvisible1 && (<button className="process-return-button" onClick={updateReturnStatus}>Process Return</button>)} */}
        {/* <button className="process-return-button" onClick={updateReturnStatus} disabled={buttonvisible1 &&  ({filterdData[0]?.itemSerialInfo?.map((items, index) => ((items.raiseConcernFlag==='Y' || currentData.processedStatusFlag=='Y')))})}>Process Return</button> */}
        
      </div>

    </div>
  );
}

export default RetailerReturnDetails;