import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInvestor } from "../Data/FirebaseFunctions";
import PieChart from "../Components/PieChart";
import ImageHolder from "../Components/StyledComponents/StyledImageHolder";
import Divider from "@mui/material/Divider";
import styled from "styled-components";
import Card from "../Components/StyledComponents/StyledContentCard";
import ActivityCard from "../Components/ActivityCard";

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
  .top {
    justify-content: space-around;
    .head {
      order: 0;
    }
  }
  .middle,
  .bottom {
    justify-content: center;
  }

  .title {
    font-weight: bold;
  }

  @media (max-width: 1000px) {
    .top-content .head {
      order: 1;
    }
  }
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

  const usdFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  const renderActivity = () => {
    return InvestorData.recentQuarter.map((activity) => {
      return <ActivityCard activity={activity} key={activity.name} />;
    });
  };

  return !InvestorData.name ? (
    ""
  ) : (
    <InvestorPageStyled>
      <div className="top content">
        <div className="head">
          <div className="header">{InvestorData.name}</div>
          <div className="sub-header">{InvestorData.company}</div>
        </div>
        <ImageHolder size="30" circle image={InvestorData.image} />
      </div>
      <Divider style={{ width: "100%" }}>Financial Details</Divider>
      <div className="middle content">
        <Card>
          <div className="title"> Total Net worth:</div>
          {usdFormatter.format(InvestorData.PortfolioValue)}
        </Card>
        <Card>
          <div className="title">Portfolio</div>
          <PieChart data={InvestorData.topHoldings} />
        </Card>
      </div>
      <Divider style={{ width: "100%" }}>Recent Activity</Divider>
      <div className="bottom content">{renderActivity()}</div>
    </InvestorPageStyled>
  );
}
