import React, { Component, useState, useEffect } from 'react'
import HomeNav from '../Navbar/HomeNav'
import "../../style/Return.css";
import CostChangeAlertButton from '../Buttons/CostChangeAlertButton'
import { FaFileDownload, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import TickMark from '../../images/TickMark.png'

function CustomerReturnRaiseConcern({ idSelected}) {
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
      }, [iteminfo])
      console.log("sku",sku)
      console.log("serialNo",serialNo)
      console.log("itemdetails",itemdetails)


    // const handleSubmit = async () => {
    //     // const apiUrl='http://localhost:6060/api/returns/service/rr/raiseConcernRetailerReturns';
    //     const requestData={
    //         // itemDetails:'{"itemdetails":[{"sku":"i-78809121-2544","Items":"HP Laptop Victus","TotalQty":"3","ReturnQty":"1","QCStatus":"Done","QCPassQty":"1","DeliveredDate":"2023-07-19 20:17:21","ExchangeReq":"No","ExchangeQty":"0","RefundReq":"Yes","RefundQty":"1","itemSerialInfo":[{"serialNo":"DVS15134134114","productName":"HP Laptp Victus","productCategory":"Electronics","productSubcategory":"Laptop","defective":"Yes","QC":"Yes","returnCode":"51","PSS":"Mumbai","images":"2","imageLink1":"http://","imageLink2":"http://","imageLink3":"http://","imageLink4":"http://","raiseConcernFlag":"Yes","concernMsg":"Wrong item delivered"},{"serialNo":"DVS15134134115","productName":"HP Laptp Victus","productCategory":"Electronics","productSubcategory":"Laptop","defective":"Yes","QC":"No","returnCode":"51","PSS":"Mumbai","images":"4","imageLink1":"http://","imageLink2":"http://","imageLink3":"http://","imageLink4":"http://","raiseConcernFlag":"no","concernMsg":""}]},{"sku":"i-90212182-2219","Items":"Asus Vivobook 15","TotalQty":"50","ReturnQty":"3","QCStatus":"Done","QCPassQty":"0","DeliveredDate":"2023-07-19 20:17:21","ExchangeReq":"No","ExchangeQty":"0","RefundReq":"Yes","RefundQty":"3","itemSerialInfo":[{"serialNo":"HP15134139003","productName":"Asus Vivobook 15","productCategory":"Electronics","productSubcategory":"Laptop","defective":"Yes","QC":"Yes","returnCode":"51","PSS":"Mumbai","images":"1","imageLink1":"http://","imageLink2":"http://","imageLink3":"http://","imageLink4":"http://","raiseConcernFlag":"no","concernMsg":""},{"serialNo":"HP15134139004","productName":"Asus Vivobook 15","productCategory":"Electronics","productSubcategory":"Laptop","defective":"Yes","QC":"Yes","returnCode":"51","PSS":"Mumbai","images":"3","imageLink1":"http://","imageLink2":"http://","imageLink3":"http://","imageLink4":"http://","raiseConcernFlag":"no","concernMsg":""},{"serialNo":"HP15134139005","productName":"Asus Vivobook 15","productCategory":"Electronics","productSubcategory":"Laptop","defective":"Yes","QC":"Yes","returnCode":"51","PSS":"Mumbai","images":"4","imageLink1":"http://","imageLink2":"http://","imageLink3":"http://","imageLink4":"http://","raiseConcernFlag":"no","concernMsg":""}]}]}',
    //         returnId:'RR-121'
    //     }
    //     // axios.post(apiUrl,{
    //     //     params:requestData
    //     // })
    //     // .then(response=>{
    //     //     console.log("response",response.data)
    //     // })
    //     // .catch(error=>{
    //     //     console.error("Error",error)
    //     // })
    //     await axios
    //         .post("http://localhost:6060/api/returns/service/cr/raiseConcernCustomerReturns",
    //         {
    //           params: requestData,
    //         })
    //         .then((res) => {
    //             console.log(res.data)
 
    // }).catch((error) => {
    //     console.log(error.response.data)
    // })

    // alert("dbhcdbh")
    // //    navigate(pathCompute) 
    // }

    // function updateReturnStatus() {
    //     const itemdata = async () => {
    //       await axios
    //         .post(`http://localhost:6060/api/returns/service/cr/raiseConcernCustomerReturns?returnId=${idSelected.returnId}`)
    //         .then((res) => {
    //           setcurrentData(res.data)
              
    //           console.log("onpage",res.data)
    //         }).catch((err) => {
    //           console.log(err.response.data);
    //         })
    //     }
    //     itemdata()
    //   }

    
   

    //  function postUpdateData(){
    //     updateReturnStatus(serialNo,sku,itemdetails,)
    //      const itemDetailsJson=JSON.stringify(itemdetails)
    //      console.log("updated data",itemDetailsJson)
    //      axios.post(`http://localhost:6060/api/returns/service/cr/updateitemDetailsCustomerReturns?itemDetails=${itemDetailsJson}&&returnId=${idSelected.returnId}`)
    //      .then(response=>{
    //         console.log("success")
    //      })
    //      .catch(error=>{
    //         console.log("fail")
    //      })
    //  }
    const [concernMsg,setConcernMsg]=useState('');
    const API_URL='http://localhost:6060/api/returns/service/cr/updateitemDetailsCustomerReturns'

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
            // return iteminfo;             
    }
    console.log("updated",iteminfo)   
   
    
    async function handleRaiseConcern(itemInfoDetail) {
    //    await updateReturnStatus(sku, serialNo, itemdetails)
        await axios
            .post(`http://localhost:6060/api/returns/service/cr/updateitemDetailsCustomerReturns?itemDetails=${JSON.stringify(itemInfoDetail)}&returnId=${returnId}`)
            // .post(`http://localhost:6060/api/returns/service/cr/updateitemDetailsCustomerReturns?itemDetails=${JSON.stringify(iteminfo)}&returnId=${returnId}`)
            .then(response => {
                console.log("response", response.data)
                console.log("Item info: ",itemInfoDetail)
                 navigate('/CustomerReturnItemListing')
            })
            .catch(error => {
                console.error("Error", error.response.data)
                console.log("Item info er: ",itemInfoDetail)
            })

    }
    
    return (
        <div>
            <HomeNav />
            <div className='CC-title'>
                <a onClick={() => navigate(-1)} className='backBtn-ItemCost'> <i>{<FaArrowLeft />}</i>  Back </a>
                <text>Raise Concern</text>
                {/* {<CostChangeAlertButton/>} */}
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
                            {/* <button className='Edit-button'>Edit</button> */}
                            <div className='RR-RaiseConcern'>
                            <input type='text' value={concernMsg} placeholder='Write concern msg here...' onChange={e =>setConcernMsg(e.target.value)}/><br/>
    
                            </div>
                        </div>
    
                    )
                }                    
               
            })}

            <br />
            <button className='Raise-concern-button' onClick={()=>updateReturnStatus(sku,serialNo,itemdetails)}>Raise Concern</button>
        </div>
    )
}

export default CustomerReturnRaiseConcern