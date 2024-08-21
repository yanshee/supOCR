import React, {useState} from 'react'
import HomeNav from '../Navbar/HomeNav'
import HomeButton from '../Buttons/HomeButton'
import {FaPlusCircle, FaSearch} from "react-icons/fa";
import '../../style/UmAddsite.css'
import axios from 'axios';
import $ from 'jquery';
 
const UMAddSites=()=>
{
    //let navigate = useNavigate();
   
    const [siteName, setsiteName] = useState()
    const [siteAddress, setSiteAddress] = useState()
    const [siteLocation, setsiteLocation] = useState()
    const [siteContact, setsiteContact] = useState()
 
    const [Data,setData]=useState({
       
        "siteId": "",
        "siteName": "",
        "siteAddress": "",
        "siteLocation": "",
        "siteContact": ""      
    });
   
    function createsite(e)
    {
        $("#overlay").fadeIn('slow');
        e.preventDefault();
 
        axios({
            method: 'post',
            url: 'http://localhost:2020/api/usermgmt/service/sites/addNewSupplierSite',
            data: Data,
          })
            .then(function (response) {
                $("#overlay").fadeOut('slow');
             console.log("response", response.data);
             if ( response.data =="SUCCESS") {
               // alert('site added');
                window.location = "/UMviewsites";
 
              } else {
               // alert('site not added');
                window.location = "/UMviewsites";
              }
            })
            .catch(function (error) {
              console.log('error', error);
            });
 
       
    }
 
 
 
    const handleChange=(event)=>{
        const{name,value}=event.target;
        setData((prevData)=>({
            ...prevData,
            [name]:value,
       
        }));
    };
 
    const handleSubmit=(event)=>{
        event.preventDefault();
      };
   
  console.log(Data);
   
  return(
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
      <div class="AddSites-container">
          <div class='AddSites-Title'>
              <p>Add Supplier Site Details</p>
          </div>
          <a href="/UMMain"><button>User Home</button></a>
            <a href="/UMViewSites"><button>View Sites</button></a>
          <div class="AddSites-AddSitesContianer">
              <div class="ViewExistingSites-container">                    
              <div class="SupplierSiteDetailes-contents">
                      <p>Site Name :</p>
                      <input class="SupplierAddSiteDetailes-input" onChange={handleChange} name='siteName'></input>
                  </div>
                  <div class="SupplierSiteDetailes-contents">
                      <p>Site Address :</p>
                      <input class="SupplierAddSiteDetailes-input" onChange={handleChange} name='siteAddress'></input>
                  </div>
                  <div class="SupplierSiteDetailes-contents">
                      <p>Site Location :</p>
                      <input class="SupplierAddSiteDetailes-input" onChange={handleChange} name='siteLocation'></input>
                  </div>
                  <div class="SupplierSiteDetailes-contents">
                      <p>Site Contact :</p>
                      <input class="SupplierAddSiteDetailes-input" onChange={handleChange} name='siteContact'></input>
                  </div>
              </div>
              <div class="SupplierSiteDetailes-container">
                  <div class="SupplierSiteDetailes-contents">
                      <p>Latitude :</p>
                      <input class="SupplierAddSiteDetailes-input" name='AddSiteLatitude'></input>
                  </div>
                  <div class="SupplierSiteDetailes-contents">
                      <p>Longitude :</p>
                      <input class="SupplierAddSiteDetailes-input" name='AddSiteLongitude'></input>
                  </div>
                  <div class="SupplierSiteDetailes-contents">
                      <p>Landmark :</p>
                      <input class="SupplierAddSiteDetailes-input" name='AddSiteLandmark'></input>
                  </div>
                  <div class="SupplierSiteDetailes-contents">
                      <p>Site Code :</p>
                      <input class="SupplierAddSiteDetailes-input" name='AddSiteCode'></input>
                  </div>
              </div>
          </div><br/>
          <div class="ViewExistingSites-Buttons">
                  <button  onClick={createsite} >Add Site</button>
          </div>
      </div>
    </div>
  )
};
 
export default UMAddSites;