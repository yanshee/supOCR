import React, { useState,useEffect } from 'react'
import HomeNav from '../Navbar/HomeNav'
import HomeButton from '../Buttons/HomeButton'
import {FaPlusCircle, FaSearch} from "react-icons/fa";
import '../../style/UMViewSites.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const cors = require('cors');



const UMViewSites=()=>
{
    let navigate = useNavigate();
    const [currentData, setcurrentData] = useState(null);
   
    useEffect(() => {
        const itemdata = async () => {
                 await axios
        .get("http://localhost:2020/api/usermgmt/service/sites/getAllSupplierSites")
        .then((res) => {
            setcurrentData(res.data)
           console.log(currentData)
        }).catch((err) => {
           console.log(err);
    })
        }

        itemdata()
     },[])

  

    function tdclick(event){
        const pathCompute='/UMupdatesite'
       const id=event.target.value;
       // alert(id);
        navigate(pathCompute,{ state: {id: id, siteName:currentData}});
    };

    function tddelete(e){
     const id=e.target.value;
     // alert(id);
     e.preventDefault();

        axios({
            method: 'post',
            url: 'http://localhost:2020/api/usermgmt/service/sites/deleteSupplierSite?supplierSiteId='+id+"",
           
          })
            .then(function (response) {
             console.log("response", response.data);
             if (response.data == "SUCCESS")
             {
              // alert ("Site Deleted");
              window.location = "/SiteRemoveCnfrm"; 
             }
             else
             {
              // alert ("Site Not Deleted");
              window.location = "/UMViewSites"; 
             }
            })
            .catch(function (error) {
              console.log('error', error);
            });
  };
    
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
            <p>All Sites</p>
        </div>
        <a href="/UMMain"><button>User Home</button></a>
       <a href="/UMaddsite"><button>Add New Site</button></a>
        {currentData ? (


<div className="table-New-wrapper">

 

  <table className="table">
    <thead>

      <tr>
        <th>Name</th>
        <th>Address</th>
        <th>Location</th>
        <th>Contact</th>
        <th>View</th>
      </tr>

    </thead>

    <tbody>

    {currentData.map((item,index)=>(
        
    <tr>
    <td>{item.siteName}</td>    
    <td>{item.siteAddress}</td>   
    <td>{item.siteLocation}</td>   
    <td>{item.siteContact}</td>   
    <td >{<button value={item.siteId} onClick={tdclick}>Edit</button> } 
    {<button value={item.siteId} onClick={tddelete}>Delete</button> } </td>

    </tr>

))}



    </tbody>

  </table>

  <br />

</div>

) : (

<div style={{border: "1px solid black",padding: "1em",margin: "1em",backgroundColor: "black",
color: 'white',textAlign: 'center'

}}>No data found</div>


)}
      
    </div>
    
</div>

   
)
};

export default UMViewSites;