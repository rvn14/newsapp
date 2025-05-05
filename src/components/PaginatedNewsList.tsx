"use client";

import { useState } from "react";
import EverythingCard from "./EverythingCard";

interface Article {
  url: string;
  content: string;
  category: string;
  id: string;
  source: string;
  cover_image: string;
  date_published: string | { $date: string };
  title: string;
  week: string;
}

interface NewsItem {
  _id: string;
  id: string;
  category: string;
  url: string;
  source: string;
  cover_image: string;
  date_published: string;
  short_summary: string;
  long_summary: string;
  representative_title?: string;
  title: string;
  group_id?: string | null;
  articles?: Article[];
}

interface PaginatedNewsListProps {
  newsItems: NewsItem[];
}

const PaginatedNewsList = ({ newsItems }: PaginatedNewsListProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12; // 3x4 grid
  const maxPageButtons = 15; // Maximum number of page buttons to show at once

  // Pagination calculations
  const totalPages = Math.ceil(newsItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newsItems.slice(indexOfFirstItem, indexOfLastItem);

  // Function to determine which page buttons to show
  const getPageButtons = () => {
    // If total pages is less than or equal to max buttons, show all pages
    if (totalPages <= maxPageButtons) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // Calculate how many buttons to show on each side of current page
    const sideButtons = Math.floor((maxPageButtons - 5) / 2); // 5 for first, last, current, and 2 ellipses
    let startPage = Math.max(2, currentPage - sideButtons);
    let endPage = Math.min(totalPages - 1, currentPage + sideButtons);
    
    // Adjust if we're near the start or end
    if (currentPage - sideButtons < 2) {
      endPage = Math.min(totalPages - 1, 1 + maxPageButtons - 3); // -3 for first, last, and one ellipsis
    }
    if (currentPage + sideButtons > totalPages - 1) {
      startPage = Math.max(2, totalPages - maxPageButtons + 3); // +3 for first, last, and one ellipsis
    }
    
    const pages: (number | string)[] = [1]; // Always include first page
    
    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pages.push('...');
    }
    
    // Add pages around current page
    for (let i = startPage; i <= endPage; i++) {
      if (i !== 1 && i !== totalPages) { // Avoid duplicates
        pages.push(i);
      }
    }
    
    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pages.push('...');
    } else if (endPage === totalPages - 1) {
      pages.push(totalPages - 1);
    }
    
    // Always include last page
    pages.push(totalPages);
    
    return pages;
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: document.getElementById('latest-news-grid')?.offsetTop || 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <div id="latest-news-grid" className="flex justify-center items-center mb-8 p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {currentItems.map((element, index) => {
            const isGroup = Boolean(element.group_id);

            if (
              isGroup &&
              (!element.articles || element.articles.length === 0)
            ) {
              return null;
            }

            const urls = isGroup
              ? element.articles!.map((article) => article.url).join(",")
              : element.url;

            const newsProviders = isGroup
              ? element.articles!.map((article) => article.source).join(",")
              : element.source;

            return (
              <EverythingCard
                key={index}
                title={
                  isGroup
                    ? element.representative_title || ""
                    : element.title || ""
                }
                description={element.short_summary}
                summary={element.long_summary}
                imgUrl={
                  isGroup
                    ? element.articles![0].cover_image ||
                      "https://placehold.co/600x400?text=News+Image"
                    : element.cover_image ||
                      "https://placehold.co/600x400?text=News+Image"
                }
                publishedDate={
                  isGroup
                    ? typeof element.articles![0].date_published === "string"
                      ? element.articles![0].date_published
                      : (
                          element.articles![0].date_published as {
                            $date: string;
                          }
                        ).$date.toString()
                    : typeof element.date_published === "string"
                    ? element.date_published
                    : (
                        element.date_published as {
                          $date: string;
                        }
                      ).$date.toString()
                }
                newsProvider={newsProviders ?? null}
                source={urls ?? ""}
                id={element.id}
                category={element.category}
              />
            );
          })}
        </div>
      </div>
      
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="flex flex-wrap items-center justify-center gap-2">
            <button 
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-primary text-white dark:text-darkprimary cursor-pointer disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {getPageButtons().map((page, index) => (
              typeof page === 'number' ? (
                <button 
                  key={index}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded ${currentPage === page ? 'bg-primary text-white cursor-pointer dark:text-darkprimary' : 'cursor-pointer bg-white text-primary dark:text-darkprimary border border-primary'}`}
                >
                  {page}
                </button>
              ) : (
                <span key={index} className="px-2">...</span>
              )
            ))}
            
            <button 
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-primary text-white cursor-pointer dark:text-darkprimary disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </>
  );
};

export default PaginatedNewsList;
