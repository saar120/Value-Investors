import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { investorsContext } from "../InvestorsContext";

export default function InvestorPage() {
  const investorId = useParams().id;
  const [Investors] = useContext(investorsContext);
  console.log(investorId);

  return <div>InvestorPage</div>;
}
