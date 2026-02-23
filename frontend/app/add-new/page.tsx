import React from 'react';
import Navbar  from "../../components/Navbar"

// Fetch data on every request
export const dynamic = 'force-dynamic';

async function getPests() {
  const res = await fetch('http://127.0.0.1:8000/api/pests/');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function addNew() {
  //const pests = await getPests();

  return (
    <main className="p-10 bg-gray-50 min-h-screen text-black">
      <Navbar></Navbar>
      <h1 className="text-3xl font-bold mb-6">Add new</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <h1>Add New Pest or Disease</h1>
      </div>
    </main>
  );
}