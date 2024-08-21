import React, { Component, useState, useEffect } from 'react'
import HomeNav from '../Navbar/HomeNav'
import "../../style/Return.css";
import HomeButton from '../Buttons/HomeButton';
import CostChangeAlertButton from '../Buttons/CostChangeAlertButton'
import { FaFileDownload, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import TickMark from '../../images/TickMark.png'

const cors = require('cors');

function RetailerReturnRaiseConcern({ idSelected}) {
    let navigate = useNavigate();
    const pathCompute="/RetailerReturnItemListing"
    const [currentData, setcurrentData] = useState(null);
    const [data, setData] = useState([])
    const [itemdetails, setitemdetails] = useState(null);
    const [sku,setSku]=useState(null);
    const [serialNo,setSerialNo]=useState(null);
    const [returnId,setReturnId]=useState(null);
    const [iteminfo,setiteminfo]=useState('');
    

    console.log("id", idSelected)

    useEffect(() => {
        
          setSku(idSelected?.itemDetails?.sku);
          setSerialNo(idSelected?.selctedId[0]);
          setitemdetails(idSelected?.completeData);
          setReturnId(idSelected?.returnId)
      }, [])
      console.log("sku",sku)
      console.log("serialNo",serialNo)
      console.log("itemdetails",itemdetails)

    

    // function updateReturnStatus() {
    //     const itemdata = async () => {
    //       await axios
    //         .post(`http://localhost:6060/api/returns/service/rr/raiseConcernRetailerReturns?itemDetails=${JSON.stringify(idSelected.completeData)}&returnId=${idSelected.returnId}`)
    //         .then((res) => {
    //         //   setcurrentData(res.data)
    //           alert("Success")
    //         //   console.log("onpage",res.data)
    //         }).catch((err) => {
    //         //   
    //         alert("unsuccessful")
    //         })
    //     }
    //     itemdata()
    //   }

    // const handleChange=(event)=>{
    //     const{name,value}=event.target;
    //     setData((prevData)=>({
    //         ...prevData,
    //         [name]:value,
        
    //     }));
    // };

    const [concernMsg,setConcernMsg]=useState('');
    const API_URL='http://localhost:6060/api/returns/service/rr/raiseConcernRetailerReturns'

   async function updateReturnStatus(sku,serialNo,itemdetails){
            const updatedItemDetails=itemdetails?.itemdetails?.map(item=>{
                if(item.sku==sku){
                    const updatedSerialInfo=item.itemSerialInfo?.map(serialItem=>{
                        if(serialItem.serialNo===serialNo){
                            return {
                                ...serialItem,
                                concernMsg:concernMsg
                            }
                        }
                        return serialItem
                    });
                    return{
                        ...item,
                        itemSerialInfo:updatedSerialInfo
                    }
                }
                return item
            });     
            const dataTosend={"itemdetails":(updatedItemDetails)} 
            console.log("Data to send",dataTosend)
            setiteminfo(dataTosend); 
            handleRaiseConcern(dataTosend)   
    }
    console.log("updated",iteminfo)   
   
    
    async function handleRaiseConcern(itemInfoDetail) {
    // await updateReturnStatus(sku, serialNo, itemdetails);
        // updatedData;
        await axios
            // .post(`http://localhost:6060/api/returns/service/rr/raiseConcernRetailerReturns?itemDetails=${JSON.stringify(iteminfo)}&returnId=${returnId}`)
            .post(`http://localhost:6060/api/returns/service/rr/raiseConcernRetailerReturns?itemDetails=${JSON.stringify(itemInfoDetail)}&returnId=${returnId}`)
            .then(response => {
                console.log("response", response.data)
                console.log("Item info: ",itemInfoDetail)

                  navigate('/RetailerReturnItemListing')
            })
            .catch(error => {
                console.error("Error", error)
                console.log("Item info er: ",itemInfoDetail)

            })
    }
    
    return (
        <div>
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
                    <p>Retailer Return</p>
                </div>
        </div>
            <br />
            {idSelected.itemDetails.itemSerialInfo.map((item, index) => {
                if(idSelected.selctedId.includes(item.serialNo)){
                    return (
                        <div className='RR-RaiseConcernContainer'>
    
                            <div className="RR-item-description">
                                <div className='item-information'>
                                    <label class='item-fields-desc'>Item Serialno : </label>
                                    {item.serialNo}
                                </div>
                                <div className='item-information'>
                                    <label class='item-fields-desc'>Product Name : </label>
                                    {item.productName}
                                </div>
                            </div>
                            <div className='RR-RaiseConcern'>
                            <input type='text' value={concernMsg} placeholder='Write concern msg here...' onChange={e =>setConcernMsg(e.target.value)}/><br/>
    
                            </div>
                        </div>
    
                    )
                }                    
               
            })}

            <br />
            <button className='CC-ConfirmBtn' onClick={()=>updateReturnStatus(sku,serialNo,itemdetails)} >Raise Concern</button>
        </div>
    )
}

export default RetailerReturnRaiseConcern