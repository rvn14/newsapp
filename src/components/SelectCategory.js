import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
export function SelectCategory() {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedCategory, setSelectedCategory] = React.useState("");
    // Reset selection when on root path
    React.useEffect(() => {
        if (location.pathname === '/') {
            setSelectedCategory("");
        }
    }, [location.pathname]);
    const categories = [
        "General",
        "Health",
        "Science",
        "Sports",
        "Technology",
        "Politics",
    ];
    return (_jsx("div", { className: 'w-full bg-transparent', children: _jsxs(Select, { value: selectedCategory, onValueChange: (value) => {
                setSelectedCategory(value);
                navigate(`/top-headlines/${value}`);
            }, children: [_jsx(SelectTrigger, { className: "bg-transparent dark:bg-darkprimary w-full text-white font-normal text-md select-none focus:outline-none focus-visible:ring-0 focus:border-0 border-0 focus:ring-0 cursor-pointer", children: _jsx(SelectValue, { className: "text-white bg-transparent", placeholder: "More" }) }), _jsx(SelectContent, { className: "border-0 bg-darkprimary text-white", children: categories.map((category, index) => (_jsx(SelectItem, { value: category, className: "focus-within:bg-white/10 hover:bg-white/10 focus:bg-white/5 focus:text-white cursor-pointer", children: _jsx("span", { className: "flex gap-3 capitalize text-white", children: category }) }, index))) })] }) }));
}
