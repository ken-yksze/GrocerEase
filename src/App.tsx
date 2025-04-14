import { useContext } from "react";
import { TabContext } from "./context/TabContext";
import Layout from "./components/Layout";
import "./App.css";

function App() {
  const { currentPage } = useContext(TabContext);

  return <Layout>{currentPage}</Layout>;
}

export default App;
