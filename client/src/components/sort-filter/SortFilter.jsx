import React, { useState, useContext } from "react";
import "./SortFilter.css";
import { RiArrowDownWideLine } from "react-icons/ri";
import { UserContext } from "../../context/userContext";


function SortFilter() {
  // const { sortAlphabeticallyAZ, sortAlphabeticallyZA, sortByPriceLowToHigh, sortByPriceHighToLow } = useContext(UserContext);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const {handleFilter} = useContext(UserContext)


  

  function handleSort() {
    setIsSortOpen(!isSortOpen);
  }

  return (
    <div className="sort-filter">
      <div className="sortButton" onClick={handleSort}>
        <p>sort</p>
        <RiArrowDownWideLine className="sortIcon" />
      </div>
      {isSortOpen && (
        <div className="sort">
          <ul>
            <li onClick={/* sortAlphabeticallyAZ */handleFilter}>alphabetically, a-z</li>
            <li onClick={/* sortAlphabeticallyZA */handleFilter}>alphabetically, z-a</li>
            <li onClick={/* sortByPriceHighToLow */handleFilter}>price, high to low</li>
            <li onClick={/* sortByPriceLowToHigh */handleFilter}>price, low to high</li>
          </ul>
        </div>
      )}
      <div className="filter">
        <p>filter</p>
      </div>
    </div>
  );
}

export default SortFilter;
