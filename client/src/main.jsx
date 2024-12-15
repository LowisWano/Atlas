import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "react-big-calendar/lib/css/react-big-calendar.css"
import routes from "./routes";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const router = createBrowserRouter(routes);
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
