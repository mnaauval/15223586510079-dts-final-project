import React from "react";
import styled from "styled-components";
// import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from "@material-ui/icons";
import { Facebook, Instagram, MailOutline, Phone, Room, Twitter } from "@mui/icons-material";

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Footer = () => {
  return (
    <div className="flex lg:flex-row flex-col">
      <div className="flex flex-1 flex-col p-5 ml-8">
        <h1 className="text-4xl underline sm:text-left text-center">LooFi</h1>
        <p className="m-5 ml-0 sm:text-justify text-center">
          Made with &#10084;&#65039; by Nauval Eka
        </p>
        <div className="flex sm:justify-start justify-center">
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
        </div>
      </div>
      <div className="md:flex  flex-1 flex-col hidden p-5">
        <h3 className="text-lg font-semibold mb-7 block">Useful Links</h3>
        <ul className="m-0 p-0 flex list-none flex-wrap">
          <li className="w-1/2 mb-2.5">Home</li>
          <li className="w-1/2 mb-2.5">Cart</li>
          <li className="w-1/2 mb-2.5">Man Fashion</li>
          <li className="w-1/2 mb-2.5">Woman Fashion</li>
          <li className="w-1/2 mb-2.5">Accessories</li>
          <li className="w-1/2 mb-2.5">My Account</li>
          <li className="w-1/2 mb-2.5">Order Tracking</li>
          <li className="w-1/2 mb-2.5">Wishlist</li>
          <li className="w-1/2 mb-2.5">Terms</li>
        </ul>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:bg-white bg-[#fff8f8]">
        <h3 className="text-lg font-semibold mb-7 block">Contact</h3>
        <ContactItem>
          <Room className="mr-2.5" /> 16 Scientia Newton, Tangerang
        </ContactItem>
        <ContactItem>
          <Phone className="mr-2.5" /> +1 234 56 78
        </ContactItem>
        <ContactItem>
          <MailOutline className="mr-2.5" /> contact@loofi.dev
        </ContactItem>
        <img
          src="https://i.ibb.co/Qfvn4z6/payment.png"
          alt="https://i.ibb.co/Qfvn4z6/payment.png"
          className="w-1/2"
        />
      </div>
    </div>
  );
};

export default Footer;
