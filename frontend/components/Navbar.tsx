import React from "react";
import Link from 'next/link';


function Navbar(){
    return (
        <div className="text-center">
             <Link 
            href="/" className="cursor-pointer bg-blue-100 hover:text-white hover:bg-blue-400 hover:underline border p-2 rounded ml-5">
            Home
            </Link>
            &nbsp;&nbsp;
            <Link 
            href="/add-new" className="cursor-pointer bg-blue-100 hover:text-white hover:bg-blue-400 hover:underline border p-2 rounded ml-5">
             Add New
            </Link>
        </div>
    )
}


export default Navbar;