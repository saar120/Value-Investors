import React, { useState, useContext } from "react";
import { Context } from "../Context";
import styled from "styled-components";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

const SignFormStyled = styled.div`
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

export default function SignForm(props) {
  const { userContext } = useContext(Context);
  const [user] = userContext;
  const [signedUpStatus, setSignedUpStatus] = useState(true);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
  };

  return (
    <SignFormStyled>
      <div className="top">
        <Button onClick={() => props.cancel()} sx={{ mr: 2 }}>
          X
        </Button>
      </div>
      {user.name ? (
        <div>Hello user</div>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
    </SignFormStyled>
  );
}
