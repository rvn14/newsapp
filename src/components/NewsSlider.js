import { jsx as _jsx } from "react/jsx-runtime";
// InfiniteCarousel.tsx
import { useRef, useEffect } from "react";
const InfiniteCarousel = ({ data, speed = 0.5 }) => {
    const containerRef = useRef(null);
    useEffect(() => {
        const container = containerRef.current;
        if (!container)
            return;
        let animationFrameId;
        // Start scrolling once dimensions are ready
        const startScroll = () => {
            const maxScroll = container.scrollWidth / 2;
            const step = () => {
                if (!container)
                    return;
                let next = container.scrollLeft + speed;
                if (next >= maxScroll)
                    next -= maxScroll;
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
    return (_jsx("div", { ref: containerRef, className: "overflow-hidden whitespace-nowrap", children: _jsx("div", { className: "flex flex-nowrap items-center justify-start gap-4", children: [...data, ...data].map((element) => {
                const isGroup = Boolean(element.group_id);
                if (isGroup && (!element.articles || element.articles.length === 0)) {
                    return null;
                }
                return (_jsx("div", { className: "p-4 bg-muted dark:bg-darkprimary shadow-md", children: isGroup
                        ? element.representative_title || ""
                        : element.title || "" }));
            }) }) }));
};
export default InfiniteCarousel;
