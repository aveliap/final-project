import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/styles/global.css";
import App from "@/App";
import store from "@/redux/store.js";
import { Provider } from "react-redux";
import { NextUIProvider } from "@nextui-org/system";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </Provider>
  </StrictMode>
);
