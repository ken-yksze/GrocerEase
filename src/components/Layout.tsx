import { Tabs } from "../type";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import LocationIcon from "@mui/icons-material/LocationOnOutlined";
import CartIcon from "@mui/icons-material/ShoppingCart";
import ListIcon from "@mui/icons-material/ListAltOutlined";
import UserIcon from "@mui/icons-material/PersonOutlined";
import { useState } from "react";
import Header from "./Header";
import TabBar from "./TabBar";
import { Box } from "@mui/material";

const tabs: Tabs = {
  Home: {
    icon: <HomeIcon />,
    page: <>Home</>,
  },
  Location: {
    icon: <LocationIcon />,
    page: <>Location</>,
  },
  Cart: {
    icon: <CartIcon />,
    page: <>Cart</>,
  },
  List: {
    icon: <ListIcon />,
    page: <>List</>,
  },
  User: {
    icon: <UserIcon />,
    page: <>User</>,
  },
};

const Layout = () => {
  const [currentTab, setCurrentTab] = useState("Home");

  return (
    <Box id="content" sx={{ height: "100vh" }}>
      <Header />
      <main>{tabs[currentTab].page}</main>
      <TabBar
        tabs={tabs}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
    </Box>
  );
};

export default Layout;
