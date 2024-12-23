// import React from 'react';
// import { IoSearch } from "react-icons/io5";
// import { MdOutlineShoppingCart } from "react-icons/md";
// import { TbWorld } from "react-icons/tb";
// import { Link } from 'react-router-dom';
// import { FaRegHeart } from "react-icons/fa";
// import UserMenu from './UserMenu';
// import Notifications from './Notifications';




// const NavBar = () => {


//     let token = localStorage.getItem('token');
//     // console.log(token , "hello token");




//     return (
//         <div className='max-w-[1400px] mx-auto px-4'>
//             <div className='flex items-center justify-between gap-5 border-b-2 h-[80px]'>

//                 <Link to={'/'} className='w-[91px] h-[40px] scale-150 pt-1'>
//                     <img src="https://www.ballinamorecs.ie/wp-content/uploads/2014/07/elearning-logo.png" alt="Logo" />
//                 </Link>

//                 <div className='hidden lg:block cursor-pointer'>
//                     <p>Category</p>
//                 </div>

//                 <div className='flex items-center gap-2 border border-zinc-400 p-2 rounded px-3 flex-grow max-w-md lg:max-w-[350px]'>
//                     <IoSearch className='text-2xl text-zinc-600' />
//                     <input
//                         className='border-0 outline-none w-full text-sm'
//                         type="text"
//                         placeholder='Search for anything...'
//                     />
//                 </div>

//                 <nav className='hidden lg:flex gap-5 items-center'>
//                     <li className='list-none text-zinc-700 cursor-pointer'>Plans & Pricing</li>
//                     <Link to='/e-business'>
//                         <li className='list-none text-zinc-700 cursor-pointer'>E-Business</li>
//                     </Link>
//                     <li className='list-none text-zinc-700 cursor-pointer'>Teach on e-learn</li>
//                     <li className='list-none text-zinc-700 text-2xl cursor-pointer ml-5 relative'>
//                         <MdOutlineShoppingCart className='' />
//                         <sup className='bg-purple-700 text-center text-white font-bold text-sm px-[5px] py-0 rounded-full absolute left-6' >0</sup>
//                     </li>
//                 </nav>


//                 {!token && (
//                     <div className='flex items-center gap-3'>
//                         <Link to={'/login'}>
//                             <button className='border border-zinc-600 rounded py-[8px] w-[80px] text-sm'>Log in</button>
//                         </Link>
//                         <Link to={'/signup'}>
//                             <button className='bg-[#2d2f31] w-[90px] rounded py-[8px] text-white text-sm'>Sign up</button>
//                         </Link>
//                         <p className='bg-[#2d2f31] rounded p-[11px] text-white cursor-pointer'>
//                             <TbWorld className='text-xl font-semibold' />
//                         </p>
//                     </div>
//                 )}

//                 {token && (
//                     <div className='flex items-center gap-5 ml-4'>
//                         <Link className=' py-[8px] text-2xl'>
//                             <FaRegHeart />
//                         </Link>
//                         <Link className='rounded p-[11px] cursor-pointer text-[25px] font-bold'>
//                             <Notifications />
//                         </Link>
//                         <p className=''>
//                             <UserMenu />
//                         </p>
//                     </div>
//                 )}







//             </div>

//             <div className='lg:hidden flex items-center justify-between mt-4'>
//                 <div className='cursor-pointer'>☰</div>
//                 <MdOutlineShoppingCart className='text-2xl text-zinc-700 cursor-pointer' />
//             </div>
//         </div>
//     );
// };

// export default NavBar;
import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
// Replace these imports with actual implementations
import UserMenu from "./UserMenu";
import Notifications from "./Notifications";

const NavBar = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        const handleStorageChange = () => {
            console.log("Storage change detected"); // Debugging
            setToken(localStorage.getItem("token"));
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            console.log("Cleaning up storage listener"); // Debugging
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return (
        <div className="max-w-[1400px] mx-auto px-4">
            <div className="flex items-center justify-between gap-5 border-b-2 h-[80px]">
                {/* Logo */}
                <Link to={"/"} className="w-[91px] h-[40px] scale-150 pt-1">
                    <img
                        src="https://www.ballinamorecs.ie/wp-content/uploads/2014/07/elearning-logo.png"
                        alt="Logo"
                    />
                </Link>

                {/* Categories (Hidden on small screens) */}
                <div className="hidden lg:block cursor-pointer">
                    <p>Category</p>
                </div>

                {/* Search Bar */}
                <div className="flex items-center gap-2 border border-zinc-400 p-2 rounded px-3 flex-grow max-w-md lg:max-w-[350px]">
                    <IoSearch className="text-2xl text-zinc-600" />
                    <input
                        className="border-0 outline-none w-full text-sm"
                        type="text"
                        placeholder="Search for anything..."
                    />
                </div>

                {/* Navigation Links */}
                <nav className="hidden lg:flex gap-5 items-center">
                    <li className="list-none text-zinc-700 cursor-pointer">
                        Plans & Pricing
                    </li>
                    <Link to="/e-business">
                        <li className="list-none text-zinc-700 cursor-pointer">
                            E-Business
                        </li>
                    </Link>
                    <li className="list-none text-zinc-700 cursor-pointer">
                        Teach on e-learn
                    </li>
                    <Link to='/cart'>
                    <li className="list-none text-zinc-700 text-2xl cursor-pointer ml-5 relative">

                        <MdOutlineShoppingCart />
                    
                      
                        <sup className="bg-purple-700 text-center text-white font-bold text-sm px-[5px] py-0 rounded-full absolute left-6">
                            0
                        </sup>
                    </li>
                    </Link>
                </nav>

                {/* User Authentication */}
                {!token ? (
                    <div className="flex items-center gap-3">
                        <Link to={"/login"}>
                            <button className="border border-zinc-600 rounded py-[8px] w-[80px] text-sm">
                                Log in
                            </button>
                        </Link>
                        <Link to={"/signup"}>
                            <button className="bg-[#2d2f31] w-[90px] rounded py-[8px] text-white text-sm">
                                Sign up
                            </button>
                        </Link>
                        <p className="bg-[#2d2f31] rounded p-[11px] text-white cursor-pointer">
                            <TbWorld className="text-xl font-semibold" />
                        </p>
                    </div>
                ) : (
                    <div className="flex items-center gap-5 ml-4">
                        <Link className="py-[8px] text-2xl">
                            <FaRegHeart />
                        </Link>
                        <Link className="rounded p-[11px] cursor-pointer text-[25px] font-bold">
                            <Notifications />
                        </Link>
                        <p>
                            <UserMenu />
                        </p>
                    </div>
                )}
            </div>

            {/* Mobile Navigation */}
            <div className="lg:hidden flex items-center justify-between mt-4">
                <div className="cursor-pointer">☰</div>
                <MdOutlineShoppingCart className="text-2xl text-zinc-700 cursor-pointer" />
            </div>
        </div>
    );
};

export default NavBar;
