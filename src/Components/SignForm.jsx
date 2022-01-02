import React, { useState } from "react";
import { auth } from "../Data/FirebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

export default function SignForm() {
  const [signedUpStatus, setSignedUpStatus] = useState(true);

  const register = async (email, password) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      return user;
    } catch (err) {
      console.log(err.message);
    }
  };

  const login = async (email, password) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      return user;
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (signedUpStatus) {
      login(data.get("email"), data.get("password"));
    } else {
      register(data.get("email"), data.get("password"));
    }
  };

  return (
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
  );
}
