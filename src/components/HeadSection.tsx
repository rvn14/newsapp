import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import { SelectCategory } from './SelectCategory'
import { ModeToggle } from './moed-trigger'
import { Link, useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { FaInstagram, FaFacebook, FaXTwitter, FaYoutube } from "react-icons/fa6";

const HeadSection = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [currentDate, setCurrentDate] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        const date = new Date();
        setCurrentDate(date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }));
    }, []);

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
    <div className='text-white w-full'>
        <div className="dateBar flex justify-between items-center bg-darkprimary p-6 py-2">
            <div className='text-sm font-light'>{currentDate}</div>
            <div className='flex gap-3'> <FaInstagram className='cursor-pointer'/><FaFacebook className='cursor-pointer' /><FaXTwitter className='cursor-pointer' /><FaYoutube className='cursor-pointer' />  </div>
        </div>
        <div className='bg-red-900 flex justify-center items-center p-4 w-full h-48' style={{backgroundImage: "url('/images/cover2.jpg')", backgroundSize: "cover", backgroundPosition: "center"}}>
            <div className='logo font-mono font-semibold text-6xl'>NEWS SCRAPER</div>

        </div>
        <div className='flex justify-between items-center bg-darkprimary px-4'>
            <div>
                <ul className='flex items-center'>
                    <li className='nav-link'><Link to="/">Home</Link></li>
                    <li className='nav-link'><Link to={`/top-headlines/Business`}>Business</Link></li>
                    <li className='nav-link'><Link to={`/top-headlines/Entertainment`}>Entertainment</Link></li>
                    <li className='bg-transparent'> <SelectCategory/> </li>
                </ul>
            </div>
            <div className='flex items-center gap-4'>
                <div>
                    <form onSubmit={handleSearch} className="flex items-center">
                        <div className="search-container">
                        <input
                        type="text"
                        value={searchTerm}
                        onChange={handleInputChange}
                        placeholder="Search news..."
                        className="p-2 px-6 focus:outline-none focus:ring-0 bg-white/3 rounded-l-md"
                        />
                        <button
                        type="submit"
                        className=" bg-white/3 text-white p-2 px-6 hover:bg-white/5 transition-colors duration-100 cursor-pointer rounded-r-md"
                        >
                        <Search className='text-white'/>
                        </button>
                    </div>
                    </form>
                </div>
                <ModeToggle/>
            </div>
        </div>
    </div>
  )
}

export default HeadSection