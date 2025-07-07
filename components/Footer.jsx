import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-[#0b826c] flex flex-col items-center p-7 space-y-8 md:space-y-12 lg:space-y-32 overflow-hidden">
      <div className="relative w-full flex flex-col md:flex-row items-center md:items-start justify-between space-y-8 md:space-y-0 z-10">
        <img
          src="../src/assets/footer.png"
          className="absolute top-0 left-1/2 transform -translate-x-1/2 h-[200px] md:h-[300px] object-cover z-0 opacity-20 md:opacity-100"
          alt="Footer Background"
        />

        <div className="bg-[#F9F5E8] flex items-center p-2 z-10">
          <img src="../src/assets/logo.webp" className="w-10 h-10" alt="Logo" />
          <h3 className="text-[#10b981] ml-2 text-lg font-semibold">
            CareMate
          </h3>
        </div>

        <div className="flex flex-col text-white z-10 space-y-2">
          <Link to={"/campaign"}>Donations</Link>
          <Link to={"/about"}>About Us</Link>
          <Link to={"/news"}>Latest News</Link>
        </div>

        <div className="flex flex-col text-white z-10 space-y-2">
          <button>Help</button>
          <button>Privacy</button>
        </div>

        <button className="z-10">
          <img
            src="../src/assets/google play.png"
            className="w-auto h-11"
            alt="Google Play"
          />
        </button>
      </div>

      <div className="text-center text-white text-sm md:text-base z-10">
        © 2024 CareMate. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
