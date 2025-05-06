// Search.tsx
import { FC, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import EverythingCard from "./EverythingCard";
import Loader from "./Loader";

interface Article {
  id: string;
  url: string;
  source: string;
  cover_image: string;
  date_published: string;
  title: string;
}

interface SearchResultItem {
  id: string;
  category: string;
  url: string;
  source: string;
  cover_image: string;
  date_published: string;
  short_summary: string;
  long_summary: string;
  representative_title?: string;
  title: string;
  group_id?: string | null;
  articles?: Article[];
}

const Search: FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  const [data, setData] = useState<SearchResultItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setError("No search query provided");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    fetch(`/api/search?query=${encodeURIComponent(query)}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(
        (json: {
          success: boolean;
          data: SearchResultItem[];
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
  }, [page, query]);

  return (
    <>
      {error && (
        <div className="text-red-500 mb-4 flex items-center gap-4">
          <span>{error}</span>
          <button
            onClick={() => setPage(page)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      )}

      <div className="today-header mt-8 mb-4 text-center font-semibold text-3xl text-gray-800">
        <h3>Search Results</h3>
      </div>

      <div className="mt-16 mb-10 cards grid grid-cols-1 gap-4 xs:p-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:px-16 lg:gap-6 xl:gap-8">
        {!isLoading ? (
          data.length > 0 ? (
            data.map((element, index) => {
              const isGroup = Boolean(element.group_id);

              if (
                isGroup &&
                (!element.articles || element.articles.length === 0)
              ) {
                return null;
              }

              const urls = isGroup
                ? element.articles!.map((a) => a.url).join(",")
                : element.url;

              const newsProviders = isGroup
                ? element.articles!.map((a) => a.source).join(",")
                : element.source;

              return (
                <EverythingCard
                  key={index}
                  title={
                    isGroup ? element.representative_title! : element.title
                  }
                  description={element.short_summary}
                  summary={element.long_summary}
                  imgUrl={
                    isGroup
                      ? element.articles![0].cover_image
                      : element.cover_image
                  }
                  publishedDate={
                    isGroup
                      ? element.articles![0].date_published
                      : element.date_published
                  }
                  newsProvider={newsProviders}
                  source={urls}
                  id={element.id}
                  category={element.category}
                  url={isGroup ? element.articles![0].url : element.url}
                />
              );
            })
          ) : (
            <p>No articles found for this search query.</p>
          )
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default Search;
