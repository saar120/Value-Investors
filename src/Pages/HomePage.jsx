import React, { useContext } from "react";
import { investorsContext } from "../InvestorsContext";

export default function HomePage() {
  const value = useContext(investorsContext);
  return (
    <div>
      HomePage
      <br />
      {value}
    </div>
  );
}
