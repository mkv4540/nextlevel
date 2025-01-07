// import React from 'react';
// import AdminCard from '../../components/AdminCard';

// const AdminPage = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <AdminCard />
//     </div>
//   );
// };

// export default AdminPage;

'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminCard from '../../components/AdminCard';

export default function AdminPage() {
  const [adminId, setAdminId] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Reset the message

    try {
      const response = await fetch('/api/verifyAdmin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminId, adminName, adminPassword }),
      });

      const result = await response.json();

      if (response.status === 200 && result.status === 'verified') {
        setMessage('Verified! Redirecting...');
        setIsAuthenticated(true); // Set authenticated state to true
        setTimeout(() => {
          router.push('/admin'); // Redirect to admin route after a delay
        }, 3000); // Redirect after 3 seconds
      } else {
        setMessage('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying admin:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  if (isAuthenticated) {
    return <AdminCard />; // Render AdminCard if authenticated
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Authentication</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Admin ID</label>
            <input
              type="text"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Admin Name</label>
            <input
              type="text"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Admin Password</label>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-600">{message}</p>}
      </div>
    </div>
  );
}
