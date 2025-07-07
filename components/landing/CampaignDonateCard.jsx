import React from 'react';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const CampaignDonateCard = ({ campaigns }) => {
  return (
    <div className="mt-6">
      {/* Swiper only for mobile */}
      <div className="block lg:hidden">
        <Swiper
          spaceBetween={16}
          slidesPerView={1}
        >
          {campaigns.map((campaign, idx) => (
            <SwiperSlide key={idx}>
              <div className="rounded-3xl border border-black p-4 relative">
                <img
                  className="rounded-tl-3xl rounded-tr-3xl"
                  src={campaign.image}
                  alt={`Campaign ${idx + 1}`}
                />
                <h3 className="text-[#25292c] text-xl font-medium mt-2">{campaign.title}</h3>
                <div className="flex items-center">
                  <RiVerifiedBadgeFill style={{ color: "green" }} />
                  <span className="opacity-60 text-[#3d3d3d] text-sm font-normal">{campaign.organization}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs opacity-60 text-[#191919]">Raised: {campaign.raised}</span>
                  <span className="text-xs opacity-60 text-[#191919]">Goal: {campaign.goal}</span>
                </div>
                <div className="h-2.5 bg-[#d9d9d9] rounded-lg mt-1">
                  <div className="h-2 bg-[#e17052] rounded-lg" style={{ width: campaign.progress }}></div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Grid layout for tablet and desktop */}
      <div className="hidden lg:grid grid-cols-3 gap-6">
        {campaigns.map((campaign, idx) => (
          <div key={idx} className="rounded-3xl border border-black p-4 relative">
            <img
              className="rounded-tl-3xl rounded-tr-3xl"
              src={campaign.image}
              alt={`Campaign ${idx + 1}`}
            />
            <h3 className="text-[#25292c] text-xl font-medium mt-2">{campaign.title}</h3>
            <div className="flex items-center">
              <RiVerifiedBadgeFill style={{ color: "green" }} />
              <span className="opacity-60 text-[#3d3d3d] text-sm font-normal">{campaign.organization}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs opacity-60 text-[#191919]">Raised: {campaign.raised}</span>
              <span className="text-xs opacity-60 text-[#191919]">Goal: {campaign.goal}</span>
            </div>
            <div className="h-2.5 bg-[#d9d9d9] rounded-lg mt-1">
              <div className="h-2 bg-[#e17052] rounded-lg" style={{ width: campaign.progress }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignDonateCard;
