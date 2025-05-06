import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Header.tsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowDown, faHouse } from "@fortawesome/free-solid-svg-icons";
const Header = () => {
    const [active, setActive] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [theme, setTheme] = useState("light-theme");
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const categories = [
        "Business",
        "Entertainment",
        "General",
        "Health",
        "Science",
        "Sports",
        "Technology",
        "Politics",
    ];
    useEffect(() => {
        document.body.className = theme;
    }, [theme]);
    const toggleTheme = () => {
        setTheme(prev => (prev === "light-theme" ? "dark-theme" : "light-theme"));
    };
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
    return (_jsx("header", { children: _jsxs("nav", { className: "pl-2 pr-2 fixed top-0 left-0 w-full h-auto bg-white/5 z-10 flex items-center justify-between px-8", children: [_jsx("div", { className: "pl-2 flex items-center md:basis-1/6 sm:basis-1/4 basis-1/3 ", children: _jsx(Link, { to: "/", className: "group", children: _jsx(FontAwesomeIcon, { icon: faHouse, className: "text-4xl" }) }) }), _jsx("form", { onSubmit: handleSearch, className: "search-form", children: _jsxs("div", { className: "search-container", children: [_jsx("input", { type: "text", value: searchTerm, onChange: handleInputChange, placeholder: "Search news...", className: "search-input" }), _jsx("button", { type: "submit", className: "search-button bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition-colors duration-300", children: "Search" })] }) }), _jsxs("ul", { className: active
                        ? "nav-ul flex gap-11 md:gap-14 xs:gap-12 lg:basis-3/6 md:basis-4/6 md:justify-end active"
                        : "nav-ul flex gap-14 lg:basis-3/6 md:basis-4/6 justify-end", children: [_jsx("li", { children: _jsx(Link, { to: "/", className: "no-underline font-semibold text-white", onClick: () => setActive(prev => !prev), children: "All News" }) }), _jsxs("li", { className: "dropdown-li", children: [_jsxs(Link, { to: "#", className: "no-underline font-semibold text-white flex items-center gap-2", onClick: () => setShowCategoryDropdown(prev => !prev), children: ["Top-Headlines", _jsx(FontAwesomeIcon, { className: showCategoryDropdown
                                                ? "down-arrow-icon down-arrow-icon-active"
                                                : "down-arrow-icon", icon: faCircleArrowDown })] }), _jsx("ul", { className: showCategoryDropdown
                                        ? "dropdown p-2 show-dropdown bg-gray-700"
                                        : "dropdown p-2 bg-gray-700", children: categories.map((element, index) => (_jsx("li", { onClick: () => setShowCategoryDropdown(prev => !prev), children: _jsx(Link, { to: `/top-headlines/${element}`, className: "flex gap-3 capitalize text-white", onClick: () => setActive(prev => !prev), children: element }) }, index))) })] }), _jsx("li", { children: _jsx(Link, { className: "no-underline font-semibold text-white", to: "/", children: "About Us" }) }), _jsx("li", { children: _jsxs(Link, { to: "#", className: "no-underline font-semibold text-white", onClick: toggleTheme, children: [_jsx("input", { type: "checkbox", className: "checkbox", id: "checkbox" }), _jsxs("label", { htmlFor: "checkbox", className: "checkbox-label", children: [_jsx("i", { className: "fas fa-moon" }), _jsx("i", { className: "fas fa-sun" }), _jsx("span", { className: "ball" })] })] }) })] }), _jsxs("div", { className: active
                        ? "ham-burger z-index-100 ham-open"
                        : "ham-burger z-index-100", onClick: () => setActive(prev => !prev), children: [_jsx("span", { className: "lines line-1" }), _jsx("span", { className: "lines line-2" }), _jsx("span", { className: "lines line-3" })] })] }) }));
};
export default Header;
