import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// NewsDetail.tsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// Helper to shorten a URL to its base domain
const shortenUrl = (url) => {
    try {
        const parsed = new URL(url);
        return parsed.origin;
    }
    catch (err) {
        console.error("URL parsing error:", err);
        return url;
    }
};
// Helper to format date from ISO string to readable format
const formatDate = (dateString) => {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    }
    catch (err) {
        console.error("Date formatting error:", err);
        return dateString;
    }
};
const NewsDetail = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    const id = params.get("id");
    const [news, setNews] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (!category || !id) {
            setError("Invalid news details");
            setIsLoading(false);
            return;
        }
        (async () => {
            try {
                const res = await fetch(`/api/news?category=${encodeURIComponent(category)}&id=${encodeURIComponent(id)}`);
                const json = await res.json();
                if (json.success)
                    setNews(json.data);
                else
                    setError(json.message || "News not found");
            }
            catch (err) {
                console.error("Fetch error:", err);
                setError("Failed to fetch news");
            }
            finally {
                setIsLoading(false);
            }
        })();
    }, [category, id]);
    // if (isLoading)
    //   return <p className="text-center text-white text-lg">Loading...</p>;
    // if (error)
    //   return <p className="text-center text-red-400 text-lg">{error}</p>;
    if (!news)
        return (_jsx("p", { className: "text-center text-red-400 text-lg", children: "No news details available." }));
    const isGroup = Boolean(news.group_id);
    const mainArticle = news.articles?.find((a) => a.id === news.id);
    const uniqueArticleUrls = [
        ...new Set(news.articles?.map((a) => a.url) ?? []),
    ];
    const uniqueSources = [
        ...new Set(news.articles?.map((a) => a.source) ?? []),
    ];
    return (_jsx("div", { className: "min-h-screen w-full flex flex-col items-center bg-background p-4 md:p-6", children: !isLoading && (_jsxs("div", { className: "w-full max-w-4xl  mx-auto pb-16", children: [category && (_jsxs("div", { className: "mb-4 flex justify-between items-center", children: [_jsx("span", { className: "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-800 text-white shadow-sm", children: category }), _jsx("span", { className: "", children: formatDate(isGroup
                                ? typeof news.articles[0].date_published === "string"
                                    ? news.articles[0].date_published
                                    : news.articles[0].date_published
                                        .$date
                                : typeof news.date_published === "string"
                                    ? news.date_published
                                    : news.date_published.$date) })] })), _jsx("h1", { className: "text-3xl sm:text-5xl font-black pb-4 sm:pb-6 leading-tight", style: { fontFamily: "'Noto Sans Sinhala', sans-serif" }, children: isGroup ? news.representative_title : news.title }), (isGroup
                    ? news.articles && news.articles[0].cover_image
                    : news.cover_image) && (_jsx("div", { className: "w-full flex justify-center mb-8", children: _jsx("img", { className: "w-full max-w-md h-auto object-cover rounded-lg shadow-lg", src: isGroup ? news.articles[0].cover_image : news.cover_image, alt: mainArticle?.title ?? "News cover image", onError: (e) => {
                            e.target.src = "/fallback-image.jpg";
                        } }) })), _jsx("section", { className: "pt-4 w-full", children: _jsx("p", { className: " leading-relaxed", children: news.long_summary }) }), _jsxs("section", { className: "mb-8", children: [_jsx("h2", { className: "text-xl font-semibold mb-3", children: "News Provider" }), !isGroup ? (_jsx("div", { children: news.source })) : uniqueSources.length > 0 ? (_jsx("ul", { className: "space-y-2", children: uniqueSources.map((source, idx) => (_jsx("li", { children: _jsx("a", { href: source, target: "_blank", rel: "noopener noreferrer", className: "text-blue-400 hover:text-blue-300 transition-colors duration-200 underline", children: shortenUrl(source) }) }, idx))) })) : (_jsx("p", { className: "text-gray-400", children: "No source available" }))] })] })) }));
};
export default NewsDetail;
