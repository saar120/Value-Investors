import React from "react";
import styled from "styled-components";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const StyledHomePage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  gap: 5rem;
  font-size: clamp(1.3rem, 6vw, 2rem);
  .header {
    font-weight: bold;
    padding: 1rem;
    span {
      font-size: clamp(2.3rem, 8vw, 3.5rem);
      color: #f5655b;
    }
  }
  .sub-header {
    font-size: 1.1rem;
    font-weight: bold;
  }
  .center {
    width: 100%;
  }
  .title {
    font-weight: bold;
    font-size: 1.1rem;
  }
  .content {
    font-size: 1rem;
  }
  .headers {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .accordion {
    width: clamp(300px, 80%, 700px);
  }
  .MuiAccordion-root {
    background-color: #f7f7ff;
  }
`;

export default function HomePage() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <StyledHomePage>
      <div className="headers">
        <div className="header" color={"#f5655b"}>
          Welcome To
          <br /> <span>Value Investors</span>
        </div>
        <div className="sub-header">Here you can find data about world best Investors</div>
      </div>
      <div className="accordion">
        <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
            <div className="title center">How To Use</div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="content center">
              On the investors tab, you can view or search all the available investors. <br />
              After clicking on an investor you can view their portfolio and recent activity.
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
            <div className="title center">Do I Need To Pay?</div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="content center">
              As of this day our site is absolutely free.
              <br /> We provide portfolio and recent activity data for everyone.
              <br />
              Signed users can enjoy Watchlist and Stocks data features.
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </StyledHomePage>
  );
}
