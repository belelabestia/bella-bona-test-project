import { createBrowserRouter } from "react-router-dom";
import CustomerProducts from "./routes/customer-products";
import CustomerOrders from "./routes/customer-orders";
import App from "./App";
import NotFound from "./components/not-found/not-found";
import Home, { customersLoader } from "./components/home/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
        loader: customersLoader
      },
      {
        path: "customer/:id/products",
        element: <CustomerProducts />,
      },
      {
        path: "customer/:id/orders",
        element: <CustomerOrders />,
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
]);
