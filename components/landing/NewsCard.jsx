import React from 'react'
import { PiCalendarDotsThin } from "react-icons/pi";
import { Link } from 'react-router-dom';


const NewsCard = ({articles}) => {
  return (
    <div 
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
          {articles.map((article) => (
            <Link
              to={`/news/${article.documentId}`}
          
              key={article.documentId}
              className="flex flex-col p-4 relative aspect-square"
            >
              <img
                className="h-3/4 object-cover -mb-4"
                src={article.imageUrl}
                alt={article.title}
              />
              <h3 className="text-[#25292c] lg:text-2xl font-bold mt-7">
                {article.title}
              </h3>
              <div className="flex items-center mt-1">
                <PiCalendarDotsThin style={{ color: "#3d3d3d" }} />
                <span className="opacity-60 text-[#3d3d3d] text-xs font-normal">
                  {article.createdAt.slice(0, 10)}
                </span>
              </div>
            </Link>
          ))}
        </div>
  )
}

export default NewsCard