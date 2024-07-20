import React from 'react';
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        googleLogout();
        navigate('/login');
    }

    return (
        <div className="absolute top-0 p-2 bg-cOrange text-white font-bold text-xl w-full items-center font-inter z-10">
            <div>
                Tracking Page
            </div>
        <div className=" text-cOrange bg-white px-2 py-1 w-20 rounded-lg text-[18px] hover:bg-gray-300">
            <button onClick={handleLogout} className="">
                Logout
            </button>
            </div>
        </div>
    );
}

export default Navbar;
