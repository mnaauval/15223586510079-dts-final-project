import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { publicRequest } from "../../config/requestAPI";
import { useNavigate } from "react-router-dom";
import { FavoriteBorderOutlined, ShoppingCartOutlined, Visibility } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { isLoggedIn } from "../../redux/features/userSlice";

const Icon = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const NewestProducts = () => {
  const [newestProducts, setNewestProducts] = useState([]);
  const isLoggedInSelector = useSelector(isLoggedIn);

  const navigate = useNavigate();

  useEffect(() => {
    const getNewestProducts = async () => {
      try {
        const res = await publicRequest.get(`products`);
        setNewestProducts(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (err) {
        console.log(err);
      }
    };
    getNewestProducts();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center mt-10">
        <h3 className="md:text-4xl text-2xl font-bold">New Arrival</h3>
      </div>
      <div className="p-5 flex flex-wrap justify-between">
        {newestProducts?.map((product) => (
          <div
            key={product._id}
            className="flex-1 m-1.5 min-w-[280px] h-[22rem] flex items-center justify-center bg-[#f5fbfd] relative"
          >
            <div
              key={product._id}
              className="flex-1 m-1.5 min-w-[280px] h-[22rem] flex items-center justify-center bg-[#f5fbfd] relative"
            >
              <div className="w-52 h-52 rounded-full bg-white absolute"></div>
              <img src={product.imageUrl} alt="Product" className="h-3/4 z-[2]" />
              <div className="w-full h-full absolute top-0 left-0 bg-black/20 z-[3] flex items-center justify-center transition duration-500 ease cursor-pointer opacity-0 hover:opacity-100">
                {isLoggedInSelector ? (
                  <>
                    <Icon>
                      <ShoppingCartOutlined />
                    </Icon>
                    <Icon onClick={() => navigate(`/product/${product._id}`)}>
                      <Visibility />
                    </Icon>
                    <Icon>
                      <FavoriteBorderOutlined />
                    </Icon>
                  </>
                ) : (
                  <>
                    <Icon onClick={() => navigate("/")}>
                      <ShoppingCartOutlined />
                    </Icon>
                    <Icon onClick={() => navigate(`/login`)}>
                      <Visibility />
                    </Icon>
                    <Icon onClick={() => navigate("/")}>
                      <FavoriteBorderOutlined />
                    </Icon>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NewestProducts;
