import React, { useContext, useState } from "react";
import InvestorCard from "../Components/InvestorCard";
import Container from "../Components/StyledComponents/StyledContainer";
import { Context } from "../Context";

export default function InvestorsPage() {
  const [Investors] = useContext(Context);

  const [searchTerm, setSearchTerm] = useState("");

  const filterByValue = (array, value) => {
    return array.filter((item) => item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  };

  const renderInvestors = () => {
    return Investors.length === 0
      ? ""
      : filterByValue(Investors, searchTerm).map((investor) => {
          const { name, id, image, company } = investor;
          return <InvestorCard key={id} id={id} name={name} image={image} company={company} />;
        });
  };

  return (
    <Container>
      <div className="search">
        <input
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          value={searchTerm}
          type="text"
          placeholder="Search..."
        />
        {renderInvestors()}
      </div>
    </Container>
  );
}
