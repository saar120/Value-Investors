import React, { useContext } from "react";
import { investorsContext } from "../InvestorsContext";
import Container from "../Components/StyledComponents/StyledContainer";
import Header from "../Components/StyledComponents/StyledHeader";

export default function HomePage() {
  const value = useContext(investorsContext);
  return (
    <Container>
      <Header color={"#BF0414"}>Welcome to Value Investors</Header>
      <div className="paragraph">
        {value}
        Here you can find data about world best Investors, <br />
        View latest activity (who bought what?) <br /> and the updated Portfolio of each Investor.
      </div>
    </Container>
  );
}
