import React, { useContext, useState } from "react";
import InvestorCard from "../Components/InvestorCard";
import { Context } from "../Context/Context";
import { TextField } from "@mui/material";
import Container from "../Components/StyledComponents/StyledContainer";
import styled from "styled-components";

const StyledInvestorsPage = styled.div`
  margin: 1rem;
`;

export default function InvestorsPage() {
  const { investorsContext } = useContext(Context);
  const [Investors] = investorsContext;

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
    <StyledInvestorsPage>
      <div className="search">
        <TextField
          id="search"
          label="Search"
          type="search"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          value={searchTerm}
        />
      </div>
      <Container>{renderInvestors()}</Container>
    </StyledInvestorsPage>
  );
}
