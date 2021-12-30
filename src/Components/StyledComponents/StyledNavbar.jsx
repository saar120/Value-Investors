import styled from "styled-components";

const NavbarStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  height: 2.5rem;
  background-color: #2995bf;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    .navItem {
      position: relative;
      padding: 0.3rem;
      color: white;
      font-weight: 700;
      font-size: 0.9rem;
      text-decoration: none;
    }
    .navItem:after,
    .navItem:before {
      content: "";
      position: absolute;
      display: block;
      border: 0px solid transparent;
      width: 0%;
      height: 0%;
      transition: all 0.5s ease;
    }

    .navItem:after {
      width: 0%;
      height: 0%;
      top: 0;
      left: 0;
      border-top: 2px solid transparent;
      border-left: 2px solid transparent;
    }

    .navItem:before {
      width: 0%;
      height: 0%;
      right: 0;
      bottom: 0;
      border-bottom: 2px solid transparent;
      border-right: 2px solid transparent;
    }

    .navItem:hover::before,
    .navItem:hover::after {
      width: 100%;
      height: 100%;
      border-color: #fff;
    }
  }
`;

export default NavbarStyled;
