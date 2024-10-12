import React, { useState } from 'react';
import { FaNoteSticky } from "react-icons/fa6";
import { useUser } from '../UserContext';

const Search = ({ placevalue, notes }) => {
    const [searchOpen, setSearchOpen] = useState(false);
    const [search, setSearchValue] = useState("");
    const {settingTitle} = useUser()
    const handleSearchSubmit = (e) =>{
        let search1 = document.querySelector('.searchh1');
        settingTitle(search1.textContent) 
        setSearchOpen(!searchOpen)       
    }
    const setopen = () => {
        setSearchOpen(!searchOpen);
    };

    const highlightMatch = (title, searchTerm) => {
        if (!searchTerm) return title;

        const parts = title.split(new RegExp(`(${searchTerm})`, 'gi'));

        return parts.map((part, index) =>
            part.toLowerCase() === searchTerm.toLowerCase() ? (
                <span key={index} className="text-blue-300 font-semibold">
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    return (
        <div>
            <label className="input  input-bordered flex items-center gap-2 relative">
                <input 
                    type="text" 
                    className="grow msearch" 
                    onClick={setopen} 
                    value={search} 
                    onChange={(e) => setSearchValue(e.target.value)}  
                    placeholder={placevalue} 

                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd" />
                </svg>
            </label>
            {searchOpen && search && (
                <div className='w-full shadow-xl rounded-br-lg rounded-bl-lg p-2 flex flex-col gap-2 min-h-[5vh] bg-[#262e38]'>
                    <div className="flex p-2 gap-2 items-center">
                        <FaNoteSticky size={25}/>
                        <h1 className='text-xl font-[500] text-white'>Your Notes</h1>
                    </div>
                    {notes
                        .filter((note) => note.title.toLowerCase().includes(search.toLowerCase()))
                        .map((filteredNote) => (
                            <h1 
                                key={filteredNote.title} 
                                className='hover:bg-[#364250] border-t border-t-[#364250] p-2 cursor-pointer searchh1' onClick={(e) =>handleSearchSubmit(e)}
                            >
                                {highlightMatch(filteredNote.title, search)}
                            </h1>
                        ))
                    }
                </div>
            )}
        </div>
    );
};

export default Search;
