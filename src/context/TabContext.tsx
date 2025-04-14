import { DbContext } from "./DbContext";
import { Tabs, TabContextType, Grocery } from "../type";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import ProductPage from "../pages/ProductPage";

const HomePage = () => {
  const { groceries } = useContext(DbContext);

  const { setCurrentPage } = useContext(TabContext);

  const switchProduct = (grocery: Grocery) => {
    setCurrentPage(<ProductPage grocery={grocery} />);
  };

  return (
    <>
      {groceries.map((grocery) => (
        <img
          src={grocery.image}
          width={300}
          onClick={() => {
            switchProduct(grocery);
          }}
        ></img>
      ))}
    </>
  );
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
