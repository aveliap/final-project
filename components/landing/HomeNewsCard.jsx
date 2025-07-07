import React from "react";
import { GoArrowRight } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";

const HomeNewsCard = ({ articles }) => {
  return (
    <div className="mt-6">
      {/* Swiper for mobile screens */}
      <div className="block lg:hidden">
        <Swiper spaceBetween={5} slidesPerView={1} loop={true}>
          {articles.slice(0, 4).map((article) => (
            <SwiperSlide key={article.id}>
              <div className="flex flex-col border border-black rounded-[50px] p-5 w-10/12 ml-9">
                <img
                  className="h-[200px] w-full object-cover rounded-3xl mb-4"
                  src={article.imageUrl}
                  alt={article.title}
                />
                <div className="flex flex-col justify-between">
                  <h3 className="text-[#25292c] text-lg font-bold mt-5">
                    {article.title}
                  </h3>
                  <p className="text-[#8e8e93] text-xs font-normal">
                    {article.contentnews.slice(0, 70)}
                  </p>
                  <button
                    className="text-[#e17153] mt-5"
                    onClick={() => handleArticleClick(article)}
                  >
                    <Link className="flex items-center text-sm font-bold" to={`/news/${article.documentId}`}>
                      <span>Read Post</span>
                      <GoArrowRight style={{ fontWeight: "bold" }} />
                    </Link>
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Grid for larger screens */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-10">
        {articles.slice(0, 4).map((article) => (
          <div
            key={article.id}
            className="flex flex-row border border-black rounded-[50px] p-5"
          >
            <img
              className="h-[200px] w-full lg:w-60 object-cover rounded-3xl mb-0 mr-4"
              src={article.imageUrl}
              alt={article.title}
            />
            <div className="flex flex-col">
              <h3 className="text-[#25292c] text-lg font-bold mt-5">
                {article.title}
              </h3>
              <p className="text-[#8e8e93] text-xs font-normal mt-6">
                {article.contentnews.slice(0, 70)}
              </p>
              <button
                className="text-[#e17153]"
                onClick={() => handleArticleClick(article)}
              >
                <Link className="flex items-center text-sm font-bold" to={`/news/${article.documentId}`}>
                  <span>Read Post</span>
                  <GoArrowRight style={{ fontWeight: "bold" }} />
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeNewsCard;
