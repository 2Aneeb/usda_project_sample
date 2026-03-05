'use client';
import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import Navbar  from "../components/Navbar"

// Fetch data on every request
export const dynamic = 'force-dynamic';


export default function Home() {
  const [pests, setPests] = useState([]);

  const [filters, setFilters] = useState ({
     ACTIVE: true,
     PENDING: true,
     REMOVAL_REQUESTED: true,

  })

  // Fetch Json data
    useEffect(() => {
      fetch('http://127.0.0.1:8000/api/pests/')
        .then(res => res.json())
        .then(data => {
          setPests(data);
        })
        .catch(err => console.error("Fetch error:", err));
    }, []);
   
    // Check box filters
    type FilterStatus = 'ACTIVE' | 'PENDING' | 'REMOVAL_REQUESTED';
    const handleCheckboxChange = (statusKey: FilterStatus) => {
    setFilters(prev => ({
      ...prev,
      [statusKey]: !prev[statusKey]
    }));
  };

  const filteredPests = pests.filter((pest: any) => {
      return filters[pest.status as keyof typeof filters];
  });
 
  return (
    <main className="p-10 bg-gray-50 min-h-screen text-black">
      <Navbar></Navbar>
      <h1 className="text-3xl font-bold mb-6">USDA APHIS - Plant Pests & Diseases </h1>

      <div className='flex items-center  justify-end gap-6 mb-4'>    
          <label className="flex items-center space-x-3 cursor-pointer">
          <input type="checkbox" 
          checked={filters.ACTIVE}
          onChange={() => handleCheckboxChange('ACTIVE')}
          className="w-5 h-5 rounded-full appearance-none border-2 border-blue-500 checked:bg-blue-500 checked:border-transparent transition-all cursor-pointer"
          />
          <span className="text-slate-700">Active</span>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
          <input type="checkbox" 
          checked={filters.PENDING}
          onChange={() => handleCheckboxChange('PENDING')}
          className="w-5 h-5 rounded-full appearance-none border-2 border-blue-500 checked:bg-blue-500 checked:border-transparent transition-all cursor-pointer"
          />
          <span className="text-slate-700">Pending</span>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
          <input type="checkbox" 
          checked={filters.REMOVAL_REQUESTED}
          onChange={() => handleCheckboxChange('REMOVAL_REQUESTED')}
          className="w-5 h-5 rounded-full appearance-none border-2 border-blue-500 checked:bg-blue-500 checked:border-transparent transition-all cursor-pointer"
          />
          <span className="text-slate-700">Removal Requested</span>
          </label>
      </div>
      
                
           
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-blue-600 text-white ">
            <tr>
              <th className="p-4">Common Name</th>
              <th className="p-4">Classification</th>
              <th className="p-4">Status</th>
             
              <th className="p-4">Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredPests.length > 0 ? (
             filteredPests.map((pest: any) => (
              <tr key={pest.id} className="border-b hover:bg-gray-100">
                <td className="p-4 font-semibold">{pest.common_name}</td>
                <td className="p-4">{pest.category_display} </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-sm ${
                    pest.status === 'ACTIVE'? 'bg-green-100 text-green-800': 
                    pest.status === 'REMOVAL_REQUESTED' ? 'bg-red-100 text-red-800': 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {pest.status}
                  </span>
                </td>
                <td> 
                  <Link href={`/view/${pest.id}`}
                    className="p-2 cursor-pointer hover:bg-blue-400 hover:text-white hover:rounded hover:underline">
                    View ↗
                  </Link>
                </td>
              </tr>
             ))
            ) : (         
              <tr>
                  <td colSpan={4} className="p-10 text-center text-gray-500 italic">
                    No records match the selected filters.
                  </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}