import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInvestor } from "../Data/FirebaseFunctions";
import PieChart from "../Components/PieChart";

export default function InvestorPage() {
  const [InvestorData, setInvestorData] = useState({});
  const investorId = useParams().id;

  useEffect(() => {
    const setInvestor = async () => {
      const investor = await getInvestor(investorId);
      setInvestorData(investor);
    };
    setInvestor();
  }, [investorId]);

  return !InvestorData.name ? (
    ""
  ) : (
    <div>
      <h3>{InvestorData.name}</h3>
      <h3>{InvestorData.recentQuarter[0].activity}</h3>
      <PieChart data={InvestorData.topHoldings} />
    </div>
  );
}
