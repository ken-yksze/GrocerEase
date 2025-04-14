import { useContext } from "react";
import { TabContext } from "../context/TabContext";
import { Box, IconButton } from "@mui/material";
import { Icon } from "@iconify/react";

const TopBar = () => {
  const { heading } = useContext(TabContext);

  return (
    <Box
      sx={{
        height: "6em",
        padding: "0 2.5em",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>{heading}</Box>
      <IconButton
        sx={{
          ":focus": { outline: "none" },
          ":hover": { background: "none" },
          width: "2em",
          height: "2em",
          color: "black",
        }}
        disableRipple
      >
        <Icon icon="hugeicons:menu-01" width="2em" height="2em" />
      </IconButton>
    </Box>
  );
};

export default TopBar;
