import React from "react";
import ReactDOM from "react-dom/client";
import "./index.sass";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { router } from "./routing";
import { RouterProvider } from "react-router-dom";

ReactDOM
  .createRoot(document.getElementById("root") as HTMLElement)
  .render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );

serviceWorkerRegistration.unregister();
reportWebVitals();
