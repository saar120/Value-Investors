import React, { useContext } from "react";
import InvestorCard from "../Components/InvestorCard";
import Container from "../Components/StyledComponents/StyledContainer";
import ContentCard from "../Components/StyledComponents/StyledContentCard";
import { investorsContext } from "../InvestorsContext";

export default function InvestorsPage() {
  const [Investors] = useContext(investorsContext);

  const renderInvestors = () => {
    return Investors.length === 0
      ? ""
      : Investors.map((investor) => {
          const { name, id, image, company } = investor;
          return <InvestorCard key={id} name={name} image={image} company={company} />;
        });
  };

  return (
    <Container>
      <div className="search">
        <input type="text" placeholder="Search..." />
        {renderInvestors()}
      </div>
    </Container>
  );
}
