import React, { useEffect, useState } from "react";
import { PiCalendarDotsThin } from "react-icons/pi";
import { cn, Pagination, PaginationItemType } from "@nextui-org/react";
import { ChevronIcon } from "./ChevronIcon";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "@/redux/landing/newsSlice";
import NewsCard from "@/components/landing/NewsCard";

const News = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { newsItems, status, error } = useSelector((state) => state.news);
  
  // Local state for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  // Fetch news articles on component mount
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchNews());
    }
  }, [status, dispatch]);

  // Calculate paginated articles
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = newsItems.slice(indexOfFirstArticle, indexOfLastArticle);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleArticleClick = (article) => {
    navigate(`/news/${article.documentId}`);
  };

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
            if (currentPage < Math.ceil(newsItems.length / articlesPerPage)) {
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
        className={cn(className, isActive && "text-white bg-[#e17052] font-bold")}
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
    <div className="min-h-screen flex flex-col justify-between p-4">
      <div>
        <h1 className="text-4xl font-semibold">News</h1>
        
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p>Error: {error}</p>}
        {status === 'succeeded' && (
          <NewsCard articles={currentArticles}  />
        )}
      </div>
      <div>
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
            total={Math.ceil(newsItems.length / articlesPerPage)}
            initialPage={currentPage}
            className="gap-2 mt-6"
            radius="full"
            renderItem={renderItem}
            variant="light"
          />
        </div>
      </div>
    </div>
  );
};

export default News;
