import React, { useState, useEffect } from 'react'
import '../../style/UMCreateUser.css'
import HomeNav from '../Navbar/HomeNav'
import HomeButton from '../Buttons/HomeButton'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import $ from 'jquery';



const UMupdateuser = ({ idSelected }) => {
    let navigate = useNavigate();

    // const [username, setusername] = useState()
    // const [email, setemail] = useState()
    // const [mobile, setmobile] = useState()
    // const [Data,setData]=useState()
    const [selectedkeys, setSelectedkeys] = useState([])
    const [data, setData] = useState({


        "username": "",
        "emailId": "",
        "mobileNumber": "",
        "userMapping": Object,
        // "userMapping": "",
        "isAdminFlag": "",



        "password": "",
        "defaultPwdFlag": "",
        "template": "",
        "redirectFlag": ""

    });

    // useEffect(() => {

    //     const itemdata = async () => {

    //              await axios

    //     .get(`http://localhost:5050/api/orderManagement/service/purchaseOrders/getPODetails?poId=${id}`)

    //     .then((res) => {

    //         setcurrentData(res.data)

    //        console.log(currentData);

    //     }).catch((err) => {

    //        console.log(err);

    // })

    //     }

    //     itemdata()

    //  },[])

    //  console.log("Hi there",currentData)

    // function createuser(e)
    // {
    //     e.preventDefault();

    //     axios({
    //         method: 'post',
    //         url: 'http://localhost:2020/api/usermgmt/service/user/editUserDetails',
    //         data: Data,
    //       })
    //         .then(function (response) {
    //          console.log("response", response.data);
    //          if ( response.data =="SUCCESS") {
    //             alert('user created');
    //             document.getElementById("msg").innerHTML = "User Creation Failed";

    //           } else {
    //             alert('user not created');
    //             document.getElementById("error").innerHTML = "User Creation Failed";
    //           }
    //         })
    //         .catch(function (error) {
    //           console.log('error', error);
    //         });  
    // }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleIdCheckboxChange = (e) => {
        const {checked} =e.target;
        const newValue=checked?'Y':'N';
         setData((prevData) =>({
            ...prevData,
            isAdminFlag:newValue,
        }));
    }

    console.log("id", idSelected)

    useEffect(() => {
        const itemdata = async () => {
            await axios
                .get(`http://localhost:2020/api/usermgmt/service/user/getUserDetails?userId=${idSelected}`)
                .then((res) => {
                    setData(res.data)
                    console.log(".", JSON.stringify(res.data.userMapping))
                    console.log("Keys", Object.keys(res.data.userMapping))

                    // setusername(Data.username)

                    console.log("New data", res.data)
                }).catch((err) => {
                    console.log(err);
                })
        }
        itemdata()
    }, [])

    console.log("Username", data.username)

    function updateuser(e) {
        $("#overlay").fadeIn('slow');
        e.preventDefault();
        axios({
            method: 'post',
            url: `http://localhost:2020/api/usermgmt/service/user/editUserDetails`,
            data: data
        })
            .then(function (response) {
                $("#overlay").fadeOut('slow');
                console.log("response", response.data);
                if (response.data == "SUCCESS") {
                    // alert('user created');
                    navigate("/UMViewUser");
                    document.getElementById("msg").innerHTML = "User Creation Failed";

                } else {
                    // alert('user not created');
                    document.getElementById("error").innerHTML = "User Creation Failed";
                }

            })
            .catch(function (error) {
                console.log('error', error);
            });
    };

    console.log("check",data)



    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,

        }));
    };

    const CheckboxChange = (event) => {
        const { value, checked } = event.target;
        setSelectedkeys((prevKeys) =>
            checked ? [...prevKeys, value] : prevKeys.filter((key) => key != value)

        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };



    return (
        <div>
            <div>
                <HomeNav />
            </div>
            <div class='usermgmt-heading'>
                <HomeButton />
                <div class='usermgmt'>
                    <p>User Management</p>
                </div>
            </div>
            <div class="UMCreateUser-container">
                <div class='UMCreateUser-Title'>
                    <p>Update User</p>
                </div>
                <div class="UMCreateUser-BasicDetailsContianer">
                    <form class="BasicDetails-container">
                        <p class="BasicDetailsContianer-title">Basic Details</p>
                        <div class="BasicDetails-contents">
                            <p>Full Name</p>
                            <input class="BasicDetails-input" name="username" value={data.username} onChange={handleInputChange} placeholder='Enter Full Name'></input>
                        </div>
                        <div class="BasicDetails-contents">
                            <p>Email ID</p>
                            <input class="BasicDetails-input" name="emailId" value={data.emailId} onChange={handleInputChange} placeholder='Enter Email ID'></input>
                        </div>
                        <div class="BasicDetails-contents">
                            <p>Mobile Number</p>
                            <input class="BasicDetails-input" name="mobileNumber" value={data.mobileNumber} onChange={handleInputChange} placeholder='Enter Mobile Number'></input>
                        </div>
                        <div class="BasicDetails-contents">
                    <input type='checkbox' checked={data.isAdminFlag==='Y'} onChange={handleIdCheckboxChange}/>Want to create User as Admin
                    </div>
                    </form>

                    <div class="ModuleAccess-container">
                        <p class="ViewSitesContianer-title">Module Access</p>
                        <div class="ModuleOptions">
                            <ul>
                                <li>
                                    <input type="checkbox"></input>
                                    <label class="ModuleOptions-container" value={data.userMapping.modulesList} onChange={handleInputChange}>ASN</label>
                                </li>
                                <li>
                                    <input type="checkbox"></input>
                                    <label class="ModuleOptions-container" value={data.userMapping.modulesList} onChange={handleInputChange}>P.O</label>
                                </li>
                                <li>
                                    <input type="checkbox"></input>
                                    <label class="ModuleOptions-container" value={data.userMapping.modulesList} onChange={handleInputChange}>Invoices</label>
                                </li>
                                <li>
                                    <input type="checkbox"></input>
                                    <label class="ModuleOptions-container" value={data.userMapping.modulesList} onChange={handleInputChange}>Item Listing</label>
                                </li>
                                <li>
                                    <input type="checkbox"></input>
                                    <label class="ModuleOptions-container" value={data.userMapping.modulesList} onChange={handleInputChange}>Returns</label>
                                </li>
                                <li>
                                    <input type="checkbox"></input>
                                    <label class="ModuleOptions-container" value={data.userMapping.modulesList} onChange={handleInputChange}>Deal</label>
                                </li>
                                <li>
                                    <input type="checkbox"></input>
                                    <label class="ModuleOptions-container" value={data.userMapping.modulesList} onChange={handleInputChange}>Analytics</label>
                                </li>
                                <li>
                                    <input type="checkbox"></input>
                                    <label class="ModuleOptions-container" value={data.userMapping.modulesList} onChange={handleInputChange}>Customer Orders</label>
                                </li>
                                <li>
                                    <input type="checkbox"></input>
                                    <label class="ModuleOptions-container" value={data.userMapping.modulesList} onChange={handleInputChange}>Alerts</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="SiteAccess-container">
                        <p class="ViewSitesContianer-title">Site Access</p>
                        {Object.keys(data.userMapping ).map((key) => {
                            <div class="SiteAccessOptions" key={key}>

                                <ul>
                                    <li>
                                        <input type="checkbox" value={key}></input>
                                        <label class="SiteAccessOptions-container" checked={selectedkeys.includes(key)}>Mumbai</label>
                                    </li>
                                    <li>
                                        <input type="checkbox"></input>
                                        <label class="SiteAccessOptions-container">kolkata</label>
                                    </li>
                                    <li>
                                        <input type="checkbox"></input>
                                        <label class="SiteAccessOptions-container">Delhi</label>
                                    </li>
                                    <li>
                                        <input type="checkbox"></input>
                                        <label class="SiteAccessOptions-container">Bangalore</label>
                                    </li>
                                    <li>
                                        <input type="checkbox"></input>
                                        <label class="SiteAccessOptions-container">Kochi</label>
                                    </li>
                                    <li>
                                        <input type="checkbox"></input>
                                        <label class="SiteAccessOptions-container">Chennai</label>
                                    </li>
                                    <li>
                                        <input type="checkbox"></input>
                                        <label class="SiteAccessOptions-container">Hyderabad</label>
                                    </li>
                                    <li>
                                        <input type="checkbox"></input>
                                        <label class="SiteAccessOptions-container">Pune</label>
                                    </li>
                                    <li>
                                        <input type="checkbox"></input>
                                        <label class="SiteAccessOptions-container">Nashik</label>
                                    </li>
                                </ul>
                            </div>
                        })}
                        <div class="SiteAccessOptions" >

                            <ul>
                                <li>
                                    <input type="checkbox"  ></input>
                                    <label class="SiteAccessOptions-container"  >Mumbai</label>
                                </li>
                                <li>
                                    <input type="checkbox"></input>
                                    <label class="SiteAccessOptions-container">kolkata</label>
                                </li>
                                <li>
                                    <input type="checkbox"></input>
                                    <label class="SiteAccessOptions-container">Delhi</label>
                                </li>
                                <li>
                                    <input type="checkbox"></input>
                                    <label class="SiteAccessOptions-container">Bangalore</label>
                                </li>
                                <li>
                                    <input type="checkbox"></input>
                                    <label class="SiteAccessOptions-container">Kochi</label>
                                </li>
                                <li>
                                    <input type="checkbox"></input>
                                    <label class="SiteAccessOptions-container">Chennai</label>
                                </li>
                                <li>
                                    <input type="checkbox"></input>
                                    <label class="SiteAccessOptions-container">Hyderabad</label>
                                </li>
                                <li>
                                    <input type="checkbox"></input>
                                    <label class="SiteAccessOptions-container">Pune</label>
                                </li>
                                <li>
                                    <input type="checkbox"></input>
                                    <label class="SiteAccessOptions-container">Nashik</label>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
                <div class="ViewExistingSites-Buttons">
                    <button onClick={updateuser}>Update User</button>
                </div>
            </div>

        </div>
    )
};

export default UMupdateuser;