import { createBrowserRouter } from "react-router-dom";
import CustomerProducts from "./routes/customer-products";
import CustomerOrders from "./routes/customer-orders";
import App from "./App";
import NotFound from "./not-found/not-found";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
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
