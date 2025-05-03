// EverythingCard.tsx
import { ArrowBigRight, ArrowRightIcon } from "lucide-react";
import React, { FC } from "react";
import { Link } from "react-router-dom";
  
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

const EverythingCard: FC<EverythingCardProps> = ({ 
  title, 
  imgUrl, 
  description, 
  category, 
  id, 
  publishedDate, 
  newsProvider, 
  author, 
  url 
}) => {
  // Format the date to be more readable
  const formattedDate = new Date(publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  return (
    <div className="shadow-lg rounded-lg overflow-hidden bg-white dark:bg-darkprimary w-full hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-800">
      {/* Image section with category badge */}
      <div className="relative overflow-hidden ">
        <img
          className="object-cover w-full object-center max-h-48 min-h-48 hover:scale-103 transition-transform duration-300"
          src={imgUrl}
          alt={title}
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/600x400?text=News+Image';
          }}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-red-600 text-white px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider">
            {category}
          </span>
        </div>
      </div>
      
      {/* Content section */}
      <div className="p-5 flex flex-col gap-2">
        {/* Title */}
        <h2 className="font-serif font-bold text-xl mb-2 line-clamp-2 text-gray-800 dark:text-white">
          {title}
        </h2>
        
        {/* Meta information */}
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
          
          <span className="mr-3">{formattedDate}</span>
          
        </div>
        
        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {description}
        </p>
        
        {/* Read more link */}
        <div className="mt-auto pt-2">
          <Link 
            to={`/news?category=${category}&id=${id}`}
            className="text-red-600 dark:text-red-400 text-sm font-medium hover:underline flex items-end"
          >
            Read full story
            <ArrowRightIcon size={14 }/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EverythingCard;