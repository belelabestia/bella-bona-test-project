import { createBrowserRouter } from "react-router-dom";
import CustomerProducts, { productsLoader } from "./routes/customer-products/customer-products";
import CustomerOrders, { ordersLoader } from "./routes/customer-orders/customer-orders";
import App from "./app";
import NotFound from "./components/not-found/not-found";
import Home, { customersLoader } from "./routes/home/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <Home />,
        loader: customersLoader
      },
      {
        path: "customer/:id/products",
        element: <CustomerProducts />,
        loader: productsLoader
      },
      {
        path: "customer/:id/orders",
        element: <CustomerOrders />,
        loader: ordersLoader
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
]);
