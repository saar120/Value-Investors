import React, { useState, useContext } from "react";
import { Context } from "../Context";
import { Link } from "react-router-dom";
import NavbarStyled from "./StyledComponents/StyledNavbar";
import AccountMenu from "./AccountMenu";
export default function Navbar() {
  const [showForm, setShowForm] = useState(false);
  const { userContext } = useContext(Context);
  const [user] = userContext;

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
          {user ? "Your account" : "Login"}
        </div>
      </div>
      {showForm && <AccountMenu cancel={() => setShowForm(!showForm)} />}
    </NavbarStyled>
  );
}
