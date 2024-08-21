
import React, { useState } from 'react';
// import {
//     FaTh,
//     FaBars,
//     FaOctagonCheck,
//     FaUserAlt,
//     FaRegChartBar,
//     FaCommentAlt,
//     FaShoppingBag,
//     FaThList,

// }from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import '../../style/Sidebar.css'
import { TbArrowsRightLeft } from "react-icons/tb";
import { FaArrowDownAZ, FaUserGear } from "react-icons/fa6";
import { FaRegUserCircle,FaArrowAltCircleDown,FaPlus } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import '../../style/Sidebar.css';
import Tooltip from './Tooltip';
import { useNavigate } from "react-router-dom";
// import { Tooltip } from 'react-tooltip'


const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);

    const toggle = () => setIsOpen(!isOpen);
    let navigate = useNavigate()
    const menuItem = [
        {
            path: "/AdminApprovals",
            name: "Approval",
            icon: <IoMdCheckmarkCircleOutline />
        },
        {
            path: "/AdminMain",
            name: "Temporary Login",
            icon: <FaRegUserCircle />
        },
        {
            // path:"/AdminUM",
            name: "User Management",
            icon: <FaUserGear />,
            subMenu: [{
                path: "/AdminUMRoleMapping",
                name: "Role Mapping "
            },
            {
                path: "/AdminUMCreateNewUser",
                name: "Create New User"
            },
            {
                path: "/AdminUMResetPassword",
                name: "Reset Password"
            }
            ]
        }
    ]

    const handleMenuClick = (path, hasSubMenu) => {
        if (hasSubMenu) {
            setActiveMenu(path === activeMenu ? null : path);
        } else {
            navigate(path)
        }
    }
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: isOpen ? "265px" : "60px", backgroundColor: 'white', position: 'absolute', flexGrow: '1' }} className="sidebar">
                <div className="top_section">
                    <div style={{ marginLeft: isOpen ? "88px" : "5px" }} className="bars">
                        {/* <div style={{display: isOpen ? "block" : "none"}} className="link_text">Menu Bar</div> */}
                        <TbArrowsRightLeft onClick={toggle} />
                    </div>
                </div>
                {menuItem.map((item, index) => (
                    <div key={index}>
                        <div className="link" onClick={() => handleMenuClick(item.name, item.subMenu)}>
                            <Tooltip message={item.name}>
                                <div className="icon">{item.icon}</div>
                            </Tooltip>
                            <div className="link_text" style={{display: isOpen ? 'block' : 'none'}}>{item.name}</div>
                            {item.subMenu && (
                                <div className="dropdown-icon" style={{display: isOpen ? 'block' : 'none'}}>
                                    {activeMenu === item.name ? <FaArrowAltCircleDown /> : <FaArrowAltCircleDown />}
                                </div>
                            )}
                        </div>
                        {item.subMenu && activeMenu === item.name && isOpen && (
                            <div className="subMenu">
                                {item.subMenu.map((subItem, subIndex) => (
                                    <div key={subIndex} className="link subLink" onClick={() => navigate(subItem.path)}>
                                        <Tooltip message={subItem.name}>
                                            <div className="subLink_text"><FaPlus style={{marginRight:'5px',width:'11px',height:'11px'}}/>{subItem.name}</div>
                                        </Tooltip>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;
