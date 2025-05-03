// NewsDetail.tsx
import React, { FC, useEffect, useState, SyntheticEvent } from "react";
import { useLocation } from "react-router-dom";

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
          `http://localhost:3000/news?category=${encodeURIComponent(
            category
          )}&id=${encodeURIComponent(id)}`
        );
        const json: { success: boolean; data: NewsDetailType; message?: string } =
          await res.json();
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

  if (isLoading)
    return <p className="text-center text-white text-lg">Loading...</p>;
  if (error)
    return <p className="text-center text-red-400 text-lg">{error}</p>;
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-purple-950 text-white p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Title */}
        <h1
          className="text-3xl sm:text-4xl font-bold mb-6 leading-tight"
          style={{ fontFamily: "'Noto Sans Sinhala', sans-serif" }}
        >
          {isGroup ? news.representative_title! : news.title}
        </h1>

        {/* Image */}
        {(
          isGroup
            ? news.articles && news.articles[0].cover_image
            : news.cover_image
        ) && (
          <img
            className="w-full max-w-md h-auto object-cover rounded-lg shadow-lg mb-6 mx-auto"
            src={
              isGroup ? news.articles![0].cover_image : news.cover_image
            }
            alt={mainArticle?.title ?? "News cover image"}
            onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
              (e.target as HTMLImageElement).src = "/fallback-image.jpg";
            }}
          />
        )}

        {/* Summary */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Summary</h2>
          <p className="text-gray-200 leading-relaxed">{news.long_summary}</p>
        </section>

        {/* Article URLs */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Article URLs</h2>
          {uniqueArticleUrls.length > 0 ? (
            <ul className="space-y-2">
              {uniqueArticleUrls.map((url, idx) => (
                <li key={idx}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200 underline"
                  >
                    {shortenUrl(url)}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No source available</p>
          )}
        </section>

        {/* News Provider */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">News Provider</h2>
          {uniqueSources.length > 0 ? (
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

        {/* Full Content */}
        {news.content && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">Full Content</h2>
            <p className="text-gray-200 leading-relaxed">{news.content}</p>
          </section>
        )}
      </div>
    </div>
  );
};

export default NewsDetail;
