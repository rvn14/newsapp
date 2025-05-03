// Header.tsx
import React, { FC, useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowDown, faHouse } from "@fortawesome/free-solid-svg-icons";

const Header: FC = () => {
  const [active, setActive] = useState<boolean>(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>("light-theme");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();

  const categories: string[] = [
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

  const toggleTheme = (): void => {
    setTheme(prev => (prev === "light-theme" ? "dark-theme" : "light-theme"));
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  return (
    <header>
      <nav className="pl-2 pr-2 fixed top-0 left-0 w-full h-auto bg-white/5 z-10 flex items-center justify-between px-8">
        <div className="pl-2 flex items-center md:basis-1/6 sm:basis-1/4 basis-1/3 ">
          <Link to="/" className="group">
            <FontAwesomeIcon icon={faHouse} className="text-4xl" />
          </Link>
        </div>

        {/* Search Bar (Middle) */}
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-container">
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Search news..."
              className="search-input"
            />
            <button
              type="submit"
              className="search-button bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition-colors duration-300"
            >
              Search
            </button>
          </div>
        </form>

        {/* Navigation Links (Right) */}
        <ul
          className={
            active
              ? "nav-ul flex gap-11 md:gap-14 xs:gap-12 lg:basis-3/6 md:basis-4/6 md:justify-end active"
              : "nav-ul flex gap-14 lg:basis-3/6 md:basis-4/6 justify-end"
          }
        >
          <li>
            <Link
              to="/"
              className="no-underline font-semibold text-white"
              onClick={() => setActive(prev => !prev)}
            >
              All News
            </Link>
          </li>
          <li className="dropdown-li">
            <Link
              to="#"
              className="no-underline font-semibold text-white flex items-center gap-2"
              onClick={() => setShowCategoryDropdown(prev => !prev)}
            >
              Top-Headlines
              <FontAwesomeIcon
                className={
                  showCategoryDropdown
                    ? "down-arrow-icon down-arrow-icon-active"
                    : "down-arrow-icon"
                }
                icon={faCircleArrowDown}
              />
            </Link>
            <ul
              className={
                showCategoryDropdown
                  ? "dropdown p-2 show-dropdown bg-gray-700"
                  : "dropdown p-2 bg-gray-700"
              }
            >
              {categories.map((element, index) => (
                <li
                  key={index}
                  onClick={() => setShowCategoryDropdown(prev => !prev)}
                >
                  <Link
                    to={`/top-headlines/${element}`}
                    className="flex gap-3 capitalize text-white"
                    onClick={() => setActive(prev => !prev)}
                  >
                    {element}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <Link className="no-underline font-semibold text-white" to="/">
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="no-underline font-semibold text-white"
              onClick={toggleTheme}
            >
              <input type="checkbox" className="checkbox" id="checkbox" />
              <label htmlFor="checkbox" className="checkbox-label">
                <i className="fas fa-moon"></i>
                <i className="fas fa-sun"></i>
                <span className="ball"></span>
              </label>
            </Link>
          </li>
        </ul>

        {/* Hamburger Menu */}
        <div
          className={
            active
              ? "ham-burger z-index-100 ham-open"
              : "ham-burger z-index-100"
          }
          onClick={() => setActive(prev => !prev)}
        >
          <span className="lines line-1"></span>
          <span className="lines line-2"></span>
          <span className="lines line-3"></span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
