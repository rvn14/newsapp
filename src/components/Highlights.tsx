
import Image from 'next/image'

// Define a type for news items
interface NewsItem {
  category?: string;
  title?: string;
  representative_title?: string;
  cover_image?: string;
  date_published?: string | { $date: string } | null;
  group_id?: string;
  articles?: Array<{
    cover_image?: string;
    date_published?: string | { $date: string } | null;
  }>;
}

interface HighlightsProps {
  isLoading: boolean;
  dummy: NewsItem[];
}

const Highlights = ({ isLoading, dummy }: HighlightsProps) => {
    const dummyData = dummy || [];
    
    const politicNews = dummyData.find((item) => item?.category === "Politics")
    const businessNews = dummyData.find((item) => item?.category === "Business")
    const sportsNews = dummyData.find((item) => item?.category === "Sports")
    const scienceNews = dummyData.find((item) => item?.category === "Science")
    const healthNews = dummyData.find((item) => item?.category === "Health")
    const technologyNews = dummyData.find((item) => item?.category === "Technology")

    const otherNews = [
      businessNews,
      sportsNews,
      scienceNews,
      healthNews,
      technologyNews,
    ].filter(Boolean);
    
    // Format date helper function
    const formatDate = (dateValue: string | { $date: string } | null | undefined): string => {
      if (!dateValue) return "Unknown date";
      
      try {
        let dateObj: Date;
        if (typeof dateValue === "string") {
          dateObj = new Date(dateValue);
        } else if (dateValue.$date) {
          dateObj = new Date(dateValue.$date);
        } else {
          return "Invalid date";
        }
        
        // Check if date is valid
        if (isNaN(dateObj.getTime())) {
          return "Invalid date";
        }
        
        // Return formatted date: Jan 1, 2023
        return dateObj.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric'
        });
      } catch (error) {
        console.error("Error formatting date:", error);
        return "Invalid date";
      }
    }
    
    // Get the appropriate date value based on structure
    const getPublishedDate = (): string => {
      if (politicNews?.group_id && politicNews?.articles?.[0]?.date_published) {
        return formatDate(politicNews.articles[0].date_published);
      } else if (politicNews?.date_published) {
        return formatDate(politicNews.date_published);
      }
      return "Unknown date";
    }

    return (
    <div className='flex flex-col md:flex-row items-start justify-center gap-16 max-w-7xl mx-auto'>
      {/* Main featured news */}
      <div className="mainNews relative w-full md:w-[600px] h-[550px] overflow-hidden rounded-sm">
        <div className="relative w-full h-full">
          <Image 
            src={
              politicNews?.group_id
                ? politicNews?.articles?.[0]?.cover_image ||
                  "https://placehold.co/600x400?text=News+Image"
                : politicNews?.cover_image ||
                  "https://placehold.co/600x400?text=News+Image"
            }
            alt={politicNews?.title || "Political news"}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            priority
            className="object-center object-cover"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex gap-2 mb-2">
            <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">{politicNews?.category}</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">{
                    politicNews?.group_id
                      ? politicNews.representative_title || ""
                      : politicNews?.title || ""
                  }</h2>
          <div className="flex items-center text-gray-300 text-sm">
            <span>{getPublishedDate()}</span>
          </div>
        </div>
      </div>
      
      {/* Side news items */}
      <div className='flex flex-col justify-between h-[550px] w-full md:w-1/3'>
        {otherNews.map((news, index) => (
          <div key={`${news?.category}-${index}`} className="flex items-center gap-4 h-24 group cursor-pointer bg-muted rounded-sm pr-4 overflow-auto">
            <div className='relative min-w-36 max-w-36 h-full overflow-hidden bg-red-600'>
              <span className="absolute top-1 left-1 z-10 bg-red-600 text-white text-xs px-2 py-1 rounded">{news?.category}</span>
              <div className="relative w-full h-full">
                <Image 
                  src={
                    news?.group_id
                      ? news?.articles?.[0]?.cover_image ||
                        "https://placehold.co/600x400?text=News+Image"
                      : news?.cover_image ||
                        "https://placehold.co/600x400?text=News+Image"
                  }
                  alt={news?.title || `${news?.category} news`}
                  fill
                  sizes="144px"
                  className="object-center object-cover"
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <h3 className="font-medium text-sm ">{
                      news?.group_id
                        ? news.representative_title || ""
                        : news?.title || ""
                    }</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Highlights