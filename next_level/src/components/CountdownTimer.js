'use client';

import React from "react";

const CountdownTimer = ({ timeLeft }) => {
    // Function to format time from seconds to HH:MM:SS
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600); // Calculate hours
        const minutes = Math.floor((seconds % 3600) / 60); // Calculate minutes
        const remainingSeconds = seconds % 60; // Calculate remaining seconds

        // Pad the values to ensure two-digit format
        return {
            hours: String(hours).padStart(2, '0'),
            minutes: String(minutes).padStart(2, '0'),
            seconds: String(remainingSeconds).padStart(2, '0')
        };
    };

    // Format the time for display
    const time = formatTime(timeLeft);

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-center">
                {/* Title */}
                <h2 className="text-lg font-semibold text-gray-700 mb-3">Time Remaining</h2>

                {/* Time Display */}
                <div className="flex justify-center items-center space-x-2">
                    {/* Hours */}
                    <div className="flex flex-col items-center">
                        <div className="bg-blue-500 rounded-lg p-3 w-16">
                            {/* Display hours */}
                            <span className="text-2xl font-bold text-white">{time.hours}</span>
                        </div>
                        <span className="text-sm text-gray-600 mt-1">Hours</span>
                    </div>

                    <span className="text-2xl font-bold text-blue-500">:</span>

                    {/* Minutes */}
                    <div className="flex flex-col items-center">
                        <div className="bg-blue-500 rounded-lg p-3 w-16">
                            {/* Display minutes */}
                            <span className="text-2xl font-bold text-white">{time.minutes}</span>
                        </div>
                        <span className="text-sm text-gray-600 mt-1">Minutes</span>
                    </div>

                    <span className="text-2xl font-bold text-blue-500">:</span>

                    {/* Seconds */}
                    <div className="flex flex-col items-center">
                        <div className="bg-blue-500 rounded-lg p-3 w-16">
                            {/* Display seconds */}
                            <span className="text-2xl font-bold text-white">{time.seconds}</span>
                        </div>
                        <span className="text-sm text-gray-600 mt-1">Seconds</span>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 h-2 bg-gray-200 rounded-full">
                {/* The progress bar dynamically adjusts width and color based on timeLeft */}
                <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                        timeLeft < 300 ? 'bg-red-500' : 'bg-blue-500' // Red color for less than 5 minutes
                    }`}
                    style={{ width: `${(timeLeft / 3600) * 100}%` }} // Progress width based on total time (3600 seconds)
                />
            </div>
        </div>
    );
};

export default CountdownTimer;
