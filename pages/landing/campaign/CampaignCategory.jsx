import CampaignDonateCard from "@/components/landing/CampaignDonateCard";
import { cn, Pagination, PaginationItemType } from "@nextui-org/react";
import React, { useState } from "react";
import { ChevronIcon } from "../News/ChevronIcon";
import CampaignDetailsDonateCard from "@/components/landing/CampaignDetailsDonateCard";

const CampaignCategory = () => {
  // Dummy campaign data with 12 items
  const campaigns = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Campaign Title ${i + 1}`,
    organization: `Organization ${i + 1}`,
    raised: `Rp ${((i + 1) * 0.5).toFixed(1)} juta`,
    goal: `Rp ${((i + 1) * 1.5).toFixed(1)} juta`,
    progress: `${((i + 1) * 10) % 100}%`,
    image:
      "https://mi.polinela.ac.id/wp-content/uploads/2021/12/bursa_kerja_it_bootcamp_enigmacamp_d3_mi_polinela.jpg",
  }));

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  // Calculate current articles for the page
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = campaigns.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const handlePageChange = (page) => setCurrentPage(page);

  // Render pagination item
  const renderItem = ({
    ref,
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    className,
  }) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <button
          key={key}
          className={cn(className, "bg-default-200/50 min-w-8 w-8 h-8")}
          onClick={() => {
            if (currentPage < Math.ceil(campaigns.length / articlesPerPage)) {
              handlePageChange(currentPage + 1);
            }
            onNext();
          }}
        >
          <ChevronIcon className="rotate-180" />
        </button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button
          key={key}
          className={cn(className, "bg-default-200/50 min-w-8 w-8 h-8")}
          onClick={() => {
            if (currentPage > 1) {
              handlePageChange(currentPage - 1);
            }
            onPrevious();
          }}
        >
          <ChevronIcon />
        </button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <button key={key} className={className}>
          ...
        </button>
      );
    }

    return (
      <button
        key={key}
        ref={ref}
        className={cn(
          className,
          isActive && "text-white bg-[#e17052] font-bold"
        )}
        onClick={() => {
          handlePageChange(value);
          setPage(value);
        }}
      >
        {value}
      </button>
    );
  };

  return (
    <div className="px-4 py-6">
      <div className="flex flex-col md:flex-row text-center mt-24 h-screen">
        <div className="mx-auto mt-12">
          <div className="text-left mb-10">
            <h1 className="text-black text-4xl font-bold">
              Educational Support
            </h1>
            <p className="text-[#8e8e93] text-xl font-normal mt-4 max-w-2xl mx-auto">
              Join us in unlocking opportunities through education. Each
              donation, each share, and each gesture of kindness brings us
              nearer to a future where every child has the chance to grow,
              learn, and thrive.
            </p>
          </div>
          <div className="flex items-center w-96 h-16 bg-white/30 rounded border border-black overflow-hidden">
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
        <img
          className="hidden md:block max-h-[400px] mx-16"
          src="../src/assets/Campaign details.png"
          alt="Campaign"
        />
      </div>

      <CampaignDetailsDonateCard campaigns={currentArticles} />
      <div className="mt-auto flex justify-center">
        <Pagination
          css={{
            button: {
              "&:hover": {
                backgroundColor: "#e17052",
              },
            },
          }}
          disableCursorAnimation
          showControls
          total={Math.ceil(campaigns.length / articlesPerPage)}
          initialPage={currentPage}
          className="gap-2 mt-6"
          radius="full"
          renderItem={renderItem}
          variant="light"
        />
      </div>

      <div className="mt-12 p-8 rounded-3xl text-center">
        <h2 className="text-black text-3xl font-semibold">
          Want to make your own campaign?
        </h2>
        <a
          href="#"
          className="bg-[#e17153] text-white text-base font-normal px-16 py-4 mt-5 inline-block rounded-full"
        >
          Register Now
        </a>
        <p className="text-black text-base font-medium mt-5">
          Register now as a partner, and give many children new hope
        </p>
      </div>
    </div>
  );
};

export default CampaignCategory;
