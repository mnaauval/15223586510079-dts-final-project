import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import ShowProducts from "../components/ProductList/ShowProducts";

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];

  const [filter, setFilter] = useState([]);
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  const clearHandler = () => {
    setFilter("");
    setSort("newest");
  };

  return (
    <>
      <div className="sm:p-5 p-2.5 ">
        <div className="flex justify-between">
          <div className="m-5 flex sm:flex-row flex-col sm:items-center">
            <span className="md:text-xl text-md font-semibold sm:mr-5 mr-0">Filter Products:</span>
            <select
              name="color"
              onChange={handleFilters}
              className="p-2.5 sm:mr-5 mr-0 sm:ml-2.5 ml-0 border-2 border-gray-400 rounded-md"
            >
              <option disabled>Color</option>
              <option value="White">White</option>
              <option value="Black">Black</option>
              <option value="Red">Red</option>
              <option value="Blue">Blue</option>
              <option value="Yellow">Yellow</option>
              <option value="Green">Green</option>
            </select>
            <select
              name="size"
              onChange={handleFilters}
              className="p-2.5 sm:mr-5 mr-0 sm:ml-2.5 ml-0 border-2 border-gray-400 rounded-md"
            >
              <option disabled>Size</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
            <button onClick={() => clearHandler()} className="">
              <ClearIcon />
            </button>
          </div>
          <div className="m-5 flex sm:flex-row flex-col sm:items-center">
            <span className="md:text-xl text-md font-semibold sm:mr-5 mr-0">Sort Products:</span>
            <select
              defaultValue="newest"
              onChange={handleSort}
              className="p-2.5 sm:mr-5 mr-0 sm:ml-2.5 ml-0 border-2 border-gray-400 rounded-md"
            >
              <option value="newest">Newest</option>
              <option value="asc">Price (asc)</option>
              <option value="desc">Price (desc)</option>
            </select>
          </div>
        </div>
        <ShowProducts cat={cat} filter={filter} sort={sort} />
      </div>
    </>
  );
};

export default ProductList;
