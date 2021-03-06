import styled from "styled-components";

const NavbarStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  height: 60px;
  background-color: #1976d2;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    .navItem {
      color: white;
      font-weight: 700;
      font-size: 0.9rem;
      text-decoration: none;
    }
  }
`;

export default NavbarStyled;
