import { useContext } from "react";
import { TabContext } from "./context/TabContext";
import Layout from "./components/Layout";
import "./App.css";

function App() {
  const { tabs, currentTab } = useContext(TabContext);

  return <Layout>{tabs[currentTab].page}</Layout>;
}

export default App;
