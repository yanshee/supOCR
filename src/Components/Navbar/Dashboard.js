import React, { useState,useEffect, useRef} from 'react'
import HomeNav from '../Navbar/HomeNav'
import '../../style/Dashboard.css'
import { FaArrowRight } from "react-icons/fa";
import CostChangeLogo from '../../images/CostChangeIcon.png'
import ReturnsLogo from '../../images/ReturnsIcon.png'
import PurchaseOrderLogo from '../../images/PurchaseOrderIcon.png'
import InvoicesLogo from '../../images/InvoicesIcon.png'
import DealsLogo from '../../images/Dealicon.png'
import AlertLogo from '../../images/AlertIcon.png'
import ASNLogo from '../../images/ASNicon.png'
import Analytics from '../../images/Analytics.png'
import axios from 'axios';
import analytics1 from '../../images/test3.PNG'
import analytics2 from '../../images/test2.PNG'
import analytics3 from '../../images/test1.PNG'
import dash1 from '../../images/dash1.PNG'
import dash2 from '../../images/dash2.PNG'
import dash3 from '../../images/dash3.PNG'
import dash4 from '../../images/dash4.PNG'
import { useNavigate } from "react-router-dom";
 
const cors = require('cors');
 
const Dashboard=()=>{
 
 
    let navigate = useNavigate();
    const [currentData, setcurrentData] = useState(null);
 
    useEffect(() => {
        const itemdata = async () => {
                 await axios
        .get("http://localhost:8080/api/dashboards/service/getAllDashboardData")
        .then((res) => {
            setcurrentData(res.data)
           console.log(res.data)
        }).catch((err) => {
           console.log(err);
    })
        }
 
        itemdata()
     },[])
 
 
 
 
 
    const tableRef = useRef(null);
 
    return (
        <div class="Dashboard-container">
            <div>
                <HomeNav/>
            </div>
 
            <div class="Dashboard-Contents">
                <div class="dash-numbers">
                <h2>My Dashboard</h2>
                    <div class="dashno-item">
                       
                        <img class="dash1" src={dash1} alt='analytics1'/>
                    </div>
                    <div class="dashno-item">
                   
                    <img class="dash2" src={dash2} alt='analytics1'/>
                    </div>
                    <div class="dashno-item">
                 
                    <img class="dash3" src={dash3} alt='analytics1'/>
                    </div>
                    <div class="dashno-item">
                 
                    <img class="dash4" src={dash4} alt='analytics1'/>
                    </div>
                </div>
            </div>
 
 
 
            <div class="Dashboard-Contents">
                <div class="dash-item">
                    <div class="item">
                        <h2>On-time Delivery Rate</h2>
                        <div class="numbers">
                            <label>Total Orders Performance</label>
                            <span>2789+</span>
                        </div>
                        <img class="alalytics1" src={analytics1} alt='analytics1'/>
                    </div>
                    <div class="item">
                    <h2>Defect Rate Per Invoice*</h2>
                    <div class="numbers">
                            <label>Total Invoices Created</label>
                            <span>1002+</span>
                        </div>
                    <img class="alalytics" src={analytics3} alt='analytics1'/>
                    </div>
                    <div class="item">
                    <h2>Returns Per PO</h2>
                    <div class="numbers">
                            <label>Total POs Processed</label>
                            <span>240+</span>
                        </div>
                    <img class="alalytics" src={analytics2} alt='analytics1'/>
                    </div>
                </div>
            </div>
 
 
 
            <div class="Dashboard-Contents">
                <div class="OverviewContainer">
                    <div class="OverviewHeader">
                        <h2>My Alerts</h2>
                    </div>
                    <div class="OverviewContents">
                        <div class="Tile-container">
                            <div class="Tile">
                                <div class="Tile-title">
                                    {<img src={CostChangeLogo} alt='icon' class="Tile-icon"/>} &nbsp; Purchase Orders
                                </div>
                                { currentData?.ccList.map((ccList, index) => (
 
                                <p>{ccList}</p>
 
                                ))}
                                {<FaArrowRight class="Tile-arrow"/>}
                            </div>
                           
                        </div>
 
                        <div class="Tile-container">
                            <div class="Tile">
                                <div class="Tile-title">
                                    {<img src={InvoicesLogo} alt='icon' class="Tile-icon"/>} &nbsp; ASNs
                                </div>
                                { currentData?.invList.map((invList, index) => (
 
                                <p>{invList}</p>
 
                                ))}
                               
                                {<FaArrowRight class="Tile-arrow"/>}
                            </div>
                           
                        </div>
                       
                        <div class="Tile-container">
                            <div class="Tile">
                                <div class="Tile-title">
                                    {<img src={CostChangeLogo} alt='icon' class="Tile-icon"/>} &nbsp; Invoices
                                </div>
                                { currentData?.ccList.map((ccList, index) => (
 
                                <p>{ccList}</p>
 
                                ))}
                                {<FaArrowRight class="Tile-arrow"/>}
                            </div>
                           
                        </div>
 
                        <div class="Tile-container">
                            <div class="Tile">
                                <div class="Tile-title">
                                    {<img src={CostChangeLogo} alt='icon' class="Tile-icon"/>} &nbsp; Returns
                                </div>
                                { currentData?.ccList.map((ccList, index) => (
 
                                <p>{ccList}</p>
 
                                ))}
                                {<FaArrowRight class="Tile-arrow"/>}
                            </div>
                           
                        </div>
 
                    </div>                  
                </div>
 
               
            </div>
        </div>
    )
 
 
}
 
export default Dashboard