import React from 'react';
import Link from 'next/link';
import Navbar  from "../components/Navbar"

// Fetch data on every request
export const dynamic = 'force-dynamic';

async function getPests() {
  const res = await fetch('http://127.0.0.1:8000/api/pests/');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Home() {
  const pests = await getPests();

  return (
    <main className="p-10 bg-gray-50 min-h-screen text-black">
      <Navbar></Navbar>
      <h1 className="text-3xl font-bold mb-6">USDA APHIS Plant Pests & Diseases </h1>
      
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
            {pests.map((pest: any) => (
              <tr key={pest.id} className="border-b hover:bg-gray-100">
                <td className="p-4 font-semibold">{pest.common_name}</td>
                <td className="p-4">{pest.category_display} </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-sm ${
                    pest.status === 'ACTIVE'? 'bg-green-100 text-green-800': pest.status === 'REMOVAL_REQUESTED' 
                    ? 'bg-red-100 text-red-800': 'bg-yellow-100 text-yellow-800'
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
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}