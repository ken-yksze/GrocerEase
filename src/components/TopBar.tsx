import { useContext } from "react";
import { TabContext } from "../context/TabContext";
import { DbContext } from "../context/DbContext";
import { Box, IconButton, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import ListPage from "../pages/ListPage";

const TopBar = () => {
  const { heading, setCurrentPage } = useContext(TabContext);
  const { newItems } = useContext(DbContext);

  return (
    <Box
      sx={{
        padding: "1rem 1rem",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box>{heading}</Box>
      <IconButton
        sx={{
          ":focus": { outline: "none" },
          height: "3.08333333333rem",
          width: "5.25rem",
          borderRadius: "2.5rem",
          color: "black",
          backgroundColor: newItems === 0 ? "white" : "#43A047",
        }}
        disableRipple
        onClick={() => setCurrentPage(<ListPage />)}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <Icon
            icon="clarity:list-line"
            width="2.16666666667rem"
            height="2.16666666667rem"
          />
          <Typography
            sx={{
              height: "1.83333333333rem",
              width: "1.83333333333rem",
              borderRadius: "50%",
              backgroundColor: newItems === 0 ? "#CECCCC" : "white",
              textAlign: "center",
              lineHeight: "1.83333333333rem",
              fontSize: "0.83333333333rem",
            }}
          >
            {newItems}
          </Typography>
        </Box>
      </IconButton>
    </Box>
  );
};

export default TopBar;
