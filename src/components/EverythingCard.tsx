// EverythingCard.tsx
import React, { FC } from "react";
  

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

const EverythingCard: FC<EverythingCardProps> = ({ title, imgUrl, description, category, id }) => {
  return (
    <div className="shadow-md rounded-lg overflow-hidden bg-white dark:bg-darkprimary min-w-sm mx-auto min-h-[450px]">
        <div className="relative w-full flex justify-center">
           <img
            className="object-cover w-full min-h-[250px] max-h-[250px]"
            src={imgUrl}
            alt={title}
           />
           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-black/20 p-4 text-white text-lg font-bold line-clamp-2 h-full flex items-end">
            {title}
           </div>
       </div>
       <div>
        <div className="description flex flex-col items-center flex-grow justify-center p-4">
            <p className="text-primary text-lg">
              {description}
            </p>
          </div>
       </div>
    </div>
  );
};

export default EverythingCard;


// {/* <div className="mt-10 pb-10 shadow-lg rounded-lg overflow-hidden border bg-white max-w-sm mx-auto min-h-[450px]">
//       <div className="p-6 pt-8 pr-6 pl-6 flex flex-col h-full">
//         {/* Title */}
//         <b className="title text-lg font-bold text-center line-clamp-2">
//           {title}
//         </b>

//         {/* Image */}
//         <div className="w-full flex justify-center">
//           <img
//             className="w-60 h-48 object-cover rounded"
//             src={imgUrl}
//             alt={title}
//           />
//         </div>

//         {/* Description */}
//         <div className="description flex flex-col items-center flex-grow justify-center">
//           <p className="description-text leading-6 text-gray-700 text-center line-clamp-3">
//             {description}
//           </p>
//         </div>

//         {/* Anchor Link at the bottom */}
//         <div className="flex justify-center mt-auto pt-4">
//           <Link
//             to={`/news?category=${encodeURIComponent(category)}&id=${encodeURIComponent(id)}`}
//             className="text-blue-500 font-semibold text-lg hover:text-blue-700 transition-all duration-300 ease-in-out transform hover:scale-110"
//           >
//             <FontAwesomeIcon icon={faCircleChevronDown} className="text-2xl" />
//           </Link>
//         </div>
//       </div>
//     </div> */}