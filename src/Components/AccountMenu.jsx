import React, { useState, useContext } from "react";
import { Context } from "../Context";
import { auth } from "../Data/FirebaseConfig";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import styled from "styled-components";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

const AccountMenuStyled = styled.div`
  z-index: 100;
  width: 300px;
  height: 370px;
  position: absolute;
  top: calc(50% - 185px);
  left: calc(50% - 150px);
  border-radius: 15px;
  background-color: #f7f7ff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 10px;
  display: flex;
  flex-direction: column;
  .top {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
  .pointer {
    cursor: pointer;
  }
`;

export default function AccountMenu(props) {
  const { userContext } = useContext(Context);
  const [user] = userContext;
  const [signedUpStatus, setSignedUpStatus] = useState(true);

  const register = async (email, password) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      return user;
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (signedUpStatus) {
      console.log("login");
    } else {
      register(data.get("email"), data.get("password"));
    }
  };

  return (
    <AccountMenuStyled>
      <div className="top">
        <Button onClick={() => props.cancel()} sx={{ mr: 2 }}>
          X
        </Button>
      </div>
      {user ? (
        <div>Hello {user.email}</div>
      ) : (
        <>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {signedUpStatus ? "Login" : "Sign Up"}
            </Button>
          </Box>
          <Link className="pointer" onClick={() => setSignedUpStatus(!signedUpStatus)} variant="body2">
            {signedUpStatus ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </Link>
        </>
      )}
    </AccountMenuStyled>
  );
}
