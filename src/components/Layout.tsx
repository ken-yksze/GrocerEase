import { ReactNode, useContext, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import TopBar from "./TopBar";
import TabBar from "./TabBar";
import { TabContext } from "../context/TabContext";

const Layout = ({ children }: { children: ReactNode }) => {
  const Notification = () => {
    const { message, setMessage } = useContext(TabContext);

    useEffect(() => {
      if (message !== "") {
        setTimeout(() => setMessage(""), 2000);
      }
    }, [message, setMessage]);

    return (
      <Box
        sx={{
          width: "100%",
          height: "4.91666666667rem",
          position: "absolute",
          left: 0,
          bottom: "7.916em",
          display: message === "" ? "none" : "flex",
          backgroundColor: "#43A047",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: "1.66666666667rem",
            color: "white",
          }}
        >
          {message}
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        backgroundColor: "#FFF8F0",
        position: "relative",
      }}
    >
      <TopBar />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          paddingX: "1rem",
          overflowY: "auto",
        }}
      >
        {children}
      </Box>
      <TabBar />
      <Notification />
    </Box>
  );
};

export default Layout;
