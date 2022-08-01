import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { publicRequest } from "../config/requestAPI";
import { loginStart, loginSuccess, loginFailure } from "../redux/features/userSlice";
import { isFetching, error } from "../redux/features/userSlice";

const Container = styled.div`
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
`;

const Input = styled.input`
  min-width: 40%;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 2px;
`;

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isFethingSelector = useSelector(isFetching);
  const errorSelector = useSelector(error);

  const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
      const res = await publicRequest.post("auth/login", user);
      dispatch(loginSuccess(res.data));
      console.log(res.data.accessToken);
    } catch (error) {
      dispatch(loginFailure());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <>
      <Container className="w-screen h-screen bg-cover flex items-center justify-center">
        <div className="sm:w-2/5 w-auto p-5 bg-white">
          <form onSubmit={handleSubmit} className="flex items-center justify-center flex-col">
            <h1 className="text-2xl">LOGIN</h1>
            <Input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {isFethingSelector ? (
              <button
                disabled={isFethingSelector}
                type="submit"
                className="flex items-center justify-center sm:w-2/5 border-none rounded-sm py-2.5 px-5 bg-teal-600 text-white cursor-pointer disabled:cursor-not-allowed disabled:text-teal-600"
              >
                <div>
                  <div className="border-t-transparent w-5 h-5 border-4 border-white border-solid rounded-full animate-spin"></div>
                </div>
              </button>
            ) : (
              <button
                disabled={isFethingSelector}
                type="submit"
                className="sm:w-2/5 border-none rounded-sm py-2.5 px-5 bg-teal-600 text-white cursor-pointer disabled:cursor-not-allowed disabled:text-teal-600"
              >
                LOGIN
              </button>
            )}
            {errorSelector && (
              <p className="text-red-500 text-xs italic mb-3 mt-1">Something went wrong...</p>
            )}
          </form>

          <div className="flex flex-col items-center justify-center mt-6">
            {/* <NavLink className="my-1 mx-0 text-sm hover:underline cursor-pointer" to="login">
              FORGET YOUR PASSWORD?
            </NavLink> */}
            <NavLink className="my-1 mx-0 text-sm hover:underline cursor-pointer" to="/register">
              DO NOT HAVE ACCOUNT?
            </NavLink>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
