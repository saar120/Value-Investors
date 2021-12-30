import React from "react";
import Container from "../Components/StyledComponents/StyledContainer";
import Header from "../Components/StyledComponents/StyledHeader";
import ContentCard from "../Components/StyledComponents/StyledContentCard";

export default function HomePage() {
  return (
    <Container>
      <Header color={"#BF0414"}>Welcome to Value Investors</Header>
      <ContentCard>
        <div className="paragraph">
          Here you can find data about world best Investors, <br />
          View latest activity (who bought what?) <br /> and the updated Portfolio of each Investor.
        </div>
      </ContentCard>
    </Container>
  );
}
