import React, { useEffect, useState } from "react";
import TabBar from "./TabBar";

const tabs = [
  { name: "Home", icon: "Home.svg", page: "" },
  { name: "Location", icon: "Location.svg" },
  { name: "Cart", icon: "Cart.svg" },
  { name: "List", icon: "List.svg" },
  { name: "User", icon: "User.svg" },
];

const Layout = () => {
  const currentTab = useState(null);

  return <TabBar tabs={tabs} currentTab={currentTab} />;
};

export default Layout;
