import * as React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";
import emailjs from "@emailjs/browser";

import App from "./app";

import "./index.css";

// Initialize EmailJS only if key is available
try {
  const emailjsKey = import.meta.env.VITE_APP_EMAILJS_KEY;
  if (emailjsKey && emailjsKey !== 'undefined') {
    emailjs.init(emailjsKey);
  }
} catch (error) {
  console.warn('EmailJS initialization failed:', error);
}

const rootEl = document.getElementById("root");

// Render react app
ReactDOM.createRoot(rootEl!).render(
  <React.StrictMode>
    <Toaster
      theme="dark"
      richColors
      closeButton
      toastOptions={{
        style: { background: "#050816", opacity: 0.95 },
      }}
    />
    <App />
  </React.StrictMode>,
);
