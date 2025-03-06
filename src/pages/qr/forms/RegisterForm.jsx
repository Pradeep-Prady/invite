import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const RegisterForm = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userId = uuidv4();
    const newUser = { ...formData, id: userId };

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = [...existingUsers, newUser];

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    onRegister(newUser);

    setFormData({ name: "", email: "", phone: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="w-80 bg-gray-100 p-6 rounded-lg shadow-lg">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded"
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded"
        required
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
