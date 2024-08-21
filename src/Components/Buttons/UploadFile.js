import React from 'react'
import '../../style/UploadFile.css'
import { FaFileUpload } from "react-icons/fa";

function UploadButton() {
  return (
    <button class="UploadButton">
        {<FaFileUpload class="UploadButton-icon"/>} <div>Upload File</div>
    </button>
  )
}

export default UploadButton