import React from "react";
import SendIcon from "@mui/icons-material/Send";
import Swal from "sweetalert2";

const Newsletter = () => {
  const handleSend = () => {
    Swal.fire({
      text: "Features coming soon!",
      confirmButtonText: "OK",
    });
  };

  return (
    <div className="h-[60vh] bg-[#fcf5f5] flex items-center justify-center flex-col">
      <h1 className="md:text-[70px] text-4xl mb-[20px] font-bold">Newsletter</h1>
      <div className="sm:text-2xl text-lg font-light mb-2 5 text-center">
        Get updates from your favourites products
      </div>
      <div className="sm:w-1/2 w-4/5 h-[40px] bg-white flex justify-between border border-gray-300">
        <input
          type="text"
          className="border-none pl-5 flex lg:grow-[8] sm:grow-[2] flex-1"
          placeholder="Your email"
        />
        <button
          onClick={handleSend}
          className="flex-1 border-none bg-blue-700 text-white hover:bg-blue-800"
        >
          <SendIcon className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default Newsletter;
