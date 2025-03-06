import React from 'react';
import QRCode from 'react-qr-code';

const QRCodePage = () => {
  const pageUrl = window.location.href; // Get the current page URL

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Scan the QR Code to View this Page</h1>
      <QRCode value={pageUrl} size={200} />
    </div>
  );
};

export default QRCodePage;
