import React,{useState,useEffect} from 'react'
import logo from '../../images/KPMG-logo.jpg'
import '../../style/OrderSummary.css'
import '../../style/Return.css'
import HomeNav from '../Navbar/HomeNav'

import {FaBell,FaArrowLeft} from "react-icons/fa";
import { FaHome,FaArrowAltCircleLeft} from "react-icons/fa";
import { useNavigate} from "react-router-dom";
import axios from 'axios';
const cors = require('cors');

function AwbGenerationSuccess({id}) {
    let navigate = useNavigate();
    const [currentData, setcurrentData] = useState(null);
    const [itemdetails, setitemdetails] = useState(null);
    const [isButtonVisible, setIsButtonVisible]=useState(false);

    const performRedirect=()=>{
        const pathCompute='/ASNViewSummary'
        navigate(pathCompute,{ state: {id: {
       completeData:id}}})
      }
  
     console.log("id",id)

     function saveConatinerASN() {
        const itemdata = async () => {
          await axios
              // .post(`http://localhost:5050/api/customerOrders/service/saveIntermediateCO?itemDetails=${currentData.asnId}&coId=${currentData.asnStatus}`)
              .post("http://localhost:4040/api/asn/service/saveASN?",id?.completeData,{
                params:{
                  asnId:id?.completeData?.asnId,
                  asnStatus:"Submitted"
                }
              })
              .then((res) => {
            //   alert("ASN has been saved successfully") 
            navigate('/ASNMain')
              }).catch((err) => {
              //   
              alert("unsuccessful")
              })
          }
          itemdata()
        }
        function dispatchASN() {
            const itemdata = async () => {
              await axios
                  // .post(`http://localhost:5050/api/customerOrders/service/saveIntermediateCO?itemDetails=${currentData.asnId}&coId=${currentData.asnStatus}`)
                  .post("http://localhost:4040/api/asn/service/saveASN?",id?.completeData,{
                    params:{
                      asnId:id?.completeData?.asnId,
                      asnStatus:"Ready to pickup"
                    }
                  })
                  .then((res) => {
                //   alert("ASN has been saved successfully") 
                navigate('/ASNMain')
                  }).catch((err) => {
                  //   
                  alert("unsuccessful")
                  })
              }
              itemdata()
            }

return (
    <div>
            <HomeNav/>
            {/* <div className='CC-title'>
                <a onClick={() => navigate(-1)} className='backBtn-ItemCost' style={{textDecoration:'none',color:'black'}}> <i>{<FaArrowLeft/>}</i>  Back </a>
                <text>Item Listing</text>
               
            </div> */}
            <div class='Invoices-heading'>
               
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
        </div> 
            <br/>
            <div class="AWB">
            <p>{id?.completeData?.awbNo} has successfully generated</p>
            </div>
            
            <div className='CC-ConfirmContainer'>
                <div className='CC-ConfirmBox'>
                    <br/><br/>
                    {/* <div className='CC-TickMark'>
                        <img src={TickMark} className='CC-TickMarkImage'></img>
                    </div> */}
                    <br/><br/>
                    <text>AWB has been generated successfully.</text>
                </div>
            </div>
            <br/>
        <div className="co-accept-reject-btn">
            <button className='CC-ConfirmBtn-submitdispatch' onClick={dispatchASN}>Submit & Dispatch</button>
            <button className='CC-ConfirmBtn-view' onClick={saveConatinerASN}>Submit</button>
            <button className='CC-ConfirmBtn-view' onClick={performRedirect}>View</button></div>    
           
           

        </div>



  
  )
} 
 export default AwbGenerationSuccess;