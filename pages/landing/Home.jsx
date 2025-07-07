import React, { useEffect } from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { GoPeople, GoArrowRight } from "react-icons/go";
import { PiHandsClappingLight } from "react-icons/pi";
import { SlEmotsmile } from "react-icons/sl";
import HomeDonateCard from "@/components/landing/HomeDonateCard";
import HomeNewsCard from "@/components/landing/HomeNewsCard";
import { Link, useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import Campaign from "../partner/dashboard/Campaign";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "@/redux/landing/newsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { newsItems, status, error } = useSelector((state) => state.news);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchNews());
    }
  }, [status, dispatch]);

  const campaigns = [
    {
      id: 1,
      title: "Berbagi Alat Tulis Kepada Penggapai Mimpi",
      organization: "Griya Yatim Fathia",
      raised: 1000000,
      goal: 2000000,
      image:
        "https://mi.polinela.ac.id/wp-content/uploads/2021/12/bursa_kerja_it_bootcamp_enigmacamp_d3_mi_polinela.jpg",
    },
    {
      id: 2,
      title: "Berbagi Alat Tulis Kepada Penggapai Mimpi",
      organization: "Griya Yatim Fathia",
      raised: 1500000,
      goal: 20000000,
      image:
        "https://mi.polinela.ac.id/wp-content/uploads/2021/12/bursa_kerja_it_bootcamp_enigmacamp_d3_mi_polinela.jpg",
    },
    {
      id: 3,
      title: "Berbagi Alat Tulis Kepada Penggapai Mimpi",
      organization: "Griya Yatim Fathia",
      raised: 1500000,
      goal: 20000000,
      image:
        "https://mi.polinela.ac.id/wp-content/uploads/2021/12/bursa_kerja_it_bootcamp_enigmacamp_d3_mi_polinela.jpg",
    },
    {
      id: 4,
      title: "Berbagi Alat Tulis Kepada Penggapai Mimpi",
      organization: "Griya Yatim Fathia",
      raised: 1500000,
      goal: 20000000,
      image:
        "https://mi.polinela.ac.id/wp-content/uploads/2021/12/bursa_kerja_it_bootcamp_enigmacamp_d3_mi_polinela.jpg",
    },
    {
      id: 5,
      title: "Berbagi Alat Tulis Kepada Penggapai Mimpi",
      organization: "Griya Yatim Fathia",
      raised: 1500000,
      goal: 20000000,
      image:
        "https://mi.polinela.ac.id/wp-content/uploads/2021/12/bursa_kerja_it_bootcamp_enigmacamp_d3_mi_polinela.jpg",
    },
    {
      id: 6,
      title: "Berbagi Alat Tulis Kepada Penggapai Mimpi",
      organization: "Griya Yatim Fathia",
      raised: 1500000,
      goal: 20000000,
      image:
        "https://mi.polinela.ac.id/wp-content/uploads/2021/12/bursa_kerja_it_bootcamp_enigmacamp_d3_mi_polinela.jpg",
    },
    {
      id: 7,
      title: "Berbagi Alat Tulis Kepada Penggapai Mimpi",
      organization: "Griya Yatim Fathia",
      raised: 1500000,
      goal: 20000000,
      image:
        "https://mi.polinela.ac.id/wp-content/uploads/2021/12/bursa_kerja_it_bootcamp_enigmacamp_d3_mi_polinela.jpg",
    },
  ];

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-center h-screen md:px-0 relative">
        <div className="hidden lg:block absolute top-0 right-0 w-96 h-[500px] bg-[#0b826c] z-0"></div>

        <div className="grid grid-rows-5 gap-0 mt-48 md:mt-0 lg:mt-24 w-full lg:w-1/2 z-10 relative">
          <div className="row-start-1 row-end-3 pl-3">
            <h3 className="text-lg font-bold mb-2">
              Healing Hearts, Healing Lives
            </h3>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Being Part Of Aid Foundation Is A Way To Share
            </h1>
            <p className="text-gray-600">
              Share your kindness with the world. By supporting the Aid
              Foundation, you're not just making a donation, you're investing in
              the future. Your contributions help fund vital programs, empower
              communities, and provide hope to those who need it most.
            </p>
          </div>

          <div className="rounded-tr-[80px] row-start-4 bg-[#0b826c] flex items-center justify-center p-4 z-10">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <h2 className="text-lg text-white font-bold">145+</h2>
                <p className="text-sm text-white font-medium">
                  Achieved Campaigns
                </p>
              </div>
              <div>
                <h2 className="text-lg text-white font-bold">1200+</h2>
                <p className="text-sm text-white font-medium">
                  Donations Received
                </p>
              </div>
              <div>
                <h2 className="text-lg text-white font-bold">545+</h2>
                <p className="text-sm text-white font-medium">
                  Clarity in the Last Year
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center md:ml-10 w-full md:w-1/2 mb-20">
          <div className="hidden lg:block rounded-[50px] bg-white border border-black relative h-[300px] md:h-[450px] w-full md:w-12/12 mb-6 lg:mb-20 mr-0 md:mr-9 z-10 p-2">
            <img
              className="rounded-[40px] h-1/2 object-cover -mb-4"
              src="https://mi.polinela.ac.id/wp-content/uploads/2021/12/bursa_kerja_it_bootcamp_enigmacamp_d3_mi_polinela.jpg"
              alt="Campaign 1"
            />
            <div className="mx-2">
              <h3 className="text-[#25292c] text-base font-medium mt-8">
                Berbagi Alat Tulis Kepada Penggapai Mimpi
              </h3>
              <div className="flex items-center">
                <RiVerifiedBadgeFill style={{ color: "green" }} />
                <span className="opacity-60 text-[#3d3d3d] text-xs font-normal">
                  Griya Yatim Fathia
                </span>
              </div>

              <div className="flex justify-between items-center mt-6">
                <span className="text-xs opacity-60 text-[#191919]">
                  Raised: Rp 1 juta
                </span>
                <span className="text-xs opacity-60 text-[#191919]">
                  Goal: Rp 2 juta
                </span>
              </div>
              <div className="w-full">
                <div className="h-1.5 bg-[#d9d9d9] rounded-lg mt-1">
                  <div
                    className="h-1 bg-[#e17052] rounded-lg"
                    style={{ width: "40%" }}
                  ></div>
                </div>
                <Link to={"/download"}>
                  <button className="bg-[#e17153] text-white rounded-3xl py-1 px-1 mt-6 text-sm w-full">
                    Donate Now
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden lg:block rounded-[30px] bg-white border border-black relative md:h-[350px] w-full md:w-10/12 mb-20 mr-5 z-10 p-1">
            <img
              className="rounded-[30px] h-1/2 object-cover -mb-4"
              src="https://mi.polinela.ac.id/wp-content/uploads/2021/12/bursa_kerja_it_bootcamp_enigmacamp_d3_mi_polinela.jpg"
              alt="Campaign 1"
            />
            <div className="mx-1">
              <h3 className="text-[#25292c] text-sm font-medium mt-8">
                Berbagi Alat Tulis Kepada Penggapai Mimpi
              </h3>
              <div className="flex items-center">
                <RiVerifiedBadgeFill style={{ color: "green" }} />
                <span className="opacity-60 text-[#3d3d3d] text-xs font-normal">
                  Griya Yatim Fathia
                </span>
              </div>

              <div className="flex justify-between items-center mt-6">
                <span className="text-xxs opacity-60 text-[#191919]">
                  Raised: Rp 1 juta
                </span>
                <span className="text-xxs opacity-60 text-[#191919]">
                  Goal: Rp 2 juta
                </span>
              </div>
              <div className="w-full">
                <div className="h-1.5 bg-[#d9d9d9] rounded-lg mt">
                  <div
                    className="h-1 bg-[#e17052] rounded-lg"
                    style={{ width: "40%" }}
                  ></div>
                </div>
                <Link to={"/download"}>
                  <button className="bg-[#e17153] text-white rounded-3xl py-1  mt-3 text-xs w-full">
                    Donate Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-auto flex items-center justify-center py-8">
        <div className="h-auto lg:h-[470px] w-[90%] md:w-[80%] lg:w-[70%] rounded-[20px] mx-4 bg-white border border-black relative p-6">
          <div className="flex flex-col-reverse lg:flex-row lg:space-x-5 items-start">
            <div className="mb-5 md:mt-10">
              <h3 className="text-[#25292c] text-2xl lg:text-3xl font-bold">
                Berbagi Alat Tulis Kepada Penggapai Mimpi
              </h3>
              <div className="flex items-center">
                <RiVerifiedBadgeFill style={{ color: "green" }} />
                <span className="opacity-60 text-[#3d3d3d] text-sm lg:text-lg font-normal ml-2">
                  Griya Yatim Fathia
                </span>
              </div>
              <p className="text-[#3d3d3d] text-sm  font-normal mt-5 max-w-md">
                Dengan berbagi alat tulis kita tidak hanya memberikan benda,
                tetapi juga memberi harapan dan semangat belajar.
              </p>

              <div className="flex justify-between items-center mt-8 max-w-md">
                <span className="text-xs opacity-60 text-[#191919]">
                  Raised: Rp 1.000.000
                </span>
                <span className="text-xs opacity-60 text-[#191919]">
                  Goal: Rp 2.000.000
                </span>
              </div>

              <div className="h-2 bg-[#d9d9d9] rounded-lg mt-1 max-w-md">
                <div
                  className="h-1.5 bg-[#e17052] rounded-lg"
                  style={{ width: "40%" }}
                ></div>
              </div>
              <div className="flex justify-center lg:justify-start mt-6">
                <Link
                  className="bg-[#e17153] text-white rounded-3xl px-6 py-2 text-lg lg:px-24"
                  to={"/download"}
                >
                  Donate Now
                </Link>
              </div>
            </div>

            <img
              className="rounded-[20px] object-cover w-full lg:w-[350px] h-auto lg:h-[425px] lg:mt-0"
              src="https://mi.polinela.ac.id/wp-content/uploads/2021/12/bursa_kerja_it_bootcamp_enigmacamp_d3_mi_polinela.jpg"
              alt="Campaign 1"
            />
          </div>
        </div>
      </div>

      <div className="h-screen flex items-center justify-center py-8">
        <div className="h-auto lg:h-[430px] w-[90%] lg:w-[70%] rounded-[100px] mx-4 bg-[#e17052] flex flex-col items-center relative p-6 lg:p-8">
          <div className="text-center mt-6 mx-4 lg:mx-44">
            <h2 className="text-white text-2xl lg:text-3xl font-bold">
              How To Start Help
            </h2>
            <p className="text-white text-sm lg:text-xs font-normal mt-5">
              In carrying out their duties, charitable foundations provide a
              variety of social services such as education, food, medicine,
              housing, and others
            </p>
          </div>
          <div className="flex flex-col lg:flex-row mt-12 space-y-8 lg:space-y-0 lg:space-x-32 text-center">
            <div className="flex flex-col items-center text-white">
              <GoPeople style={{ fontSize: "50px" }} />
              <h3 className="font-semibold text-xl mt-5">Register Yourself</h3>
              <p className="text-xs">
                Sign up to join and be part of the good people who love to share
              </p>
            </div>
            <div className="flex flex-col items-center text-white">
              <PiHandsClappingLight style={{ fontSize: "50px" }} />
              <h3 className="font-semibold text-xl mt-5">Select Donate</h3>
              <p className="text-xs">
                There are many things you can choose to share goodness with
              </p>
            </div>
            <div className="flex flex-col items-center text-white">
              <SlEmotsmile style={{ fontSize: "50px" }} />
              <h3 className="font-semibold text-xl mt-5">Share Happiness</h3>
              <p className="text-xs">
                Sharing happiness with those less and doing more good for others
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between ml-5 lg:mx-5">
          <h2 className="text-xl lg:text-3xl font-bold">
            Let's Give Help To Those In Need
          </h2>
          {campaigns.length > 6 && (
            <Link to={"/campaign"}
              className="lg:bg-[#e17153] flex items-center text-[#e17153] lg:text-white rounded-3xl text-sm lg:text-lg px-5 py-2"
            >
              <span>See More Campaign</span>
              <GoArrowRight />
            </Link>
          )}
        </div>
        <div className="">
          <HomeDonateCard campaigns={campaigns} />
        </div>
      </div>

      <div className="mb-16">
        <div className="flex justify-between mx-5 mt-32">
          <h2 className="text-xl lg:text-3xl font-bold">News and Articles</h2>
          {newsItems.length > 4 && (
            <Link to={"/news"}
              className="lg:bg-[#e17153] flex items-center text-[#e17153] lg:text-white rounded-3xl text-sm lg:text-lg lg:px-5 lg:py-2"
            >
              <span>See More</span>
              <GoArrowRight />
            </Link>
          )}
        </div>
        <HomeNewsCard
          articles={newsItems}
          
        />
      </div>
    </div>
  );
};

export default Home;
