'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function DeleteRequestForm({ pestId }: { pestId: string }) {
  const [reason, setReason] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!reason) return alert("Please provide a reason.");

    const response = await fetch(`http://127.0.0.1:8000/api/pests/${pestId}/`, {
      method: 'PATCH', // PATCH updates only specific fields
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'REMOVAL_REQUESTED',
        removal_reason: reason
      }),
    });

    if (response.ok) {
      setIsSubmitted(true);
    } else {
      alert("Failed to submit request. Check backend connection.");
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-amber-50 border border-amber-200 p-4 rounded text-amber-800 font-medium">
        ✓ Removal request has been submitted.
      </div>
    );
  }

  return (
    <div className="mt-12 border-t pt-8">
      <h3 className="text-red-600 font-bold mb-2 text-lg">Request Removal</h3>
      <p className="text-sm text-gray-600 mb-4">Does this information seem incorrect or outdated? Submitting this will flag it for admin review.</p>
      <textarea 
        className="w-full border p-3 rounded-md mb-4 text-sm focus:ring-1 focus:ring-red-500 outline-none text-black" 
        placeholder="Reason for deletion request..."
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      ></textarea>
      <button 
        onClick={handleSubmit}
        className="bg-red-400 text-white px-6 py-2 rounded font-bold hover:bg-red-700 transition cursor-pointer"
      >
        Submit Removal Request
      </button>
        <Link href="/edit">
            <button className="bg-slate-600 text-white px-6 py-2 rounded font-bold hover:bg-slate-800 transition ml-4 cursor-pointer">
            Request Edit ↗
            </button>
        </Link>
    </div>
  );
}