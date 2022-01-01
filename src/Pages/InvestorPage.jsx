import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInvestor } from "../Data/FirebaseFunctions";
import PieChart from "../Components/PieChart";
import ImageHolder from "../Components/StyledComponents/StyledImageHolder";
import styled from "styled-components";

const InvestorPageStyled = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

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
    <InvestorPageStyled>
      <h3>{InvestorData.name}</h3>
      <ImageHolder size="20" circle image={InvestorData.image} />
      <h3>{InvestorData.recentQuarter[0].activity}</h3>
      <PieChart data={InvestorData.topHoldings} />
    </InvestorPageStyled>
  );
}
