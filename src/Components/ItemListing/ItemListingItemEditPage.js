import React, { useState, useEffect, Component } from 'react'
import '../../style/ItemListingItemEditPage.css'
import '../../style/UploadFile.css'
import HomeNav from '../Navbar/HomeNav'
import { FaArrowLeft,FaHome,FaBell,FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Select } from '@mui/material';
import HomeButton from '../Buttons/HomeButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
const cors = require('cors');

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function ItemListingItemEditPage({ idSelected }) {
    const navigate = useNavigate();
    const pathCompute = '/ItemListingMain'
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([])
    const [status, setstatus] = useState()
    const [imageUrl, setImageUrl] = useState()
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    

    useEffect(() => {
        const itemdata = async () => {
            await axios
                .get(`http://localhost:7070/api/listingpricing/service/listing/getItemDetails`, {
                    params: {
                        itemId: idSelected
                    },
                })
                .then((res) => {
                    setData(res.data)
                    console.log("New data", res.data)
                }).catch((err) => {
                    console.log(err);
                })
        }
        itemdata()
    }, [])

    function updateStatus(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: `http://localhost:7070/api/listingpricing/service/listing/updateItemDetails`,
            data: data
        })
            .then(function (response) {
                console.log("response", response.data);
                if (response.data) {
                    window.location.href = '/ItemListingConfirm'
                } else {
                    alert('Unsuccessful');
                }
            })
            .catch(function (error) {
                console.log('error', error);
            });
    }
    console.log("check", data)

    const OnChange = (e, status) => {
        const id = e.target.value
        // alert("id", id)
    }

    const handleImageChange = (itemId, field, value) => {

        setData((prevProducts) =>
            prevProducts.map((product) =>
                product.itemId === itemId ? { ...product, [field]: value } : product
            )
        );
    };

    const [isVisible, setIsVisible] = useState(false);
    const [visibleIndex, setVisibleIndex] = useState(null);
    const toggleInput = (index) => {
        setVisibleIndex(index === visibleIndex ? null : index);
    };

    const toggleInputNew = () => {
        setIsVisible(!isVisible);
    }

    const handleIdCheckboxChange = (e) => {
        const newdata = data.map((item) =>{
            if(item.itemId === e.target.value){
                return item.removeItemFlag === 'N' ? {...item,removeItemFlag:'Y'}:{...item,removeItemFlag:'N'} 
            }
        })
        handleClose();
        setData(newdata);
        // setData((prevSelectedId) => {
        //     if (prevSelectedId.includes(e.target.value)) {
        //       return prevSelectedId.filter((selectedIds) => selectedIds !== e.target.value);
        //     } else {
        //       return [...prevSelectedId, e.target.value];
        //     }
        //   }); 
          
    }
    console.log("idselected", idSelected)
    return (
        <div>
            <HomeNav />
            <div class="main-container">
            <div class='Invoices-heading'>
                {/* <HomeButton/> */}
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
                <p>Item Listing</p>
                </div>
                <div class='PurchaseOrderMain-notification'>
         <a href='/AlertItemListing' className='CreateInvBtn1'>Listing Alert &nbsp; {<FaBell/>}</a>
         </div>   
            </div>
            {/* <div class='Invoices-heading'>
                <HomeButton/>
                {<FaArrowLeft className='PurchaseOrderMain-Ricons-Back'/>}
                     <a href='/CustomerReturnItemListing' class='PurchaseOrderMain-Back-a' style={{textDecoration:'none'}}>Back</a>
                <div className='InvoiceTitle'>
                    <p>Item Listing</p>
                </div>
                <div class='PurchaseOrderMain-notification'>
         <a href='/AlertItemListing' className='CreateInvBtn1'>ItemListing Alert &nbsp; {<FaBell/>}</a>
         </div>   
            </div> */}
           {/* <div class='PurchaseOrderMain-description'>
            <div class='PurchaseOrderMain-description-content'>
                 <div class='PurchaseOrderMain-component-Home'>
                     {<FaHome className='PurchaseOrderMain-Ricons-Home'/>}
                 </div> 
                 <div class='Back-button'>
                     {<FaArrowLeft className='PurchaseOrderMain-Ricons-Back'/>}
                     <a href='/ItemListingMain' class='PurchaseOrderMain-Back-a' style={{textDecoration:'none'}}>Back</a>
                   
                 </div>
                     
                
                 <div class='PurchaseOrderMain-component-heading'>
                     <p>Item Listing</p>
                 </div>
    
                <div class='PurchaseOrderMain-notification'>
                    <div class='PurchaseOrderMain-notification-alerts'>
                         <a class='PurchaseOrderMain-notification-a'>Item Listing Alerts</a>
                         {<FaBell className='PurchaseOrderMain-Ricons'/>}
                    </div>
                 </div>       
            </div> */}
            {/* <div class='PurchaseOrderMain-searchbar'>
            <div class='PurchaseOrderMain-searchbar-container'>
                    <input placeholder="Search here"/>
                    {<FaSearch className='PurchaseOrderMain-Ricons-search'/>}
            </div>
        </div> */}
        {/* </div> */}
            
            <br />
            {data.map((item, index) => {
                return (
                    <div className='ItemListingItemEditPage-Container'>
                        <form className='ItemListingItemEditPage-Form'>
                        
                            <div className='ItemListing-Form-LeftPane'>
                                <div className='ItemListing-Form-row'>

                                    <div className='ItemListing-col-25'>
                                        <label>Item Number :</label>
                                    </div>
                                    <div className='ItemListing-col-75'>
                                        <input className='ItemListingItemEditPage-input' value={item.itemId} disabled></input>
                                    </div>

                                </div>

                                <br />
                                <div className='ItemListing-Form-row'>
                                    <div className='ItemListing-col-25'>
                                        <label>Item Description : </label>
                                    </div>
                                    <div className='ItemListing-col-75'>
                                        <input className='ItemListingItemEditPage-input' value={item.itemDescription} disabled></input>
                                    </div>
                                </div>
                                <br />
                                <div className='ItemListing-Form-row'>
                                    <div className='ItemListing-col-25'>
                                        <label>SKU ID : </label>
                                    </div>
                                    <div className='ItemListing-col-75'>
                                        <input className='ItemListingItemEditPage-input' value={item.sku} disabled></input>
                                    </div>
                                </div>
                                <br />
                                <div className='ItemListing-Form-row'>
                                    <div className='ItemListing-col-25'>
                                        <label>Category : </label>
                                    </div>
                                    <div className='ItemListing-col-75'>
                                        <input className='ItemListingItemEditPage-input' value={item.category} disabled></input>
                                    </div>
                                </div>
                                <br />
                                <div className='ItemListing-Form-row'>
                                    <div className='ItemListing-col-25'>
                                        <label>Status : </label>
                                    </div>
                                    <div className='ItemListing-col-75'>
                                        <select className='ItemListingStatusSelect' value={item.status}
                                            onChange={(e) => {
                                                const updatedData = data.map(items => {
                                                    if (items.itemId === item.itemId) {
                                                        return { ...items, status: e.target.value };
                                                    }
                                                    return items;
                                                });
                                                // Update the state with the modified data
                                                setData(updatedData);
                                            }} >
                                            <option className='ItemListingStatusOption' value="Active">Active</option>
                                            <option className='ItemListingStatusOption' value="Inactive">Inactive</option>
                                        </select>
                                    </div>

                                </div>
                            </div>

                            {/* <div className='ItemListing-Form-RightPane'>
                        <img className='ItemListingItemEditPage-Image' src={item.imageUrl}/><br/><br/>
                        <button type="button" className='ItemListingItemEditPage-ChangeBtn'  onClick={toggleInput}>Change Image</button>
                        {isVisible && <input type="text" placeholder="Enter image link here" className="custom-input" onChange={(e) => handleImageChange(item.itemId, 'imageUrl', e.target.value)}/>}
                    </div> */}
                            <div className='ItemListing-Form-RightPane' key={index}>
                            <div className='ItemListingltemEditPage-cross'>
                            {<MdDelete size={40}  onClick={handleOpen}/>}
                            <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete the item?
          </Typography>
          <div class='confirm-button-div'>
          <Button class='Confirmation-button' value={item.itemId} onClick={handleIdCheckboxChange}>Yes</Button>
          <Button class='Confirmation-button' onClick={handleClose}>No</Button>
          </div>
          
        </Box>
      </Modal>
                            </div>
                                <img className='ItemListingltemEditPage-Image' src={item.imageUrl} /><br /><br />
                                <button
                                    type="button"
                                    className='ItemListingltemEditPage-ChangeBtn'
                                    onClick={() => toggleInput(index)}
                                >
                                    Change Image
                                </button>
                               
                                {visibleIndex === index && (
                                    <input
                                        type="text"
                                        placeholder="Enter image link here"
                                        className="custom-input"
                                        onChange={(e) => handleImageChange(item.itemId, 'imageUrl', e.target.value)}
                                    />
                                )}

                              
                            </div>
                        </form>
                    </div>
                )
            })}
            <br />

            <div className='ItemListingItemEditPage-btn'>
                <button className='' onClick={updateStatus}>Save</button>

            </div>
        </div>
        </div>
    )
}


export default ItemListingItemEditPage