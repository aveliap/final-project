import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { PiCalendarDotsThin } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews, fetchNewsById } from "@/redux/landing/newsSlice";
import remarkGfm from "remark-gfm";

const NewsPage = () => {
  const dispatch = useDispatch();
  const { selectedItem, newsItems } = useSelector((state) => state.news);
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        console.log(id);

        await dispatch(fetchNewsById(id)).unwrap();
        await dispatch(fetchNews()).unwrap();
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [dispatch, id]);

  console.log(id);

  const createMarkup = (content) => {
    // Mengganti Markdown syntax untuk gambar menjadi tag <img> dan mengganti localhost dengan IP lokal
    const updatedContent = content.replace(
      /!\[([^\]]*)\]\((http:\/\/localhost:1337[^)]+)\)/g,
      (match, altText, url) => {
        // Ganti localhost dengan IP lokal 10.10.102.91
        const updatedUrl = url.replace("localhost", "10.10.102.91");
        return `<img src="${updatedUrl}" alt="${altText}" class="my-4 mx-auto w-1/2" />`;
      }
    );
    return { __html: updatedContent };
  };

  return (
    <div className="m-4 md:m-6">
      {isLoading && <div>Loading...</div>}

      {!isLoading && (
        <>
          <h1 className="text-4xl font-bold">{selectedItem?.title}</h1>
          <div className="flex flex-row items-center mt-4 space-x-1">
            <PiCalendarDotsThin style={{ color: "#3d3d3d" }} />
            <h3 className="text-sm md:text-base">
              {selectedItem?.createdAt.slice(0, 10)}
            </h3>
          </div>
          <div className="flex flex-col lg:flex-row md:space-x-5 mt-10">
            <div className="flex-1">
              <img
                src={selectedItem?.imageUrl}
                alt={selectedItem?.title}
                className="w-full h-auto"
              />
              {/* Menggunakan createMarkup untuk menampilkan contentnews dengan gambar yang telah diubah URL-nya */}
              {/*<p*/}
              {/*  className="mt-5 lg:text-lg text-justify"*/}
              {/*  dangerouslySetInnerHTML={createMarkup(*/}
              {/*    selectedItem?.contentnews*/}
              {/*  )}*/}
              {/*/>*/}
              <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  className="mt-5 lg:text-lg text-justify"
                  components={{ h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-6 mb-4" {...props} />}}>
                {selectedItem?.contentnews}
              </ReactMarkdown>
            </div>
            <div className="flex flex-col w-full lg:w-1/3 px-4 lg:px-10">
              <div className="sticky top-20">
                <div className="text-black mt-6 lg:mt-0 text-2xl lg:text-3xl font-semibold whitespace-nowrap">
                  Latest News
                </div>
                {newsItems.slice(0, 3).map((item, index) => (
                  <Link
                    to={`/news/${item.documentId}`}
                    className="flex flex-row space-x-4 lg:mt-5"
                    key={index}
                  >
                    <div className="bg-[#0b826c] w-2 h-14 my-1"></div>
                    <div className="flex flex-col space-y-1">
                      <h3 className="text-lg lg:text-xl font-medium">
                        {item.title}
                      </h3>
                      <div className="flex flex-row items-center">
                        <PiCalendarDotsThin style={{ color: "#3d3d3d" }} />
                        <p className="text-[#3d3d3d] text-xs">
                          {item.createdAt.slice(0, 10)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
                {newsItems.length > 3 && (
                  <Link to={`/news`}>
                  <button
                    className="bg-[#0b826c] text-white rounded-2xl px-6 py-2 self-start textarea-md lg:text-lg mt-5"
                  >
                    More News
                  </button>
                  </Link>
                  
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewsPage;
