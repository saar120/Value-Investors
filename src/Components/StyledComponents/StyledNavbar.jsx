import styled from "styled-components";

const NavbarStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  height: 2.5rem;
  background-color: #1976d2;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    .navItem {
      position: relative;
      padding: 0.4rem;
      color: white;
      font-weight: 700;
      font-size: 0.9rem;
      text-decoration: none;
      border-bottom: 3px solid transparent;
      transition: all 0.3s ease;
      cursor: pointer;
    }
    .navItem:hover {
      width: 100%;
      border-color: white;
    }
  }
`;

export default NavbarStyled;
