import React from 'react';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useNavigate } from 'react-router-dom';

const HomeDonateCard = ({ campaigns }) => {
  const navigate = useNavigate();

  return (
    <div className="mt-6">
      {/* Swiper only for mobile */}
      <div className="block lg:hidden">
        <Swiper
          spaceBetween={16}
          slidesPerView={1}
          loop={true} // Enable looping
        >
          {campaigns.slice(0, 6).map((campaign) => {
            const width = (campaign.raised / campaign.goal) * 100;
            return (
              <SwiperSlide key={campaign.id}>
                <div className="rounded-[50px] bg-white border border-black relative h-[450px] w-10/12 p-2 ml-8">
                  <img
                    className="rounded-[40px] h-1/2 object-cover -mb-4"
                    src={campaign.image}
                    alt={campaign.title}
                  />
                  <div className="mx-2">
                    <h3 className="text-[#25292c] text-base font-medium mt-8">
                      {campaign.title}
                    </h3>
                    <div className="flex items-center">
                      <RiVerifiedBadgeFill style={{ color: "green" }} />
                      <span className="opacity-60 text-[#3d3d3d] text-xs font-normal">
                        {campaign.organization}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-6">
                      <span className="text-xs opacity-60 text-[#191919]">
                        Raised: Rp {campaign.raised}
                      </span>
                      <span className="text-xs opacity-60 text-[#191919]">
                        Goal: Rp {campaign.goal}
                      </span>
                    </div>
                    <div className="w-full">
                      <div className="h-1.5 bg-[#d9d9d9] rounded-lg mt-1">
                        <div
                          className="h-1 bg-[#e17052] rounded-lg"
                          style={{ width: `${width}%` }}
                        ></div>
                      </div>
                      <button
                        className="bg-[#e17153] text-white rounded-3xl py-1 px-1 mt-6 text-sm w-full"
                        onClick={() => navigate(`/download`)}
                      >
                        Donate Now
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* Grid layout for tablet and desktop */}
      <div className="hidden lg:grid grid-cols-3 gap-6">
        {campaigns.slice(0, 6).map((campaign) => {
          const width = (campaign.raised / campaign.goal) * 100;
          return (
            <div key={campaign.id} className="rounded-[50px] bg-white border border-black relative h-[450px] w-11/12 p-2">
              <img
                className="rounded-[40px] h-1/2 object-cover -mb-4"
                src={campaign.image}
                alt={campaign.title}
              />
              <div className="mx-2">
                <h3 className="text-[#25292c] text-base font-medium mt-8">
                  {campaign.title}
                </h3>
                <div className="flex items-center">
                  <RiVerifiedBadgeFill style={{ color: "green" }} />
                  <span className="opacity-60 text-[#3d3d3d] text-xs font-normal">
                    {campaign.organization}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-6">
                  <span className="text-xs opacity-60 text-[#191919]">
                    Raised: Rp {campaign.raised}
                  </span>
                  <span className="text-xs opacity-60 text-[#191919]">
                    Goal: Rp {campaign.goal}
                  </span>
                </div>
                <div className="w-full">
                  <div className="h-1.5 bg-[#d9d9d9] rounded-lg mt-1">
                    <div
                      className="h-1 bg-[#e17052] rounded-lg"
                      style={{ width: `${width}%` }}
                    ></div>
                  </div>
                  <button
                    className="bg-[#e17153] text-white rounded-3xl py-1 px-1 mt-6 text-sm w-full"
                    onClick={() => navigate(`/download`)}
                  >
                    Donate Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomeDonateCard;
