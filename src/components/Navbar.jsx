import React from "react";
import Announcement from "./Announcement";
import logo from "../assets/logo.jpg";
import { publicRequest } from "../config/requestAPI";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isLoggedIn, currentUser } from "../redux/features/userSlice";
import { logout } from "../redux/features/userSlice";
import { Badge } from "@mui/material/";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import CategoryIcon from "@mui/icons-material/Category";

const navigationNoCredentials = [
  { name: "Register", path: "/register" },
  { name: "Sign-in", path: "/login" },
];
const navigationCredentials = [{ name: "Orders", path: "/order" }];

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const user = useSelector(currentUser);
  const isLoggedInSelector = useSelector(isLoggedIn);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(`products`);
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  const arrCategories = [...new Set(products.map((item) => item.categories))];
  let setCategories = [];
  for (let i = 0; i < arrCategories.length; i++) {
    for (let j = 0; j < arrCategories[i].length; j++) {
      setCategories.push(arrCategories[i][j]);
      // console.log(arrCategories[i][j]);
    }
    // console.log("array ke " + i);
  }
  const allCategories = ["all", ...new Set(setCategories)];

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <Announcement />
      <div className="h-full border border-x border-sm block">
        <Disclosure as="nav">
          {({ open }) => (
            <>
              <div className="w-full mx-auto lg:px-8 sm:px-6 px-4 py-4">
                <div className="flex items-center justify-between">
                  {/* Brand */}
                  <div className="flex flex-1 mx-5">
                    <NavLink to="/">
                      <h1 className="sm:block hidden text-4xl underline">LooFi</h1>
                      <div className="sm:hidden block w-12">
                        <img src={logo} alt="" />
                      </div>
                    </NavLink>
                  </div>

                  {isLoggedInSelector && (
                    <>
                      <Menu
                        as="div"
                        className="sm:flex hidden flex-1 mx-10 inline-block relative z-10"
                      >
                        <Menu.Button className="flex rounded-full focus:outline-none">
                          <p className="hover:text-blue-700 text-lg">Categories</p>
                        </Menu.Button>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute top-5 -left-1.5 w-40 mt-3.5 py-3.5 origin-top-right bg-white divide-y divide-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {allCategories?.map((category) => (
                              <Menu.Item key={category}>
                                {({ active }) => (
                                  <NavLink
                                    to={`/products/${category}`}
                                    className={`${
                                      active ? "bg-transparent text-blue-700" : "text-gray-900"
                                    } inline-block text-center w-full py-2 text-md`}
                                  >
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                  </NavLink>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                      <Menu as="div" className="sm:hidden flex flex-1 inline-block relative z-10">
                        <Menu.Button className="flex rounded-full focus:outline-none ">
                          <CategoryIcon className="text-gray-500" />
                        </Menu.Button>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute top-5 -left-1.5 w-40 mt-3.5 py-3.5 origin-top-right bg-white divide-y divide-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {allCategories?.map((category) => (
                              <Menu.Item key={category}>
                                {({ active }) => (
                                  <NavLink
                                    to={`/products/${category}`}
                                    className={`${
                                      active ? "bg-transparent text-blue-700" : "text-gray-900"
                                    } inline-block text-center w-full py-2 text-md`}
                                  >
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                  </NavLink>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </>
                  )}

                  <div className="flex items-center justify-end">
                    {!isLoggedInSelector ? (
                      <div className="sm:block hidden">
                        <div className="flex items-center space-x-10">
                          {navigationNoCredentials.map((nav) => (
                            <NavLink key={nav.name} to={nav.path}>
                              {nav.name}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Cart Icon */}
                        <NavLink to="/cart" className="flex items-center pl-10 pr-5 mt-1.5">
                          <Badge badgeContent={1} color="primary">
                            <ShoppingCartIcon className="text-gray-500" />
                          </Badge>
                        </NavLink>

                        {/* Profile Icon*/}
                        <Menu as="div" className="sm:block hidden mx-3.5 relative z-10">
                          <Menu.Button className="bg-gray-800 flex rounded-full focus:outline-none ">
                            <div className="w-8 h-8">
                              <img
                                className="w-full rounded-full"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt="profile"
                              />
                            </div>
                          </Menu.Button>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute -right-1.5 w-56 mt-3.5 py-3.5 origin-top-right bg-white divide-y divide-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <NavLink
                                to="/"
                                className="block text-lg font-semibold text-center mb-3.5 hover:text-blue-700"
                              >
                                {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
                                {/* {`Alex`.charAt(0).toUpperCase() + `Alex`.slice(1)} */}
                              </NavLink>
                              <Menu.Item>
                                {({ active }) => (
                                  <NavLink
                                    to="/order"
                                    className={`${
                                      active ? "bg-transparent text-blue-700" : "text-gray-900"
                                    } flex pl-10 items-center w-full py-2`}
                                  >
                                    <ReceiptOutlinedIcon className="mr-3.5" />
                                    Transaction
                                  </NavLink>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={logoutHandler}
                                    className={`${
                                      active ? "bg-transparent text-blue-700" : "text-gray-900"
                                    } flex pl-10 items-center w-full py-2`}
                                  >
                                    <LogoutIcon className="mr-3.5" />
                                    Logout
                                  </button>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </>
                    )}

                    {/* Mobile Navigation */}
                    <div className="sm:hidden block ">
                      <Disclosure.Button className="p-2 ">
                        {open ? (
                          <ExpandMoreOutlinedIcon
                            fontSize="large"
                            className="border-2 border-gray-300 rounded-full hover:bg-gray-200"
                          />
                        ) : (
                          <ExpandMoreOutlinedIcon
                            fontSize="large"
                            className="border-2 border-gray-300 rounded-full hover:bg-gray-200"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Navigation */}
              <Disclosure.Panel className="sm:hidden block bg-white">
                {isLoggedInSelector ? (
                  <div className="pb-5 mt-2 px-2 shadow-md divide-y divide-gray-200">
                    <div className="">
                      <Disclosure.Button as={NavLink} to="/">
                        <h1 className="text-3xl text-center py-2 underline">LooFi</h1>
                      </Disclosure.Button>
                    </div>
                    <div className="">
                      <div className="my-5 px-6 flex items-center justify-center">
                        <div className="w-10 h-10 flex items-center">
                          <img
                            className="w-full rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="profile"
                          />
                        </div>
                        <div className="flex flex-col ml-3.5">
                          <p className="font-semibold text-lg">
                            {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
                            {/* {`alex`.charAt(0).toUpperCase() + `alex`.slice(1)} */}
                          </p>
                          <small>{user.email}</small>
                          {/* <small>{`alex@email.com`}</small> */}
                        </div>
                      </div>
                      {navigationCredentials.map((nav) => (
                        <Disclosure.Button
                          key={nav}
                          as={NavLink}
                          to={nav.path}
                          className="block px-3 py-2 font-medium text-center hover:bg-blue-700 hover:text-white"
                        >
                          {nav.name}
                        </Disclosure.Button>
                      ))}
                      <button
                        onClick={logoutHandler}
                        className="w-full block px-3 py-2 font-medium text-center hover:bg-blue-700 hover:text-white"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="pb-5 mt-2 px-2 shadow-md">
                    <Disclosure.Button as={NavLink} to="/">
                      <h1 className="text-3xl text-center py-2 underline">LooFi</h1>
                    </Disclosure.Button>
                    {navigationNoCredentials.map((nav) => (
                      <Disclosure.Button
                        key={nav.name}
                        as={NavLink}
                        to={nav.path}
                        className="block px-3 py-2 font-medium text-center hover:bg-blue-700  hover:text-white"
                      >
                        {nav.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                )}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
};

export default Navbar;
