import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavbarStyled from "./StyledComponents/StyledNavbar";
import AccountMenu from "./AccountMenu";
export default function Navbar() {
  const [showForm, setShowForm] = useState(false);

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
        <div onClick={() => setShowForm(!showForm)} className="navItem">
          Account
        </div>
      </div>
      {showForm && <AccountMenu cancel={() => setShowForm(!showForm)} />}
    </NavbarStyled>
  );
}
