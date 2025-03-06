import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import RegisterPage from "./pages/qr/RegisterPage";
import Main from './pages/Main';
import QRScannerPage from "./pages/qr/QRScannerPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "scanner",
        element: <QRScannerPage />,
      },
    ],
  },
]);

export default routes;
