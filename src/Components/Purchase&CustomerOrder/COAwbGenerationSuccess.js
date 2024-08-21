import React,{useState,useEffect} from 'react'
import logo from '../../images/KPMG-logo.jpg'
import '../../style/OrderSummary.css'
import '../../style/Return.css'
import HomeButton from '../Buttons/HomeButton'
import HomeNav from '../Navbar/HomeNav'
import {FaUserAlt,FaInfoCircle, FaBell,FaArrowLeft, FaEye,FaSearch, FaFilter, FaSort, FaFileExport, FaArrowAltCircleUp, FaArrowCircleDown, FaArrowCircleUp} from "react-icons/fa";
import { FaHome,FaArrowAltCircleLeft} from "react-icons/fa";
import { useNavigate} from "react-router-dom";
import axios from 'axios';
const cors = require('cors');

function COAwbGenerationSuccess({id}) {
    let navigate = useNavigate();
    const [currentData, setcurrentData] = useState(null);
    const [itemdetails, setitemdetails] = useState(null);
    const [isButtonVisible, setIsButtonVisible]=useState(false);

  
  
    console.log("id",id)

    useEffect(() => {
        setcurrentData(id.totaldata)
       }, [id.totaldata])
       console.log("data", currentData)

       const details={"itemdetails":id.itemSelected}
       console.log("data to db",details)   

       function saveItemDetails() {
        const itemdata = async () => {
            await axios
                .get(`http://localhost:5050/api/customerOrders/service/saveIntermediateCO?coId=${currentData.coNumber}&itemDetails=${JSON.stringify(details)}`)
                .then((res) => {
                  navigate('/CustomerOrderMain')
                //   console.log("onpage",res.data)
                }).catch((err) => {
                //   
                alert("unsuccessful")
                })
            }
            itemdata()
          }

          function viewSummary() {
            const itemdata = async () => {
                await axios
                    .get(`http://localhost:5050/api/customerOrders/service/saveIntermediateCO?coId=${currentData.coNumber}&itemDetails=${JSON.stringify(details)}`)
                    .then((res) => {
                      navigate('/CustomerOrderMain')
                    //   console.log("onpage",res.data)
                    }).catch((err) => {
                    //   
                    alert("unsuccessful")
                    })
                    const pathCompute='/COView'
           navigate(pathCompute,{ state: {id: {
            resp:id
         }}})
                }
                itemdata()
              }

    const submitCO = () => {
      axios({
        method:'get',
        url:`http://localhost:5050/api/customerOrders/service/updateCOStatus?coId=${id?.totaldata?.coNumber}&coStatus=${'Submitted'}`,
    }).then(response=>{
    saveItemDetails();
      navigate('/CustomerOrderMain')
      console.log("response:"+JSON.stringify(response.data))}).catch(error=>{
        console.log("Error: "+error)
    })
    
    };

    const areAllItemsFullyProcessed=(details)=>{
        // return details.every(item=> item.acceptFlag==='Y' && item.picklistFlag==='Y')
        // const allAcceptedItemsProcessed=details.every(item=>{
        // return item.acceptFlag==='Y' ? item.picklistFlag==='Y' :true;
    //})
    const allAcceptedItems=details.filter(item =>(item.acceptFlag==='Y'))
    return allAcceptedItems.every(item=> item.picklistFlag==='Y')
    }


    const updateOrderStatus=(currentData)=>{
        if(!currentData) return;

        const isFullyProcessed=areAllItemsFullyProcessed(details?.itemdetails);
        const newOrderStatus=isFullyProcessed?'Fully Processed':'Partially Processed';
        axios({
            method:'get',
            url:`http://localhost:5050/api/customerOrders/service/updateCOStatus?coId=${id?.totaldata?.coNumber}&coStatus=${newOrderStatus}`,
        }).then(response=>{
          // setresponseData(response.data)
          navigate('/CustomerOrderMain')
          console.log("response:"+JSON.stringify(response.data))}).catch(error=>{
            console.log("Error: "+error)
        })      
    }
    const SubmitDispatch=()=>{
         const itemdata = async () => {
            await axios
                .get(`http://localhost:5050/api/customerOrders/service/saveIntermediateCO?coId=${currentData.coNumber}&itemDetails=${JSON.stringify(details)}`)
                .then((res) => {
                    // alert("success")
                  updateOrderStatus(currentData)
                }).catch((err) => {
                //   
                alert("unsuccessful")
                })
                
            }
            itemdata()
          }
    

    // const dispatchCO = () => {
    //     axios({
    //       method:'get',
    //       url:`http://localhost:5050/api/customerOrders/service/updateCOStatus?coId=${id?.totaldata?.coNumber}&coStatus=${'Partially Processed'}`,
    //   }).then(response=>{
    //     // setresponseData(response.data)
    //     navigate('/CustomerOrderMain')
    //     console.log("response:"+JSON.stringify(response.data))}).catch(error=>{
    //       console.log("Error: "+error)
    //   })
      
    //   };
    

return (
    <div>
            <HomeNav/>

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
                    <p>Customer Order</p>
                </div>
                {/* <div class='PurchaseOrderMain-notification'>
         <a href='/AlertCO' className='CreateInvBtn1'>CO Alert &nbsp; {<FaBell/>}</a>
         </div>    */}
            </div>
            {/* <div className='CC-title'>
                <a onClick={() => navigate(-1)} className='backBtn-ItemCost' style={{textDecoration:'none',color:'black'}}> <i>{<FaArrowLeft/>}</i>  Back </a>
                <text>Customer Order</text>
            </div>
            <br/>
            <div class="AWB">
            <p>{id?.awbNo} has successfully generated</p>
            </div>
             */}
            <div className='CC-ConfirmContainer'>
                <div className='CC-ConfirmBox'>
                    <br/><br/>
                    {/* <div className='CC-TickMark'>
                        <img src={TickMark} className='CC-TickMarkImage'></img>
                    </div> */}
                    <br/><br/>
                    <text>Customer Order has been saved successfully.</text>
                </div>
            </div>
            <br/>
        <div className="co-accept-reject-btn">
             <button className='CC-ConfirmBtn-submitdispatch' onClick={SubmitDispatch}>Submit & Dispatch</button>
            <button className='CC-ConfirmBtn-view' onClick={submitCO}>Submit</button>
            <button className='CC-ConfirmBtn-view' onClick={viewSummary}>View</button></div>    
           
           

        </div>



  
  )
} 
 export default COAwbGenerationSuccess;