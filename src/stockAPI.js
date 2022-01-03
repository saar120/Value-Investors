import axios from "axios";

const stockAPI = axios.create({
  baseURL: "https://yh-finance.p.rapidapi.com/stock/v2/get-summary",
  headers: {
    "x-rapidapi-host": "yh-finance.p.rapidapi.com",
    "x-rapidapi-key": process.env.REACT_APP_STOCKS_API_KEY,
  },
});

export default stockAPI;

const stockObj = {
  name: "Bank of America Corporation",
  mktCap: "364.11B",
  currentPrice: 44.49,
  industry: "Banks—Diversified",
  recommendation: "buy",
  bookValue: "30.22",
  midTermTrend: "UP",
};
