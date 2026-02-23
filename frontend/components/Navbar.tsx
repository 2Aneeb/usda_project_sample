import React from "react";
import Link from 'next/link';


function Navbar(){
    return (
        <div className="text-center">
             <Link 
            href="/" className="bg-blue-100 hover:bg-blue-500 cursor-pointer hover:text-blue-500 hover:underline">
            Home
            </Link>
            &nbsp;&nbsp;
            <Link 
            href="/add-new" className="bg-blue-100 hover:bg-blue-500 cursor-pointer hover:text-blue-500 hover:underline">
             Add New
            </Link>
        </div>
    )
}


export default Navbar;