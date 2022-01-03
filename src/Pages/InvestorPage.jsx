import React, { useEffect, useState, useContext } from "react";
import { Context } from "../Context/Context";
import { useParams } from "react-router-dom";
import { getInvestor, addToUserWatchlist, removeFromUserWatchlist } from "../Data/FirebaseFunctions";
import { delayedState } from "../Utils/utilFunction";
import StyledInvestorPage from "./StyledPages/StyledInvestorPage";
import PieChart from "../Components/PieChart";
import ImageHolder from "../Components/StyledComponents/StyledImageHolder";
import { Button, CircularProgress, Divider, Box } from "@mui/material";
import Card from "../Components/StyledComponents/StyledContentCard";
import ActivityCard from "../Components/ActivityCard";
import Snackbar from "../Components/Snackbar";
import stockAPI from "../Utils/stockAPI";
import { getData, setData } from "../Utils/ssesionStorage";

export default function InvestorPage() {
  const [InvestorData, setInvestorData] = useState({});
  const [inWatchlist, setInWatchlist] = useState(false);
  const [disabled, setIsDisabled] = useState(false);
  const [stocks, setStocks] = useState([]);
  const [popup, setPopup] = useState(false);
  const { userContext, watchlistContext } = useContext(Context);
  const [user] = userContext;
  const [watchlist, setWatchlistFromDB] = watchlistContext;
  const investorId = useParams().id;

  // const width = window.innerWidth;

  useEffect(() => {
    const setInvestor = async () => {
      const investor = await getInvestor(investorId);
      setInvestorData(investor);
    };
    setInvestor();
  }, [investorId]);

  useEffect(() => {
    const stocksData = getData("stocks");
    if (!stocksData) {
      return;
    }
    console.log(stocksData);
  }, []);

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
      return (
        <ActivityCard activity={activity} key={activity.name} stockClick={() => stockClickHandler(activity.ticker)} />
      );
    });
  };

  const watchlistButtonHandler = async () => {
    if (!user) {
      delayedState(8000, setPopup);
      console.log("only sign users");
      return;
    }
    setIsDisabled(true);
    inWatchlist
      ? await removeFromUserWatchlist(user.uid, InvestorData)
      : await addToUserWatchlist(user.uid, InvestorData);
    await setWatchlistFromDB();
    setIsDisabled(false);
  };

  const stockClickHandler = async (ticker) => {
    if (!user) {
      delayedState(8000, setPopup);
      return;
    }
    //TODO: set 82-96 to other function
    let checkedTicker = ticker.includes(".") ? ticker.replace(".", "-") : ticker;
    console.log(checkedTicker);
    const { data } = await stockAPI.get("/", { params: { symbol: checkedTicker } });
    console.log(data);
    const newStockObj = {
      name: data.quoteType.shortName,
      mktCap: data.price.marketCap.fmt,
      currentPrice: data.financialData.currentPrice.raw,
      industry: data.summaryProfile.industry,
      freeCashFlow: data.financialData.freeCashflow.fmt,
      recommendation: data.financialData.recommendationKey,
      bookValue: data.defaultKeyStatistics.bookValue.fmt,
      midTermTrend: data.pageViews.midTermTrend,
    };
    console.log(newStockObj);
  };

  return !InvestorData.name ? (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <CircularProgress size={140} />
    </Box>
  ) : (
    <StyledInvestorPage>
      {popup && <Snackbar text="Only signed users can access this feature" />}
      <div className="top content">
        <div className="head">
          <div className="header">{InvestorData.name}</div>
          <div className="sub-header">{InvestorData.company}</div>

          <Button className="watchlist-btn" disabled={disabled} onClick={() => watchlistButtonHandler()}>
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
          <PieChart data={InvestorData.topHoldings} stockClick={(ticker) => stockClickHandler(ticker)} />
        </Card>
      </div>
      <Divider style={{ width: "100%" }}>Recent Activity</Divider>
      <div className="bottom content">{renderActivity()}</div>
      <Divider style={{ width: "100%" }}>Recent Articles</Divider>
    </StyledInvestorPage>
  );
}
