import { useState, useEffect } from "react";
import QRCodePage from "./pages/qr/QRCodePage";
import { Link } from "react-router-dom";


function App() {

  const [users, setUsers] = useState([]);

  // Load users from localStorage when the component mounts
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);
  return (
    <>

      <QRCodePage />

      <Link to="/register">Register</Link>
      <h2 className="text-xl font-bold mt-6">Registered Users</h2>
      <ul className="mt-4 w-80 bg-gray-100 p-4 rounded-lg shadow-lg">
        {users.length > 0 ? (
          users.map((user, index) => (
            <li key={index} className="p-2 border-b border-gray-300">
              <strong>Name:</strong> {user.name} <br />
              <strong>Email:</strong> {user.email} <br />
              <strong>Phone:</strong> {user.phone}
            </li>
          ))
        ) : (
          <p className="text-gray-500">No users registered yet.</p>
        )}
      </ul>
    </>
  );
}

export default App;
