// import React, { useState } from "react";
// import QRCode from "react-qr-code";
// import emailjs from "@emailjs/browser";

// import RegisterForm from './forms/RegisterForm';

// const RegisterPage = () => {
//   const [userData, setUserData] = useState(null);

//   const handleRegister = (user) => {
//     setUserData(user);
//     sendQRCodeToEmail(user.email, user.name, user.id);
//     alert("Registration Successful! QR Code sent to your email!");
//   };

//   const sendQRCodeToEmail = (email, name, qrCodeData) => {
//     const templateParams = {
//       to_email: email,
//       to_name: name,
//       qr_code_url: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrCodeData}`,
//     };

//     emailjs
//       .send("service_msdv8k7", "template_8oida9n", templateParams, "b82kKSe7etZcr7E-d")
//       .then(() => console.log("Email sent successfully!"))
//       .catch((error) => console.error("Error sending email:", error));
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h2 className="text-2xl font-bold mb-4">Register</h2>

//       <RegisterForm onRegister={handleRegister} />

//       {userData && (
//         <div className="mt-6 p-4 bg-white shadow-lg rounded-lg">
//           <h3 className="text-lg font-semibold mb-2">Your QR Code:</h3>
//           <QRCode value={userData.id} size={200} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default RegisterPage;


import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import emailjs from "@emailjs/browser";
import RegisterForm from "./forms/RegisterForm";

const RegisterPage = () => {
  const [userData, setUserData] = useState(null);
  const qrRef = useRef(null); // Reference to the QR Code canvas

  const handleRegister = (user) => {
    setUserData(user);
    setTimeout(() => sendQRCodeToEmail(user.email, user.name), 500);
    alert("Registration Successful! QR Code sent to your email!");
  };

  const sendQRCodeToEmail = (email, name) => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) {
      console.error("QR Code canvas not found");
      return;
    }

    // Convert QR Code to Base64 image
    const qrImageUrl = canvas.toDataURL("image/png");

    // EmailJS Template Parameters
    const templateParams = {
      to_email: email,
      to_name: name,
      qr_code_url: qrImageUrl,
    };

    emailjs
      .send("service_msdv8k7", "template_8oida9n", templateParams, "b82kKSe7etZcr7E-d")
      .then(() => console.log("Email sent successfully!"))
      .catch((error) => console.error("Error sending email:", error));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      <RegisterForm onRegister={handleRegister} />

      {userData && (
        <div className="mt-6 p-4 bg-white shadow-lg rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Your QR Code:</h3>
          <div ref={qrRef}>
            <QRCodeCanvas
              value={userData.id}
              size={200}
              bgColor={"#ffffff"}
              fgColor={"#003366"}
              level={"H"}
              includeMargin={true}
              imageSettings={{
                src: "/vite.svg", // Replace with your logo URL
                height: 50,
                width: 50,
                excavate: true,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
