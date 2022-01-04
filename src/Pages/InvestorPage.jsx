import React, { useEffect, useState, useContext } from "react";
import { Context } from "../Context/Context";
import { useParams } from "react-router-dom";
import { getInvestor, addToUserWatchlist, removeFromUserWatchlist } from "../Data/FirebaseFunctions";
import { delayedState } from "../Utils/utilFunction";
import StyledInvestorPage from "./StyledPages/StyledInvestorPage";
import returnStockObj from "../Utils/stockAPI";
import { getData, setData } from "../Utils/ssesionStorage";
import debounce from "lodash.debounce";
import { ClickAwayHook } from "../Utils/ClickAwayHook";
import Card from "../Components/StyledComponents/StyledContentCard";
import PieChart from "../Components/PieChart";
import ImageHolder from "../Components/StyledComponents/StyledImageHolder";
import ActivityCard from "../Components/ActivityCard";
import Snackbar from "../Components/Snackbar";
import StockPopup from "../Components/StockPopup";
import StockCard from "../Components/StockCard";
import { Button, CircularProgress, Divider, Box } from "@mui/material";

export default function InvestorPage() {
  const [InvestorData, setInvestorData] = useState({});
  const [inWatchlist, setInWatchlist] = useState(false);
  const [disabled, setIsDisabled] = useState(false);
  const [stocks, setStocks] = useState({});
  const [popup, setPopup] = useState(false);
  const [currentStock, setCurrentStock] = useState({});
  const { userContext, watchlistContext } = useContext(Context);
  const [user] = userContext;
  const [watchlist, setWatchlistFromDB] = watchlistContext;
  const { visible: stockVisible, setVisible: setStockVisible, ref: stockCardRef } = ClickAwayHook(false);
  const investorId = useParams().id;

  useEffect(() => {
    const setInvestor = async () => {
      const investor = await getInvestor(investorId);
      setInvestorData(investor);
    };
    const setStocksFromStorage = () => {
      const stocksData = getData("stocks");
      if (!stocksData) {
        return;
      }
      setStocks(stocksData);
    };
    setStocksFromStorage();
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

  const watchlistButtonHandler = async () => {
    if (!user) {
      delayedState(6000, setPopup);
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
      delayedState(6000, setPopup);
      return;
    }
    setCurrentStock({});
    setStockVisible(true);
    const formattedTicker = ticker.includes(".") ? ticker.replace(".", "-") : ticker;
    if (stocks[formattedTicker]) {
      setCurrentStock(stocks[formattedTicker]);
      return;
    }
    const newStockObj = await returnStockObj(formattedTicker);
    console.log("request");
    const newStocks = { ...stocks, [formattedTicker]: newStockObj };
    setData("stocks", newStocks);
    setStocks(getData("stocks"));
    setCurrentStock(newStockObj);
  };

  const debouncedStockClick = debounce(stockClickHandler, 500);

  const renderActivity = () => {
    return InvestorData.recentQuarter.map((activity) => {
      return (
        <ActivityCard activity={activity} key={activity.name} stockClick={() => debouncedStockClick(activity.ticker)} />
      );
    });
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
          <PieChart data={InvestorData.topHoldings} stockClick={(ticker) => debouncedStockClick(ticker)} />
        </Card>
      </div>
      <Divider style={{ width: "100%" }}>Recent Activity</Divider>
      <div className="bottom content">{renderActivity()}</div>

      {stockVisible && (
        <StockPopup ref={stockCardRef}>
          {Object.keys(currentStock).length === 0 ? <CircularProgress size={50} /> : <StockCard stock={currentStock} />}
        </StockPopup>
      )}
    </StyledInvestorPage>
  );
}
