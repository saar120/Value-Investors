import React from "react";
import { signOut } from "@firebase/auth";
import { auth } from "../Data/FirebaseConfig";
import Button from "@mui/material/Button";

export default function UserLoggedMenu() {
  return (
    <Button
      onClick={() => {
        signOut(auth);
      }}>
      Logout
    </Button>
  );
}
