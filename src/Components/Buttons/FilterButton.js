import React, { useState } from 'react';
import '../../style/FilterButton.css';
import { useNavigate } from 'react-router-dom'
import { FaSort,FaFilter } from 'react-icons/fa'

const FilterButton = ({ options, onSort }) => {
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
             <select className="filter-button" value={options.value} onChange={handleSelectChange}>
            <option value="">Filter By<i className="fas fa-filter"><FaFilter style={{color:'white'}}/></i>

</option>
            {options.map(partner =>(
              <option key={partner.value} value={partner.value}>{partner.value}</option>
            ))}
            </select> 

        </div>
    );
};

export default FilterButton;