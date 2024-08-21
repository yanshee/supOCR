import React from 'react'
import '../../style/HomeButton.css'
import { FaHome } from "react-icons/fa";
import { useNavigate} from "react-router-dom";

function HomeButton() {

  let navigate = useNavigate();

  const proceedButton = () => {
    
    const pathCompute='/Dashboard'
    navigate(pathCompute);    
 }
  
  return (
    <button class="HomeButton" onClick={proceedButton}>
        <FaHome class="HomeButton-icon"/>
    </button>
  )
}

export default HomeButton