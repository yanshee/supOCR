import React from 'react';
import '../../style/Sidebar.css';


const Tooltip = ({ message, children }) => {
 return (
<div className="tooltip-container">
     {children}
<span className="tooltip-text">{message}</span>
</div>
 );
};
export default Tooltip;