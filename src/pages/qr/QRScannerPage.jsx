import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QRScannerPage = () => {
  const [scanResult, setScanResult] = useState("");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    });

    scanner.render(
      (decodedText) => {
        setScanResult(decodedText);

        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Check if scanned QR code matches a registered user
        const user = users.find((u) => u.id === decodedText);

        if (user) {
          alert(`User Verified: ${user.name}, ${user.email}`);
        } else {
          alert("User Not Found!");
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
      {scanResult && (
        <div className="mt-4 p-2 bg-gray-100 border rounded">
          <strong>Scanned Data:</strong> {scanResult}
        </div>
      )}
    </div>
  );
};

export default QRScannerPage;