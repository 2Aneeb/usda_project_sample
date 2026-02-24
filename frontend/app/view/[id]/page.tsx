import React from 'react';
import Link from 'next/link';
import Navbar  from "../../../components/Navbar"
import DeleteRequestForm from '../../../components/DeleteRequestForm';

// Fetch data on every request
export const dynamic = 'force-dynamic';

async function getPestDetail(id: string) {
  const res = await fetch(`http://127.0.0.1:8000/api/pests/${id}/`, {
    cache: 'no-store', // Ensures we get the latest data
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function PestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const pest = await getPestDetail(id);

  if (!pest) {
    return <div className="p-10 text-center">Pest not found.</div>;
  }

  return (
    <> 
     
  
    <main className="p-10 bg-gray-50 min-h-screen text-black">
      <Navbar></Navbar>
      <h1 className="text-3xl font-bold mb-6 mt-5">Details</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden border-[1px]">
                    
            <div className="flex flex-col gap-4 mt-4">
              {/* Top row: common_name, category, status */}
              <div className="flex items-center gap-4 ml-5">
                <h2 className="text-2xl font-bold">{pest.common_name}</h2>
                <h3 className="text-xl text-gray-600">{pest.category_display}</h3>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    pest.status === "ACTIVE"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {pest.status}
                </span>
            </div>

              {/* Image row */}
              {pest.image_url && (
                <img
                  src={pest.image_url}
                  alt={`Img of ${pest.common_name}`}
                  className="w-full max-w-md object-cover rounded ml-5"
                />
              )}
          </div>
          <div>
            <h1 className="p-4 pb-0 font-semibold">Description</h1>   
              <p className="p-4 pt-0 ">{pest.description}</p>
          </div>
              
          
          <div>
              <table>
                  <thead>
                      <tr>
                        <th className="p-4">What to look for</th >
                        <th className="p-4">How to prevent</th >
                        <th className="p-4">How it is treated</th>
                      </tr>
                    </thead>
                  <tbody>
                    <tr>
                      <td className="p-4">  {pest.what_to_look_for}</td>
                      <td className="p-4">    {pest.how_to_prevent}</td>
                      <td className="p-4">    {pest.how_it_is_treated}</td>
                    </tr>

                  </tbody>
                </table>
            </div>
      </div>
      <div>
        <span className="text-xs text-slate-400">Created: {new Date(pest.created_at).toLocaleDateString()}</span>
        <DeleteRequestForm pestId={pest.id} />
      </div>    
    </main>
      </>
  );
}



/*
{pest.removal_reason}
           
*/