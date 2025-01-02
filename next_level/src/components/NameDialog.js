'use client';

import { useState } from 'react';

export default function NameDialog({ onSubmit }) {
  // State to store the name entered by the user
  const [name, setName] = useState('');
  // State to store validation error message
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!name.trim()) {
      // Validate the input (ensure it's not empty or whitespace)
      setError('Name cannot be empty.');
      return;
    }
    // Clear error if validation passes
    setError('');
    // Pass the entered name to the parent component
    onSubmit(name);
  };

  // Handle cancel action
  const handleCancel = () => {
    setName(''); // Reset the name input
    setError(''); // Clear any existing error message
    onSubmit(null); // Indicate cancellation by passing `null` to the parent
  };

  return (
    // Modal container with a dark translucent background
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[400px] shadow-lg">
        {/* Modal content */}
        <div className="p-6">
          {/* Dialog title */}
          <h2 className="text-lg font-medium text-gray-900 mb-4">Enter Your Name</h2>
          {/* Form for user input */}
          <form onSubmit={handleSubmit}>
            {/* Input field for the name */}
            <input
              type="text"
              placeholder="Type your name here"
              className="w-full p-2 border border-gray-300 rounded text-gray-900 mb-4 focus:outline-none focus:border-gray-400"
              value={name}
              onChange={(e) => setName(e.target.value)} // Update state on input change
              aria-label="Name input" // Accessibility label for screen readers
            />
            {/* Display validation error if any */}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {/* Action buttons */}
            <div className="flex justify-end gap-2">
              {/* Cancel button */}
              <button
                type="button"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm"
                onClick={handleCancel} // Trigger cancel action
              >
                Cancel
              </button>
              {/* Submit button */}
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 text-sm"
              >
                OK
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
