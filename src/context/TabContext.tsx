import { Tabs, TabContextType } from "../type";
import { createContext, ReactNode, useState } from "react";

const tabs: Tabs = {
  Home: {
    icon: "hugeicons:store-02",
    page: <>Home</>,
  },
  Stores: {
    icon: "hugeicons:location-01",
    page: <>Stores</>,
  },
  List: {
    icon: "clarity:list-line",
    page: <>List</>,
  },
  Profile: {
    icon: "hugeicons:user-circle-02",
    page: <>Profile</>,
  },
};

const TabContext = createContext<TabContextType>({
  tabs: tabs,
  currentTab: "Home",
  setCurrentTab: () => null,
});

const TabContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentTab, setCurrentTab] = useState("Home");

  return (
    <TabContext.Provider value={{ tabs, currentTab, setCurrentTab }}>
      {children}
    </TabContext.Provider>
  );
};

export { TabContext, TabContextProvider };
