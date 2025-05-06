import { FC } from "react";
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
    }[];
}
declare const InfiniteCarousel: FC<InfiniteCarouselProps>;
export default InfiniteCarousel;
