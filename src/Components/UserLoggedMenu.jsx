import React, { useContext } from "react";
import { Context } from "../Context";
import { signOut } from "@firebase/auth";
import { auth } from "../Data/FirebaseConfig";
import Button from "@mui/material/Button";

export default function UserLoggedMenu() {
  const { userContext } = useContext(Context);
  const [user] = userContext;
  return (
    <Button
      onClick={() => {
        signOut(auth);
      }}>
      {user.email}
    </Button>
  );
}
