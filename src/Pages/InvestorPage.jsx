import React, { useEffect, useState, useContext } from "react";
import { Context } from "../Context";
import { useParams } from "react-router-dom";
import { getInvestor, addToUserWatchlist, removeFromUserWatchlist } from "../Data/FirebaseFunctions";
import PieChart from "../Components/PieChart";
import ImageHolder from "../Components/StyledComponents/StyledImageHolder";
import Divider from "@mui/material/Divider";
import styled from "styled-components";
import { Button } from "@mui/material";
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
  const [inWatchlist, setInWatchlist] = useState(false);
  const { userContext, watchlistContext } = useContext(Context);
  const [user] = userContext;
  const investorId = useParams().id;
  const [watchlist, setWatchlistFromDB] = watchlistContext;

  // const width = window.innerWidth;

  useEffect(() => {
    const setInvestor = async () => {
      const investor = await getInvestor(investorId);
      setInvestorData(investor);
    };
    setInvestor();
  }, [investorId]);

  useEffect(() => {
    if (watchlist.find((investor) => investor.id === InvestorData.id)) {
      setInWatchlist(true);
    } else {
      setInWatchlist(false);
    }
  }, [watchlist, InvestorData]);

  const usdFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  const renderActivity = () => {
    return InvestorData.recentQuarter.map((activity) => {
      return <ActivityCard activity={activity} key={activity.name} />;
    });
  };

  const watchlistButtonHandler = async () => {
    if (!user) {
      console.log("only sign users");
      return;
    }
    inWatchlist
      ? await removeFromUserWatchlist(user.uid, InvestorData)
      : await addToUserWatchlist(user.uid, InvestorData);
    setWatchlistFromDB();
  };

  return !InvestorData.name ? (
    ""
  ) : (
    <InvestorPageStyled>
      <div className="top content">
        <div className="head">
          <div className="header">{InvestorData.name}</div>
          <div className="sub-header">{InvestorData.company}</div>

          <Button onClick={() => watchlistButtonHandler()}>
            {inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
          </Button>
        </div>
        <ImageHolder size="30" circle image={InvestorData.image} />
      </div>
      <Divider style={{ width: "100%" }}>Financial Details</Divider>
      <div className="middle content">
        <Card>
          <div className="title"> Total net worth:</div>
          {usdFormatter.format(InvestorData.PortfolioValue)}
        </Card>
        <Card>
          <div className="title">Portfolio</div>
          <PieChart data={InvestorData.topHoldings} />
        </Card>
      </div>
      <Divider style={{ width: "100%" }}>Recent Activity</Divider>
      <div className="bottom content">{renderActivity()}</div>
      <Divider style={{ width: "100%" }}>Recent Articles</Divider>
    </InvestorPageStyled>
  );
}
