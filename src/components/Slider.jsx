import React, { useState } from "react";
import styled from "styled-components";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { sliderItems } from "../assets/dataAssets";

const Arrow = styled.div`
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
`;

const Wrapper = styled.div`
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  background-color: #${(props) => props.bg};
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    else setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
  };

  return (
    <div className="w-full h-screen flex relative overflow-hidden">
      {slideIndex === 0 ? (
        <Arrow direction="left" onClick={() => handleClick("left")} className="hidden">
          <ArrowLeftIcon />
        </Arrow>
      ) : (
        <Arrow
          direction="left"
          onClick={() => handleClick("left")}
          className="w-12 h-12 bg-[#fff7f7] rounded-full flex items-center justify-center absolute top-0 bottom-16 m-auto cursor-pointer opacity-50 z-[2] border-2 border-gray-500"
        >
          <ArrowLeftIcon />
        </Arrow>
      )}
      <Wrapper slideIndex={slideIndex} className="h-full flex transition duration-[1500ms] ease">
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id} className="w-screen h-screen flex items-center">
            <div className="h-auto flex-1 lg:block hidden rounded-full bg-white ml-5">
              <img src={item.img} alt={item.name} className="h-4/5" />
            </div>
            <div className="flex-1 p-12">
              <h1 className="lg:text-7xl sm:text-5xl text-4xl py-10">{item.title}</h1>
              <p className="sm:text-xl text-lg py-8 tracking-[3px]">{item.desc}</p>
              <button className="p-2.5 text-xl bg-transparent cursor-pointer border-2 border-gray-500">
                SHOW NOW
              </button>
            </div>
          </Slide>
        ))}
      </Wrapper>
      {slideIndex === 2 ? (
        <Arrow direction="right" onClick={() => handleClick("right")} className="hidden">
          <ArrowRightIcon />
        </Arrow>
      ) : (
        <Arrow
          direction="right"
          onClick={() => handleClick("right")}
          className="w-12 h-12 bg-[#fff7f7] rounded-full flex items-center justify-center absolute top-0 bottom-16 m-auto cursor-pointer opacity-50 z-[2] border-2 border-gray-500"
        >
          <ArrowRightIcon />
        </Arrow>
      )}
    </div>
  );
};

export default Slider;
