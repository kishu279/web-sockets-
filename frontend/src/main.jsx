import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { RecoilRoot } from "recoil";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RecoilRoot>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </RecoilRoot>
  </StrictMode>
);
