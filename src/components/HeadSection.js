import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { SelectCategory } from './SelectCategory';
import { ModeToggle } from './moed-trigger';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { FaInstagram, FaFacebook, FaXTwitter, FaYoutube } from "react-icons/fa6";
const HeadSection = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentDate, setCurrentDate] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const date = new Date();
        setCurrentDate(date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }));
    }, []);
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
            setSearchTerm("");
        }
    };
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };
    return (_jsxs("div", { className: 'text-white w-full', children: [_jsxs("div", { className: "dateBar flex justify-between items-center bg-darkprimary p-6 py-2", children: [_jsx("div", { className: 'text-sm font-light', children: currentDate }), _jsxs("div", { className: 'flex gap-3', children: [" ", _jsx(FaInstagram, { className: 'cursor-pointer' }), _jsx(FaFacebook, { className: 'cursor-pointer' }), _jsx(FaXTwitter, { className: 'cursor-pointer' }), _jsx(FaYoutube, { className: 'cursor-pointer' }), "  "] })] }), _jsx("div", { className: 'bg-red-900 flex justify-center items-center p-4 w-full h-48', style: { backgroundImage: "url('/images/cover2.jpg')", backgroundSize: "cover", backgroundPosition: "center" }, children: _jsx("div", { className: 'logo font-mono font-semibold text-6xl', children: "NEWS SCRAPER" }) }), _jsxs("div", { className: 'flex justify-between items-center bg-darkprimary px-4', children: [_jsx("div", { children: _jsxs("ul", { className: 'flex items-center', children: [_jsx("li", { className: 'nav-link', children: _jsx(Link, { to: "/", children: "Home" }) }), _jsx("li", { className: 'nav-link', children: _jsx(Link, { to: `/top-headlines/Business`, children: "Business" }) }), _jsx("li", { className: 'nav-link', children: _jsx(Link, { to: `/top-headlines/Entertainment`, children: "Entertainment" }) }), _jsxs("li", { className: 'bg-transparent', children: [" ", _jsx(SelectCategory, {}), " "] })] }) }), _jsxs("div", { className: 'flex items-center gap-4', children: [_jsx("div", { children: _jsx("form", { onSubmit: handleSearch, className: "flex items-center", children: _jsxs("div", { className: "search-container", children: [_jsx("input", { type: "text", value: searchTerm, onChange: handleInputChange, placeholder: "Search news...", className: "p-2 px-6 focus:outline-none focus:ring-0 bg-white/3 rounded-l-md" }), _jsx("button", { type: "submit", className: " bg-white/3 text-white p-2 px-6 hover:bg-white/5 transition-colors duration-100 cursor-pointer rounded-r-md", children: _jsx(Search, { className: 'text-white' }) })] }) }) }), _jsx(ModeToggle, {})] })] })] }));
};
export default HeadSection;
