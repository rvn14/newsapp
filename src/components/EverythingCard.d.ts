import { FC } from "react";
interface EverythingCardProps {
    title: string;
    description: string;
    summary: string;
    imgUrl: string;
    publishedDate: string;
    newsProvider: string | null;
    source: string;
    id: string;
    category: string;
    url?: string | null;
    author?: string | null;
}
declare const EverythingCard: FC<EverythingCardProps>;
export default EverythingCard;
