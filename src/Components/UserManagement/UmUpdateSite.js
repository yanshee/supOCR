import React, {useState} from 'react'
import HomeNav from '../Navbar/HomeNav'
import HomeButton from '../Buttons/HomeButton'
import {FaPlusCircle, FaSearch} from "react-icons/fa";
import '../../style/UmAddsite.css'
import axios from 'axios';
import { useNavigate} from "react-router-dom";
const cors = require('cors');
 
const UMupdatesite=({id,siteName})=>
{
    let navigate = useNavigate();
   
    const [SiteName, setSiteName] = useState()
    const [siteAddress, setSiteAddress] = useState()
    const [SiteLoc, setSiteLoc] = useState()
    const [SiteContact, setSiteContact] = useState()
    const suppliersite = siteName.filter(site => site.siteId === id )
    const [Data,setData]=useState({
       
        "siteId": id,
        "siteName": suppliersite[0].siteName,
        "siteAddress": suppliersite[0].siteAddress,
        "siteLocation": suppliersite[0].siteLocation,
        "siteContact":  suppliersite[0].siteContact      
    });
    console.log("sitedata", siteName);
   
    console.log("test", suppliersite);
    function updatesite()
    {
       
     
        axios({
            method: 'post',
            url: 'http://localhost:2020/api/usermgmt/service/sites/editSupplierSite',
            data: Data,
          })
            .then(function (response) {
             console.log("response", response.data);
             if ( response.data =="SUCCESS") {
               // alert('site Updated');
                window.location = "/SiteUpdateCnfrm";
 
              } else {
               // alert('site not added');
                window.location = "/SiteUpdateCnfrm";
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
              <p>Update Supplier Site Details</p>
          </div>
 
         
 
          <div class="AddSites-AddSitesContianer">
              <div class="ViewExistingSites-container">                    
              <div class="SupplierSiteDetailes-contents">
              <p>Site Name :</p>
                      <input class="SupplierAddSiteDetailes-input"   value={Data.siteName}  onChange={handleChange} name='siteName'></input>
                  </div>
                  <div class="SupplierSiteDetailes-contents">
                      <p>Site Address :</p>
                      <input class="SupplierAddSiteDetailes-input"  value={Data.siteAddress} onChange={handleChange} name='siteAddress'></input>
                  </div>
                  <div class="SupplierSiteDetailes-contents">
                      <p>Site Location :</p>
                      <input class="SupplierAddSiteDetailes-input"  value={Data.siteLocation} onChange={handleChange} name='siteLocation'></input>
                  </div>
                  <div class="SupplierSiteDetailes-contents">
                      <p>Site Contact :</p>
                      <input class="SupplierAddSiteDetailes-input"  value={Data.siteContact} onChange={handleChange} name='siteContact'></input>
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
                  <button  onClick={updatesite} >Update Site</button>
          </div>
      </div>
    </div>
  )
};
 
export default UMupdatesite;