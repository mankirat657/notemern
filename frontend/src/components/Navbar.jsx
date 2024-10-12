import React, { useEffect } from 'react';
import { IoBookSharp } from "react-icons/io5";
import Search from './Search';
import { useLocation, useNavigate } from 'react-router-dom';
import { getInitials } from '../utils/helper';
import { useUser } from '../UserContext';
import { IoOptionsSharp } from "react-icons/io5";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation().pathname;
    const { user, profileopenn, pfopen, getpf } = useUser();
    
    const handleprofileSubmit = () => {
        profileopenn(!pfopen);
    };

    useEffect(() => {
        // Store username in localStorage
        if (user && user.name) {
            localStorage.setItem('username', user.name); 
        }
        
        // Store the profile image in localStorage
        if (getpf) {
            localStorage.setItem('userAvatar', getpf);
        }
    }, [user, getpf]);

    const username = localStorage.getItem("username");
    const userAvatar = localStorage.getItem("userAvatar"); // Retrieve the image URL from localStorage

    const handlelogout = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }, 
                credentials: 'include'
            });
            if (response.ok) {
                localStorage.removeItem("username"); 
                localStorage.removeItem("userAvatar"); // Clear the avatar from localStorage on logout
                navigate("/login");
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <div className="navbar w-full bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Me Notes</a>
                <IoBookSharp size={25} />
            </div>
            {location === "/signUp" || location === "/login" ? "" :
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="User Avatar"
                                    src={userAvatar || getpf} // Use localStorage avatar or fallback to getpf
                                />
                            </div>
                        </div>
                        <ul onClick={handleprofileSubmit}
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">
                                    {getInitials(`${username}`)}
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a onClick={handlelogout}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            }
        </div>
    );
};

export default Navbar;
