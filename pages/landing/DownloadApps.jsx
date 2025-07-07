import React from "react";

const DownloadApps = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-between mt-10 lg:mt-20 space-y-10 lg:space-y-0">
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
        <div className="flex flex-row text-4xl lg:text-7xl font-semibold space-x-3">
          <h1>Get</h1>
          <h1 className="text-[#10B981]">CareMate</h1>
        </div>
        <h3 className="text-lg lg:text-2xl font-normal mt-8 lg:mt-20">
          Download App From
        </h3>
        <div className="flex flex-row space-x-5 mt-5">
          <button>
            <img
              src="../src/assets/google play hitam putih.png"
              alt="Google Play"
              className="w-32 lg:w-3/4"
            />
          </button>
          <button>
            <img
              src="../src/assets/app store hitam putih.png"
              alt="App Store"
              className="w-32 lg:w-3/4"
            />
          </button>
        </div>
      </div>
      <img
        src="../src/assets/downloadApps.png"
        alt="Download App"
        className="w-2/3 lg:w-1/2 max-w-xs lg:max-w-full"
      />
    </div>
  );
};

export default DownloadApps;
