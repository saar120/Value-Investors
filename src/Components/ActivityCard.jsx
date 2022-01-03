import React from "react";
import styled from "styled-components";
import Card from "./StyledComponents/StyledContentCard";

const ActivityCardStyled = styled.div`
  cursor: pointer;
  .title {
    color: ${(props) => (props.activity ? "green" : "red")};
  }
`;

export default function ActivityCard(props) {
  const { name, activity, shareChange, ticker } = props.activity;

  const checkActivity = activity.includes("Add") || activity.includes("Buy") ? true : false;

  return (
    <Card onClick={() => props.stockClick(ticker)}>
      <ActivityCardStyled activity={checkActivity}>
        <div className="title">{name}</div>
        <div>
          {activity} <br />
          {shareChange} shares {checkActivity ? "BOUGHT" : "SOLD"}
        </div>
      </ActivityCardStyled>
    </Card>
  );
}
