import React from "react";
import { Link } from "react-router-dom";
import NavbarStyled from "./StyledComponents/StyledNavbar";
export default function Navbar() {
  return (
    <NavbarStyled>
      <div className="navbar left">
        <Link to="/" className="navItem">
          Home
        </Link>
        <Link to="/investors" className="navItem">
          Investors
        </Link>
      </div>
      <div className="navbar right">
        <div className="navItem">Account</div>
      </div>
    </NavbarStyled>
  );
}
