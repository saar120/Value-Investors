import axios from "axios";

const API_KEY = process.env.REACT_APP_STOCKS_API_KEY;

const stockAPI = axios.create({
  baseURL: "https://yh-finance.p.rapidapi.com/stock/v2/get-summary",
  headers: {
    "x-rapidapi-host": "yh-finance.p.rapidapi.com",
    "x-rapidapi-key": API_KEY,
  },
});

const returnStockObj = async (ticker) => {
  const { data } = await stockAPI.get("/", { params: { symbol: ticker } });
  return {
    name: data.quoteType.shortName,
    mktCap: data.price.marketCap.fmt,
    currentPrice: data.financialData.currentPrice.raw,
    industry: data.summaryProfile.industry,
    freeCashFlow: data.financialData.freeCashflow.fmt,
    recommendation: data.financialData.recommendationKey,
    bookValue: data.defaultKeyStatistics.bookValue.fmt,
    midTermTrend: data.pageViews.midTermTrend,
  };
};

export default returnStockObj;
