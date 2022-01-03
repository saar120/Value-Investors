import React, { useState, useContext } from "react";
import { Context } from "../Context";
import { Link } from "react-router-dom";
import NavbarStyled from "./StyledComponents/StyledNavbar";
import AccountMenu from "./AccountMenu";
import { ClickAwayListener, Portal } from "@mui/material";

export default function Navbar() {
  const [showForm, setShowForm] = useState(false);
  const { userContext } = useContext(Context);
  const [user] = userContext;

  return (
    <NavbarStyled>
      <div className="navbar left">
        <Link onClick={() => setShowForm(false)} to="/" className="navItem">
          Home
        </Link>
        <Link onClick={() => setShowForm(false)} to="/investors" className="navItem">
          Investors
        </Link>
      </div>
      <div className="navbar right">
        <ClickAwayListener onClickAway={() => setShowForm(false)}>
          <div>
            <div onClick={() => setShowForm((prev) => !prev)} className="navItem">
              {user ? "Your account" : "Login"}
            </div>
            {showForm ? (
              <Portal>
                <AccountMenu cancel={() => setShowForm(!showForm)} />
              </Portal>
            ) : null}
          </div>
        </ClickAwayListener>
      </div>
    </NavbarStyled>
  );
}
