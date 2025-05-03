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

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <HeadSection />
          <Routes>
            <Route path="/" element={<LatestNews />} />
            <Route path="/top-headlines/:category" element={<TopHeadlines />} />
            <Route path="/news" element={<NewsDetail />} />
            <Route path="/search" element={<Search />} />
          </Routes>
          <Footer />
        </BrowserRouter>
    </ThemeProvider>

  );
}

export default App;
