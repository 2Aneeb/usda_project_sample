'use client'
import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation'
import Navbar  from "../../components/Navbar"


export default function addNew() {
  const router = useRouter();


  // Track the "Main" selection to show/hide sub-menus
  const [mainType, setMainType] = useState("");

// The actual data we will send to Django
  const [formData, setFormData] = useState({
    common_name: '',
    category: '', // This will store the ID (e.g., 3 for Insects)
    description: '',
    what_to_look_for: '',
    how_to_prevent: '',
    how_it_is_treated: '',
    image_url: '',
    status: 'PENDING' 
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /*
      const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prevPost) => {
            return {
                ...prevPost,
                [name]:value,
            }
        })
       
    } */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await fetch('http://127.0.0.1:8000/api/pests/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Submission successful! It is now Pending for review.");
      router.push('/'); 
    } else {
      alert("Error: Make sure the Category ID exists in your database.");
    }
  };

  return (
    <main className="p-10 bg-gray-50 min-h-screen text-black">
      <Navbar></Navbar>
      <h1 className="text-3xl font-bold mb-6">Add New Pest or Disease</h1>

      <form onSubmit={handleSubmit} action="" className='border-[3px] p-3 rounded-md'>
        <div>
          <label htmlFor="" className="font-bold">Common Name*</label>
          <input required onChange={handleChange} type="text" name="common_name" className="border p-2 rounded ml-5" placeholder="e.g. Spotted Lanternfly" />
        </div>

        <div>
            <label className="block text-sm font-bold mb-1">Category*</label>
            <select 
                required className="border p-2 rounded bg-gray-50 mb-5"
                onChange={(e) => setMainType(e.target.value)} name="category" 
            >
              <option value="">-- Select One --</option>
              <option value="2">Pest</option>
              <option value="3">Disease</option>
            </select>
        </div>

        {mainType === "2" && ( 
        <div>
            <label className="block text-sm font-bold mb-1">Sub Category {'>'} Pests*</label>
            <select required onChange={handleChange} name="category" className="border p-2 rounded bg-gray-50 mb-5">
              <option value="">-- Select One --</option>
              <option value="8">Mollusks</option>
              <option value="7">Nematodes</option>
              <option value="6">Noxious Weeds</option>
              <option value="9">Insects and Mites</option>
            </select>
        </div>
        )}

        {mainType === "3" && ( 
        <div>
            <label className="block text-sm font-bold mb-1">Sub Category {'>'} Diseases</label>
            <select required onChange={handleChange} defaultValue="Blank "name="category" className="border p-2 rounded bg-gray-50 mb-5">
               <option value="">-- Select One --</option>
              <option value="5">Citrus Diseases</option>
              <option value="4">Potato Diseases</option>
              <option value="3">Other</option>
            </select>
        </div>
        )}


        <div>
            <label className="block text-sm font-bold mb-1">Description*</label>
            <textarea name="description" required onChange={handleChange} className="w-full border p-2 rounded h-24" />
        </div>

        <div>
            <label className="block text-sm font-bold mb-1">What to look for</label>
            <textarea name="what_to_look_for" onChange={handleChange}  className="w-full border p-2 rounded h-24" />
        </div>

        <div>
            <label className="block text-sm font-bold mb-1">How to prevent</label>
            <textarea name="how_to_prevent" onChange={handleChange} className="w-full border p-2 rounded h-24" />
        </div>


        <div>
            <label className="block text-sm font-bold mb-1">How it is treated</label>
            <textarea name="how_it_is_treated" onChange={handleChange} className="w-full border p-2 rounded h-24" />
        </div>


        <div>
          <label className="block text-sm font-bold mb-1">Image URL</label>
          <input name="image_url" onChange={handleChange} className="w-full border p-2 rounded" placeholder="https://example.com/image.jpg" />
        </div>
          
        <button type="submit" className="block mx-auto bg-green-700 text-white font-bold rounded p-2 hover:bg-green-800 transition cursor-pointer mt-4">
          Submit Entry for Review
        </button>
      </form>
      
   
    </main>
  );
}

