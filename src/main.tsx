import * as React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";
import emailjs from "@emailjs/browser";

// Fallback values for EmailJS
const EMAILJS_CONFIG = {
  key: import.meta.env.VITE_APP_EMAILJS_KEY || 'H4YFvBxDUh6YpVn0a',
  serviceId: import.meta.env.VITE_APP_SERVICE_ID || 'service_mrbmgus',
  templateId: import.meta.env.VITE_APP_TEMPLATE_ID || 'template_d16rk5m',
  receiver: import.meta.env.VITE_APP_EMAILJS_RECIEVER || 'omar-agha@engineer.com'
};

import App from "./App";

import "./index.css";

// Initialize EmailJS with fallback values
try {
  console.log('EmailJS Config:', EMAILJS_CONFIG);
  if (EMAILJS_CONFIG.key && EMAILJS_CONFIG.key !== 'undefined' && EMAILJS_CONFIG.key !== '') {
    emailjs.init(EMAILJS_CONFIG.key);
    console.log('EmailJS initialized successfully');
  } else {
    console.warn('EmailJS key not available, skipping initialization');
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
