import CampaignDonateCard from "@/components/landing/CampaignDonateCard";
import React from "react";
import { GoArrowRight, GoChevronRight } from "react-icons/go";
import { Link } from "react-router-dom";

const CampaignLanding = () => {
  const campaigns = [
    {
      id: 1,
      title: "Berbagi Alat Tulis Kepada Penggapai Mimpi",
      organization: "Griya Yatim Fathia",
      raised: "Rp 1 juta",
      goal: "Rp 2 juta",
      progress: "40%",
      image:
        "https://mi.polinela.ac.id/wp-content/uploads/2021/12/bursa_kerja_it_bootcamp_enigmacamp_d3_mi_polinela.jpg",
    },
    {
      id: 2,
      title: "Berbagi Alat Tulis Kepada Penggapai Mimpi",
      organization: "Griya Yatim Fathia",
      raised: "Rp 1 juta",
      goal: "Rp 2 juta",
      progress: "40%",
      image:
        "https://mi.polinela.ac.id/wp-content/uploads/2021/12/bursa_kerja_it_bootcamp_enigmacamp_d3_mi_polinela.jpg",
    },
  ];

  return (
    <div className="max-w-screen-xl mx-5">
      <div className="flex flex-col md:flex-row text-center h-screen mt-24">
        <div className="mx-auto mt-12">
          <div className="text-left mb-10">
            <h1 className="text-black text-4xl font-bold">
              Your Impact, Their Hope
            </h1>
            <p className="text-[#8e8e93] text-xl text-justify lg:text-left font-normal mt-4 max-w-2xl mx-auto">
              Together, let's support those in need. Every donation, every
              share, every act of kindness brings us closer to a world where
              everyone has the opportunity to thrive.
            </p>
          </div>
          <a
            href="#partner-campaigns"
            className="bg-[#e17153] text-white text-xl font-bold px-4 py-2 rounded-full flex flex-col items-center justify-center space-y-1 mx-28"
          >
            <span className="text-base lg:text-xl">Check Our Campaigns</span>
            <GoArrowRight className="hidden text-2xl lg:block" />
          </a>
        </div>
        <img
          className="hidden lg:block mx-auto w-full max-w-md max-h-96 h-auto lg:max-w-xl"
          src="../src/assets/campaignLanding.png"
          alt="Campaign"
        />
      </div>

      <section id="partner-campaigns">
        <div className="flex items-center justify-between">
          <h2 className="text-black text-2xl md:text-4xl font-semibold">
            Our Partner Campaigns
          </h2>
          <div className="hidden lg:flex items-center w-96 h-16 bg-white/30 rounded border border-black overflow-hidden">
            <button className="w-16 h-full flex items-center justify-center bg-[#e17153] rounded-l">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="h-6 w-6 opacity-100"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11 4a7 7 0 015.467 11.746l4.193 4.194a1 1 0 01-1.414 1.414l-4.194-4.193A7 7 0 1111 4zm-5 7a5 5 0 1010 0 5 5 0 00-10 0z"
                />
              </svg>
            </button>

            <input
              type="text"
              placeholder="Search"
              className="w-full h-full px-4 text-[#888484] text-sm font-medium font-['Plus Jakarta Sans'] bg-transparent outline-none"
            />
          </div>
        </div>

        {[
          "Educational Support",
          "Infrastructure Support",
          "Operational Needs",
        ].map((category, index) => (
          <div key={index} className="mt-5 lg:mt-12">
            <div className="flex items-center justify-between text-xl">
              <h3 className="font-semibold">{category}</h3>
              <button className="flex items-center text-lg">
                <span>See More</span>
                <GoChevronRight />
                <GoChevronRight style={{ marginLeft: "-10px" }} />
              </button>
            </div>
            <CampaignDonateCard campaigns={campaigns} />
          </div>
        ))}
      </section>

      <div className="mt-12 p-8 rounded-3xl text-center">
        <h2 className="text-black text-3xl font-semibold">
          Want to make your own campaign?
        </h2>
        <Link
          to="/partner/signup"
          className="bg-[#e17153] text-white text-base font-normal px-16 py-4 mt-5 inline-block rounded-full"
        >
          Register Now
        </Link>
        <p className="text-black text-base font-medium mt-5">
          Register now as a partner, and give many children new hope
        </p>
      </div>
    </div>
  );
};

export default CampaignLanding;
