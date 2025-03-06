import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // For unique ID generation
import QRCode from "react-qr-code";
import emailjs from "@emailjs/browser";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [qrCodeData, setQrCodeData] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate unique user ID
    const userId = uuidv4();
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${userId}`;

    // Create user object with unique ID
    const newUser = { ...formData, id: userId };

    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Add new user
    const updatedUsers = [...existingUsers, newUser];

    // Store updated users array in localStorage
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Set QR Code data
    setQrCodeData(userId);

    // Send QR Code to email
    sendQRCodeToEmail(formData.email, formData.name, qrCodeUrl);

    alert("Registration Successful! QR Code sent to your email!");

    // Clear form fields after submission
    setFormData({ name: "", email: "", phone: "" });
  };

  // Function to send QR Code via EmailJS
  const sendQRCodeToEmail = (email, name, qrCodeUrl) => {
    const templateParams = {
      to_email: email,
      to_name: name,
      qr_code_url: qrCodeUrl, // Corrected to include QR Code Image URL
    };

    emailjs
      .send(
        "service_msdv8k7", // Replace with your actual Service ID
        "template_8oida9n", // Replace with your actual Template ID
        templateParams,
        "b82kKSe7etZcr7E-d" // Replace with your actual Public Key
      )
      .then(() => {
        console.log("Email sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
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

      {/* Display QR Code after registration */}
      {qrCodeData && (
        <div className="mt-6 p-4 bg-white shadow-lg rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Your QR Code:</h3>
          <QRCode value={qrCodeData} size={200} />
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
