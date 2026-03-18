import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    if (confirm("A new update is available. Would you like to reload the page പുതിയ അപ്ഡേറ്റ് ലഭ്യമാണ്. പേജ് റീലോഡ് ചെയ്യട്ടെ?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("App ready for offline use.");
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);