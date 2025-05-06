// NewsDetail.tsx
import React, { FC, useEffect, useState, SyntheticEvent } from "react";
import { useLocation } from "react-router-dom";
import { dummy } from "../assets/dummyData";
import { 
  Globe, 
  Facebook, 
  Twitter, 
  Youtube, 
  Instagram, 
  Linkedin, 
  Hash, 
  Newspaper
} from "lucide-react";

interface Article {
  date_published: string | { $date: string };
  id: string;
  url: string;
  source: string;
  cover_image: string;
  title: string;
}

interface NewsDetailType {
  date_published: string;
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

// Helper function to map news source to appropriate icon
const getSourceIcon = (url: string) => {
  const domain = url.toLowerCase();
  
  if (domain.includes('newsfirst')) return <img src="/images/newsfirst.jpeg" alt="News First" className="h-6 w-6" />;
  if (domain.includes('adaderana')) return <img src="/images/derana.png" alt="News First" className="h-6 w-6" />;
  if (domain.includes('hirunews')) return <img src="/images/hiru.jpg" alt="News First" className="h-6 w-6" />;
  
  // Default icon for other sources
  return <Globe className="h-6 w-6" />;
};

const NewsDetail: FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  const id = params.get("id");

  let [news, setNews] = useState<NewsDetailType | null>(null);
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

  news = dummy[0]; // For testing purposes, remove this line in production
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
                    : (news.date_published as { $date: string }).$date
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
          <section className="pt-6">
            

            {!isGroup ? (
              <div className="flex items-center gap-2">
                {getSourceIcon(news.source)}
                <span>{shortenUrl(news.source)}</span>
              </div>
            ) : uniqueSources.length > 0 ? (
              <div className="flex flex-wrap gap-4">
                {uniqueSources.map((source, idx) => (
                  <a
                    key={idx}
                    href={source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center hover:opacity-80 transition-opacity"
                    title={shortenUrl(source)}
                  >
                    <div className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
                      {getSourceIcon(source)}
                    </div>
                    
                  </a>
                ))}
              </div>
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
