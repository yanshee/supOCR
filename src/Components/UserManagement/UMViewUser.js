import React, { useEffect, useState } from 'react';
import '../../style/UMViewUser.css'
import HomeNav from '../Navbar/HomeNav'
import HomeButton from '../Buttons/HomeButton'
import { FaPlusCircle,FaFileExport,FaSearch } from 'react-icons/fa'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const UMViewUser=()=>
{
    let navigate = useNavigate();
    const [currentData, setcurrentData] = useState(null);
    const [enableDelete,setEnableDelete]=useState(true);
    const [enableEdit,setEnableEdit]=useState(true)
   
    useEffect(() => {
        const itemdata = async () => {
                 await axios
        .get("http://localhost:2020/api/usermgmt/service/user/vieweUserMaster")
        .then((res) => {
            setcurrentData(res.data)
           console.log(currentData)
        }).catch((err) => {
           console.log(err);
    })
        }

        itemdata()
     },[])

    //  useEffect(()=>{
    //   currentData?.map((item, index) => (item.isAdminFlag==='Y')?(setEnableDelete(false) && setEnableEdit(false)):(setEnableDelete(true) && setEnableEdit(true)))
    //  })

    //  function tdclick(event){
    //     const pathCompute='/UMupdateuser'
    //    const id=event.target.value;
    //    // alert(id);
    //     navigate(pathCompute,{ state: {id: id}});
    // };
    function tdclick(event){
      const pathCompute='/UMupdateuser'
     const id=[event.target.value];
      // alert(id);
      navigate(pathCompute,{ state: {idSelected: id}});
  };

    function tddelete(e){
     const id=e.target.value;
     e.preventDefault();

     axios({
      method: 'get',
      url: 'http://localhost:2020/api/usermgmt/service/user/deleteUserDetails?userId='+id+"",
     // headers: {Authorization: `Bearer ${bearerToken}`},
    
    })
      .then(function (response) {
       //  console.log("response", JSON.stringify(response.data))
       console.log("response", response);
       if(response.data="SUCCESS")
       {
        // alert(" User Successfully Deleted");
        window.location = "/UMViewUser"; 
       }
       else
       {
        // alert("User Not deleted");
        window.location = "/UMViewUser"; 
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
            <p>All Users</p>
        </div>
        <a href="/UMMain"><button>User Home</button></a>
  <a href="/UMcreateUser"><button>Add New User</button></a>  
   
        {currentData ? (

<div className="table-New-wrapper">
  <table className="table">
    <thead>

      <tr>
        <th>Users</th>
        <th>Username</th>
        <th>Email</th>
        <th>Mobile</th>
        <th>Admin</th>
        <th>View</th>
      </tr>

    </thead>
    <tbody>

      {currentData.map((individualExcelData, index) => (  
        <tr>
          <td>{individualExcelData.userId}</td>
          <td>{individualExcelData.username}</td>
          <td>{individualExcelData.emailId}</td>
          <td>{individualExcelData.mobileNumber}</td>
          <td>{individualExcelData.isAdminFlag}</td>
          <td >{enableEdit && (<button value={individualExcelData.userId} onClick={tdclick}>View/ Edit</button>) }
         {enableDelete && (<button value={individualExcelData.userId} onClick={tddelete} disabled={individualExcelData.username==='ADMIN'}>Delete</button> )}</td>
          
           {/* <td>{((individualExcelData.isAdminFlag==='Y'))?(<input type='checkbox' checked disabled/>):(<button value={individualExcelData.userId} onClick={tdclick}>View/ Edit</button>
          <button value={individualExcelData.userId} onClick={tddelete}>Delete</button> )} </td> */}

          {/* <td >{<button value={individualExcelData.userId} onClick={tdclick}>View/ Edit</button> }
          <button value={individualExcelData.userId} onClick={tddelete}>Delete</button> </td> */}

        </tr>
      ))}

    </tbody>
  </table>

  <br />
</div>

) : (



<div style={{

  border: "1px solid black",

  padding: "1em",

  margin: "1em",

  backgroundColor: "black",

  color: 'white',

  textAlign: 'center'



}}>No data found</div>



)}

           
            
       
       
    </div>
    
</div>



























   
)
};

export default UMViewUser;