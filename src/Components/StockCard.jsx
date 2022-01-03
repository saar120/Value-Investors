import React from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export default function StockCard({ stock }) {
  return (
    <div>
      <div>
        <AttachMoneyIcon />
        {stock.name}
      </div>
      <div>{stock.price}</div>
      <div>Market cap: {stock.mktCap}</div>
      <div>industry: {stock.industry}</div>
      <div>recommendation: {stock.recommendation}</div>
      <div>bookValue: {stock.bookValue}</div>
      <div>trend: {stock.midTermTrend}</div>
    </div>
  );
}
