import { Tabs, TabContextType } from "../type";
import { createContext, ReactNode, useEffect, useState } from "react";

const HomePage = () => {
  return <>Home</>;
};

const tabs: Tabs = {
  Home: {
    icon: "hugeicons:store-02",
    page: <HomePage />,
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
  currentPage: <HomePage />,
  setCurrentPage: () => null,
  heading: <></>,
  setHeading: () => null,
});

const TabContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentTab, setCurrentTab] = useState("Home");
  const [currentPage, setCurrentPage] = useState(<HomePage />);
  const [heading, setHeading] = useState(<></>);

  useEffect(() => {
    setCurrentPage(tabs[currentTab].page);
  }, [currentTab]);

  return (
    <TabContext.Provider
      value={{
        tabs,
        currentTab,
        setCurrentTab,
        currentPage,
        setCurrentPage,
        heading,
        setHeading,
      }}
    >
      {children}
    </TabContext.Provider>
  );
};

export { TabContext, TabContextProvider };
