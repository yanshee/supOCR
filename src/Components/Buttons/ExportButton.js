import React from 'react';
import '../../style/ExportButton.css';
import { FaFileExport } from 'react-icons/fa'

const ExportButton = () => {
    return (
        <button className="export-button">
            Export <i><FaFileExport/></i>
        </button>
    );
};

export default ExportButton;