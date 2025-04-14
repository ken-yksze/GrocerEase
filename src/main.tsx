import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import { DbContextProvider } from "./context/DbContext.tsx";
import { TabContextProvider } from "./context/TabContext.tsx";
import "./index.css";

const theme = createTheme({});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <DbContextProvider>
        <TabContextProvider>
          <App />
        </TabContextProvider>
      </DbContextProvider>
    </ThemeProvider>
  </StrictMode>
);
