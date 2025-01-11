"use client";

import { useState, useRef } from "react";

const InputField = ({ label, value, onChange, type = "text", placeholder, error }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full p-2 border rounded text-gray-800 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
      aria-invalid={error ? "true" : "false"}
    />
    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
  </div>
);

const NameEmailDialog = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [upiId, setUpiId] = useState("");
  const [errors, setErrors] = useState({});
  const firstInvalidField = useRef(null);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format.";
    if (!upiId.trim()) newErrors.upiId = "UPI ID is required.";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = firstInvalidField.current;
      if (firstErrorField) firstErrorField.focus();
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit({ name, email, upiId });
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-labelledby="dialog-title"
    >
      <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
        <h3
          id="dialog-title"
          className="text-lg font-bold mb-4 text-gray-800"
        >
          Enter Your Details
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <InputField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            error={errors.name}
            ref={firstInvalidField}
          />
          <InputField
            label="Email ID"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email ID"
            error={errors.email}
          />
          <InputField
            label="UPI ID"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            placeholder="UPI ID"
            error={errors.upiId}
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NameEmailDialog;
