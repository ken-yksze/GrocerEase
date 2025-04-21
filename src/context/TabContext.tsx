import { Tabs, TabContextType } from "../type";
import { createContext, ReactNode, useEffect, useState } from "react";
import HomePage from "../pages/HomePage";
import ListPage from "../pages/ListPage";
import StorePage from "../pages/StorePage";
import ProfilePage from "../pages/ProfilePage";

const tabs: Tabs = {
  Home: {
    icon: "hugeicons:store-02",
    page: <HomePage />,
  },
  Stores: {
    icon: "hugeicons:location-01",
    page: <StorePage />,
  },
  List: {
    icon: "clarity:list-line",
    page: <ListPage />,
  },
  Profile: {
    icon: "hugeicons:user-circle-02",
    page: <ProfilePage />,
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
  tabClicked: false,
  setTabClicked: () => null,
  message: "",
  setMessage: () => null,
});

const TabContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentTab, setCurrentTab] = useState("Home");
  const [currentPage, setCurrentPage] = useState(<HomePage />);
  const [heading, setHeading] = useState(<></>);
  const [tabClicked, setTabClicked] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setCurrentPage(tabs[currentTab].page);
  }, [currentTab, tabClicked]);

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
        tabClicked,
        setTabClicked,
        message,
        setMessage,
      }}
    >
      {children}
    </TabContext.Provider>
  );
};

export { TabContext, TabContextProvider };
