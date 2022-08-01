import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { publicRequest } from "../config/requestAPI";
import Swal from "sweetalert2";

const FilterColor = styled.div`
  background-color: ${(props) => props.color};
`;

const ProductDetail = () => {
  const [product, setProduct] = useState();
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`products/find/${id}`);
        setProduct(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);

  const handleColor = (c) => {
    Swal.fire({
      text: "You choose color: " + c,
      timer: 1000,
      confirmButtonText: "OK",
    });
    setColor(c);
  };

  return (
    <>
      <div className="sm:p-12 p-2.5 flex md:flex-row flex-col ">
        <div className="flex-1 bg-[#f5fbfd]  rounded-xl">
          <img
            src={product?.imageUrl}
            alt="Product"
            className="max-h-[700px] min-w-[200px] w-full object-cover"
          />
        </div>

        <div className="flex-1 md:px-12 md:py-0 p-2.5">
          <div className="flex justify-between">
            <h1 className="font-bold lg:text-4xl text-2xl">{product?.title}</h1>
            <span className="font-bold lg:text-4xl text-2xl">$ {product?.price}</span>
          </div>
          <div className="mt-10">
            <p className="text-gray-900 text-justify">{product?.desc}</p>
          </div>
          <div className="sm:w-1/2 w-full my-8 mx-0">
            <div>
              <span className="block md:text-xl text-md font-semibold mb-2.5">Color </span>
              <div className="flex">
                {product?.color?.map((c) => {
                  return (
                    <FilterColor
                      key={c}
                      color={c}
                      onClick={() => handleColor(c)}
                      className="w-[30px] h-[30px] rounded-full my-0 mx-1 cursor-pointer border border-gray-300"
                    ></FilterColor>
                  );
                })}
              </div>
            </div>
            <div className="mt-7">
              <span className="block md:text-xl text-md font-semibold mb-2.5">Size </span>
              <select className="sm:p-2.5 px-2.5 py-1 border-2 border-gray-400">
                <option selected disabled>
                  Pick Size
                </option>
                {product?.size?.map((s) => {
                  return (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="flex justify-center">
            <button className="w-full p-[15px] border-2 bg-blue-700 text-white  cursor-pointer font-medium hover:bg-blue-800">
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
