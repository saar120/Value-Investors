import React, { useState } from "react";
import { auth } from "../Data/FirebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { insertUser } from "../Data/FirebaseFunctions";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export default function SignForm() {
  const [signedUpStatus, setSignedUpStatus] = useState(true);
  const [error, setError] = useState("");

  const errorMessage = (code) => {
    switch (code) {
      case "auth/weak-password":
        setError("Password must be at least 6 characters");
        break;
      case "auth/email-already-in-use":
        setError("Email already in use");
        break;
      case "auth/wrong-password":
        setError("Wrong password");
        break;
      case "auth/user-not-found":
        setError("User not found");
        break;
      default:
        break;
    }
  };

  const register = async (email, password, name) => {
    if (error) setError("");
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user.user, { displayName: name });
      await insertUser({ id: user.user.uid });
    } catch (err) {
      console.error("Error:", err.message);
      errorMessage(err.code);
    }
  };

  const login = async (email, password) => {
    if (error) setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error("Error:", err.message);
      errorMessage(err.code);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (signedUpStatus) {
      login(data.get("email"), data.get("password"));
    } else {
      register(data.get("email"), data.get("password"), data.get("name"));
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit}>
        {signedUpStatus ? (
          ""
        ) : (
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
        )}
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
        {error && (
          <Typography variant="body2" color="red" align="center">
            {error}
          </Typography>
        )}
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 1 }}>
          {signedUpStatus ? "Login" : "Sign Up"}
        </Button>
      </Box>
      <Link className="pointer" onClick={() => setSignedUpStatus(!signedUpStatus)} variant="body2">
        {signedUpStatus ? "Don't have an account? Sign Up" : "Already have an account? Login"}
      </Link>
    </>
  );
}
