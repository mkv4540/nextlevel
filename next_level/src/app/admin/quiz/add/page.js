'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddQuizQuestion() {
  const [formData, setFormData] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    videoId: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Admin verification state
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminId, setAdminId] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminMessage, setAdminMessage] = useState('');

  // Verify admin credentials
  const verifyAdmin = async () => {
    setAdminMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/verifyAdmin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminId, adminName, adminPassword }),
      });

      const result = await response.json();

      if (response.status === 200 && result.status === 'verified') {
        setAdminMessage('Admin verified!');
        setIsAdmin(true);
      } else {
        setAdminMessage('Invalid admin credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying admin:', error);
      setAdminMessage('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle quiz question submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!isAdmin) {
      setError('You do not have permission to add quiz questions.');
      return;
    }

    setIsLoading(true);

    // Process the video URL to extract the video ID if it's a YouTube URL
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|v\/|e\/|embed\/)|youtu\.be\/)([\w-]+)/;
    const match = formData.videoId.match(youtubeRegex);
    const videoId = match ? match[1] : formData.videoId;
    console.log('Extracted Video ID:', videoId);          // Logs the extracted video ID

    try {
      const response = await fetch('/api/quiz/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, videoId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add question');
      }

      setSuccess('Question added successfully!');
      setFormData({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        videoId: '',
      });
    } catch (error) {
      console.error('Error adding question:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  

  // Fixed handleOptionChange function to work with formData
  const handleOptionChange = (index, value) => {
    setFormData(prev => {
      const newOptions = [...prev.options];
      newOptions[index] = value;
      return {
        ...prev,
        options: newOptions
      };
    });
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Add Quiz Question</h1>

      {/* Admin Verification Section */}
      {!isAdmin && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Admin Verification</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin ID:
              </label>
              <input
                type="text"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Admin ID"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Name:
              </label>
              <input
                type="text"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Admin Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Password:
              </label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Admin Password"
              />
            </div>

            <button
              type="button"
              onClick={verifyAdmin}
              className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify Admin'}
            </button>

            {adminMessage && (
              <div className={`p-3 rounded ${adminMessage.includes('verified') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {adminMessage}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quiz Question Form */}
      {isAdmin && (
        <>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question:
              </label>
              <textarea
                value={formData.question}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, question: e.target.value }))
                }
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50 text-gray-400"
                rows="4"
                required
                disabled={isLoading}
                placeholder="Enter your question..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Options:
              </label>
              {formData.options.map((option, index) => (
                <div key={index} className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50 text-gray-400"
                    required
                    disabled={isLoading}
                    placeholder={`Option ${index + 1}`}
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correct Answer:
              </label>
              <select
                value={formData.correctAnswer}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    correctAnswer: parseInt(e.target.value),
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50 text-gray-400"
                required
                disabled={isLoading}
              >
                {formData.options.map((_, index) => (
                  <option key={index} value={index}>
                    Option {index + 1}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video URL (Optional):
              </label>
              <input
                type="text"
                value={formData.videoId}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, videoId: e.target.value }))
                }
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50 text-gray-400"
                disabled={isLoading}
                placeholder="Paste YouTube video URL here"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
              aria-disabled={isLoading}
            >
              {isLoading ? 'Adding Question...' : 'Add Question'}
            </button>
          </form>
        </>
      )}
    </div>
  );
}