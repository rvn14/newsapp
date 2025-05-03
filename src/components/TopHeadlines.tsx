// TopHeadlines.tsx
import React, { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EverythingCard from "./EverythingCard";
import Loader from "./Loader";

interface SourceType {
  name?: string;
}

interface TopHeadlineItem {
  id: string;
  category: string;
  title: string;
  summary: string;
  cover_image: string;
  publishedAt: string;
  url: string;
  author?: string;
  source: SourceType | string;
}

const TopHeadlines: FC = () => {
  const { category } = useParams<{ category: string }>();
  const [data, setData] = useState<TopHeadlineItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(
      `http://127.0.0.1:3000/top-headlines/${encodeURIComponent(category || "general")}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(
        (json: {
          success: boolean;
          data: TopHeadlineItem[];
          message?: string;
        }) => {
          if (json.success) {
            setData(json.data);
          } else {
            setError(json.message || "An error occurred");
          }
        }
      )
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to fetch news. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, category]);

  return (
    <>
      {error && (
        <div className="text-red-500 mb-4 flex items-center gap-4">
          <span>{error}</span>
          <button
            onClick={() => setPage((prev) => prev)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      )}

      <div className="today-header mt-8 mb-4 text-center font-semibold text-3xl text-gray-800">
        <h3>{category} News</h3>
      </div>

      <div className="mt-16 mb-10 cards grid grid-cols-1 gap-4 xs:p-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:px-16 lg:gap-6 xl:gap-8">
        {!isLoading ? (
          data.length > 0 ? (
            data.map((element, index) => (
              <EverythingCard
                key={index}
                title={element.title}
                description={element.summary}
                imgUrl={element.cover_image}
                publishedDate={element.publishedAt}
                url={element.url}
                author={element.author ?? ""}
                source={
                  typeof element.source === "string"
                    ? element.source
                    : element.source.name || ""
                }
                id={element.id}
                category={element.category}
                summary={element.summary}
                newsProvider={
                  typeof element.source === "string"
                    ? element.source
                    : element.source.name || "Unknown"
                }
              />
            ))
          ) : (
            <p>No articles found for this category or criteria.</p>
          )
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default TopHeadlines;
