import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// LatestNews.tsx
import { useState, useEffect } from "react";
import EverythingCard from "./EverythingCard";
import Loader from "./Loader";
// import { dummy } from "../assets/dummyData";
// // import NewsSlider from "./NewsSlider";
import InfiniteCarousel from "./NewsSlider";
const LatestNews = () => {
    // const dummyData = dummy;
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        setIsLoading(true);
        setError(null);
        console.log("Fetching data..."); // 🟡 Step 1: Starting fetch
        fetch("/api/latest-news")
            .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            console.log("Response received"); // 🟢 Step 2: Got a response
            return response.json();
        })
            .then((json) => {
            console.log("Parsed JSON:", json);
            if (json.success) {
                console.log("Setting data with:", json.data);
                setData(json.data);
            }
            else {
                setError(json.message || "An error occurred");
            }
        })
            .catch((err) => {
            console.error("Fetch error:", err);
            setError("Failed to fetch news. Please try again later.");
        })
            .finally(() => {
            console.log("Fetch process complete");
            setIsLoading(false);
        });
    }, []);
    return (_jsxs("div", { className: "bg-background p-16", children: [error && _jsx("div", { className: "text-red-500 mb-4", children: error }), _jsx("div", { className: "w-full m-4", children: !isLoading && _jsx(InfiniteCarousel, { data: data, speed: 0.5 }) }), _jsxs("div", { className: "font-semibold justify-center w-full items-center mb-8", children: [!isLoading && (_jsx("div", { className: "w-fit flex text-3xl font-bold font-inter", children: _jsx("span", { children: "Latest News" }) })), !isLoading && (_jsx("div", { className: "border-1 border-primary w-full opacity-60 mb-8" }))] }), _jsx("div", { className: "flex justify-center items-center mb-8 p-10", children: _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 ", children: !isLoading ? (data.map((element, index) => {
                        const isGroup = Boolean(element.group_id);
                        if (isGroup &&
                            (!element.articles || element.articles.length === 0)) {
                            return null;
                        }
                        const urls = isGroup
                            ? element.articles.map((article) => article.url).join(",")
                            : element.url;
                        const newsProviders = isGroup
                            ? element.articles.map((article) => article.source).join(",")
                            : element.source;
                        return (_jsx(EverythingCard, { title: isGroup
                                ? element.representative_title || ""
                                : element.title || "", description: element.short_summary, summary: element.long_summary, imgUrl: isGroup
                                ? element.articles[0].cover_image ||
                                    "https://placehold.co/600x400?text=News+Image"
                                : element.cover_image ||
                                    "https://placehold.co/600x400?text=News+Image", publishedDate: isGroup
                                ? typeof element.articles[0].date_published === "string"
                                    ? element.articles[0].date_published
                                    : element.articles[0].date_published.$date
                                : typeof element.date_published === "string"
                                    ? element.date_published
                                    : element.date_published, newsProvider: newsProviders ?? null, source: urls ?? "", id: element.id, category: element.category }, index));
                    })) : (_jsx(Loader, {})) }) })] }));
};
export default LatestNews;
