import React, { useContext, useState } from "react";
import "./SortFilter.css";
import { RiArrowDownWideLine } from "react-icons/ri";
import { UserContext } from "../../context/userContext";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "react-i18next";

function SortFilter() {
  const {
    sortAlphabeticallyAZ,
    sortAlphabeticallyZA,
    sortByPriceLowToHigh,
    sortByPriceHighToLow,
    resetSorting,
    setIsMenuOpen,
    handleFilter,
    filter,
    setList,
  } = useContext(UserContext);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const { t } = useTranslation();

  function handleSortChange(sortOption) {
    switch (sortOption) {
      case "az":
        sortAlphabeticallyAZ();
        break;
      case "za":
        sortAlphabeticallyZA();
        break;
      case "priceLowToHigh":
        sortByPriceLowToHigh();
        break;
      case "priceHighToLow":
        sortByPriceHighToLow();
        break;
      default:
        resetSorting();
    }
    setIsSortOpen(false);
  }

  const handlePriceChange = (e) => {
    const { value, name } = e.target;
    if (name === "minPrice") {
      setPriceRange([Math.max(0, value), priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], Math.min(1000, value)]);
    }
  };

  const handleRangeChange = (e) => {
    const value = e.target.value.split(",").map(Number);
    setPriceRange(value);
  };
  // console.log(isFilterOpen);

  return (
    <div className="sort-filter">
      <div className="sortButton" onClick={() => setIsSortOpen(!isSortOpen)}>
        <p>{t("sort.header")}</p>
        <RiArrowDownWideLine className="sortIcon" />
      </div>
      {isSortOpen && (
        // <div className="sort">
        //   <ul>
        //     <li onClick={() => handleSortChange('az')}>alphabetically, a-z</li>
        //     <li onClick={() => handleSortChange('za')}>alphabetically, z-a</li>
        //     <li onClick={() => handleSortChange('priceHighToLow')}>price, high to low</li>
        //     <li onClick={() => handleSortChange('priceLowToHigh')}>price, low to high</li>
        //   </ul>
        // </div>
        <div className="category">
          <select value={filter} onChange={handleFilter}>
            <option value="" disabled>
            {t("sort.category1")}
            </option>
            <option value="asc">{t("sort.category2")}</option>
            <option value="dis">{t("sort.category3")}</option>
            <option value="dis">{t("sort.category4")}</option>
            <option value="asc">{t("sort.category5")}</option>
          </select>
        </div>
      )}
      <div
        className="filter"
        onClick={() => {
          setIsFilterOpen(true);
          setIsMenuOpen(false);
        }}
      >
        <p>{t("filter.header")}</p>
      </div>
      {isFilterOpen && (
        <div className="filter-panel">
          <div className="filter-header">
            <IoClose
              className="close-icon"
              onClick={() => setIsFilterOpen(false)}
            />
          </div>
          {/* <div className="filter-body">
            <h2>Filter Options</h2>
            <div className="filter-options">
              <a href="#">Flower Types</a>
              <a href="#">Office</a>
              <a href="#">Home</a>
              <a href="#">Wedding</a>
              <a href="#">Birthday</a>
              <a href="#">Valentine's Day</a>
              <a href="#">Wedding Anniversary</a>
              <div className="price-range">
                <label>Price Range:</label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={priceRange.join(',')}
                  onChange={handleRangeChange}
                />
                <div className="price-inputs">
                  <input
                    type="number"
                    name="minPrice"
                    value={priceRange[0] || 0}
                    onChange={handlePriceChange}
                    placeholder="0"
                    min="0"
                    max="1000"
                  />
                  <input
                    type="number"
                    name="maxPrice"
                    value={priceRange[1] || 1000}
                    onChange={handlePriceChange}
                    placeholder="1000"
                    min="0"
                    max="1000"
                  />
                </div>
              </div>
            </div>
          </div> */}

          <div className="filter-body">
            <select
              name="category"
              value={filter.category || ""}
              onChange={handleFilter}
            >
              <option value="" disabled>
                {t("filter.category1")}
              </option>
              <option value="Decor" onChange={handleFilter}>
              {t("filter.category2")}
              </option>
              <option value="Eustoma" onChange={handleFilter}>
              {t("filter.category3")}
              </option>
              <option value="Flowers on Ocassion" onChange={handleFilter}>
              {t("filter.category4")}
              </option>
              <option value="Gifts" onChange={handleFilter}>
              {t("filter.category5")}
              </option>
              <option value="House Plants" onChange={handleFilter}>
              {t("filter.category6")}
              </option>
              <option value="Peonies" onChange={handleFilter}>
              {t("filter.category7")}
              </option>
              <option value="Roses" onChange={handleFilter}>
              {t("filter.category8")}
              </option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default SortFilter;
