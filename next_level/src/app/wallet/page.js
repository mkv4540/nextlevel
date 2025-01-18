"use client";

import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { useBalance } from "../../context/BalanceContext";

export default function WalletPage() {
  const { isLoaded, userId } = useAuth();
  const [amount, setAmount] = useState("");
  const [showUpiModal, setShowUpiModal] = useState(false);
  const { balance, updateBalance } = useBalance();

  const handleAddMoney = () => {
    if (!amount) {
      alert("Please enter an amount");
      return;
    }
    setShowUpiModal(true);
  };

  return (
    <main className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-2xl mx-auto p-6">
        {/* Balance Banner */}
        <div className="bg-purple-100 p-4 rounded-lg mb-6 shadow-md">
          <div className="flex justify-between items-center">
            <span className="text-purple-800 font-medium">Your Balance:</span>
            <span className="text-purple-800 font-bold">₹{balance}</span>
          </div>
        </div>

        {/* Add Money Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Add Money</h2>

          {/* Amount Input */}
          <div className="mb-4">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Enter amount"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none text-gray-800"
            />
          </div>

          {/* Quick Amount Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 font-bold text-gray-800">
            {[100, 200, 500, 1000].map((value) => (
              <button
                key={value}
                onClick={() => setAmount(value)}
                className={`p-2 rounded-lg border transition-colors text-sm font-medium
                  ${amount === value 
                    ? "bg-green-600 text-white border-green-600" 
                    : "border-gray-300 hover:border-green-600"
                  }`}
              >
                ₹{value}
              </button>
            ))}
          </div>

          {/* Add Money Button */}
          <button
            onClick={handleAddMoney}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Add Money
          </button>
        </div>
      </div>

      {/* UPI Payment Modal */}
      {showUpiModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Pay using UPI</h3>
              <button
                onClick={() => setShowUpiModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* QR Code */}
            <div className="bg-gray-100 p-4 rounded-lg flex justify-center mb-4">
              <div className="w-48 h-48 bg-white p-2">
                <img
                  src="/qr-code.png"
                  alt="UPI QR Code"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* UPI Apps */}
            <div className="grid grid-cols-4 gap-4 mb-4">
              {["GPay", "PhonePe", "Paytm", "BHIM"].map((app) => (
                <button
                  key={app}
                  className="flex flex-col items-center gap-1"
                >
                  <img
                    src={`/${app.toLowerCase()}-icon.png`}
                    alt={app}
                    className="w-12 h-12 rounded-full"
                  />
                  <span className="text-xs text-gray-600">{app}</span>
                </button>
              ))}
            </div>

            <div className="text-center text-sm text-gray-600">
              <p>Amount to pay: <span className="font-bold">₹{amount}</span></p>
              <p className="mt-1">UPI ID: <span className="font-mono">nextlevel@upi</span></p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
} 