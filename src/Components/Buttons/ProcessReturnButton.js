import React from 'react';
import '../../style/CustomerReturns.css';
import { FaFileExport } from 'react-icons/fa'

const ProcessReturnButton = () => {
    return (
        <button className="processreturn-button">
           Process Return <i><FaFileExport/></i>
        </button>
    );
};

export default ProcessReturnButton;