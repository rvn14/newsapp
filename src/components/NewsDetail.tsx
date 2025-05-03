// NewsDetail.tsx
import React, { FC, useEffect, useState, SyntheticEvent } from "react";
import { useLocation } from "react-router-dom";
import { dummy } from "../assets/dummyData";

interface Article {
  id: string;
  url: string;
  source: string;
  cover_image: string;
  title: string;
}

interface NewsDetailType {
  id: string;
  group_id?: string | null;
  title: string;
  representative_title?: string;
  cover_image: string;
  source: string;
  url: string;
  long_summary: string;
  content?: string;
  articles?: Article[];
}

// Helper to shorten a URL to its base domain
const shortenUrl = (url: string): string => {
  try {
    const parsed = new URL(url);
    return parsed.origin;
  } catch (err) {
    console.error("URL parsing error:", err);
    return url;
  }
};

// Helper to format date from ISO string to readable format
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (err) {
    console.error("Date formatting error:", err);
    return dateString;
  }
};

const NewsDetail: FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  const id = params.get("id");

  const [news, setNews] = useState<NewsDetailType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!category || !id) {
      setError("Invalid news details");
      setIsLoading(false);
      return;
    }

    (async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/news?category=${encodeURIComponent(
            category
          )}&id=${encodeURIComponent(id)}`
        );
        const json: {
          success: boolean;
          data: NewsDetailType;
          message?: string;
        } = await res.json();
        if (json.success) setNews(json.data);
        else setError(json.message || "News not found");
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch news");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [category, id]);

  // if (isLoading)
  //   return <p className="text-center text-white text-lg">Loading...</p>;
  // if (error)
  //   return <p className="text-center text-red-400 text-lg">{error}</p>;
  if (!news)
    return (
      <p className="text-center text-red-400 text-lg">
        No news details available.
      </p>
    );

  const isGroup = Boolean(news.group_id);
  const mainArticle = news.articles?.find((a) => a.id === news.id);

  const uniqueArticleUrls: string[] = [
    ...new Set(news.articles?.map((a) => a.url) ?? []),
  ];
  const uniqueSources: string[] = [
    ...new Set(news.articles?.map((a) => a.source) ?? []),
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-background p-4 md:p-6">
      {!isLoading && (
        <div className="w-full max-w-4xl  mx-auto pb-16">
          {/* Category Badge */}
          {category && (
            <div className="mb-4 flex justify-between items-center">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-800 text-white shadow-sm">
                {category}
              </span>
              <span className="">
                {formatDate(
                  isGroup
                    ? typeof news.articles![0].date_published === "string"
                      ? news.articles![0].date_published
                      : (news.articles![0].date_published as { $date: string })
                          .$date
                    : typeof news.date_published === "string"
                    ? news.date_published
                    : news.date_published.$date
                )}
              </span>
            </div>
          )}

          {/* Title */}
          <h1
            className="text-3xl sm:text-5xl font-black pb-4 sm:pb-6 leading-tight"
            style={{ fontFamily: "'Noto Sans Sinhala', sans-serif" }}
          >
            {isGroup ? news.representative_title! : news.title}
          </h1>

          {/* Image */}
          {(isGroup
            ? news.articles && news.articles[0].cover_image
            : news.cover_image) && (
            <div className="w-full flex justify-center mb-8">
              <img
                className="w-full max-w-md h-auto object-cover rounded-lg shadow-lg"
                src={isGroup ? news.articles![0].cover_image : news.cover_image}
                alt={mainArticle?.title ?? "News cover image"}
                onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
                  (e.target as HTMLImageElement).src = "/fallback-image.jpg";
                }}
              />
            </div>
          )}

          {/* Summary */}
          <section className="pt-4 w-full">
            <p className=" leading-relaxed">{news.long_summary}</p>
          </section>

          {/* News Provider */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">News Provider</h2>

            {!isGroup ? (
              <div>{news.source}</div>
            ) : uniqueSources.length > 0 ? (
              <ul className="space-y-2">
                {uniqueSources.map((source, idx) => (
                  <li key={idx}>
                    <a
                      href={source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-200 underline"
                    >
                      {shortenUrl(source)}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No source available</p>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default NewsDetail;
