import React, { useState } from "react";
import { QrReader } from "@blackbox-vision/react-qr-reader";


const QRScannerPage = () => {
  const [scanResult, setScanResult] = useState("");

  const handleScan = (data) => {
    if (data) {
      setScanResult(data);

      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // Check if scanned QR code matches a registered user
      const user = users.find((u) => u.id === data);

      if (user) {
        alert(`User Verified: ${user.name}, ${user.email}`);
      } else {
        alert("User Not Found!");
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Scan QR Code</h2>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "300px" }}
      />
      {scanResult && (
        <div className="mt-4 p-2 bg-gray-100 border rounded">
          <strong>Scanned Data:</strong> {scanResult}
        </div>
      )}
    </div>
  );
};

export default QRScannerPage;
