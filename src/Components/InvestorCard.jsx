import React from "react";
import { useNavigate } from "react-router-dom";
import ContentCard from "./StyledComponents/StyledContentCard";
import ImageHolder from "./StyledComponents/StyledImageHolder";

export default function InvestorCard({ name, company, image, id }) {
  const navigate = useNavigate();

  const routeChange = () => {
    navigate(`/investors/${id}`);
  };
  return (
    <ContentCard onClick={routeChange}>
      <ImageHolder image={image} size="15" />
      <div className="name">{name}</div>
      <div className="company">{company}</div>
    </ContentCard>
  );
}
