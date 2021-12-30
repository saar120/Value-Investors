import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { getInvestors } from "./Data/FirebaseFunctions";
import HomePage from "./Pages/HomePage";
import InvestorsPage from "./Pages/InvestorsPage";
import InvestorPage from "./Pages/InvestorPage";
import { InvestorsProvider } from "./InvestorsContext";
import Navbar from "./Components/Navbar";

function App() {
  const [Data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const investors = await getInvestors();
      console.log(investors);
      setData(investors);
    };

    getData();
  }, []);
  return (
    <div className="App">
      <Router>
        <InvestorsProvider>
          <Navbar data={Data} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/investors" element={<InvestorsPage />} />
            <Route path="/investors/:name" element={<InvestorPage />} />
          </Routes>
        </InvestorsProvider>
      </Router>
    </div>
  );
}

export default App;
