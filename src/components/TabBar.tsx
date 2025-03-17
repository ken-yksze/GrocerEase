import { Tabs } from "../type";
import { Dispatch, SetStateAction } from "react";
import { IconButton, Box } from "@mui/material";

const TabBar = ({
  tabs,
  currentTab,
  setCurrentTab,
}: {
  tabs: Tabs;
  currentTab: string;
  setCurrentTab: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <Box id="tab-bar" sx={{ backgroundColor: "#C3C3C3" }}>
      {Object.keys(tabs).map((tab, i) => (
        <IconButton
          key={i}
          onClick={() => setCurrentTab(tab)}
          sx={{
            color: tab === currentTab ? "black" : "gray",
            ":focus": { outline: "none" },
          }}
        >
          {tabs[tab].icon}
        </IconButton>
      ))}
    </Box>
  );
};

export default TabBar;
