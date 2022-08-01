import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ScrollToTop from "../components/ScrollToTop";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import ProductList from "../pages/ProductList";
import ProductDetail from "../pages/ProductDetail";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import ProtectedComponent from "../components/ProtectedComponent";
import { useSelector } from "react-redux";
import { currentUser } from "../redux/features/userSlice";

const Routers = () => {
  const user = useSelector(currentUser);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route
          path="/product/:id"
          element={
            <ProtectedComponent>
              <ProductDetail />
            </ProtectedComponent>
          }
        />
        <Route
          path="/products/:category"
          element={
            <ProtectedComponent>
              <ProductList />
            </ProtectedComponent>
          }
        />
      </Routes>
      <Newsletter />
      <Footer />
    </BrowserRouter>
  );
};

export default Routers;
