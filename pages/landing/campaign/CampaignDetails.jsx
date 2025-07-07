import React, { useState } from "react";
import { PiCalendarDotsThin, PiDotOutlineFill } from "react-icons/pi";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { RxAvatar } from "react-icons/rx";
import ProgressRing from "@/components/landing/ProgressRing";
import { useNavigate } from "react-router-dom";

const CampaignDetails = () => {
  const navigate = useNavigate();
  const article =
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.";
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAllMessage, setShowAllMessage] = useState(false);
  const [showAllDonate, setShowAllDonate] = useState(false);

  const messages = [
    { id: 1, amount: "Rp 10.000", days: "11d", hope: "Donor's Hope" },
    { id: 2, amount: "Rp 10.000", days: "12d", hope: "Keep going!" },
    { id: 3, amount: "Rp 10.000", days: "13d", hope: "You got this!" },
    { id: 4, amount: "Rp 20.000", days: "14d", hope: "Stay strong!" },
    { id: 5, amount: "Rp 20.000", days: "14d", hope: "Stay strong!" },
    { id: 6, amount: "Rp 20.000", days: "14d", hope: "Stay strong!" },
    { id: 7, amount: "Rp 20.000", days: "14d", hope: "Stay strong!" },
    { id: 8, amount: "Rp 20.000", days: "14d", hope: "Stay strong!" },
  ];

  const messagesToDisplay = showAllMessage ? messages : messages.slice(0, 3);
  const donateToDisplay = showAllDonate ? messages : messages.slice(0, 5);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="p-4 lg:m-6 h-auto bg-[#F9F5E8]">
      <h1 className="text-2xl lg:text-4xl font-bold">
        Berbagi Alat Tulis Kepada Penggapai Mimpi
      </h1>
      <div className="flex flex-col md:flex-row md:space-x-5 mt-10">
        <div className="flex-1">
          <img
            src="https://mi.polinela.ac.id/wp-content/uploads/2021/12/bursa_kerja_it_bootcamp_enigmacamp_d3_mi_polinela.jpg"
            alt="Campaign 1"
            className="w-full h-auto"
          />
          <div className="flex flex-row items-center mt-6 space-x-1">
            <RiVerifiedBadgeFill
              style={{ color: "#0b826c", width: "40px", height: "40px" }}
            />
            <h3 className="text-sm md:text-base">
              Griyatim Fathia is organizing this campaign
            </h3>
          </div>

          <div className="w-full border mt-5" />
          <div className="relative">
            <p
              className={`mt-5 lg:text-lg text-justify ${
                isExpanded ? "" : "line-clamp-6"
              }`}
            >
              {article}
            </p>
            {!isExpanded && (
              <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-[#F9F5E8] to-transparent pointer-events-none" />
            )}
          </div>
          {!isExpanded && (
            <div className="flex justify-center mt-2">
              <button
                onClick={toggleReadMore}
                className="hover:underline flex flex-row items-center"
              >
                Read More
                <GoChevronDown />
              </button>
            </div>
          )}
          {isExpanded && (
            <div className="flex justify-center mt-2">
              <button
                onClick={toggleReadMore}
                className="hover:underline flex flex-row items-center"
              >
                Read Less
                <GoChevronUp />
              </button>
            </div>
          )}
          <div>
            <div className="w-full border mt-5" />
            <h2 className="text-lg lg:text-2xl font-semibold mt-5">
              Updates (1)
            </h2>
            <div className="flex flex-row space-x-2 items-center">
              <h3 className="text-sm font-medium">
                November, 10th 2024
              </h3>
              <p className="text-[#3d3d3d] text-xs">
                by Griyatim Fathia, Organizer
              </p>
            </div>
            <p className="text-[#3d3d3d] text-sm mt-3">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec quam felis, ultricies nec.
            </p>
            <img
              src="https://mi.polinela.ac.id/wp-content/uploads/2021/12/bursa_kerja_it_bootcamp_enigmacamp_d3_mi_polinela.jpg"
              alt="Campaign 1"
              className="w-1/3 h-auto mt-1"
            />
          </div>
          <div>
            <div className="w-full border mt-5" />
            <h2 className="text-lg lg:text-2xl font-semibold mt-5">
              Organizer
            </h2>
            <div className="flex flex-row space-x-2 mt-5">
              <RxAvatar
                style={{ color: "#e17153", width: "40px", height: "40px" }}
              />
              <div className="flex flex-col">
                <h3 className="text-lg lg:text-sm font-semibold">
                  Griyatim Fathia
                </h3>
                <p className="text-xs">Malang</p>
              </div>
            </div>
          </div>
          <div>
            <div className="w-full border mt-5" />
            <h2 className="text-lg lg:text-2xl font-semibold mt-5">
              Words of Hope ({messages.length})
            </h2>
            <p className="text-[#3d3d3d] text-xs">
              Please donate to share words of hope
            </p>
            <div className="">
              {messagesToDisplay.map((item, index) => (
                <div className="flex flex-row space-x-2 mt-5" key={index}>
                  <RxAvatar
                    style={{ color: "#e17153", width: "40px", height: "40px" }}
                  />
                  <div className="flex flex-col">
                    <h3 className="lg:text-lg font-semibold">
                      Anonymous {item.id}
                    </h3>
                    <div className="flex flex-row text-sm items-center">
                      <p>{item.amount}</p>
                      <PiDotOutlineFill className="mx-1" />
                      <p>{item.days}</p>
                    </div>
                    <p className="text-sm">{item.hope}</p>
                  </div>
                </div>
              ))}
            </div>
            {messages.length > 3 && (
              <button
                className="bg-[#0b826c] rounded-lg py-2 px-4 text-white mt-5 text-sm"
                onClick={() => setShowAllMessage(!showAllMessage)}
              >
                {showAllMessage ? "Show Less" : "Show More"}
              </button>
            )}
          </div>
          <div className="mt-10">
            <div className="w-full border mt-5" />
            <div className="flex flex-row items-center mt-5 text-xs lg:text-sm">
              <span>Created at November, 5th 2024</span>
              <PiDotOutlineFill />
              <span>Educational Support</span>
            </div>
            <div className="w-full border mt-5" />
          </div>
        </div>
        <div className="h-auto">
          <div className="flex flex-col sticky top-20 bg-[#FDFAF1] p-5 rounded-lg shadow-xl">
            <div className="flex flex-row items-center space-x-4">
              <div>
                <h2 className="text-lg lg:text-2xl font-bold">Rp. 500.000 raised</h2>
                <div className="flex flex-row items-center space-x-2 text-xs lg:text-sm">
                  <span>Rp 2.5 juta goal</span>
                  <PiDotOutlineFill className="text-gray-400" />
                  <span>{messages.length} donations</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <ProgressRing percentage={99} />
              </div>
            </div>
            <button className="bg-gradient-to-b from-[#f8b8a6] to-[#e17052] py-3 px-6 rounded-xl mx-5 text-white text-lg font-semibold" onClick={() => navigate('/download')}>
              Donate Now
            </button>
            <div className="mt-8">
              {donateToDisplay.map((item, index) => (
                <div className="flex flex-row space-x-2 mt-5" key={index}>
                  <RxAvatar
                    style={{ color: "#e17153", width: "40px", height: "40px" }}
                  />
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold">
                      Anonymous {item.id}
                    </h3>
                    <div className="flex flex-row text-sm items-center">
                      <p>{item.amount}</p>
                      <PiDotOutlineFill className="mx-1" />
                      <p>{item.days}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {messages.length > 5 && (
              <button
                className="bg-gradient-to-b from-[#f8b8a6] to-[#e17052] rounded-lg py-2 px-4 text-white mt-5 text-sm self-start"
                onClick={() => setShowAllDonate(!showAllDonate)}
              >
                {showAllDonate ? "Show Less" : "Show All"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
