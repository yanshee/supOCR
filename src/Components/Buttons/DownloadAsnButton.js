import React from 'react'
import '../../style/DownloadAsnButton.css'
import { FaFileDownload } from "react-icons/fa";

function DownloadAsnButton()
{
    return (
        <button class="Download_button">
            {<FaFileDownload class="Download_button i"/>} <div>Download Template</div>
        </button>
    )
}

export default DownloadAsnButton