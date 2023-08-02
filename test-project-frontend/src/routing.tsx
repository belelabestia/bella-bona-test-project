import { createBrowserRouter } from "react-router-dom";
import CustomerProducts, { fetchProducts } from "./routes/customer-products/customer-products";
import CustomerOrders, { fetchOrders } from "./routes/customer-orders/customer-orders";
import App from "./app";
import NotFound from "./components/not-found/not-found";
import Home, { fetchCustomers } from "./routes/home/home";
import { saveProduct } from "./components/product/product";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <Home />,
        loader: fetchCustomers
      },
      {
        path: "customer/:id/products",
        element: <CustomerProducts />,
        loader: fetchProducts,
        action: saveProduct
      },
      {
        path: "customer/:id/orders",
        element: <CustomerOrders />,
        loader: fetchOrders
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
]);
