import React from "react";
import { useNavigate } from "react-router-dom";
import ContentCard from "./StyledComponents/StyledContentCard";
import styled from "styled-components";

const InvestorCardStyled = styled.div`
  .image {
    height: 300px;
    width: 300px;
    background: url(${(props) => props.image}) center center / cover;
  }
`;

export default function InvestorCard({ name, company, image, id }) {
  const navigate = useNavigate();

  const routeChange = () => {
    navigate(`/investors/${id}`);
  };
  return (
    <ContentCard onClick={routeChange}>
      <InvestorCardStyled image={image}>
        <div className="image"></div>
        <div className="name">{name}</div>
        <div className="company">{company}</div>
      </InvestorCardStyled>
    </ContentCard>
  );
}
