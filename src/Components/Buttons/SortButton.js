import React, { useState } from 'react';
import '../../style/SortButton.css';
import { useNavigate } from 'react-router-dom'
import { FaSort } from 'react-icons/fa'

const SortButton = ({ options, onSort }) => {
    // let navigate = useNavigate();

    const [showDropdown, setShowDropdown] = useState(false);
    // const [sortedData,setSortedData]=useState(data);


    const handleSortclick = () => {
        setShowDropdown(!showDropdown);
        console.log("Clicked")
    }

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        if (selectedValue) {
            onSort(selectedValue)
        }
        setShowDropdown(false)
    };
    if (!options || options.length === 0) {
        return null;
    }
    console.log("options",options )
    // const availableOptions=options.map(item => item.label);

    return (
        <div>
             <select className="sort-button" value={options.value} onChange={handleSelectChange}>
            <option value=""> Sort By<i className="fas fa-sort" ><FaSort /></i>
</option>
            {options.map(partner =>(
              <option key={partner.value} value={partner.value}>{partner.value}</option>
            ))}
            </select> 

        </div>
    );
};

export default SortButton;