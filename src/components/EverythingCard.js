import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// EverythingCard.tsx
import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
const EverythingCard = ({ title, imgUrl, description, category, id, publishedDate, }) => {
    // Format the date to be more readable
    const formattedDate = new Date(publishedDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
    return (_jsxs("div", { className: "shadow-lg rounded-lg overflow-hidden bg-white dark:bg-darkprimary w-full hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-800", children: [_jsxs("div", { className: "relative overflow-hidden ", children: [_jsx("img", { className: "object-cover w-full object-center max-h-48 min-h-48 hover:scale-103 transition-transform duration-300", src: imgUrl, alt: title, onError: (e) => {
                            e.currentTarget.src =
                                "https://placehold.co/600x400?text=News+Image";
                        } }), _jsx("div", { className: "absolute top-4 left-4", children: _jsx("span", { className: "bg-red-600 text-white px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider", children: category }) })] }), _jsxs("div", { className: "p-5 flex flex-col gap-2", children: [_jsx("h2", { className: "font-serif font-bold text-xl mb-2 line-clamp-2 text-gray-800 dark:text-white", children: title }), _jsx("div", { className: "flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3", children: _jsx("span", { className: "mr-3", children: formattedDate }) }), _jsx("p", { className: "text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3", children: description }), _jsx("div", { className: "mt-auto pt-2", children: _jsxs(Link, { to: `/news?category=${category}&id=${id}`, className: "text-red-600 dark:text-red-400 text-sm font-medium hover:underline flex items-end", children: ["Read full story", _jsx(ArrowRightIcon, { size: 14 })] }) })] })] }));
};
export default EverythingCard;
