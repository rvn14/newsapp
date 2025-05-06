import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./App.css";
import LatestNews from "./components/LatestNews";
import Footer from "./components/Footer";
import TopHeadlines from "./components/TopHeadlines";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewsDetail from "./components/NewsDetail";
import Search from "./components/Search";
import HeadSection from "./components/HeadSection";
import { ThemeProvider } from "./components/theme-provider";
function App() {
    // const [count, setCount] = useState(0);
    return (_jsx(ThemeProvider, { defaultTheme: "dark", storageKey: "vite-ui-theme", children: _jsx("div", { className: "min-h-screen w-full", children: _jsxs(BrowserRouter, { children: [_jsx(HeadSection, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(LatestNews, {}) }), _jsx(Route, { path: "/top-headlines/:category", element: _jsx(TopHeadlines, {}) }), _jsx(Route, { path: "/news", element: _jsx(NewsDetail, {}) }), _jsx(Route, { path: "/search", element: _jsx(Search, {}) })] }), _jsx(Footer, {})] }) }) }));
}
export default App;
