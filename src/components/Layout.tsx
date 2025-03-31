import { ReactNode } from "react";
import { Box } from "@mui/material";
import TopBar from "./TopBar";
import TabBar from "./TabBar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
      }}
    >
      <TopBar />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </Box>
      <TabBar />
    </Box>
  );
};

export default Layout;
