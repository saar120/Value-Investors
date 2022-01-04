import React from "react";
import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledStockCard = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0.6rem;
  gap: 0.5rem;
  .title {
    font-size: 1.2rem;
    font-weight: bold;
  }
  .stock-name {
    font-weight: bold;
  }
`;

export default function StockCard({ stock }) {
  const rows = [
    { propery: "Stock Price:", value: "$" + stock.currentPrice },
    { propery: "Market Cap:", value: stock.mktCap },
    { propery: "Book Value:", value: stock.bookValue },
    { propery: "Free Cash Flow:", value: stock.freeCashFlow },
    { propery: "Industry:", value: stock.industry },
    { propery: "Analysts Recommended:", value: stock.recommendation.toUpperCase() },
    { propery: "Mid Term Trend:", value: stock.midTermTrend },
  ];

  return (
    <StyledStockCard>
      <div className="title">Stock Data</div>
      <div className="stock-name">{stock.name}</div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 250 }} aria-label="simple table">
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow key={row.propery}>
                  <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
                    {row.propery}
                  </TableCell>
                  <TableCell align="left">{row.value}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledStockCard>
  );
}
