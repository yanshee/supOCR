import React from 'react';
import '../../style/FullLengthSearchbar.css';
import { FaSearch} from "react-icons/fa";

const FullLengthSearchbar = () => {
    return (
        <div className="search-bar">
            <input type="text" className="search-input" placeholder="Search..."/>
            <div className="search-icon">
                <i className="fas fa-search"><FaSearch/></i>
            </div>
        </div>
    );
};

export default FullLengthSearchbar;