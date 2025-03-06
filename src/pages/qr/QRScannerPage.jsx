import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QRScannerPage = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    });

    scanner.render(
      (decodedText) => {
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Find the user matching the scanned QR code
        const user = users.find((u) => u.id === decodedText);

        if (user) {
          setUserData(user);

          console.log(user);
          setError("");
        } else {
          setUserData(null);
          setError("User Not Found!");
        }
      },
      (errorMessage) => {
        console.warn("QR scan error:", errorMessage);
      }
    );

    return () => scanner.clear();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Scan QR Code</h2>
      <div id="reader" className="w-64 h-64"></div>

      {userData && (
        <div className="mt-4 p-4 bg-gray-100 border rounded shadow-md">
          <h3 className="text-lg font-semibold">User Details</h3>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Phone:</strong> {userData.phone}</p>
          <p><strong>Address:</strong> {userData.address}</p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-2 bg-red-100 border border-red-500 text-red-700 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default QRScannerPage;
