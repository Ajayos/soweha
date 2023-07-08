import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import "./index.css";

import HelmetProviderMoode from "./contexts/HelmetContext";
import ThemeProviderContext from "./contexts/ThemeContext";
import SideBarProvider from "./contexts/SideBarContext";
import AuthProvider from "./contexts/AuthContext";
import reportWebVitals from "./reportWebVitals";
import ScrollToTop from "./ScrollToTop";
import Router from "./Router";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <HelmetProviderMoode>
          <SideBarProvider>
            <AuthProvider>
              <ThemeProviderContext>
                <ScrollToTop />
                <Router />
              </ThemeProviderContext>
            </AuthProvider>
          </SideBarProvider>
        </HelmetProviderMoode>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
