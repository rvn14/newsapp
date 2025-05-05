import { dummy } from "@/utils/dummyData";
import InfiniteCarousel from "@/components/NewsSlider";
import Highlights from "@/components/Highlights";
import PaginatedNewsList from "@/components/PaginatedNewsList"; 

// Consider moving this interface to a shared types file
interface NewsItem {
  id: string | number;
  title: string;
  content?: string;
  summary?: string;
  image?: string;
  publishedAt?: string | Date;
  source?: string;
  url?: string;
  author?: string;
  category?: string;
}

// Already converted to async server component
const HomePage = async () => {
  let data: NewsItem[] = [];
  let error: string | null = null;
  
  try {
    // Server-side data fetching with native fetch API
    const response = await fetch("http://localhost:8000/latest-news", {
      next: { revalidate: 60 } // Optional: revalidate every 60 seconds
    });
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const result = await response.json();
    if (result.success) {
      data = result.data;
    } else {
      error = result.message || "An error occurred";
    }
  } catch (err) {
    console.error("Fetch error:", err);
    error = "Failed to fetch news. Please try again later.";
    // Silently falling back to dummy data
  }
  
  const newsData = data.length > 0 ? data : dummy;

  return (
    <div className="bg-background p-2 md:p-16">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="w-full">
        <InfiniteCarousel data={newsData} speed={0.5} />
      </div>
      <div className="pt-6 pb-16 flex justify-center items-center">
        <Highlights dummy={newsData} />
      </div>
      <div className="font-semibold justify-center w-full items-center mb-8">
        <div className="w-fit flex text-3xl font-bold font-inter">
          <span>Latest News</span>
        </div>
        <div className="border-1 border-primary w-full opacity-60 mb-8"></div>
      </div>
      

      <PaginatedNewsList newsItems={newsData} />
    </div>
  );
};

export default HomePage;
