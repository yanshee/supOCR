import React from 'react'
import '../../style/DownloadTemplateButton.css'
import { FaFileDownload } from "react-icons/fa";

function DownloadTemplate()
{
    return (
        <button class="DownloadTemplateButton">
            {<FaFileDownload class="DownloadTemplateButton-icon"/>} <div>Download Template</div>
        </button>
    )
}

export default DownloadTemplate