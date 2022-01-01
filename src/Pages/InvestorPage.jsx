import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInvestor } from "../Data/FirebaseFunctions";
import PieChart from "../Components/PieChart";
import ImageHolder from "../Components/StyledComponents/StyledImageHolder";
import Divider from "@mui/material/Divider";
import styled from "styled-components";

const InvestorPageStyled = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;

  .header {
    font-size: clamp(1.5rem, 6vw, 4rem);
    font-weight: bold;
    padding: 0.5rem;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    width: clamp(350px, 80%, 1100px);
    gap: 1.4rem;
    align-items: center;
  }
  .top-content {
    justify-content: space-around;
    .head {
      order: 0;
    }
  }
  .middle-content {
    justify-content: center;
  }

  .portfolio {
    padding: 0.5rem;
    border-radius: 15px;
    background-color: #f7f7ff;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 10px;
    font-weight: bold;
  }

  @media (max-width: 1000px) {
    .top-content .head {
      order: 1;
    }
  }
`;

const Card = styled.div`
  padding: 1rem;
  border-radius: 15px;
  background-color: #f7f7ff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 10px;
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
      <div className="top-content content">
        <div className="head">
          <div className="header">{InvestorData.name}</div>
          <div className="sub-header">{InvestorData.company}</div>
        </div>
        <ImageHolder size="30" circle image={InvestorData.image} />
      </div>
      <Divider style={{ width: "100%" }}>Financial Details</Divider>
      <div className="middle-content content">
        <Card>Total Net worth:</Card>
        <div className="portfolio">
          <div>Portfolio</div>
          <PieChart data={InvestorData.topHoldings} />
        </div>
      </div>
    </InvestorPageStyled>
  );
}
