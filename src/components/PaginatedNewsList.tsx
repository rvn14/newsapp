"use client";

import { useState, useEffect } from "react";
import EverythingCard from "./EverythingCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [isBrowser, setIsBrowser] = useState<boolean>(false);
  const itemsPerPage = 12; 
  const maxPageButtons = 15; 

  useEffect(() => {
    setIsBrowser(true);
    setScreenWidth(window.innerWidth);
    
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const totalPages = Math.ceil(newsItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newsItems.slice(indexOfFirstItem, indexOfLastItem);

  const getPageButtons = () => {
    const effectiveMaxButtons = isBrowser && screenWidth < 640 ? 5 : maxPageButtons;
    
    if (totalPages <= effectiveMaxButtons) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    const sideButtons = Math.floor((effectiveMaxButtons - 5) / 2); 
    let startPage = Math.max(2, currentPage - sideButtons);
    let endPage = Math.min(totalPages - 1, currentPage + sideButtons);
    
    if (currentPage - sideButtons < 2) {
      endPage = Math.min(totalPages - 1, 1 + effectiveMaxButtons - 3); 
    }
    if (currentPage + sideButtons > totalPages - 1) {
      startPage = Math.max(2, totalPages - effectiveMaxButtons + 3); 
    }
    
    const pages: (number | string)[] = [1]; 
    
    if (startPage > 2) {
      pages.push('...');
    }
    
    for (let i = startPage; i <= endPage; i++) {
      if (i !== 1 && i !== totalPages) { 
        pages.push(i);
      }
    }
    
    if (endPage < totalPages - 1) {
      pages.push('...');
    } else if (endPage === totalPages - 1) {
      pages.push(totalPages - 1);
    }
    
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
      <div id="latest-news-grid" className="flex justify-center items-center  p-4 md:p-10">
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
                      "/images/News_web.jpg"
                    : element.cover_image ||
                      "/images/News_web.jpg"
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
      
      {totalPages > 1 && (
        <div className="flex justify-center py-6 px-2">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  href="#"
                />
              </PaginationItem>
              
              {getPageButtons().map((page, index) => (
                typeof page === 'number' ? (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(page);
                      }}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ) : (
                  <PaginationItem key={index}>
                    <PaginationEllipsis />
                  </PaginationItem>
                )
              ))}
              
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  href="#"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
};

export default PaginatedNewsList;
