import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import { TabContextProvider } from "./context/TabContext.tsx";
import "./index.css";

const theme = createTheme({});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <TabContextProvider>
        <App />
      </TabContextProvider>
    </ThemeProvider>
  </StrictMode>
);
