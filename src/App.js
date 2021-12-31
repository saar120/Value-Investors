import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import InvestorsPage from "./Pages/InvestorsPage";
import InvestorPage from "./Pages/InvestorPage";
import { InvestorsProvider } from "./InvestorsContext";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <InvestorsProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/investors" element={<InvestorsPage />} />
            <Route path="/investors/:id" element={<InvestorPage />} />
          </Routes>
        </InvestorsProvider>
      </Router>
    </div>
  );
}

export default App;
