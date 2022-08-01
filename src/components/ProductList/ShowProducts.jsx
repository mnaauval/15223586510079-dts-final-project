import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../../config/requestAPI";
import { FavoriteBorderOutlined, ShoppingCartOutlined, Visibility } from "@mui/icons-material";

const Icon = styled.div`
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

const ShowProducts = ({ cat, filter, sort }) => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [color] = useState("");
  const [size] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      if (cat === "all") {
        try {
          const res = await publicRequest.get(`products`);
          setProducts(res.data);
          //   console.log(res.data);
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const res = await publicRequest.get(`products?category=${cat}`);
          setProducts(res.data);
          //   console.log(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((item) =>
        Object.entries(filter).every(([key, value]) => item[key].includes(value))
      )
    );
  }, [products, cat, filter]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else {
      setFilteredProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);
  console.log(filteredProducts);

  const productShowItem = filteredProducts?.length;
  return (
    <>
      <p className="text-right text-gray-60 px-8">Showing {productShowItem} products</p>
      <h1 className="text-center text-4xl">{cat?.toUpperCase()}</h1>
      <div className="p-5 flex flex-wrap justify-between">
        {filteredProducts?.map((product) => (
          <div
            key={product._id}
            className="flex-1 m-1.5 min-w-[280px] h-[22rem] flex items-center justify-center bg-[#f5fbfd] relative"
          >
            <div className="w-52 h-52 rounded-full bg-white absolute"></div>
            <img src={product.imageUrl} alt="Product" className="h-3/4 z-[2]" />
            <div className="w-full h-full absolute top-0 left-0 bg-black/20 z-[3] flex items-center justify-center transition duration-500 ease cursor-pointer opacity-0 hover:opacity-100">
              {isLoggedIn ? (
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
        ))}
      </div>
    </>
  );
};

export default ShowProducts;
