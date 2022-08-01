import React from "react";
import { NavLink } from "react-router-dom";
import { categories } from "../assets/dataAssets";

const Categories = () => {
  return (
    <div className="flex sm:flex-row flex-col sm:p-5 p-0 justify-between">
      {categories.map((category) => (
        <NavLink
          to={`/products/${category.cat}`}
          key={category.id}
          className="flex-1 m-[3px] h-[70vh] relative"
        >
          <img
            src={category.img}
            alt={category.title}
            className="w-full sm:h-full h-[20vh] object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
            <h1 className="text-white mb-5">{category.title}</h1>
            <button className="border-none p-2 5 bg-white text-gray-500 cursor-pointer font-semibold">
              SHOP NOW
            </button>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default Categories;
