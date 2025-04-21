import { useContext, useEffect, useState } from "react";
import { TabContext } from "./context/TabContext";
import Layout from "./components/Layout";
import "./App.css";
import LogoPage from "./pages/LogoPage";

function App() {
  const [loading, setLoading] = useState(true);
  const { currentPage } = useContext(TabContext);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return loading ? <LogoPage /> : <Layout>{currentPage}</Layout>;
}

export default App;
