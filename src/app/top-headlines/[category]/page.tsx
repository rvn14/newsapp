import EverythingCard from "@/components/EverythingCard";
import InfiniteCarousel from "@/components/NewsSlider";
import { dummy } from "@/utils/dummyData";

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

interface PageProps {
  params: {
    category: string;
  };
}

export default async function TopHeadlines({ params }: PageProps) {
  const category = params.category.charAt(0).toUpperCase() + params.category.slice(1);
  
  let data: TopHeadlineItem[] = [];
  let error = null;
  
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/news?category=${encodeURIComponent(
        category || "general"
      )}`,
      { cache: 'no-store' }
    );
    
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    
    const json = await response.json();
    
    if (json.success) {
      data = json.data;
    } else {
      error = json.message || "An error occurred";
      data = dummy.filter(
        (item) => item.category === category || item.group_id === category
      );
    }
  } catch (err) {
    console.error("Fetch error:", err);
    error = "Failed to fetch news. Please try again later.";
    data = dummy.filter(
      (item) => item.category === category || item.group_id === category
    );
  }
  
  return (
    <div className="bg-background p-2 md:p-16">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="font-semibold justify-center w-full items-center mb-8">
        <div className="w-fit flex text-3xl font-bold font-inter">
          <span>{category} News</span>
        </div>
        <div className="border-1 border-primary w-full opacity-60 mb-8"></div>
      </div>
      <div className="flex justify-center items-center mb-8 p-2 md:p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 ">
          {data.map((element, index) => {
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
                    ? element.articles?.[0]?.cover_image || "/images/News_web.jpg"
                    : element.cover_image || "/images/News_web.jpg"
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
          })}
        </div>
      </div>
    </div>
  );
}
