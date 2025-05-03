// TopHeadlines.tsx
import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EverythingCard from "./EverythingCard";
import Loader from "./Loader";
import InfiniteCarousel from "./NewsSlider";

interface Article {
  url: string;
  content: string;
  category: string;
  id: string;
  source: string;
  cover_image: string;
  date_published: string | { $date: string };
  title: string;
  week: string;
}

interface TopHeadlineItem {
  _id: string;
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

const TopHeadlines: FC = () => {
  const { category } = useParams<{ category: string }>();
  const [data, setData] = useState<TopHeadlineItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(
      `http://localhost:8000/news?category=${encodeURIComponent(
        category || "general"
      )}`
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
  }, [category]);

  return (
    <div className="bg-background p-16">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="w-full m-4">
        {!isLoading && <InfiniteCarousel data={data} speed={0.5} />}
      </div>
      <div className="font-semibold justify-center w-full items-center mb-8">
        {!isLoading && (
          <div className="w-fit flex text-3xl font-bold font-inter">
            <span>{category} News</span>
          </div>
        )}
        {!isLoading && (
          <div className="border-1 border-primary w-full opacity-60 mb-8"></div>
        )}
      </div>
      <div className="flex justify-center items-center mb-8 p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 ">
          {!isLoading ? (
            data.map((element, index) => {
              const isGroup = Boolean(element.group_id);

              if (
                isGroup &&
                (!element.articles || element.articles.length === 0)
              ) {
                return null;
              }

              const urls = isGroup
                ? element.articles!.map((article) => article.url).join(",")
                : element.url;

              const newsProviders = isGroup
                ? element.articles!.map((article) => article.source).join(",")
                : element.source;

              return (
                <EverythingCard
                  key={index}
                  title={
                    isGroup
                      ? element.representative_title || ""
                      : element.title || ""
                  }
                  description={element.short_summary}
                  summary={element.long_summary}
                  imgUrl={
                    isGroup
                      ? element.articles![0].cover_image ||
                        "https://placehold.co/600x400?text=News+Image"
                      : element.cover_image ||
                        "https://placehold.co/600x400?text=News+Image"
                  }
                  publishedDate={
                    isGroup
                      ? typeof element.articles![0].date_published === "string"
                        ? element.articles![0].date_published
                        : (
                            element.articles![0].date_published as {
                              $date: string;
                            }
                          ).$date
                      : typeof element.date_published === "string"
                      ? element.date_published
                      : element.date_published.$date
                  }
                  newsProvider={newsProviders ?? null}
                  source={urls ?? ""}
                  id={element.id}
                  category={element.category}
                />
              );
            })
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default TopHeadlines;
