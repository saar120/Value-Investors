import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "./StyledComponents/StyledContentCard";
import ImageHolder from "./StyledComponents/StyledImageHolder";

export default function InvestorCard({ name, company, image, id }) {
  const navigate = useNavigate();

  const routeChange = () => {
    navigate(`/investors/${id}`);
  };
  return (
    <Card onClick={routeChange} style={{ cursor: "pointer", maxWidth: "280px" }}>
      <ImageHolder image={image} size="10" />
      <div className="name title">{name}</div>
      <div className="company">{company}</div>
    </Card>
  );
}
