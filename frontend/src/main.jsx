import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ParallaxProvider } from "react-scroll-parallax";
import { HelmetProvider } from "react-helmet-async";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios"; // 👈 Import axios here

// --- Add these lines to configure Axios globally ---
axios.defaults.baseURL = "http://localhost:5000"; // Your backend server URL
axios.defaults.withCredentials = true; // Essential for sending cookies with requests
// --- End of Axios configuration ---

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <ParallaxProvider>
        <App />
      </ParallaxProvider>
    </HelmetProvider>
  </React.StrictMode>
);
