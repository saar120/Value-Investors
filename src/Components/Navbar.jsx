import React, { useState, useContext } from "react";
import { Context } from "../Context/Context";
import { Link } from "react-router-dom";
import NavbarStyled from "./StyledComponents/StyledNavbar";
import AccountMenu from "./AccountMenu";
import { ClickAwayListener, Portal, Button } from "@mui/material";

export default function Navbar() {
  const [showForm, setShowForm] = useState(false);
  const { userContext } = useContext(Context);
  const [user] = userContext;

  return (
    <NavbarStyled>
      <div className="navbar left">
        <Button variant="filled">
          <Link to="/" className="navItem">
            Home
          </Link>
        </Button>
        <Button variant="filled">
          <Link to="/investors" className="navItem">
            Investors
          </Link>
        </Button>
      </div>
      <div className="navbar right">
        <ClickAwayListener onClickAway={() => setShowForm(false)}>
          <div>
            <Button onClick={() => setShowForm((prev) => !prev)} className="navItem">
              {user ? "Your account" : "Login"}
            </Button>
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
