import React, {useEffect, useState} from 'react'
import '../../style/UMCreateUser.css'
import HomeNav from '../Navbar/HomeNav'
import HomeButton from '../Buttons/HomeButton'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import $ from 'jquery';


const UMCreateUser=()=>
{
    let navigate = useNavigate();
   
    const [username, setusername] = useState()
    const [email, setemail] = useState()
    const [mobile, setmobile] = useState()
   
    const [checkedData, setCheckedData] = useState(() => ({
        ASN: 'No',
        PO: 'No',
        Invoices: 'No',
        Returns: 'No',
        Deal: 'No',
        Analytics: 'No',
        CO: 'No',
        Alerts: 'No'
        
      }));

    const [checkedDatasite, setCheckedDatasite] = useState(() => ({
        Mumbai: 'No',
        kolkata: 'No',
        Delhi: 'No',
        Bangalore: 'No',
        Kochi: 'No',
        Chennai: 'No',
        Hyderabad: 'No',
        Pune: 'No',
        Nashik: 'No',
        
      })); 

    const handleChange=(event)=>{
        const{name,value}=event.target;
        setData((prevData)=>({
            ...prevData,
            [name]:value,
           
        
        }));
 
    };

    const handleChangecheckbox = (event) => {
        setCheckedData((prevData) => ({
          ...prevData,
          [event.target.id]: event.target.checked ? 'Yes' : 'No',
        }));
       
        
      };
    const handleChangecheckboxsite = (event) => {
       
        setCheckedDatasite((prevData) => ({
            ...prevData,
            [event.target.id]: event.target.checked ? 'Yes' : 'No',
          }));
        
      };

      const [checkeddatacombined, setcheckeddatacombined] = useState({
          modulesList: checkedData,
          supplieSiteList: checkedDatasite,
        })
     
        const combinedData = {
          modulesList: checkedData,
          supplieSiteList: checkedDatasite,
        };

     useEffect(()=>{

        const changeData = () => {
            setData((prevData)=>({
                ...prevData,
                userMapping:JSON.stringify({
                    modulesList: checkedData,
                    supplieSiteList: checkedDatasite,
                  })
               
            
            }))
    
        }
        changeData()

        
     },[checkedData, checkedDatasite])
    

    console.log("combinedData",combinedData); // Output the combined data here
    const combinedData1 = JSON.stringify(combinedData);
    
    const [Data,setData]=useState({
        
           
            "username": "",
            "emailId": "",
            "mobileNumber": "",
            "userMapping": checkeddatacombined,
            "isAdminFlag": "N",
        
          
            "password": "",
            "defaultPwdFlag": "",
            "template": "",
            "redirectFlag": ""
          
    });
    
    function createuser(e)
    {
        $("#overlay").fadeIn('slow');
  
        e.preventDefault();

        axios({
            method: 'post',
            url: 'http://localhost:2020/api/usermgmt/service/user/createUser',
            data: Data,
          })
            .then(function (response) {
                $("#overlay").fadeOut('slow');
             console.log("response", response.data);
             if ( response.data =="SUCCESS") {
               
                navigate("/UMViewUser");
              //  document.getElementById("msg").innerHTML = "User Creation Failed";

              } else {
                alert('user not created');
              //  document.getElementById("error").innerHTML = "User Creation Failed";
              }
            })
            .catch(function (error) {
              console.log('error', error);
            });  
    }
    const handleIdCheckboxChange = (e) => {
        const {checked} =e.target;
        const newValue=checked?'Y':'N';
         setData((prevData) =>({
            ...prevData,
            isAdminFlag:newValue,
        }));
        // handleClose();
        // setData(newdata);
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
      };
    
  console.log("Data",Data);
    
  return (
    <div>
        <div>
            <HomeNav/>
        </div>
        <div class='usermgmt-heading'>
            <HomeButton/>
            <div class='usermgmt'>
                <p>User Management</p>
            </div>
        </div>
        <div class="UMCreateUser-container">
            <div class='UMCreateUser-Title'>
                <p>Create User</p>
            </div>
            <a href="/UMMain"><button>User Home</button></a>
            <a href="/UMViewUser"><button>View Users</button></a>
            <div class="UMCreateUser-BasicDetailsContianer">
                <form class="BasicDetails-container">
                    <p class="BasicDetailsContianer-title">Basic Details</p>
                    <div class="BasicDetails-contents">
                       <p>Full Name</p>
                       <input class="BasicDetails-input" name="username" value={Data.username} onChange={handleChange} placeholder='Enter Full Name'></input>
                    </div>
                    <div class="BasicDetails-contents">
                       <p>Email ID</p>
                       <input class="BasicDetails-input" name="emailId" value={Data.emailId} onChange={handleChange} placeholder='Enter Email ID'></input>
                    </div>
                    <div class="BasicDetails-contents">
                       <p>Mobile Number</p>
                       <input class="BasicDetails-input" name="mobileNumber" value={Data.mobileNumber} onChange={handleChange} placeholder='Enter Mobile Number'></input>
                    </div>
                    <div class="BasicDetails-contents">
                    <input type='checkbox' checked={Data.isAdminFlag==='Y'} onChange={handleIdCheckboxChange}/>Want to create User as Admin
                    </div>
                </form>

                <div class="ModuleAccess-container">
                    <p class="ViewSitesContianer-title">Module Access</p>
                    <div class="ModuleOptions">
                        <ul>
                            <li>
                                <input type="checkbox" id="ASN" name="checkboxes" value="ASN"  onChange={handleChangecheckbox} ></input>
                                <label class="ModuleOptions-container">ASN</label>
                            </li>
                            <li>
                                <input type="checkbox" id="PO" name="checkboxes" value="PO"  onChange={handleChangecheckbox}></input>
                                <label class="ModuleOptions-container">P.O</label>
                            </li>
                            <li>
                                <input type="checkbox" id="Invoices" name="checkboxes" value="Invoices" onChange={handleChangecheckbox}></input>
                                <label class="ModuleOptions-container">Invoices</label>
                            </li>
                            <li>
                                <input type="checkbox"  id="Itemlisting" name="checkboxes" value="Invoices" onChange={handleChangecheckbox}></input>
                                <label class="ModuleOptions-container">Item Listing</label>
                            </li>
                            <li>
                                <input type="checkbox"  id="Returns" name="checkboxes" value="Invoices" onChange={handleChangecheckbox}></input>
                                <label class="ModuleOptions-container">Returns</label>
                            </li>
                            <li>
                                <input type="checkbox"  id="Deal" name="checkboxes" value="Invoices" onChange={handleChangecheckbox}></input>
                                <label class="ModuleOptions-container">Deal</label>
                            </li>
                            <li>
                                <input type="checkbox"  id="Analytics" name="checkboxes" value="Invoices" onChange={handleChangecheckbox}></input>
                                <label class="ModuleOptions-container">Analytics</label>
                            </li>
                            <li>
                                <input type="checkbox"  id="CO" name="checkboxes" value="Invoices" onChange={handleChangecheckbox}></input>
                                <label class="ModuleOptions-container">Customer Orders</label>
                            </li>
                            <li>
                                <input type="checkbox"  id="Alerts" name="checkboxes" value="Invoices" onChange={handleChangecheckbox}></input>
                                <label class="ModuleOptions-container">Alerts</label>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="SiteAccess-container">
                    <p class="ViewSitesContianer-title">Site Access</p>
                    <div class="SiteAccessOptions">
                        <ul>
                            <li>
                                <input type="checkbox" id="Mumbai" name="checkboxes" value="Mumbai"  onChange={handleChangecheckboxsite}></input>
                                <label class="SiteAccessOptions-container">Mumbai</label>
                            </li>
                            <li>
                                <input type="checkbox" id="kolkata" name="checkboxes" value="kolkata"  onChange={handleChangecheckboxsite}></input>
                                <label class="SiteAccessOptions-container">kolkata</label>
                            </li>
                            <li>
                                <input type="checkbox" id="Delhi" name="checkboxes" value="Delhi"  onChange={handleChangecheckboxsite}></input>
                                <label class="SiteAccessOptions-container">Delhi</label>
                            </li>
                            <li>
                                <input type="checkbox" id="Bangalore" name="checkboxes" value="Bangalore"  onChange={handleChangecheckboxsite}></input>
                                <label class="SiteAccessOptions-container">Bangalore</label>
                            </li>
                            <li>
                                <input type="checkbox" id="Kochi" name="checkboxes" value="Kochi"  onChange={handleChangecheckboxsite}></input>
                                <label class="SiteAccessOptions-container">Kochi</label>
                            </li>
                            <li>
                                <input type="checkbox" id="Chennai" name="checkboxes" value="Chennai"  onChange={handleChangecheckboxsite}></input>
                                <label class="SiteAccessOptions-container">Chennai</label>
                            </li>
                            <li>
                                <input type="checkbox" id="Hyderabad" name="checkboxes" value="Hyderabad"  onChange={handleChangecheckboxsite}></input>
                                <label class="SiteAccessOptions-container">Hyderabad</label>
                            </li>
                            <li>
                                <input type="checkbox" id="Pune" name="checkboxes" value="Pune"  onChange={handleChangecheckboxsite}></input>
                                <label class="SiteAccessOptions-container">Pune</label>
                            </li>
                            <li>
                                <input type="checkbox" id="Nashik" name="checkboxes" value="Nashik"  onChange={handleChangecheckboxsite}></input>
                                <label class="SiteAccessOptions-container">Nashik</label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="ViewExistingSites-Buttons">
                <button onClick={createuser}>Create User</button>
            </div>
        </div>
        
    </div>
    )
};

export default UMCreateUser;