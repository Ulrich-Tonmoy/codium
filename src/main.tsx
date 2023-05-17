import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SourceProvider } from "./redux/SourceContext";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SourceProvider>
      <App />
    </SourceProvider>
  </React.StrictMode>,
);
