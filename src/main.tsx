import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import RootLayout from "./layout.tsx";

import { App, Dining, Entertainment, Meetings, Offers, Rewards, Rooms } from "./pages";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<App />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="wynn-rewards" element={<Rewards />} />
          <Route path="offers" element={<Offers />} />
          <Route path="dining" element={<Dining />} />
          <Route path="entertainment" element={<Entertainment />} />
          <Route path="meetings" element={<Meetings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
