import React, {useState , useEffect} from 'react'
import '../../style/UMCreateUser.css'
import HomeNav from '../Navbar/HomeNav'
import HomeButton from '../Buttons/HomeButton'
import axios from 'axios';
import { useNavigate } from "react-router-dom";



const UMRemoveUser=()=>{

    const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:2020/api/usermgmt/service/user/vieweUserMaster');
          const data = await response.json();
          setTableData(data.userMasterList);
          console.log(data.userMasterList);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          // Handle error appropriately, e.g., display an error message
        }
      };
  
      fetchData();
    }, []);

   
function removeuser(e)
{
   
    const id= e.target.value;
    alert(id);
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
          alert(" Data Successfully Deleted");
         }
         else
         {
          alert("Not deleted");
         }
         
         
        })
        .catch(function (error) {
          console.log('error', error);
        });
}
 
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
            <div class="UMViewUser-container">
                <div class='UMViewUser-Title'>
                    <p>Remove User</p>
                </div>
                <div class="UMViewUser-EditViewContianer">
                    <div class="ExistingUsers-container">
                    
                        <div class="ExistingUsersOptions">
                       
                       
{tableData ? (

<div className="table-New-wrapper">

  <table className="table">

    <thead>
      
      <th>User Name</th>
      <th>Action</th>
     
     

    </thead>

    <tbody>

      {tableData.map((index) => (

        <tr>
          <td>{index}</td>   
          <td><button key={index} value={index} id={index} onClick={removeuser}>Remove</button></td>   
        </tr>

      ))}

    </tbody>

  </table>

   <div >

  </div>

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
                  
                    
                </div>
                
            </div>
            
            
        </div>
        )
  }
  
  export default UMRemoveUser;