import { useContext } from "react";
import { TabContext } from "../context/TabContext";
import { Box, IconButton } from "@mui/material";
import { Icon } from "@iconify/react";

const TabBar = () => {
  const { tabs, currentTab, setCurrentTab } = useContext(TabContext);

  return (
    <Box
      sx={{
        height: "7.916em",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "flex-end",
      }}
    >
      {Object.keys(tabs).map((tab, i) => (
        <IconButton
          key={i}
          onClick={() => setCurrentTab(tab)}
          sx={{
            ":focus": { outline: "none" },
            ":hover": { background: "none" },
            width: "5.833em",
            padding: "0 0 0.341em 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "black",
            fontFamily: '"Inter", sans-serif',
            fontWeight: 400,
            fontSize: "1em",
            gap: "0.341em",
          }}
          disableRipple
        >
          {tab === currentTab ? (
            <Box
              sx={{
                width: "5.833em",
                height: "5.833em",
                borderRadius: "50%",
                boxShadow: "0 0.333em 0.333em 0 rgb(0 0 0 / 25%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon icon={tabs[tab].icon} width="2.75em" height="2.75em" />
            </Box>
          ) : (
            <Icon icon={tabs[tab].icon} width="2.75em" height="2.75em" />
          )}
          {tab}
        </IconButton>
      ))}
    </Box>
  );
};

export default TabBar;
