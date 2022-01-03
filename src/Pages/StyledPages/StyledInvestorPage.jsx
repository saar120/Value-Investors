import styled from "styled-components";

const StyledInvestorPage = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;

  .header {
    font-size: clamp(1.5rem, 6vw, 4rem);
    font-weight: bold;
    padding: 0.5rem;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    width: clamp(350px, 80%, 1100px);
    gap: 1.4rem;
    align-items: center;
  }
  .top {
    justify-content: space-around;
    .head {
      order: 0;
    }
  }
  .middle,
  .bottom {
    justify-content: center;
  }

  .title {
    font-weight: bold;
  }

  .not-signed {
    position: absolute;
    top: 0;
    left: 0;
  }

  @media (max-width: 1000px) {
    .top-content .head {
      order: 1;
    }
  }
`;

export default StyledInvestorPage;
