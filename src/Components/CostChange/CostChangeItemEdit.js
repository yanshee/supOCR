
import React, { useState, useEffect, Component } from 'react'
import '../../style/ItemListingItemEditPage.css'
import HomeNav from '../Navbar/HomeNav'
import { FaArrowLeft,FaBell,FaCross} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Select } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import HomeButton from '../Buttons/HomeButton';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
const cors = require('cors');

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 250,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    
  };

function CostChangeItemEdit({ idSelected }) {
    let navigate = useNavigate();
    const pathCompute = `/CostChangeConfirm`

    const [open, setOpen] = useState(false);
    const [data, setData] = useState([])
    const [isButtonVisible, setIsButtonVisible]=useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const itemdata = async () => {
            await axios
                .get("http://localhost:7070/api/listingpricing/service/pricing/getPricingDetails", {
                    params: {
                        itemId: idSelected
                    },
                })

                .then((res) => {
                    setData(res.data)
                    console.log("Data", res.data)
                }).catch((err) => {
                    console.log(err);
                })
        }
        itemdata()
    }, [])

    // function updatePrice(e) {
    //     e.preventDefault();
    //     axios({
    //         method: 'post',
    //         url: "http://localhost:7070/api/listingpricing/service/pricing/updateCost",
    //         data: data
    //     })
    //         .then(function (response) {
    //             console.log("response", response.data);
                
    //             if (response.data) {
    //                 window.location.href = '/CostChangeConfirm'
    //             } else {
    //                 alert('Unsuccessful');
    //             }
    //         })
    //         .catch(function (error) {
    //             console.log('error', error);
    //         });
    // }

    function updatePrice(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: "http://localhost:7070/api/listingpricing/service/pricing/updateCost",
            data: data
        })
            .then(function (response) {
                console.log("response", response.data);
                if(response.data){
                axios({
                    method: 'post',
                    url: "http://localhost:7070/api/listingpricing/service/pricing/updateStatus",
                    data: data
                }).then(function(secondresponse){
                    console.log("second response",secondresponse.data )
                }).catch(function (seconderror) {
                    console.log('error', seconderror.secondresponse.data);
                });
                
                     window.location.href = '/CostChangeConfirm'
                } else {
                    alert('Unsuccessful');
                }
            })
            .catch(function (error) {
                console.log('error', error);
            });
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

    const handleInputChange = (itemId, field, value) => {

        const isValidNumber = /^[+]?\d*\.?\d+$/.test(value);
        setData((prevProducts) =>
            prevProducts.map((product) =>
                product.itemId === itemId ? { ...product, [field]: isValidNumber && (value) !== product.price ? value : product[field] } : product
            )
        ); 
        // setData()     
    };

    console.log("Printdata", data)

    const handleIdCheckboxChange = (e) => {
        const newdata = data.map((item) =>{
            if(item.itemId === e.target.value){
                return item.removeItemFlag === 'N' ? {...item,removeItemFlag:'Y'}:{...item,removeItemFlag:'N'} 
            }
            setIsButtonVisible(true);
        })
        handleClose();
        setData(newdata);
    }

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
                <p>Cost Change</p>
                </div>
                <div class='PurchaseOrderMain-notification'>
         <a href='/AlertItemListing' className='CreateInvBtn1'>costing Alert &nbsp; {<FaBell/>}</a>
         </div>   
            </div>
            {/* <div className='ItemListing-title'>
                <a href='/CostChange' className='backBtn'> <i>{<FaArrowLeft/>}</i>  Back </a>
                <text>Cost Change</text>
                <text> </text>
            </div>
            <br /> */}
            {/* <div class='Invoices-heading'>
                <HomeButton/>
                {<FaArrowLeft className='PurchaseOrderMain-Ricons-Back'/>}
                     <a href='/CustomerReturnItemListing' class='PurchaseOrderMain-Back-a' style={{textDecoration:'none'}}>Back</a>
                <div className='InvoiceTitle'>
                    <p>Cost Change</p>
                </div>
                <div class='PurchaseOrderMain-notification'>
         <a href='/AlertCR' className='CreateInvBtn1'>Cost Change Alert &nbsp; {<FaBell/>}</a>
         </div>   
            </div> */}
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
                                        <label>Item Name : </label>
                                    </div>
                                    <div className='ItemListing-col-75'>
                                        <input className='ItemListingItemEditPage-input' value={item.itemName} disabled></input>
                                    </div>
                                </div>
                                <br />
                                <div className='ItemListing-Form-row'>
                                    <div className='ItemListing-col-25'>
                                        <label>Price : </label>
                                    </div>
                                    <div className='ItemListing-col-75'>
                                        <input className='ItemListingItemEditPage-input' value={item.price} disabled></input>
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
                                        <input className='ItemListingStatusSelect' value={item.status} disabled></input>
                                    </div>

                                </div>
                                <div className='ItemListing-Form-row'>
                                    <div className='ItemListing-col-25'>
                                        <label>New Submitted Price : </label>
                                    </div>
                                    <div className='ItemListing-col-75'>
                                        <input className='ItemListingStatusSelect' onChange={(e) => handleInputChange(item.itemId, 'newSubmittedPrice', e.target.value)} value={item.newSubmittedPrice}></input>
                                    </div>

                                </div>
                            </div>

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
                                    onClick={() => toggleInput(index)}>
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
                <button className='' onClick={updatePrice}>Save</button>

            </div>
        </div>
        </div>
    )
}

export default CostChangeItemEdit