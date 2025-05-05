"use client"

// InfiniteCarousel.tsx
import { FC, useRef, useEffect } from "react";

interface Article {
  id: string;
  title: string;
  url: string;
  cover_image: string;
  date_published: string;
  content: string;
  source: string;
  category: string;
}

interface InfiniteCarouselProps {
  /** Scroll speed in pixels per animation frame (default: 0.5) */
  speed?: number;
  /** Array of grouped news data */
  data: {
    _id: string;
    group_id: string;
    representative_title?: string;
    articles: Article[];
    title?: string;
    // [key: string]: any;
  }[];
}

const InfiniteCarousel: FC<InfiniteCarouselProps> = ({ data, speed = 0.5 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    // Start scrolling once dimensions are ready
    const startScroll = () => {
      const maxScroll = container.scrollWidth / 2;
      const step = () => {
        if (!container) return;
        let next = container.scrollLeft + speed;
        if (next >= maxScroll) next -= maxScroll;
        container.scrollLeft = next;
        animationFrameId = requestAnimationFrame(step);
      };
      animationFrameId = requestAnimationFrame(step);
    };

    // Kick off after a slight delay to ensure render
    const id = requestAnimationFrame(startScroll);
    return () => {
      cancelAnimationFrame(id);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed, data]);

  return (
    <div ref={containerRef} className="overflow-hidden whitespace-nowrap">
      <div className="flex flex-nowrap items-center justify-start gap-4">
        {/* Duplicate items to loop seamlessly - limited to 9 elements each */}
        {[...data.slice(0, 9), ...data.slice(0, 9)].map((element, index) => {
          const isGroup = Boolean(element.group_id);
          if (isGroup && (!element.articles || element.articles.length === 0)) {
            return null;
          }

          return (
            <div key={`${element._id}-${index}`} className="p-4 bg-muted dark:bg-darkprimary shadow-md">
              {isGroup
                ? element.representative_title || ""
                : element.title || ""}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InfiniteCarousel;
